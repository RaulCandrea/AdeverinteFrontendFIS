
export enum Role{
  "Student",
  "Secretar",
}

export interface IStudentModel{
  firstName:string,
  lastName:string,
  faculty:string,
  speciality:string,
  year:number,
  marca:string,
  id:string,
  email:string;
  role:number;
}
