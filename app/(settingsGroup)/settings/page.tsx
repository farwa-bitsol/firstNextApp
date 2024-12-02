import { redirect } from "next/navigation";

const page = () => {
  redirect("/settings/general");
};

export default page;
