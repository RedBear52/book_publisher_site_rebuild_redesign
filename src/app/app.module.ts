import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BooksComponent } from './pages/books/books.component'
import { NewComponent } from './pages/new/new.component'
import { OrderComponent } from './pages/order/order.component'
import { DonateComponent } from './pages/donate/donate.component'
import { SubmissionsComponent } from './pages/submissions/submissions.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { HeaderComponent } from './components/header/header.component'
import { UploadBookComponent } from './components/upload-book/upload-book.component'
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component'
import { BooksByAuthorComponent } from './pages/books-by-author/books-by-author.component'
import { BooksByTitleComponent } from './pages/books-by-title/books-by-title.component'
import { BookObserverComponent } from './pages/book-observer/book-observer.component'
import { EventsComponent } from './pages/events/events.component'
import { LogInComponent } from './components/log-in/log-in.component'
import { LoadingBooksComponent } from './loading-books/loading-books.component'
import { CommonModule } from '@angular/common'

import { ReactiveFormsModule } from '@angular/forms'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'

import { LazyLoadDirective } from './directives/lazy-load.directive'
import { NgOptimizedImage } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    NewComponent,
    OrderComponent,
    DonateComponent,
    SubmissionsComponent,
    NavbarComponent,
    HeaderComponent,
    UploadBookComponent,
    DropdownMenuComponent,
    BooksByAuthorComponent,
    BooksByTitleComponent,
    BookObserverComponent,
    EventsComponent,
    LogInComponent,
    LoadingBooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    LazyLoadDirective,
    NgOptimizedImage,
    MatPaginatorModule,
  ],
  exports: [LazyLoadDirective],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
