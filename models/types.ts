import { LucideIcon } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

export interface ICustomField {
  register?: UseFormRegister<any>;
  fieldName: string;
  type?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number
  noMargin?: boolean
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


export interface PostMediaProps {
  contentType: string;
  data: string;
  name: string;
}
export interface PostProps {
  profilePhoto: string;
  postMedia: PostMediaProps | null;
  userName: string;
  postTime: string;
  title: string;
  description: string;
  postPhoto?: string; // Optional
  likes: number;
  comments: number;
  shares: number;
  _id: string;
}

export interface Chat {
  _id?: string;
  name: string;
  lastMessage: string;
  messages: { id: string; sender: string; text: string }[];
}

// Define the type for the props
export interface SidebarProps {
  onSelectChat: (id: string) => void;
}

export interface Article {
  id: number;
  title: string;
  author: string;
  time: string;
  image: string;
}


export interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

export interface ISubItem {
  name: string;
  path: string;
}


export interface ICustomMultiCheckbox {
  fieldName: string;
  label?: string;
  options: { label: string; value: string }[];
  required?: boolean;
  layout?: "row" | "col";
  noMargin?: boolean;
}