import { Component } from '@angular/core'
import { BookService } from 'src/app/services/book.service'
import { AuthorService } from 'src/app/services/author.service'
import { Book } from 'src/app/models/book'
import { Author } from 'src/app/models/author'
import { Router } from '@angular/router'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-book-observer',
  templateUrl: './book-observer.component.html',
  styleUrl: './book-observer.component.css',
})
export class BookObserverComponent {
  books: Book[] = []
  authors: Author[] = []

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.bookService.getObservableBooks().subscribe((books) => {
      this.books = books
      console.log(this.books)
    })
    this.authorService.getObservableAuthors().subscribe((authors) => {
      this.authors = authors
      console.log(this.authors)
    })
  }

  showFeaturedBook(book: Book): void {
    this.router.navigate([`/books-by-title/${book.title}`], {})
    console.log(book.title)
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }
}
