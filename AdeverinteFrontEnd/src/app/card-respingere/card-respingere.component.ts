import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CertificateServices} from "../services/certificate.services";

@Component({
  selector: 'app-card-respingere',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './card-respingere.component.html',
  styleUrl: './card-respingere.component.scss'
})
export class CardRespingereComponent {
  @Input() certificateId: string = '';
  @Input() motivRespingere: string = '';
  @Input() certificateType: number = 0;

  constructor(private certificateService: CertificateServices) {
  }

  displayNotification: boolean = false;

  closeNotification() {
    this.displayNotification = true;
  }

  saveNotification(motiv: string): void {
    this.motivRespingere = motiv;
    if (motiv != "") {
      this.displayNotification = true;
    }
    console.log(motiv);

  }

  rejectCertificate(certificateId: string, motiv: string) {
    this.certificateService.patchRejectCertificate(certificateId, motiv).subscribe(data => {
        console.log('Patch successful:', data);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

}
