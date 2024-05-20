import {HttpInterceptorFn} from "@angular/common/http";
import {from, switchMap} from "rxjs";
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {Router} from "@angular/router";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  return from(auth.getIdToken()).pipe(switchMap(token => {
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `bearer ${token}`,
          }
        });
        return next(authReq);
      } else {
      }

    return next(req);
    })
  );

};
