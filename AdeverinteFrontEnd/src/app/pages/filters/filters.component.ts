import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CertificateServices} from "../../services/certificate.services";
import {EnumStare, Type} from "../../models/certificate.model";

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
  type:Type = 0;
  type1 = 0;
  type2  = 1;
  isCurrentDay : boolean = false;
  isCurrentMonth : boolean = false;
  isCurrentWeek : boolean = false;


  constructor(protected  certificateService : CertificateServices ) {
  }
  toggleOption(option : boolean){
    option = !option;
  }
  onChange(pageNumber?: number, pageSize?: number, isCurrentDay?: boolean, isCurrentWeek?: boolean, isCurrentMonth?: boolean, faculty?: string, spec?: string, year?: string, type?: number, state?: EnumStare) : void {
    if(state != this.certificateService.getState())
    {
      this.certificateService.setState(state);
    }
    if(spec != this.certificateService.getSpec())
    {
      this.certificateService.setSpec(spec);
    }
    if(type != this.certificateService.getType())
    {
      this.certificateService.setType(type);
    }
    if(faculty != this.certificateService.getFaculty())
    {
      this.certificateService.setFaculty(faculty);
    }
    if(isCurrentDay != this.certificateService.getToday())
    {
      this.certificateService.setToday(isCurrentDay);
    }
    if(isCurrentWeek != this.certificateService.getWeek())
    {
      this.certificateService.setWeek(isCurrentWeek);
    }
    if(isCurrentMonth!= this.certificateService.getMonth())
    {
      this.certificateService.setMonth(isCurrentMonth);
    }

    console.log(pageSize,pageNumber,isCurrentDay ,isCurrentWeek,isCurrentMonth,faculty,spec,type,year);
    this.certificateService.getSortedCertificates(pageNumber, pageSize, isCurrentDay, isCurrentWeek, isCurrentMonth, faculty, spec, year, type, state).subscribe(
      (data) => {
        this.certificateService.updateArray(data);
      },
      (error) => {
        console.log('Eroare din backend', error);
      }
    );
  }




}
