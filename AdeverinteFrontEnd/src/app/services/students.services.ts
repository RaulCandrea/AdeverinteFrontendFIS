import {Injectable} from "@angular/core";
import {IStudentModel} from "../models/student.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {environments} from "../environment";
import {Observable} from "rxjs";
import {ICertificateResponseModel, IFacultyModel} from "../models/certificate.model";

@Injectable({
  providedIn:"root"
})

export class StudentsServices{

  constructor(private http : HttpClient) {
  }
  getStudents():Observable<IStudentModel[]> {
    const apiurl = `${environments.apiUrl}/Students`;
    return this.http.get<IStudentModel[]>(apiurl);
  }

  getFaculties():Observable<IFacultyModel[]>{
    const apiurl = `${environments.apiUrl}/Faculties`;
    return this.http.get<IFacultyModel[]>(apiurl);
  }

  getCertificatesByEmail(email : string):Observable<ICertificateResponseModel[]>{
    const url = `${environments.apiUrl}/Certificates/email?email=${email}`;
    return this.http.get<ICertificateResponseModel[]>(url);
  }

  getStudentByEmail(email:string) :Observable<IStudentModel>{
    const url = `${environments.apiUrl}/Students/email?email=${email}`;
    return this.http.get<IStudentModel>(url);
  }
}
