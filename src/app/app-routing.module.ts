import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BooksComponent } from './pages/books/books.component'
import { NewComponent } from './pages/new/new.component'
import { OrderComponent } from './pages/order/order.component'
import { DonateComponent } from './pages/donate/donate.component'
import { SubmissionsComponent } from './pages/submissions/submissions.component'
import { UploadBookComponent } from './components/upload-book/upload-book.component'
import { BooksByAuthorComponent } from './pages/books-by-author/books-by-author.component'
import { BooksByTitleComponent } from './pages/books-by-title/books-by-title.component'

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'books', component: BooksComponent },
  { path: 'new', component: NewComponent },
  { path: 'order', component: OrderComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'submissions', component: SubmissionsComponent },
  { path: 'upload-book', component: UploadBookComponent },
  { path: 'books-by-author/:authorId', component: BooksByAuthorComponent },
  { path: 'books-by-title/:title', component: BooksByTitleComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
