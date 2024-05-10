import {IFacultyModel, ISpecialityModel} from "./certificate.model";

export enum Role{
  "Student",
  "Secretar",
}

export interface IStudentModel{
  firstName:string,
  lastName:string,
  faculty:IFacultyModel,
  speciality:ISpecialityModel,
  year:number,
  marca:string,
  id:number
  email:string;
  role:Role;
}
