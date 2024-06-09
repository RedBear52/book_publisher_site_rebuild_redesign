import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-loading-books',
  templateUrl: './loading-books.component.html',
  styleUrl: './loading-books.component.css',
})
export class LoadingBooksComponent {
  @Input() loading: boolean = true
}
