import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { NewComponent } from './pages/new/new.component';
import { OrderComponent } from './pages/order/order.component';
import { DonateComponent } from './pages/donate/donate.component';
import { SubmissionsComponent } from './pages/submissions/submissions.component';
import { UploadBookComponent } from './components/upload-book/upload-book.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'books', component: BooksComponent},
  {path: 'new', component: NewComponent},
  {path: 'order', component: OrderComponent},
  {path: 'donate', component: DonateComponent},
  {path: 'submissions', component: SubmissionsComponent},
  {path: 'upload-book', component: UploadBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
