import {EventEmitter, Injectable, Output} from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {StudentsServices} from "../services/students.services";
import {IStudentModel} from "../models/student.model";
import {async, map, Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth : Auth,private router: Router,private studentService:StudentsServices) {
  }

  async getIdToken() {
    await this.afAuth.authStateReady();
    if(this.afAuth.currentUser === null){
      // this.router.navigate(['/login']);
      return null;
    }
    return this.afAuth.currentUser.getIdToken();
  }

  //login method
  async login(email: string, password: string) {

     signInWithEmailAndPassword(this.afAuth, email, password).then(() => {
      this.studentService.setEmail(email);
      this.studentService.getStudentByEmail(email).subscribe(data =>{
      if(data.role == 0){
        this.router.navigate(['student-page'])
      }
      else {
        this.router.navigate(['secretary-page']);
      }
      });
    }, (err: { message: any; }) => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }


  async isAuthenticated() {
    await this.afAuth.authStateReady()
    return this.afAuth.currentUser !== null;
  }



}
