import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {
  EnumStare,
  ICertificateRequestModel,
  ICertificateResponseModel,
  IFacultyModel, ISpecialityModel,
  Type
} from "../models/certificate.model";
import {environments} from "../environment";

@Injectable({
  providedIn: 'root'
})
export class CertificateServices {

  constructor(private http: HttpClient) {
  }

  currentPage: number = 1;
  pageSize: number = 10;
  today: boolean = false;
  week: boolean = false;
  month: boolean = false;
  facultyId: string | undefined = '';
  specialityId: string | undefined = '';
  year: string = '';
  type: Type = 0;
  state: EnumStare | undefined = 0;


  private arrayCertificate = new BehaviorSubject<ICertificateResponseModel[]>([]);
  private arraySpec = new BehaviorSubject<string[]>([]);


  array$: Observable<ICertificateResponseModel[]> = this.arrayCertificate.asObservable();


  updateArray(newArray: ICertificateResponseModel[]): void {
    this.arrayCertificate.next(newArray);
    console.log(newArray);
  }

  public getCertificates(pageNumber?: number, pageSize?: number): Observable<ICertificateResponseModel[]> {
    const apiUrl = `${environments.apiUrl}/Certificates`;
    return this.http.get<ICertificateResponseModel[]>(apiUrl);
  }


  public patchCertificate(certificateID: string, state: number, rejectMessage?: string) {
    const url = `${environments.apiUrl}/Certificates/PatchState/id?id${certificateID}&state=${state}&rejectMessage=${rejectMessage}`;
    let params = new HttpParams().set('id', certificateID).set('state', state.toString());

    if (rejectMessage !== undefined) {
      params = params.set('rejectMessage', rejectMessage);
    }
    return this.http.patch(url, null, { params });

  }

  public postCertificate(onEmail : boolean,studentID:string,type:number,motive:string){

    const certificateData = {
      onEmail: onEmail,
      studentId: studentID,
      type : type,
      motive: motive,
    };
    const url = `${environments.apiUrl}/Certificates`;
    console.log(onEmail,studentID,type,motive);
    this.http.post(url,certificateData).subscribe({
      next: response => {
        console.log('Certificate created successfully', response);
        // Reload the page after successful creation
        location.reload();
      },
      error: error => {
        console.error('Error creating certificate', error);
      }
    });

  }


  public getSortedCertificates(pageNumber?: number | undefined, pageSize?: number | undefined, today?: boolean | undefined, week?: boolean | undefined, month?: boolean | undefined, facultyId?: string | undefined, specialityId?: string | undefined, year?: string | undefined, type?: EnumStare | undefined, state?: EnumStare | undefined): Observable<ICertificateResponseModel[]> {
    const url = `${environments.apiUrl}/Certificates/SortByAll?PageNumber=${pageNumber}&PageSize=${pageSize}&today=${today}&week=${week}&month=${month}&facultyName=${facultyId}&specialityName=${specialityId}&year=${year}&type=${type}&state=${state}`;
    return this.http.get<ICertificateResponseModel[]>(url);
  }

  getState() : EnumStare | undefined{
    return this.state;
  }
  getFaculty() : string{
    return <string>this.facultyId;
  }
  getSpec() : string{
    return <string>this.specialityId;
  }
  getToday(){
    return this.today;
  }
  getWeek(){
    return this.week;
  }
  getMonth(){
    return this.month;
  }
  getType(){
    return this.type;
  }
  getYear(){
    return this.year;
  }
  getCurrentPage(){
    return this.currentPage;
  }
  getPageSize(){
    return this.pageSize;
  }

  setCurrentPage(newPage :number){
    this.currentPage = newPage;
  }

  setPageSize(newPage :number){
    this.pageSize = newPage;
  }
  setState(state: EnumStare |undefined): void {
    this.state = state;
  }

  setFaculty(facultyId: string | undefined): void {
    this.facultyId = facultyId;
  }

  setSpec(specialityId: string | undefined): void {
    this.specialityId = specialityId;
  }

  setToday(today: any): void {
    this.today = today;
  }

  setWeek(week: any): void {
    this.week = week;
  }

  setMonth(month: any): void {
    this.month = month;
  }

  setType(type: any): void {
    this.type = type;
  }

  setYear(year: any): void {
    this.year = year;
  }

  // public getFaculties(): Observable<IFacultyModel[]> {
  //   const apiUrl =`${environments.apiUrl}/Faculties`;
  //   return this.http.get<IFacultyModel[]>(apiUrl);
  // }
  // public getSpecialities(): Observable<ISpecialityModel[]> {
  //   const apiUrl =`${environments.apiUrl}/Specialities`;
  //   return this.http.get<ISpecialityModel[]>(apiUrl);
  // }

}
