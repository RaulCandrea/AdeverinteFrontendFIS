import {IStudentModel} from "./student.model";


export enum EnumStare{
  "in asteptare" = 0,
  "aprobate" = 1,
  "refuzare" = 2,
  "semnate" = 3
}

export enum Type{
  "Motiv1",
  "Motiv2"
}
export interface ISpecialityModel{
  id:string,
  name : string,
  facultate:IFacultyModel
}
export interface  IFacultyModel {
  id: string,
  name: string,
  specialities : ISpecialityModel[],
}
export  interface ICertificateResponseModel {
  id: string,
  text:string,
  onEmail:boolean,
  student: IStudentModel,
  type:number,
  motive:string,
  state:number,
  pdfId:string,
  number:string,
}

export interface ICertificateRequestModel {
  onEmail	:boolean,
  studentId:string,
  type: number,
  motiv : string,
}
