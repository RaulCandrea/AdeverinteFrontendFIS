import {Component, inject} from '@angular/core';
import {getAuth, onAuthStateChanged} from "@angular/fire/auth";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

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

  constructor(private router : Router) {
  }


  onLogin() {
    if (this.loginForm.valid){
      console.log(this.loginForm);
      this.auth.login(this.loginForm.value.email as string, this.loginForm.value.password as string);
      this.router.navigate(['secretary-page']);

      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.router.navigate(['secretary-page']);
          const uid = user.uid;
          console.log (user);
        }
      });
    } else {

      console.log('Form Not Valid');
    }
  }
}
