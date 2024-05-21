import { Injectable } from '@angular/core'
import { Author } from '../models/author'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from 'environments/environment'

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

  async addAuthor(author: Author): Promise<void> {
    // Add author to the database
    const authorsCollection = collection(db, 'authors')
    await addDoc(authorsCollection, {
      first_name: author.firstName,
      last_name: author.lastName,
      bio: author.bio,
    })
  }
}
