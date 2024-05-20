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
import {async, catchError, of} from "rxjs";
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
import {Auth, getAuth} from "@angular/fire/auth";
import firebase from "firebase/compat";
import auth = firebase.auth;
import {AuthService} from "../../auth/auth.service";
import {CurrentUser} from "../../auth/current.user";

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
  email:string |null ="";
  nume:string = "";
  facultate:string = "";
  specializare = "";
  motivValue = "";
  isChecked:boolean = false;
  showPopup :boolean = false;
  certificates : ICertificateResponseModel[] = [];
  selectedTip : string = '';
  tips = ['Standard' , 'HG'];
  displayedColumns: string[] = [ 'Stare', 'Marca', 'Nume complet', 'Motiv', 'Actiuni'];
  dataSource: MatTableDataSource<ICertificateResponseModel> = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
  pageSizeOptions = [5, 10, 15];


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private currentUser : CurrentUser ,private _liveAnnouncer: LiveAnnouncer,private studentService : StudentsServices , private pdfService :PdfService ,private certificateService:CertificateServices , private authService :AuthService) {
  }

  ngOnInit(){
    this.dataSource = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
    this.currentUser.getCurrentUserEmail().subscribe(email => {
      this.email = email;
      console.log(email);
      this.getStudentByEmail(email as string)
      this.getStudentsCertificates(this.email as string);
    });


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
    if(this.selectedTip == "Standard"){
      tip = 0;
    }
    else{
      tip = 1;
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
         this.getStudentByEmail(email);
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
      })
    alert("Nu s-a emis inca!");//aici tre alerta
  };

  onSubmit(){
   this.postCertificate();
    this.togglePopup();

  }




  getStudentByEmail (email :string){
    this.studentService.getStudentByEmail(email).subscribe(data => {
      console.log(data);
      this.facultate = data.faculty;
      this.specializare = data.speciality;
      this.nume = data.lastName + data.firstName;
      this.id = data.id;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  currentPage : number = 0;

  handlePageEvent(pageEvent : PageEvent){
  }


}
