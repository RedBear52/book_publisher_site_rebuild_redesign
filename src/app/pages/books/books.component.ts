import { Component } from '@angular/core'
import { BookService } from 'src/app/services/book.service'
import { AuthorService } from 'src/app/services/author.service'
import { Book } from 'src/app/models/book'
import { Author } from 'src/app/models/author'
import { Router } from '@angular/router'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  books: Book[] = []
  authors: Author[] = []
  loading: boolean = true

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    Promise.all([
      this.bookService.getBooks(),
      this.authorService.getAuthors(),
    ]).then(([books, authors]) => {
      this.books = books
      this.authors = authors
      this.loading = false // Set loading to false when data has been loaded
    })
  }

  showFeaturedBook(book: Book): void {
    this.router.navigate([`/books-by-title/${book.title}`], {})
    console.log(book.title)
  }
}
