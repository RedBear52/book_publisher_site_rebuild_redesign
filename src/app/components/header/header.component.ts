import { Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isScrolled = false

  @HostListener('window:scroll')
  scrollEvent() {
    window.scrollY >= 80 ? (this.isScrolled = true) : (this.isScrolled = false)
  }
}
