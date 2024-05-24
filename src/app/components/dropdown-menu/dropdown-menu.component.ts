import { Component } from '@angular/core'
import { Author } from 'src/app/models/author'
import { BookService } from 'src/app/services/book.service'
import { AuthorService } from 'src/app/services/author.service'
import { Router } from '@angular/router'
import { Book } from 'src/app/models/book'

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
})
export class DropdownMenuComponent {
  authors: Author[] = []
  titles: Book[] = []

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private route: Router
  ) {}

  async ngOnInit() {
    this.titles = (await this.bookService.getBooks())
      .filter((book) => book.title)
      .sort((a, b) => a.title.localeCompare(b.title))

    this.authors = (await this.authorService.getAuthors())
      .filter((author) => author.lastName)
      .sort((a, b) => a.lastName.localeCompare(b.lastName))
  }

  async getBooksByAuthor(author: Author): Promise<void> {
    this.route.navigate(['/books-by-author', author.id])
  }

  async getBooksByTitle(book: Book): Promise<void> {
    this.route.navigate(['/books-by-title', book.title])
  }
}
