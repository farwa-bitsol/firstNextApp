"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import { steps } from "@/models/constants";

const Pages = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep <= steps.length) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep - 1 == 0) {
      router.push("/");
    }
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div className="form1-container">
      <div className="flex justify-between items-center">
        <button onClick={handlePrevious} className="text-grey flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <p className="text-base text-gray-900 dark:text-white pl-2">Back</p>
        </button>
        <div>
          <p className="text-gray-700 text-sm">STEP {`0${currentStep}/03`}</p>
          <p className="text-grey">{steps[currentStep - 1].stepName}</p>
        </div>
      </div>

      <Form currStep={currentStep} handleNext={handleNext} />
    </div>
  );
};

export default Pages;
