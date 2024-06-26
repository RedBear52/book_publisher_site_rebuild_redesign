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
import { EventsComponent } from './pages/events/events.component'
import { AboutComponent } from './pages/about/about.component'
import { BookObserverComponent } from './pages/book-observer/book-observer.component'
import { LogInComponent } from './components/log-in/log-in.component'
import { adminGuard } from './guards/admin.guard'

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'books', component: BooksComponent },
  { path: 'new', component: NewComponent },
  { path: 'order', component: OrderComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'submissions', component: SubmissionsComponent },
  {
    path: 'upload-book',
    component: UploadBookComponent,
    canActivate: [adminGuard],
  },
  { path: 'books-by-author/:authorId', component: BooksByAuthorComponent },
  { path: 'books-by-title/:title', component: BooksByTitleComponent },
  { path: 'events', component: EventsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'book-observer', component: BookObserverComponent },
  { path: 'log-in', component: LogInComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
