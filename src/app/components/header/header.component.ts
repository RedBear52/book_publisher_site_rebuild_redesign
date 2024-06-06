import { Component, HostListener } from '@angular/core'
import { signOut } from 'firebase/auth'
import { auth } from 'environments/environment'
import { AuthManagementService } from 'src/app/services/auth-management.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isScrolled = false
  isLoggedIn: boolean = false

  constructor(
    private authManagementService: AuthManagementService,
    private router: Router
  ) {}

  @HostListener('window:scroll')
  scrollEvent() {
    window.scrollY >= 80 ? (this.isScrolled = true) : (this.isScrolled = false)
  }

  ngOnInit() {
    this.authManagementService
      .monitorAuthState()
      .subscribe((logInState: boolean | undefined) => {
        if (logInState !== undefined) {
          this.isLoggedIn = logInState
        }
      })
  }

  async onLogOut() {
    try {
      await signOut(auth)
      console.log('User logged out')
      this.router.navigate(['/'])
    } catch (error) {
      console.error(error)
    }
  }
}
