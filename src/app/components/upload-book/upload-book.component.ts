import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { BookService } from 'src/app/services/book.service'
import { Book } from 'src/app/models/book'
import { Author } from 'src/app/models/author'
import { Router } from '@angular/router'
import { AuthorService } from 'src/app/services/author.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

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
  updateBookForm: FormGroup
  deleteBookForm: FormGroup
  deleteAuthorForm: FormGroup
  authors: Author[] = []
  books: Book[] = []
  snackBar: any

  constructor(
    private bookService: BookService,
    private router: Router,
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    private snackBarService: MatSnackBar
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
      })),
      (this.updateBookForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        isbn: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        buyUrl: new FormControl('', [Validators.required]),
        coverImageUrl: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        authorId: new FormControl('', [Validators.required]),
        publicationDate: new FormControl('', [Validators.required]),
        isNew: new FormControl('', [Validators.required]),
      })),
      (this.deleteBookForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
      })),
      (this.deleteAuthorForm = new FormGroup({
        authorId: new FormControl('', [Validators.required]),
      }))
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
    }

    console.log('Book created')
    console.log(book)
    await this.bookService.addBook(book)
    this.bookForm.reset()
    this.snackBarService.open(`Book added`, 'Close')
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    let filePath = ''
    if (file) {
      const storage = getStorage()
      filePath = `cover_images/${file.name}`
      const storageRef = ref(storage, filePath)
      await uploadBytes(storageRef, file)

      const url = `gs://flood-editions.appspot.com/${filePath}`

      const db = getFirestore()
      console.log(url)
      console.log(filePath)
      const bookRef = doc(db, 'books', 'bookId')
      await setDoc(bookRef, { coverImageUrl: url }, { merge: true })
    }
  }

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
    this.snackBarService.open(`Author added`, 'Close')
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

    // Reset the form and fetch updated authors
    this.updateAuthorForm.reset()
    this.authors = await this.fetchAuthors()
    this.snackBarService.open(`Author details updated`, 'Close')
  }

  onToggleNew() {
    const newStatus = this.newForm.value.isNew === 'true'
    const selectedBookId = this.newForm.value.selectedBook
    console.log(newStatus)
    console.log(selectedBookId)

    this.bookService.updateBookNewStatus(selectedBookId, newStatus as boolean)
    this.newForm.reset()
    this.snackBarService.open(`Book's 'new' status updated`, 'Close')
  }

  async onUpdateBook() {
    const formValues = this.updateBookForm.value
    console.log(formValues)
    const updatedBook: any = {}

    // Add only the fields that have values to the updatedBook object
    if (formValues.id) updatedBook.id = formValues.id
    if (formValues.title) updatedBook.title = formValues.title
    if (formValues.authorId) updatedBook.authorId = formValues.authorId
    if (formValues.description) updatedBook.description = formValues.description
    if (formValues.isbn) updatedBook.isbn = formValues.isbn
    if (formValues.buyUrl) updatedBook.buyUrl = formValues.buyUrl
    if (formValues.coverImageUrl)
      updatedBook.coverImageUrl = formValues.coverImageUrl
    if (formValues.price) updatedBook.price = formValues.price
    if (formValues.publicationDate)
      updatedBook.publicationDate = formValues.publicationDate

    // Update the book
    await this.bookService.updateBook(updatedBook)

    // Reset the form
    this.updateBookForm.reset()

    this.snackBarService.open(`Book details updated`, 'Close')
  }

  onDeleteBook() {
    const bookId = this.deleteBookForm.value.id
    this.bookService.deleteBook(bookId)
    this.deleteBookForm.reset()
    this.snackBarService.open(`Book deletion process completed`, 'Close')
  }

  onDeleteAuthor() {
    const authorId = this.deleteAuthorForm.value.authorId
    this.authorService.deleteAuthor(authorId)
    this.deleteAuthorForm.reset()
    this.snackBarService.open(
      `Author deletion process completed.
    NOTE: To prevent website issues, be sure to remove any books 
    associated with the author from the database as well!`,
      'Close'
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
