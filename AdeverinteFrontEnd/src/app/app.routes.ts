import { Routes } from '@angular/router';
import * as path from "node:path";
import {LoginPageComponent} from "./pages/login-page/login-page.component";

export const routes: Routes = [
  {
    path: 'login',
    component:LoginPageComponent
  }
];
