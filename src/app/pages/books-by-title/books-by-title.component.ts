import { Component } from '@angular/core'
import { Book } from 'src/app/models/book'
import { ActivatedRoute } from '@angular/router'
import { BookService } from 'src/app/services/book.service'

@Component({
  selector: 'app-books-by-title',
  templateUrl: './books-by-title.component.html',
  styleUrl: './books-by-title.component.css',
})
export class BooksByTitleComponent {
  booksByTitle: Book[] = []
  title: string = ''

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    // get the books by author from the params and set it to the booksByAuthor property
    this.route.params.subscribe((params) => {
      const title = params['title']
      this.title = title
      this.getBooksByTitle(title)
    })
  }

  async getBooksByTitle(authorId: string): Promise<any[]> {
    const booksByAuth = await this.bookService.getBooksByTitle(authorId)
    console.log(booksByAuth)
    this.booksByTitle = booksByAuth
    console.log(this.booksByTitle)
    return booksByAuth
  }
}
