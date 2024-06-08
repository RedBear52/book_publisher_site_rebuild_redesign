import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { AuthManagementService } from 'src/app/services/auth-management.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  email: string = ''
  password: string = ''
  loginForm: FormGroup
  signUpForm: FormGroup
  error: string = ''

  constructor(
    private fb: FormBuilder,
    private authManagementService: AuthManagementService,
    private router: Router
  ) {
    ;(this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })),
      (this.signUpForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      }))
  }

  async onLogIn() {
    const emailControl = this.loginForm.get('email')
    const passwordControl = this.loginForm.get('password')

    if (emailControl && passwordControl) {
      try {
        await this.authManagementService.onLogIn(
          emailControl.value,
          passwordControl.value
        )
        this.router.navigate(['/upload-book'])
      } catch (error: any) {
        this.error = error.message.slice(10)
      } finally {
        this.loginForm.reset()
      }
    }
  }

  async onSignUp() {
    const emailControl = this.signUpForm.get('email')
    const passwordControl = this.signUpForm.get('password')

    if (emailControl && passwordControl) {
      try {
        await this.authManagementService.onSignUp(
          emailControl.value,
          passwordControl.value
        )
        this.router.navigate(['/upload-book'])
      } catch (error: any) {
        this.error = error.message.slice(10)
      } finally {
        this.signUpForm.reset()
      }
    }
  }

  async onLogOut() {
    this.authManagementService.onLogOut()
  }
}
