import { Component } from '@angular/core'
import { Book } from 'src/app/models/book'
import { ActivatedRoute } from '@angular/router'
import { BookService } from 'src/app/services/book.service'

@Component({
  selector: 'app-books-by-author',
  templateUrl: './books-by-author.component.html',
  styleUrl: './books-by-author.component.css',
})
export class BooksByAuthorComponent {
  booksByAuthor: Book[] = []

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    // get the books by author from the params and set it to the booksByAuthor property
    this.route.params.subscribe((params) => {
      const authorId = params['authorId']
      this.getBooksByAuthor(authorId)
    })
  }

  async getBooksByAuthor(authorId: string): Promise<Book[]> {
    console.log(authorId)
    const booksByAuth = await this.bookService.getBooksByAuthor(authorId)
    console.log(booksByAuth)
    this.booksByAuthor = booksByAuth
    console.log(this.booksByAuthor)
    return booksByAuth
  }
}
