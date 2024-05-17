import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CommonModule} from "@angular/common";
import {catchError, of} from "rxjs";

import {ConfirmationPopUpComponent} from "../../confirmation-pop-up/confirmation-pop-up.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {Router} from "@angular/router";
import {CardRespingereComponent} from "../../card-respingere/card-respingere.component";
import {ICertificateResponseModel} from "../../models/certificate.model";
import {CertificateServices} from "../../services/certificate.services";

@Component({
  selector: 'app-raport-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CardRespingereComponent,
    ConfirmationPopUpComponent,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './raport-page.component.html',
  styleUrl: './raport-page.component.scss'
})
export class RaportPageComponent {
  certificates: ICertificateResponseModel[] =[];
  displayedColumns: string[] = ['Nr. Adeverinta', 'Nume student', 'Facultate', 'Specializare', 'Data', 'Motiv'];
  dataSource: MatTableDataSource<ICertificateResponseModel> = new MatTableDataSource<ICertificateResponseModel>(this.certificates);

  constructor(private certificateService : CertificateServices , private router : Router) {
  }

  goToSecretaryPage(){
    this.router.navigate(['/secretary-page']);
  }

  printPage() {
    window.print();
  }

  ngOnInit() {
    this.getData();
    this.certificateService.array$.subscribe((data) => {
      this.certificates = data;
    this.dataSource = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
    });
  }

  getData() {
    this.certificateService
      .getCertificates()
      .pipe(
        catchError(error => {
          console.log(error);
          return of([] as ICertificateResponseModel[]);
        }),
      )
      .subscribe(data => {
        data.forEach(temp =>{
          if(temp.state === 1){
            this.certificates.push(temp);
            console.log(temp);
          }
        })
        this.dataSource = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
      });
  }
}
