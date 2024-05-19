import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'; 
import { db } from 'environments/environment'


@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [];


  async getBooks(): Promise<Book[]>{
    const q = query(collection(db, 'books'));
    const querySnapshot = await getDocs(q);
    const currentBooks: Book[] = [];
    const storage = getStorage();

    for (let doc of querySnapshot.docs) {
      const coverImageRef = ref(storage, doc.data()['cover_image_url']);
      let url = await getDownloadURL(coverImageRef).catch((error) => {
        console.log(error);
      });

      const bookObj: Book = {
        id: doc.data()['id'],
        authorId: doc.data()['author_id'],
        title: doc.data()['title'],
        isbn: doc.data()['isbn'],
        description: doc.data()['description'],
        buyUrl: doc.data()['buy_link'],
        coverImageUrl: url || '', // Provide a default value for the url variable
        publicationDate: doc.data()['publication_date'],
        price: doc.data()['price']
      };

      currentBooks.push(bookObj);
      }
      this.books = currentBooks;
    return this.books;
  }
}
