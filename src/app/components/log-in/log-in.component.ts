import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
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
  signUpForm: FormGroup

  constructor(private fb: FormBuilder) {
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
      try {
        const email = emailControl.value
        const password = passwordControl.value
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log('User logged in', userCredential.user)
      } catch (error) {
        console.error(error)
        // showLogInError(error)
      }
    }
  }

  onSignUp() {
    const emailControl = this.signUpForm.get('email')
    const passwordControl = this.signUpForm.get('password')
    if (emailControl && passwordControl) {
      const email = emailControl.value
      const password = passwordControl.value
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('User signed up', userCredential.user)
        })
        .catch((error) => {
          console.error(error)
          // showLogInError(error)
        })
    }
  }

  monitorAuthState() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in', user)
      } else {
        console.log('User is logged out')
      }
    })
  }

  async onLogOut() {
    try {
      await signOut(auth)
      console.log('User logged out')
    } catch (error) {
      console.error(error)
    }
  }
}
