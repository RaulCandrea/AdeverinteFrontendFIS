import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {IStudentModel} from "../../models/student.model";

import {catchError, of, Subject} from "rxjs";
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
import {ICertificateResponseModel, IFacultyModel, ISpecialityModel} from "../../models/certificate.model";
import {CertificateServices} from "../../services/certificate.services";
import {FiltersComponent} from "../filters/filters.component";
import {MatCardContent} from "@angular/material/card";


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
  faculties: IFacultyModel[] = [];
  facultiesArray: string[] = [];
  specialities: ISpecialityModel[] = [];
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


  constructor(private certificateService: CertificateServices, private router: Router) {

  }

  ngOnInit() {
    this.getData();
    this.getFaculties();
    this.certificateService.array$.subscribe((data) => {
      this.certificates = data;
      this.initializeCertificates(data);
      this.dataSource = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  getData() {
    this.certificateService.getCertificates(this.currentPage + 1, this.pageSize).pipe(
      catchError(error => {
        console.log(error);
        return of([] as ICertificateResponseModel[]);
      }),
    )
      .subscribe(data => {
        this.certificates = data;
        this.dataSource = new MatTableDataSource<ICertificateResponseModel>(this.certificates);
        this.initializeCertificates(this.certificates);
        this.paginator.pageIndex = 0;
      });
  }

  getFaculties() {
    this.certificateService.getFaculties().pipe(
      catchError(error => {
        console.log(error);
        return of([] as IFacultyModel[]);
      }),
    )
      .subscribe(data => {
        this.faculties = data;
        let temp: string[] = [];
        this.faculties.forEach((faculty) => {
          if (!temp.includes(faculty.name)) {
            temp.push(faculty.name);
          }
          this.facultiesArray = temp;
        })
      })
  }


  getSpecialities() {
    this.certificateService.getSpecialities().pipe(
      catchError(error => {
        console.log(error);
        return of([] as ISpecialityModel[]);
      }),
    )
      .subscribe(data => {
        this.specialities = data;
      })

  }

  onFacultyOptionSelected(selectedOption: string): void {
    this.certificateService.setFaculty(selectedOption);
    let temp: string[] = [];
    this.faculties.forEach((faculty) => {
      if (faculty.name == selectedOption) {
        faculty.specialities.forEach((spec) => {
          if (!temp.includes(spec.name)) {
            temp.push(spec.name);
          }
        })
      }
    })
    this.specialitiesArray = temp;

    // this.certificateService.getFilteredDataByFaculty(selectedOption).subscribe(
    //   (data) => {
    //     this.certificateService.updateArray(data);
    //   },
    //   (error) => {
    //     console.log('Eroare din backend', error);
    //   }
    // );
  }

  onSpecOptionSelected(selectedOption: string) {
    this.certificateService.setSpec(selectedOption);

    // this.certificateService.getFilteredDataBySpec(selectedOption).subscribe(
    //   (data) => {
    //     this.certificateService.updateArray(data);
    //   },
    //   (error) => {
    //     console.log('Eroare din backend', error);
    //   }
    // );
  }

  onYearOptionSelected(selectedOption: number, faculty: string, spec: string) {
    this.onFacultyOptionSelected(faculty);
    this.onSpecOptionSelected(spec);
    // this.certificateService.getFilteredDataByYear(selectedOption).subscribe(
    //   (data) => {
    //     this.certificateService.updateArray(data);
    //   },
    //   (error) => {
    //     console.log('Eroare din backend', error);
    //   }
    // )
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
    this.router.navigate(['report-page']);
  }

  displayNotification: boolean = false;

  closeNotification() {
    this.displayNotification = true;
  }

  acceptCertificate(certificateId: string) {
    this.certificateService.patchAcceptCertificate(certificateId).subscribe(data => {
        console.log('Patch successful:', data);
      },
      error => {
        console.error('Error:', error);
      }
    );
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
      this.acceptCertificate(selectedRow.id);
    });
  }

  protected readonly Number = Number;

  //paginator
  pageSizeOptions: number[] = [10, 25, 100];
  pageSize: number = 10; // Default page size
  currentPage: number = 1;

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadCertificatesForPage();

  }

  loadCertificatesForPage(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.getData();
    const certificatesForPage = this.certificates.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.certificates.length / this.pageSize);
  }

  protected readonly length = 500;

}






