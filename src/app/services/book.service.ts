import { Injectable } from '@angular/core'
import { Book } from '../models/book'
import { BookData } from '../models/bookData'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  addDoc,
  getDoc,
  deleteDoc,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { db } from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  lastDoc: any

  books: Book[] = []
  booksByAuthor: Book[] = []
  booksByTitle: Book[] = []
  newBooks: Book[] = []
  startAfterValue: string = ''
  limitValue: number = 10

  async getPaginatedBooks(
    limitValue: number = 10,
    startAfterValue: any = null
  ): Promise<Book[]> {
    let q: any

    if (startAfterValue) {
      q = query(
        collection(db, 'books'),
        orderBy('title'),
        startAfter(startAfterValue),
        limit(limitValue)
      )
    } else {
      q = query(collection(db, 'books'), orderBy('title'), limit(limitValue))
    }

    const documentSnapshots = await getDocs(q)

    const currentBooks: Book[] = []
    const storage = getStorage()

    for (let doc of documentSnapshots.docs) {
      const coverImageUrl = doc.data() as BookData['cover_image_url']

      let url = ''
      if (typeof coverImageUrl === 'string' && coverImageUrl !== '') {
        const coverImageRef = ref(storage, coverImageUrl)
        url = await getDownloadURL(coverImageRef).catch((error) => {
          console.log(error)
          return '' // Provide a default empty string if error occurs
        })
      }

      const id = doc.id
      const bookObj: Book = {
        id: id,
        authorId: doc.data() as BookData['author_id'],
        title: doc.data() as BookData['title'],
        isbn: doc.data() as BookData['isbn'],
        description: doc.data() as BookData['description'],
        buyUrl: doc.data() as BookData['buy_link'],
        coverImageUrl: url || '', // Provide a default value for the url variable
        publicationDate: doc.data() as BookData['publication_date'],
        price: doc.data() as BookData['price'],
        isNew: true,
      }

      currentBooks.push(bookObj)
    }
    this.books = currentBooks
    this.lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1]
    return this.books
  }

  // getLastDoc(): any {
  //   return this.lastDoc
  // }

  async getBooks(): Promise<Book[]> {
    if (this.books.length > 0) {
      return this.books
    }
    const q = query(collection(db, 'books'), orderBy('title'))
    const documentSnapshots = await getDocs(q)

    const currentBooks: Book[] = []
    const storage = getStorage()

    for (let doc of documentSnapshots.docs) {
      const coverImageUrl = doc.data()['cover_image_url']

      let url = ''
      if (coverImageUrl && coverImageUrl !== '') {
        const coverImageRef = ref(storage, coverImageUrl)
        url = await getDownloadURL(coverImageRef).catch((error) => {
          console.log(error)
          return '' // Provide a default empty string if error occurs
        })
      }

      const id = doc.id
      const bookObj: Book = {
        id: id,
        authorId: doc.data()['author_id'],
        title: doc.data()['title'],
        isbn: doc.data()['isbn'],
        description: doc.data()['description'],
        buyUrl: doc.data()['buy_link'],
        coverImageUrl: url || '', // Provide a default value for the url variable
        publicationDate: doc.data()['publication_date'],
        price: doc.data()['price'],
        isNew: true,
      }

      currentBooks.push(bookObj)
    }
    this.books = currentBooks
    console.log(this.books)
    return this.books
  }

  async getNewBooks(): Promise<Book[]> {
    if (this.newBooks.length > 0) {
      return this.newBooks
    }
    const q = query(collection(db, 'books'), where('is_new', '==', true))
    const querySnapshot = await getDocs(q)
    const currentBooks: Book[] = []
    const storage = getStorage()

    for (let doc of querySnapshot.docs) {
      const coverImageRef = ref(storage, doc.data()['cover_image_url'])
      let url = await getDownloadURL(coverImageRef).catch((error) => {
        console.log(error)
      })

      const id = doc.id
      const bookObj: Book = {
        id: id,
        authorId: doc.data()['author_id'],
        title: doc.data()['title'],
        isbn: doc.data()['isbn'],
        description: doc.data()['description'],
        buyUrl: doc.data()['buy_link'],
        coverImageUrl: url || '', // Provide a default value for the url variable
        publicationDate: doc.data()['publication_date'],
        price: doc.data()['price'],
        isNew: doc.data()['is_new'],
      }

      currentBooks.push(bookObj)
    }
    this.newBooks = currentBooks
    return this.newBooks
  }

  async addBook(book: Book): Promise<any> {
    const booksCollection = collection(db, 'books')
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

    const docRef = await addDoc(booksCollection, newBookData)
    this.addAuthorIdToBook(book.authorId, docRef.id)
  }

  addAuthorIdToBook(authorId: string, bookId: string): void {
    const bookRef = doc(db, 'books', bookId)
    setDoc(bookRef, { author_id: authorId }, { merge: true })
  }

  async getBooksByAuthor(authorId: string): Promise<any[]> {
    const q = query(collection(db, 'books'), where('author_id', '==', authorId))
    const querySnapshot = await getDocs(q)
    const currentBooks: Book[] = []
    const storage = getStorage()

    for (let doc of querySnapshot.docs) {
      const coverImageRef = ref(storage, doc.data()['cover_image_url'])
      let url = await getDownloadURL(coverImageRef).catch((error) => {
        console.log(error)
      })

      const id = doc.id
      const bookObj: Book = {
        id: id,
        authorId: doc.data()['author_id'],
        title: doc.data()['title'],
        isbn: doc.data()['isbn'],
        description: doc.data()['description'],
        buyUrl: doc.data()['buy_link'],
        coverImageUrl: url || '', // Provide a default value for the url variable
        publicationDate: doc.data()['publication_date'],
        price: doc.data()['price'],
        isNew: doc.data()['is_new'],
      }
      currentBooks.push(bookObj)
    }
    this.booksByAuthor = currentBooks
    return this.booksByAuthor
  }

  addImageToBook(bookId: string, imageUrl: string): void {
    console.log(bookId, imageUrl)
    const bookRef = doc(db, 'books', bookId)
    setDoc(bookRef, { cover_image_url: imageUrl }, { merge: true })
  }

  async getBooksByTitle(title: string): Promise<any[]> {
    const q = query(collection(db, 'books'), where('title', '==', title))
    const querySnapshot = await getDocs(q)
    const currentBooks: Book[] = []
    const storage = getStorage()

    for (let doc of querySnapshot.docs) {
      const coverImageRef = ref(storage, doc.data()['cover_image_url'])
      let url = await getDownloadURL(coverImageRef).catch((error) => {
        console.log(error)
      })

      const id = doc.id
      const bookObj: Book = {
        id: id,
        authorId: doc.data()['author_id'],
        title: doc.data()['title'],
        isbn: doc.data()['isbn'],
        description: doc.data()['description'],
        buyUrl: doc.data()['buy_link'],
        coverImageUrl: url || '', // Provide a default value for the url variable
        publicationDate: doc.data()['publication_date'],
        price: doc.data()['price'],
        isNew: doc.data()['is_new'],
      }
      currentBooks.push(bookObj)
    }
    this.booksByTitle = currentBooks
    return this.booksByTitle
  }

  async getAuthorById(authorId: string) {
    const authorRef = doc(db, 'authors', authorId)
    const authorSnap = await getDoc(authorRef)
    console.log(authorSnap.data())?.['first_name ' + 'last_name']
    return authorSnap.data()
  }

  updateBookNewStatus(bookId: string, status: boolean): void {
    console.log(bookId, status)
    const bookRef = doc(db, 'books', bookId)
    setDoc(bookRef, { is_new: status }, { merge: true })
  }

  async updateBook(book: any): Promise<void> {
    if (!book.id) {
      throw new Error('Book ID is required')
    }

    const updatedBook: any = {}

    // Add only the fields that have values to the updatedBook object
    if (book.title) updatedBook.title = book.title
    if (book.authorId) updatedBook.author_id = book.authorId
    if (book.description) updatedBook.description = book.description
    if (book.isbn) updatedBook.isbn = book.isbn
    if (book.buyUrl) updatedBook.buy_link = book.buyUrl
    if (book.coverImageUrl) updatedBook.cover_image_url = book.coverImageUrl
    if (book.price) updatedBook.price = book.price

    const bookId = book.id as string // Ensure book.id is a string
    const bookRef = doc(db, 'books', bookId)

    // Update the book with the updatedBook object
    await setDoc(bookRef, updatedBook, { merge: true })
  }

  async deleteBook(bookId: string): Promise<void> {
    const bookRef = doc(db, 'books', bookId)
    // Add a cautionary message to the user before deleting the book
    const confirmDelete = confirm('Are you sure you want to delete this book?')
    if (!confirmDelete) return
    await deleteDoc(bookRef)
  }

  addEvent(event: any) {
    console.log(event)
  }
}
