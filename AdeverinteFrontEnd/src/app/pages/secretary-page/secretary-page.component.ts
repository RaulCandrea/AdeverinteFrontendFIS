import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {IStudentModel} from "../../models/student.model";

import {catchError, Observable, of, Subject} from "rxjs";
import { SelectionModel } from '@angular/cdk/collections';

import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {ConfirmationPopUpComponent} from "../../confirmation-pop-up/confirmation-pop-up.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {CardRespingereComponent} from "../../card-respingere/card-respingere.component";
import {DropdownGeneralComponent} from "../../dropdown-general/dropdown-general.component";
import {EnumStare, ICertificateResponseModel, IFacultyModel, ISpecialityModel} from "../../models/certificate.model";
import {CertificateServices} from "../../services/certificate.services";
import {FiltersComponent} from "../filters/filters.component";
import {MatCardContent} from "@angular/material/card";
import {PdfService} from "../../services/pdf.services";
import {StudentsServices} from "../../services/students.services";
import {FileServices} from "../../services/file.services";


@Component({
  selector: 'app-secretary-page',
  standalone: true,
  imports: [
    NgForOf,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    CommonModule,
    MatTableModule, MatPaginatorModule, CardRespingereComponent, ConfirmationPopUpComponent, NgIf, MatCheckbox, MatButton, DropdownGeneralComponent, FormsModule, MatIcon, FiltersComponent, MatCardContent
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntl }],
  templateUrl: './secretary-page.component.html',
  styleUrl: './secretary-page.component.scss'
})
export class SecretaryPageComponent implements OnInit {
  selection = new SelectionModel<any>(true, []); // Enable multi-selection
  certificates: ICertificateResponseModel[] = [];
  filteredState : number = 0;
  students:IStudentModel[] = [];
  faculties: IFacultyModel[] = [];
  specialities: ISpecialityModel[] = [];
  facultiesArray : string[] = [];
  specialitiesArray: string[] = [];
  certificateIds: string[] = [];
  popUpVisibility: { [key: string]: { [key: string]: boolean } } = {};
  motivRespingere: string = '';
  displayedColumns: string[] = ['select', 'ID', 'Marca', 'Nume complet', 'Motiv', 'Actiuni'];
  dataSource: MatTableDataSource<ICertificateResponseModel> = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  showPopup = true;
  showFilters = true;

  togglePopupFilters() {
    this.showFilters = !this.showFilters;
  }


  constructor(protected certificateService: CertificateServices,private studentsService :StudentsServices, private router: Router, private pdfService: PdfService,private fileService : FileServices) {

  }

  totalItems = 100;
  pageSize = 100;
  currentPage = 1;


  ngOnInit() {
    this.getData();
    this.getStudents();
    this.certificateService.array$.subscribe((data) => {
      this.certificates = data;
      this.initializeCertificates(data);
      this.dataSource = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
    });
    this.getFaculties();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  getData(pageNumber?:number,pageSize?:number) {
    this.certificateService.getCertificates(pageNumber,pageSize).pipe(
      catchError(error => {
        console.log(error);
        return of([] as ICertificateResponseModel[]);
      }),

    )
      .subscribe(data => {
        this.certificates = data;
        this.dataSource = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
        this.initializeCertificates(this.certificates);
      });


  }

  getStudents(){
    this.studentsService.getStudents().pipe(
      catchError(error => {
        console.log(error);
        return of([] as IStudentModel[]);
      }),

    )
      .subscribe(data => {
        this.students = data;
        this.students.forEach((certificate) => {
          if(!this.facultiesArray.includes(certificate.faculty)) {
            this.facultiesArray.push(certificate.faculty);
          }
          if(!this.specialitiesArray.includes(certificate.speciality)){
            this.specialitiesArray.push(certificate.speciality);
          }
        })


      });

  }
  getFaculties() {
    this.studentsService.getFaculties().pipe(
      catchError(error => {
        console.log(error);
        return of([] as IFacultyModel[]);
      }),
    )
      .subscribe(data => {
        this.faculties = data;
        this.faculties.forEach((faculty) => {
          if (!this.facultiesArray.includes(faculty.name)) {
            this.facultiesArray.push(faculty.name);
          }
        })
      });

    return this.faculties;


  }



  initializeCertificates(certificates: ICertificateResponseModel[]) {
    certificates.forEach(cert => {
      this.certificateIds.push(cert.id);
      this.popUpVisibility[cert.id] = {edit: false, reject: false, accept: false, revert: false};
    });
  }

  togglePopup(id: string, action: string): void {
    this.popUpVisibility[id][action] = !this.popUpVisibility[id][action];

  }


  redirectToPage(): void {
    this.router.navigate(['raport-page']);
  }

  displayNotification: boolean = false;

  closeNotification() {
    this.displayNotification = true;
  }



  toggleSelection(row: any) {
    this.selection.toggle(row);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  acceptSelected() {
    this.selection.selected.forEach(selectedRow => {
      this.certificateService.patchCertificate(selectedRow.id,1).subscribe(response =>
      {
        console.log(response);
      });
      this.certificateService.postCertificatePdf(selectedRow.id);
    });
  }

  patchCertificate(certificateId : string , state :number , rejectMessage ?: string){
    this.certificateService.patchCertificate(certificateId,state,rejectMessage).subscribe( response =>{
      if(state == 1) {
        this.certificateService.postCertificatePdf(certificateId).subscribe(data => {
          console.log(data);
          location.reload();
        }
      )
      }
    });

    }
  protected readonly Number = Number;



   openPdf(certificateId: string) {
    console.log(certificateId);
    this.pdfService.getPdfContent(certificateId).subscribe(
      (pdfContent : string) =>{
        console.log(pdfContent);
       this.pdfService.openPdfInNewWindow(pdfContent)
        }
   )};

  onChange(pageNumber?: number, pageSize?: number, isCurrentDay?: boolean, isCurrentWeek?: boolean, isCurrentMonth?: boolean, faculty?: string, spec?: string, year?: string, type?: number, state?: EnumStare) : void {
    this.filteredState = state as number;
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
        this.certificateService.getSortedCertificates(pageNumber,pageSize,isCurrentDay,isCurrentWeek,isCurrentMonth,faculty,spec,year  ,type,state).subscribe(
        (data) => {
          this.certificateService.updateArray(data);
          console.log(data);
        },
        (error) => {
          console.log('Eroare din backend', error);
        }
      );
    }

  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(certificateId:string ) : void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.fileService.patchCertificateWithSignedPDF(certificateId, formData);
    }
  }
}






