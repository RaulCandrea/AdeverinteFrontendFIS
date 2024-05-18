import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {StudentsServices} from "../../services/students.services";
import {ICertificateResponseModel} from "../../models/certificate.model";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {catchError, of} from "rxjs";
import {CardRespingereComponent} from "../../card-respingere/card-respingere.component";
import {ConfirmationPopUpComponent} from "../../confirmation-pop-up/confirmation-pop-up.component";
import {MatCardContent} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgForOf, NgIf} from "@angular/common";
import {PdfService} from "../../services/pdf.services";
import {FileServices} from "../../services/file.services";
import {CertificateServices} from "../../services/certificate.services";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [
    FormsModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    CardRespingereComponent,
    ConfirmationPopUpComponent,
    MatCardContent,
    MatCheckbox,
    MatPaginator,
    NgIf,
    NgForOf,
    MatSort,
    MatSortHeader
  ],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.scss'
})
export class StudentPageComponent implements OnInit{
  id :string ="";
  nume:string = "";
  facultate:string = "";
  specializare = "";
  motivValue = "";
  isChecked:boolean = false;
  showPopup :boolean = false;
  certificates : ICertificateResponseModel[] = [];
  selectedTip : string = '';
  tips = ['Tip1' , 'Tip2'];
  displayedColumns: string[] = [ 'Stare', 'Marca', 'Nume complet', 'Motiv', 'Actiuni'];
  dataSource: MatTableDataSource<ICertificateResponseModel> = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
  pageSizeOptions = [5, 10, 15];


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatSort) sort!: MatSort;



  /** Announce the change in sort state for assistive technology. */



  constructor(private _liveAnnouncer: LiveAnnouncer,private studentService : StudentsServices , private pdfService :PdfService ,private certificateService:CertificateServices) {
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(){
    this.getStudentsCertificates("string")
    this.dataSource = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
  }

  togglePopup(){
    this.showPopup = !this.showPopup;
  }

  getStatev(state:number) : string{
    if(state == 0 )
    {
      return 'In asteptare';
    }
    if(state == 1 )
    {
      return 'Acceptat';
    }
    if(state == 2 )
    {
      return 'Respins';
    }
      if(state == 3) {
        return 'Semnata';
      }
      else{
        return 'In asteptare';
      }
  }

  postCertificate(){
    let tip : number = 0;
    if(this.selectedTip == "Tip1"){
      tip = 0;
    }
    else{
      tip =1;
    }
    this.certificateService.postCertificate(this.isChecked,this.id,tip,this.motivValue)
  }

  getStudentsCertificates(email : string){
    this.studentService.getCertificatesByEmail(email)
      .pipe(
        catchError(error => {
          console.log(error);
          return of([] as ICertificateResponseModel[]);
        }),
      )
      .subscribe(data =>{
      this.certificates = data;
      this.certificates.forEach(certificate =>{
        this.facultate = certificate.student.faculty;
        this.specializare = certificate.student.speciality;
        this.nume = certificate.student.lastName + certificate.student.lastName;
        this.id = certificate.student.id;
      })
      this.dataSource = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
      })
  }
  openPdf(certificateId: string) {
    console.log(certificateId);
    this.pdfService.getPdfContent(certificateId).subscribe(
      (pdfContent : string) =>{
        console.log(pdfContent);
        this.pdfService.openPdfInNewWindow(pdfContent)
      }
    )};

  onSubmit(){
   this.postCertificate();
    this.togglePopup();

  }

  protected readonly length = length;
  pageSize: number = 10;






}
