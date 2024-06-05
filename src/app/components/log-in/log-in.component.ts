import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'environments/environment'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  email: string = ''
  password: string = ''
  loginForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  async onSubmit() {
    const emailControl = this.loginForm.get('email')
    const passwordControl = this.loginForm.get('password')
    if (emailControl && passwordControl) {
      const email = emailControl.value
      const password = passwordControl.value

      // Log in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log('User logged in', userCredential.user)
    }
  }
}
