import { Component, Input, ElementRef, HostListener } from '@angular/core'
import { BookService } from 'src/app/services/book.service'
import { AuthorService } from 'src/app/services/author.service'
import { Book } from 'src/app/models/book'
import { Author } from 'src/app/models/author'
import { Router } from '@angular/router'
import { forkJoin } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'

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
  // add dynamic totalItems functionality
  totalItems: number = 85
  pageSize: number = 20
  currentPage: number = 0
  private pages: any

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true
    this.bookService.getBooksCount().then((count) => {
      this.totalItems = count
    })
    Promise.all([
      // get number of books and set totalItems
      this.bookService.getMatPaginatedBooks(this.pageSize, this.currentPage),
      this.authorService.getAuthors(),
    ])
      .then(([books, authors]) => {
        this.books = books as any
        this.authors = authors
        this.loading = false
      })
      .then(() => console.log('Books:', this.books))
      .catch((error) => {
        console.error(error)
        this.loading = false
      })
  }

  //  page changed function to work with mat-paginator
  pageChanged(event: PageEvent): void {
    this.loadingNextPage = true
    this.currentPage = event.pageIndex
    this.pageSize = event.pageSize
    this.bookService
      .getMatPaginatedBooks(this.pageSize, this.currentPage)
      .then((books) => {
        this.books = books as any
        this.loadingNextPage = false
      })
      .catch((error) => {
        console.error(error)
        this.loadingNextPage = false
      })
  }

  showFeaturedBook(book: Book): void {
    this.router.navigate([`/books-by-title/${book.title}`], {})
    console.log(book.title)
  }
}
