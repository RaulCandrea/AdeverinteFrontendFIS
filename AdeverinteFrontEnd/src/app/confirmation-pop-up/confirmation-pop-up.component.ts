import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-pop-up.component.html',
  styleUrl: './confirmation-pop-up.component.scss'
})
export class ConfirmationPopUpComponent {
  constructor() {
  }
  displayNotification:boolean = false;
  saveOption:boolean =false;
  closeNotification(){
    this.displayNotification = true;
  }
  saveNotification(): void{
      this.displayNotification = true;
      this.saveOption = true;
    }

}
