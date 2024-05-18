import { Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SecretaryPageComponent} from "./pages/secretary-page/secretary-page.component";
import {RaportPageComponent} from "./pages/raport-page/raport-page.component";
import {StudentsServices} from "./services/students.services";
import {StudentPageComponent} from "./pages/student-page/student-page.component";

export const routes: Routes = [
  {
    path: 'login',
    component:LoginPageComponent
  },
  {
    path:'secretary-page',
    component:SecretaryPageComponent,

  },
  {
    path:'student-page',
    component:StudentPageComponent
  },
  {
    path:'raport-page',
    component:RaportPageComponent
  },
  {
    path:'**',
    component:LoginPageComponent
  }
];

