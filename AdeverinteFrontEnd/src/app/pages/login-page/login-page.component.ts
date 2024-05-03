import {Component, inject} from '@angular/core';
import {getAuth, onAuthStateChanged} from "@angular/fire/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  private readonly auth = inject(AuthService)


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value.email as string, this.loginForm.value.password as string);
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log (user);
        } else {

        }
      });
    } else {
      console.log('Form Not Valid');
    }
  }
}
