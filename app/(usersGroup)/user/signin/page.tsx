import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
import { Routes } from "@/models/constants";

const Page = async () => {
  const session = await getServerSession();
  if (session) {
    redirect(Routes.users);
  }
  return <Form />;
};

export default Page;
