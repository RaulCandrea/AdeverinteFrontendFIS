import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SecretaryPageComponent} from "./pages/secretary-page/secretary-page.component";
import {DomSanitizer} from "@angular/platform-browser";
import {RaportPageComponent} from "./pages/raport-page/raport-page.component";
import {StudentPageComponent} from "./pages/student-page/student-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, SecretaryPageComponent, RaportPageComponent, StudentPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'adeverinteforntend';

}
