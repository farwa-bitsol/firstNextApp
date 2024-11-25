import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface ICustomMultiCheckbox {
  fieldName: string;
  label?: string;
  options: { label: string; value: string }[];
  required?: boolean;
  layout?: "row" | "col";
  noMargin?: boolean;
}

const CustomMultiCheckbox = ({
  fieldName,
  label,
  options,
  required = false,
  layout = "col",
  noMargin = false,
}: ICustomMultiCheckbox) => {
  const { control, setValue } = useFormContext();

  return (
    <div className={`sm:col-span-3 ${noMargin ? "" : "my-4"}`}>
      {label && (
        <label
          htmlFor={fieldName}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`mt-2 flex ${layout === "row" ? "flex-row" : "flex-col"}`}
      >
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <div>
              {options.map((option) => {
                const isChecked =
                  Array.isArray(field.value) &&
                  field.value.includes(option.value);

                return (
                  <label
                    key={option.value}
                    className="flex items-center space-x-4 mb-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={isChecked}
                      onChange={(e) => {
                        const currentValues = field.value || [];
                        const updatedValues = e.target.checked
                          ? [...currentValues, option.value]
                          : currentValues.filter(
                              (v: string) => v !== option.value
                            );
                        setValue(fieldName, updatedValues, {
                          shouldValidate: true,
                        });
                      }}
                      className="h-6 w-6 rounded border-gray-300 text-sky-600 focus:ring-sky-500 "
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default CustomMultiCheckbox;
