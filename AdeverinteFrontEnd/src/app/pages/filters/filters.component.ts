import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CertificateServices} from "../../services/certificate.services";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  isStandard : boolean = false;
  isHg : boolean = false;
  isCurrentDay : boolean = false;
  isCurrentMonth : boolean = false;
  isCurrentWeek : boolean = false;
  isPhysical : boolean = false;
  isOnline : boolean = false;

  constructor(private  certificateServices : CertificateServices) {
  }
  toggleOption(option : boolean){
    option = !option;
  }
  onChange() : void {
    if(this.isCurrentDay) {
      this.certificateServices.getSortedCertificates().subscribe(
        (data) => {
          this.certificateServices.updateArray(data);
        },
        (error) => {
          console.log('Eroare din backend', error);
        }
      );
    }
  }



}
