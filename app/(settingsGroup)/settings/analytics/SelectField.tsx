import React from "react";

const SelectField = ({
  options,
}: {
  options: Array<{ label: string; value: string }>;
}) => {
  return (
    <div className="relative inline-block w-fit">
      <select className="block w-full p-3 text-[#CFD4E2] bg-white border border-[#CFD4E2] shadow-sm focus:outline-none focus:ring-2">
        {options.map((option, index) => (
          <option value={option.value} key={`${option.value}-${index}`}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
