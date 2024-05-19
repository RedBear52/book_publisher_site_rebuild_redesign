import { Component } from '@angular/core'
import { BookService } from 'src/app/services/book.service'
import { Book } from 'src/app/models/book'
import { Router } from '@angular/router'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  books: Book[] = []

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
    this.getBooks()
  }

  ngOnInit(): void {
    this.bookService.getBooks().then((books) => {
      this.books = books
    })

  }

  async getBooks() {
    this.books = await this.bookService.getBooks()
    console.log(this.books)
  }

}
