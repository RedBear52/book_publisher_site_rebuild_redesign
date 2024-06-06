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
        password: new FormControl('', [Validators.required]),
      }))
  }

  async onLogIn() {
    const emailControl = this.loginForm.get('email')
    const passwordControl = this.loginForm.get('password')

    if (emailControl && passwordControl) {
      this.authManagementService.onLogIn(
        emailControl.value,
        passwordControl.value
      )
    }
    this.loginForm.reset()
    this.router.navigate(['/upload-book'])
  }

  onSignUp() {
    const emailControl = this.signUpForm.get('email')
    const passwordControl = this.signUpForm.get('password')

    if (emailControl && passwordControl) {
      this.authManagementService.onSignUp(
        emailControl.value,
        passwordControl.value
      )
    }

    this.signUpForm.reset()
    this.router.navigate(['/upload-book'])
  }

  async onLogOut() {
    this.authManagementService.onLogOut()
  }
}
