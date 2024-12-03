import React from "react";
import HistoryTable from "./HistoryTable";
import YourPlan from "./YourPlan";
import PaymentForm from "./PaymentForm";

const page = () => {
  return (
    <div className="flex flex-col justify-start pt-24 md:pt-10">
      <p className="text-2xl font-bold px-10">Billing</p>

      <div className="flex flex-wrap">
        <div className=" lg:w-1/2 sm:w-full">
          <div className="pl-10 mt-6">
            <p className="text-lg font-bold">Our History</p>
            <p className="text-[#62618F]">
              Manage billing information and view receips
            </p>
          </div>

          <HistoryTable />

          <button
            type="button"
            className=" pl-10 mb-4 text-[#1565D8] flex space-x-2"
          >
            Learn more
          </button>
        </div>

        <div className="mx-8 md:w-auto w-full">
          <YourPlan />
        </div>
      </div>

      <div className="pl-10 my-4">
        <p className="text-lg font-bold ">Payment Method</p>
        <p className="text-[#62618F] py-2 mb-2">
          Manage billing information and view receips
        </p>
        <div>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};

export default page;
