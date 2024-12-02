"use client";
import React from "react";

const CustomButton = ({ isYourPlan }: { isYourPlan?: boolean }) => {
  const handleTriggerAction = () => {};
  return (
    <button
      className={`px-4 py-2 border rounded-lg`}
      onClick={handleTriggerAction}
    >
      {isYourPlan ? "Cancel subscription" : "Delete Picture"}
    </button>
  );
};

export default CustomButton;
