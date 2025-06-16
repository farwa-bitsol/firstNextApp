import { LucideIcon } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

export interface ApiError extends Error {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export interface ICustomField<T extends Record<string, any>> {
  register?: UseFormRegister<T>;
  fieldName: keyof T;
  type?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  noMargin?: boolean;
}

export interface ICurrentForm {
  id: string;
  name: string;
  description: string;
  fields: string[];
}

export interface PostMediaProps {
  contentType: string;
  data: string;
  name: string;
}

export interface PostProps {
  _id: string;
  id: string;
  userId: string;
  profilePhoto: string | null;
  postMedia: PostMediaProps | null;
  userName: string;
  title: string | null;
  description: string | null;
  postType: "event" | "article" | "normal";
  likes: number;
  comments: number;
  shares: number;
  postTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: string;
  id: string;
  fullName: string;
  email: string;
  password: string;
  userImage: PostMediaProps | null;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string | null;
  forgotPasswordTokenExpiry: Date | null;
  verifyToken: string | null;
  verifyTokenExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  _id: string;
  id: string;
  name: string;
  lastMessage: string;
  messages: { id: string; sender: string; text: string }[];
}

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

export interface CardDetails {
  id: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}