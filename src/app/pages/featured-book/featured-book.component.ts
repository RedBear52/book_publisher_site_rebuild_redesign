import { Component } from '@angular/core'
import { Book } from 'src/app/models/book'
import { ActivatedRoute } from '@angular/router'
import { BookService } from 'src/app/services/book.service'

@Component({
  selector: 'app-featured-book',
  templateUrl: './featured-book.component.html',
  styleUrl: './featured-book.component.css',
})
export class FeaturedBookComponent {
  book: Book = {
    id: '',
    title: '',
    authorId: '',
    isbn: '',
    buyUrl: '',
    price: 0,
    coverImageUrl: '',
    description: '',
    publicationDate: new Date(),
    isNew: false,
  }

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    // get the featured book from the params and set it to the featuredBook property
    this.route.params.subscribe((params) => {
      const title = params['title']
      console.log(title)
      this.getFeaturedBook(title)
    })
  }

  async getFeaturedBook(title: string): Promise<any> {
    const book = await this.bookService.getBooksByTitle(title)
    if (book) {
      this.book = book[0]
      console.log(this.book)
      return book
    }
  }
}
