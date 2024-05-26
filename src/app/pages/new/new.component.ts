import { Component } from '@angular/core'
import { BookService } from 'src/app/services/book.service'
import { AuthorService } from 'src/app/services/author.service'
import { Book } from 'src/app/models/book'
import { Author } from 'src/app/models/author'
import { Router } from '@angular/router'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  newBooks: Book[] = []
  authors: Author[] = []

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.newBooks = await this.bookService.getNewBooks()
    console.log(this.newBooks)

    this.authors = await this.authorService.getAuthors()
  }

  showFeaturedBook(book: Book): void {
    this.router.navigate(['/books-by-title', book.title])
  }
}
