import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
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

import { ReactiveFormsModule } from '@angular/forms'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
