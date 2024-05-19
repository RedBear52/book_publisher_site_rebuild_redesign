import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { NewComponent } from './pages/new/new.component';
import { OrderComponent } from './pages/order/order.component';
import { DonateComponent } from './pages/donate/donate.component';
import { SubmissionsComponent } from './pages/submissions/submissions.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { UploadBookComponent } from './components/upload-book/upload-book.component';


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
    UploadBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
