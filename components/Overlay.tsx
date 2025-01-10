import React from "react";

interface OverlayProps {
  title: string;
}

const Overlay = ({ title }: OverlayProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-t-blue-500 border-solid"></div>
        <p className="ml-4 text-lg font-semibold">{title}</p>
      </div>
    </div>
  );
};

export default Overlay;
