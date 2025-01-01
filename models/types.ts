import { UseFormRegister } from "react-hook-form";

export interface ICustomField {
  register?: UseFormRegister<any>;
  fieldName: string;
  type?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number
  noMargin?:boolean
}

export interface ICurrentForm {
  id: string;
  name: string;
  description: string;
  fields: string[];
}

export interface IUser {
  fullName: string;
  _id?: string;
  email: string;
  password: string
}
