import { Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SecretaryPageComponent} from "./pages/secretary-page/secretary-page.component";
import {RaportPageComponent} from "./pages/raport-page/raport-page.component";

export const routes: Routes = [
  {
    path: 'login',
    component:LoginPageComponent
  },
  {
    path:'secretary-page',
    component:SecretaryPageComponent
  },
  {
    path:'raport-page',
    component:RaportPageComponent
  },
  {
    path:'**',
    component:SecretaryPageComponent
  }
];
