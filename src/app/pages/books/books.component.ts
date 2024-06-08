import { Component, Input, ElementRef, HostListener } from '@angular/core'
import { BookService } from 'src/app/services/book.service'
import { AuthorService } from 'src/app/services/author.service'
import { Book } from 'src/app/models/book'
import { Author } from 'src/app/models/author'
import { Router } from '@angular/router'
import { forkJoin } from 'rxjs'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  @Input('{ required: true, transform: unwrapSafeUrl }')
  ngSrc: string = ''
  books: Book[] = []
  authors: Author[] = []
  loading: boolean = true
  loadingNextPage: boolean = false

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.loading = true
  //   Promise.all([this.bookService.getBooks(), this.authorService.getAuthors()])
  //     .then(([books, authors]) => {
  //       this.books = books
  //       this.authors = authors
  //       this.loading = false
  //     })
  //     .then(() => console.log('Books:', this.books))
  //     .catch((error) => {
  //       console.error(error)
  //       this.loading = false
  //     })
  // }

  ngOnInit(): void {
    if (this.books.length > 0) {
      return
    }
    this.loading = true
    forkJoin({
      books: this.bookService.getPaginatedBooks(20, 0),
      authors: this.authorService.getAuthors(),
    }).subscribe({
      next: (results) => {
        this.books = results.books
        this.authors = results.authors
        this.loading = false
        console.log('Books:', this.books)
      },
      error: (error) => {
        console.error(error)
        this.loading = false
      },
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    try {
      if (
        !this.loadingNextPage &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        this.loadingNextPage = true
        this.bookService
          .getNextPage()
          .then((books) => {
            if (books.length === 0) {
              this.loadingNextPage = false
              return
            }
            this.books = [...this.books, ...books]
            this.loadingNextPage = false
          })
          .catch((error) => {
            console.error('Error fetching books:', error)
            this.loadingNextPage = false
          })
      }
    } catch (error) {
      console.error('Error in onScroll:', error)
      this.loadingNextPage = false
    }
  }

  showFeaturedBook(book: Book): void {
    this.router.navigate([`/books-by-title/${book.title}`], {})
    console.log(book.title)
  }
}
