import React from "react";
import ImageUpload from "./ImageUpload";
import GeneralForm from "./GeneralForm";

const page = () => {
  return (
    <div className="flex flex-col justify-start pt-8 md:pt-10 px-10">
      <p className="text-2xl font-bold">General</p>
      <ImageUpload />
      <div className="md:w-1/2">
        <GeneralForm />
      </div>
    </div>
  );
};

export default page;
