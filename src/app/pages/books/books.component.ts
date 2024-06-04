import { Component, HostListener } from '@angular/core'
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
  // @HostListener('window:scroll', ['$event'])
  books: Book[] = []
  authors: Author[] = []
  loading: boolean = true

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true
    Promise.all([this.bookService.getBooks(), this.authorService.getAuthors()])
      .then(([books, authors]) => {
        this.books = books
        this.authors = authors
        this.loading = false
      })
      .catch((error) => {
        console.error(error)
        this.loading = false
      })
  }

  onScroll(event: Event) {
    try {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.bookService
          .getPaginatedBooks(10, this.bookService.lastDoc)
          .then((books) => {
            this.books = [...this.books, ...books]
          })
          .catch((error) => {
            console.error('Error fetching books:', error)
          })
      }
    } catch (error) {
      console.error('Error in onScroll:', error)
    }
  }

  showFeaturedBook(book: Book): void {
    this.router.navigate([`/books-by-title/${book.title}`], {})
    console.log(book.title)
  }
}
