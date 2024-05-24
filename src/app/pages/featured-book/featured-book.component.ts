import { Component } from '@angular/core'
import { Book } from 'src/app/models/book'
import { ActivatedRoute } from '@angular/router'
import { BookService } from 'src/app/services/book.service'

@Component({
  selector: 'app-featured-book',
  standalone: true,
  imports: [],
  templateUrl: './featured-book.component.html',
  styleUrl: './featured-book.component.css',
})
export class FeaturedBookComponent {
  featuredBook: Book[] = []
}
