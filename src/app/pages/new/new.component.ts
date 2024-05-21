import { Component } from '@angular/core'
import { BookService } from 'src/app/services/book.service'
import { Book } from 'src/app/models/book'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  newBooks: Book[] = []

  constructor(private bookService: BookService) {
    // this.getNewBooks()
    // console.log(this.newBooks)
  }

  async ngOnInit(): Promise<void> {
    this.newBooks = await this.bookService.getNewBooks()
    console.log(this.newBooks)
  }
}
