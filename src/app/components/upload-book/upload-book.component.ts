import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { BookService } from 'src/app/services/book.service'
import { Book } from 'src/app/models/book'
import { Author } from 'src/app/models/author'
import { EventListing } from 'src/app/models/eventListing'
import { Router } from '@angular/router'
import { AuthorService } from 'src/app/services/author.service'
import { EventService } from 'src/app/services/event.service'
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
  deleteEventForm: FormGroup
  eventForm: FormGroup
  imageForm: FormGroup
  authors: Author[] = []
  books: Book[] = []
  eventListings: EventListing[] = []
  snackBar: any

  constructor(
    private bookService: BookService,
    private router: Router,
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    private snackBarService: MatSnackBar,
    private eventService: EventService
  ) {
    ;(this.bookForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
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
      })),
      (this.imageForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
        coverImageUrl: new FormControl('', [Validators.required]),
      })),
      (this.eventForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        moreInfoLink: new FormControl('', [Validators.required]),
      })),
      (this.deleteEventForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
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
    this.getEvents()
  }
  async getEvents() {
    this.eventListings = (await this.eventService.getEvents()).filter(
      (event) => event.title
    )
    console.log(this.eventListings)
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

  // async onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0]
  //   let filePath = ''
  //   if (file) {
  //     const storage = getStorage()
  //     filePath = `cover_images/${file.name}`
  //     console.log(filePath)
  //     const storageRef = ref(storage, filePath)
  //     console.log(storageRef)
  //     await uploadBytes(storageRef, file)

  //     const gsUrl = `gs://flood-editions.appspot.com/${filePath}`

  //     const db = getFirestore()
  //     console.log(gsUrl)
  //     if (this.bookForm.value && this.bookForm.value.id) {
  //       const bookId = this.bookForm.value.id
  //       console.log(bookId)
  //       const bookRef = doc(db, 'books', bookId)
  //       await setDoc(bookRef, { cover_image_url: gsUrl }, { merge: true })
  //       console.error('cover image url set in firestore')
  //     } else {
  //       console.error('Book form value or ID is undefined')
  //     }
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
    this.snackBarService.open(`Author added`, 'Close')
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      this.uploadFile(file)
    }
  }

  uploadFile(file: File) {
    const filePath = `cover_images/${file.name}`
    const storage = getStorage()
    const storageRef = ref(storage, filePath)
    uploadBytes(storageRef, file).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(storageRef)
      console.log('File uploaded successfully')
      console.log('File available at', downloadUrl)
      // Set the cover image URL in the form
      this.imageForm.get('coverImageUrl')?.setValue(downloadUrl)
      console.log(this.imageForm.value)
    })
  }

  onSelect(book: Book) {
    const selectedbook = this.imageForm.value.bookId
    console.log(selectedbook)
  }

  onAddImage() {
    // Get the book ID and cover image URL from the form
    const bookId = this.imageForm.value.id
    console.log(bookId)
    const coverImageUrl = this.imageForm.value.coverImageUrl
    console.log(coverImageUrl)

    // Update the book with the cover image URL
    this.bookService.addImageToBook(bookId, coverImageUrl)
    this.imageForm.reset()
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
    console.log(bookId)
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

  onAddEvent() {
    const event = this.eventForm.value
    this.eventService.addEvent(event)
    this.eventForm.reset()
    this.snackBarService.open(`Event added`, 'Close')
  }

  onDeleteEvent() {
    const eventId = this.deleteEventForm.value.id
    console.log(eventId)
    this.eventService.removeEvent(eventId)
    this.deleteEventForm.reset()
    this.snackBarService.open(`Event deleted`, 'Close')
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
