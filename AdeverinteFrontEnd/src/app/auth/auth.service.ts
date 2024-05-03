import {EventEmitter, Injectable, Output} from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: Auth, private router: Router) { }

  async getIdToken() {
    await this.afAuth.authStateReady();
    if(this.afAuth.currentUser === null){
      this.router.navigate(['/login']);
      return null;
    }
    return this.afAuth.currentUser.getIdToken();
  }

  //login method
  login(email: string, password: string) {

    signInWithEmailAndPassword(this.afAuth, email, password).then(() => {
      this.router.navigate(['/user-page']);
    }, (err: { message: any; }) => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string) {

    createUserWithEmailAndPassword(this.afAuth, email, password).then(() => {
      alert('User Registered Successfully');
      this.router.navigate(['/login']);
    }, (err: { message: any; }) => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  signout() {
    signOut(this.afAuth).then(() => {
      this.router.navigate(['/login']);
    }, (err: { message: any; }) => {
      alert(err.message);
    })
  }

  async isAuthenticated() {
    await this.afAuth.authStateReady()
    return this.afAuth.currentUser !== null;
  }
}