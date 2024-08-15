import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Inputs } from "@/components/forms";

export interface ICustomField {
  register: UseFormRegister<Inputs>;
  fieldName: keyof Inputs;
  type?: string;
  label: string;
  errors: FieldErrors<Inputs>;
  required?: boolean;
  placeholder?: string;
}

export interface ICurrentForm {
  id: string;
  name: string;
  description: string;
  fields: string[];
}
