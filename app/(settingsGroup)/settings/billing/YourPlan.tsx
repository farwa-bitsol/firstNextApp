import React from "react";
import CustomButton from "./CustomButton";

const YourPlan = () => {
  return (
    <div className="bg-[#1565D8] text-white p-8 rounded-xl">
      <p className="pb-2">Your Plan</p>
      <p className="text-2xl font-bold pb-1">Pro Annual</p>
      <p className="pb-2">Renews on Nov, 2021</p>
      <CustomButton isYourPlan />
    </div>
  );
};

export default YourPlan;
