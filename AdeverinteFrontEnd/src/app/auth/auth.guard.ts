import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";


export const authGuard: CanActivateFn = async (route , state) => {
  const auth = inject(AuthService)
  const isAuthenticated = await auth.isAuthenticated();
  if (!isAuthenticated) {
    let router = inject(Router);

    return false;
  } else {
    return true;
  }


};
