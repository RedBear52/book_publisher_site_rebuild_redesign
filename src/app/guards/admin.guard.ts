import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthManagementService } from '../services/auth-management.service'
import { first } from 'rxjs/operators'

export const adminGuard = () => {
  const authManagementService = inject(AuthManagementService)
  const router = inject(Router)

  return authManagementService
    .monitorAuthState()
    .pipe(first())
    .toPromise()
    .then((logInState: boolean | undefined) => {
      if (logInState !== undefined) {
        if (logInState) {
          console.log('User is logged in')
        } else {
          console.log('User is logged out')
          router.navigate(['/log-in'])
        }
      }
    })
}
