import {Component, EventEmitter, Output} from '@angular/core';
import {CertificateServices} from "../services/certificate.services";

@Component({
  selector: 'app-confirmation-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-pop-up.component.html',
  styleUrl: './confirmation-pop-up.component.scss'
})
export class ConfirmationPopUpComponent {
  constructor(private certificateService : CertificateServices) {
  }

  displayNotification:boolean = false;
  @Output() save  = new EventEmitter<boolean>;
  closeNotification(){
    this.displayNotification = true;
  }
  saveNotification(): void{
      this.displayNotification = true;
      this.save.emit(true);

    }

}
