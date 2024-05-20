import {Component, inject} from '@angular/core';
import {getAuth, onAuthStateChanged} from "@angular/fire/auth";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {StudentsServices} from "../../services/students.services";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  private readonly auth = inject(AuthService)


  loginForm :FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  role : number = -1;
  constructor(private router : Router,private studentService:StudentsServices) {
  }

  ngOninit(){
    this.navigatFunction();
  }

  onLogin() {
    if (this.loginForm.valid){
      console.log(this.loginForm);
      this.auth.login(this.loginForm.value.email as string, this.loginForm.value.password as string);
      this.studentService.getStudentByEmail(this.loginForm.value.email as string).subscribe(data =>{
          this.role = data.role;
          console.log(this.role);
      })
      this.studentService.setEmail(this.loginForm.value.email as string);
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log (user);
        }
      });
    } else {

      console.log('Form Not Valid');
    }
  }

  navigatFunction(){
    if(this.role == 0){
      this.router.navigate(['secretary-page']);
    }
    else this.router.navigate(['secretary-page'])
  }
}
