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
  author: any[] = []
  authorFirstName: string = ''
  authorLastName: string = ''

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    // get the books by author from the params and set it to the booksByAuthor property
    this.route.params.subscribe((params) => {
      const authorId = params['authorId']
      this.getBooksByAuthor(authorId)
      this.getAuthorNameFromId(authorId)
    })
  }

  async getBooksByAuthor(authorId: string): Promise<Book[]> {
    const booksByAuth = await this.bookService.getBooksByAuthor(authorId)
    this.booksByAuthor = booksByAuth
    return booksByAuth
  }

  async getAuthorNameFromId(authorId: string): Promise<any> {
    const author = await this.bookService.getAuthorById(authorId)
    console.log(author)
    if (author) {
      // convert author object to array to enable iteration in the template
      this.author = Array(author)
      this.authorFirstName = this.author[0].first_name
      this.authorLastName = this.author[0].last_name
      return this.authorFirstName + ' ' + this.authorLastName
    } else {
      console.error('Author not found')
    }
  }
}
