import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  getCurrentUserEmail(): Observable<string | null> {
    return this.user$.pipe(
      map(user => user ? user.email : null)
    );
  }
}
