import { redirect } from "next/navigation";
import { Routes } from "@/models/constants";

const Page = () => {
  redirect(Routes.dashboard);
};

export default Page;
