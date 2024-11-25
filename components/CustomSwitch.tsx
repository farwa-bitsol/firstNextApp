import { Controller, useFormContext } from "react-hook-form";

const CustomSwitch = ({
  fieldName,
  label,
  required = false,
  noMargin,
}: {
  fieldName: string;
  label?: string;
  required?: boolean;
  noMargin?: boolean;
}) => {
  const { control } = useFormContext();

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
      <div className="mt-2">
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <label className="relative flex justify-between items-center group p-2 text-xl">
              <input
                type="checkbox"
                className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
              />
              <span className="w-16 h-9 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-[#1565D8] peer-checked:ring-4 peer-checked:ring-[#1565D81A] after:w-7 after:h-7 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
            </label>
          )}
        />
      </div>
    </div>
  );
};

export default CustomSwitch;
