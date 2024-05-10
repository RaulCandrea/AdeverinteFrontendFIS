import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  today:boolean =false;
  week:boolean = false;
  month:boolean = false;
  facultyId:string = '';
  specialityId:string = '';
  year:number = 0;
  type:Type = 0;
  state:EnumStare = 0;


  private arrayCertificate = new BehaviorSubject<ICertificateResponseModel[]>([]);
  private arraySpec = new BehaviorSubject<string[]>([]);


  array$: Observable<ICertificateResponseModel[]> = this.arrayCertificate.asObservable();




  updateArray(newArray: ICertificateResponseModel[]): void {
    this.arrayCertificate.next(newArray);
  }

  public getCertificates(pageNumber?:number, pageSize?:number): Observable<ICertificateResponseModel[]> {
    const apiUrl = `${environments.apiUrl}/Certificate?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    return this.http.get<ICertificateResponseModel[]>(apiUrl);
  }


  public patchRejectCertificate(certificateId : string , motiv : string){
    const url = `${environments.apiUrl}/Certificate/PatchReject/${certificateId}`;
    const headers = new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'application/json',
    });

    return this.http.patch(url, `"${motiv}"`, { headers });
  }


  public patchAcceptCertificate(certificateId : string) {
    const url = `${environments.apiUrl}/Certificate/PatchApproved/${certificateId}`;
    const headers = new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'application/json',
    });
    return this.http.patch(url,{headers});
  }

  public getSortedCertificates(pageNumber:number, pageSize:number,today:boolean,week:boolean,month:boolean,facultyId:string,specialityId:string,year:number,type:Type,state:EnumStare): Observable<ICertificateResponseModel[]> {
    const url = `${environments.apiUrl}/Certificate/SortByAll?PageNumber=${pageNumber}&PageSize=${pageSize}&today=${today}&week=${week}&month=${month}&facultyId=${facultyId}&specialityId=${specialityId}&year=${year}&type=${type}&state=${state}`;
    return this.http.get<ICertificateResponseModel[]>(url);
  }

  getState() : number{
    return this.state;
  }
  getFaculty() : string{
    return this.facultyId;
  }
  getSpec() : string{
    return this.specialityId;
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

  setState(state: number): void {
    this.state = state;
  }

  setFaculty(facultyId: string): void {
    this.facultyId = facultyId;
  }

  setSpec(specialityId: string): void {
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

  public getFaculties(): Observable<IFacultyModel[]> {
    const apiUrl =`${environments.apiUrl}/Faculties`;
    return this.http.get<IFacultyModel[]>(apiUrl);
  }
  public getSpecialities(): Observable<ISpecialityModel[]> {
    const apiUrl =`${environments.apiUrl}/Specialities`;
    return this.http.get<ISpecialityModel[]>(apiUrl);
  }

}
