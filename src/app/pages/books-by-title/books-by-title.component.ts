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
  author: any[] = []
  title: string = ''
  authorFirstName: string = ''
  authorLastName: string = ''
  book: any = ''
  baseUrl: string = `https://jhupbooks.press.jhu.edu/ecom/MasterServlet/AddToCartFromExternalHandler?item=`

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

  loadPurchasePage(book: Book) {
    // this.book = book
    console.log(book.isbn)
    // use regular expression to remove all hyphens from the isbn
    const isbn = book.isbn.replace(/-/g, '')
    console.log(isbn)
    return `https://jhupbooks.press.jhu.edu/ecom/MbuttonsterServlet/AddToCartFromExternalHandler?item=${isbn}&domain=hfs.jhu.edu`
  }

  async getBooksByTitle(authorId: string): Promise<any[]> {
    const booksByAuth = await this.bookService.getBooksByTitle(authorId)
    console.log(booksByAuth)
    this.booksByTitle = booksByAuth
    console.log(this.booksByTitle)

    this.getAuthorNameFromId(this.booksByTitle[0].authorId) // this.getAuthorNameFromId(this.booksByTitle[0].authorId)
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
