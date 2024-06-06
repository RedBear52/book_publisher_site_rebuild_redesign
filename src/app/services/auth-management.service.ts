import { Injectable } from '@angular/core'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { auth } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthManagementService {
  constructor() {}

  async onLogIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('User logged in')
    } catch (error) {
      console.error(error)
      // handle error
    }
  }

  onSignUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed up', userCredential.user)
      })
      .catch((error) => {
        console.error(error)
        // showLogInError(error)
      })
  }

  monitorAuthState(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User is logged in', user)
          observer.next(true)
        } else {
          console.log('User is logged out')
          observer.next(false)
        }
      })
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
