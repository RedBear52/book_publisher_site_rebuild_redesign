import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { BookService } from 'src/app/services/book.service'
import { Book } from 'src/app/models/book'
import { Author } from 'src/app/models/author'
import { Router } from '@angular/router'
import { AuthorService } from 'src/app/services/author.service'

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css'],
})
export class UploadBookComponent {
  bookForm: FormGroup
  authorForm: FormGroup
  updateAuthorForm: FormGroup
  newForm: FormGroup
  // updateBookForm: FormGroup
  authors: Author[] = []
  books: Book[] = []

  constructor(
    private bookService: BookService,
    private router: Router,
    private authorService: AuthorService,
    private formBuilder: FormBuilder
  ) {
    ;(this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      buyUrl: new FormControl('', [Validators.required]),
      coverImageUrl: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      authorId: new FormControl('', [Validators.required]),
      publicationDate: new FormControl('', [Validators.required]),
    })),
      (this.authorForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        bio: new FormControl('', [Validators.required]),
      })),
      (this.updateAuthorForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        bio: new FormControl('', [Validators.required]),
        authorId: new FormControl('', [Validators.required]),
      })),
      (this.newForm = new FormGroup({
        selectedBook: new FormControl('', [Validators.required]),
        isNew: new FormControl('', [Validators.required]),
      }))
    // (this.updateBookForm = new FormGroup({
    //   title: new FormControl('', [Validators.required]),
    //   isbn: new FormControl('', [Validators.required]),
    //   description: new FormControl('', [Validators.required]),
    //   buyUrl: new FormControl('', [Validators.required]),
    //   coverImageUrl: new FormControl('', [Validators.required]),
    //   price: new FormControl('', [Validators.required]),
    //   authorId: new FormControl('', [Validators.required]),
    //   publicationDate: new FormControl('', [Validators.required]),
    //   isNew: new FormControl('', [Validators.required]),
    // }))
  }

  async ngOnInit() {
    this.fetchAuthors()
    ;(this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      description: ['', Validators.required],
      buyUrl: ['', Validators.required],
      coverImageUrl: ['', Validators.required],
      price: ['', Validators.required],
      authorId: ['', Validators.required],
      publicationDate: ['', Validators.required],
      // isNew: [true],
    })),
      this.getBooks()
  }
  async getBooks() {
    this.books = (await this.bookService.getBooks())
      .filter((book) => book.title)
      .sort((a, b) => a.title.localeCompare(b.title))
  }

  async onSubmit() {
    const book: Book = this.bookForm.value
    const newBookData = {
      author_id: book.authorId,
      title: book.title,
      isbn: book.isbn,
      description: book.description,
      buy_link: book.buyUrl,
      cover_image_url: book.coverImageUrl,
      publication_date: book.publicationDate,
      price: book.price,
      // is_new: book.isNew,
    }

    console.log('Book created')
    console.log(book)
    await this.bookService.addBook(book)
    this.bookForm.reset()
  }

  // codeblock below is for uploading images to firebase storage
  // onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0]
  //   if (file) {
  //     const storage = getStorage()
  //     const filePath = `cover_images/${file.name}`
  //     const storageRef = ref(storage, filePath)
  //     uploadBytes(storageRef, file)
  //   }
  // }

  // temp codeblock below is for uplading image url to firestore
  // async onSubmitImage() {
  //   const imageUrl = this.imageForm.value.imageUrl
  //   console.log(imageUrl)
  //   await this.bookService.addImageUrl(imageUrl)
  //   this.imageForm.reset()
  // }

  async fetchAuthors(): Promise<any> {
    this.authors = (await this.authorService.getAuthors())
      .filter((author) => author.lastName)
      .sort((a, b) => a.lastName.localeCompare(b.lastName))
    console.log(this.authors)
  }

  onSubmitAuthor() {
    const author: Author = this.authorForm.value
    this.authorService.addAuthor(author)
    this.authorForm.reset()
  }

  async onUpdateAuthor() {
    const formValues = this.updateAuthorForm.value
    const updatedAuthor: any = {}

    // Add only the fields that have values to the updatedAuthor object
    if (formValues.authorId) updatedAuthor.authorId = formValues.authorId
    if (formValues.firstName) updatedAuthor.firstName = formValues.firstName
    if (formValues.lastName) updatedAuthor.lastName = formValues.lastName
    if (formValues.bio) updatedAuthor.bio = formValues.bio

    // Update the author
    await this.authorService.updateAuthor(updatedAuthor)

    // Reset the form and fetch the authors again
    // TODO: ADD TOAST NOTIFICATIONS
    this.updateAuthorForm.reset()
    this.authors = await this.fetchAuthors()
    // PAGE REFRESH TO SHOW UPDATED AUTHORS IN SELECT DROPDOWN
    this.router.navigate(['/upload-book'])
  }

  onToggleNew() {
    const newStatus = this.newForm.value.isNew === 'true'
    const selectedBookId = this.newForm.value.selectedBook
    console.log(newStatus)
    console.log(selectedBookId)

    this.bookService.updateBookNewStatus(selectedBookId, newStatus as boolean)
    this.newForm.reset()
  }

  onUpdateBook() {
    // const bookId = this.updateBookForm.value.bookId
    // const book: Book = this.updateBookForm.value
    // this.bookService.updateBook(book)
    // this.updateBookForm.reset()
  }
}
