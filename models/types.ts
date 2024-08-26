import { UseFormRegister } from "react-hook-form";
import { Inputs } from "@/components/Form";

export interface ICustomField {
  register: UseFormRegister<Inputs>;
  fieldName: keyof Inputs;
  type?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}

export interface ICurrentForm {
  id: string;
  name: string;
  description: string;
  fields: string[];
}

export interface IUser {
  fullName: string;
  id?: string;
  email: string;
  password: string
}
