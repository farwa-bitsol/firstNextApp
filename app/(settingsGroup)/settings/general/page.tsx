import React from "react";
import ImageUpload from "./ImageUpload";
import GeneralForm from "./GeneralForm";

const page = () => {
  return (
    <div className="flex flex-col justify-start pt-8 md:pt-10 px-10">
      <p className="text-2xl font-bold">General</p>
      <GeneralForm />
    </div>
  );
};

export default page;
