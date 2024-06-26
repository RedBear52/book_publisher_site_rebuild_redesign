import { Injectable } from '@angular/core'
import { Author } from '../models/author'
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor() {}

  async getAuthors(): Promise<Author[]> {
    const authorsCollection = collection(db, 'authors')
    const authorSnapshot = await getDocs(authorsCollection)
    const authorList: Author[] = []
    authorSnapshot.forEach((doc) => {
      authorList.push({
        id: doc.id,
        firstName: doc.data()['first_name'],
        lastName: doc.data()['last_name'],
        bio: doc.data()['bio'],
      } as Author)
    })
    return authorList
  }

  getObservableAuthors(): Observable<Author[]> {
    return new Observable((observer) => {
      this.getAuthors().then((authors) => {
        observer.next(authors)
      })
    })
  }

  async addAuthor(author: Author): Promise<void> {
    // Add author to the database
    const authorsCollection = collection(db, 'authors')
    await addDoc(authorsCollection, {
      first_name: author.firstName,
      last_name: author.lastName,
      bio: author.bio,
    })
  }

  async updateAuthor(author: any): Promise<void> {
    if (!author.authorId) {
      throw new Error('Author ID is required')
    }

    const updatedAuthor: any = {}

    // Add only the fields that have values to the updatedAuthor object
    if (author.firstName) updatedAuthor.first_name = author.firstName
    if (author.lastName) updatedAuthor.last_name = author.lastName
    if (author.bio) updatedAuthor.bio = author.bio

    const authorDoc = doc(db, 'authors', author.authorId)

    // Update the author with the updatedAuthor object
    await setDoc(authorDoc, updatedAuthor, { merge: true })
  }

  deleteAuthor(authorId: string): void {
    // Delete author from the database
    const authorDoc = doc(db, 'authors', authorId)
    const confirmDelete = confirm(
      'Clicking okay will delete this author from your database. Click okay to proceed.'
    )
    if (confirmDelete) {
      deleteDoc(authorDoc)
    } else {
      return
    }
  }
}
