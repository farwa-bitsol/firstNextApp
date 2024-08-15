"use client";

import { ReactElement, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { steps } from "@/models/constants";
import { ICurrentForm, ICustomField } from "@/models/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  SubmitHandler,
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { useRouter } from "next/navigation";

const FormDataSchema = yup.object({
  firstName: yup.string().required("Name is required*"),
  email: yup.string().required("email is required*"),
  address: yup.string(),
  country: yup.string(),
  phone: yup.string(),
  password: yup.string(),
  remember: yup.boolean(),
});

export type Inputs = yup.InferType<typeof FormDataSchema>;

const CustomField = ({
  fieldName,
  type = "text",
  label,
  required,
  placeholder,
}: ICustomField) => {
  const { clearErrors, setError } = useFormContext();

  return (
    <div className="sm:col-span-3 my-4">
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <Controller
          name={fieldName}
          render={({ field, fieldState }) => (
            <div>
              <input
                type={type}
                id={fieldName}
                placeholder={placeholder}
                {...field}
                autoComplete="given-name"
                className={`block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                  fieldState.error
                    ? "input-error"
                    : "border-gray-300 ring-gray-300 focus:border-sky-600 focus:ring-sky-600"
                } placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                onChange={(e) => {
                  field.onChange(e);
                  // clear error
                  if (e.target.value) clearErrors(fieldName);
                }}
                onBlur={() => {
                  field.onBlur();
                  if (!field.value)
                    setError(fieldName, {
                      type: "manual",
                      message: "required(*)",
                    });
                }}
              />
              {fieldState.error && (
                <p className="mt-2 text-sm text-red-400">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

const ContainerForm = ({
  delta,
  currentForm,
  children,
}: {
  delta: number;
  currentForm: ICurrentForm;
  children: ReactElement;
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex justify-center flex-col h-full lg:px-28">
        <h1 className="text-2xl font-bold text-gray-800">
          {currentForm?.name}
        </h1>
        <p className="mt-2 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          {currentForm?.description}
        </p>
        <div className="pt-4">{children}</div>
      </div>
    </motion.div>
  );
};

export default function Form({ currStep }: { currStep: number }) {
  const router = useRouter();
  const previousStep = currStep - 1;
  const delta = currStep - previousStep;

  const currentForm: ICurrentForm = useMemo(() => steps[currStep], [currStep]);

  const formInstance = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema),
  });

  const {
    handleSubmit,
    register,
    trigger,
    control,
    formState: { errors },
  } = formInstance;

  const processForm: SubmitHandler<Inputs> = (data) => {
    router.push("/");
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currStep - 1].fields;

    const isValid = await trigger(fields as FieldName[], { shouldFocus: true });
    if (!isValid) return;

    router.push(`/form/${currStep + 1}`);
  };

  return (
    <section>
      {/* Form */}
      <FormProvider {...formInstance}>
        <form className="mt-12 py-6" onSubmit={handleSubmit(processForm)}>
          {currStep === 1 && (
            <ContainerForm delta={delta} currentForm={currentForm}>
              <>
                <CustomField
                  register={register}
                  fieldName="firstName"
                  label="Your fullname"
                  required
                  placeholder="Enter fullname"
                />

                <CustomField
                  register={register}
                  fieldName="email"
                  type="email"
                  label="Email address"
                  required
                  placeholder="Enter email"
                />

                <CustomField
                  register={register}
                  fieldName="password"
                  type="password"
                  required
                  label="Create password"
                  placeholder="Enter password"
                />
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    I agree with the{" "}
                    <Link
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </Link>
                    .
                  </label>
                </div>
              </>
            </ContainerForm>
          )}

          {currStep === 2 && (
            <ContainerForm delta={delta} currentForm={currentForm}>
              <>
                <CustomField
                  register={register}
                  fieldName="address"
                  label="Your address"
                />
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      {...register("country")}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 px-5 py-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600  sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                    {errors.country?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            </ContainerForm>
          )}

          {currStep === 3 && (
            <ContainerForm delta={delta} currentForm={currentForm}>
              <CustomField
                register={register}
                fieldName="phone"
                label="Bank verification number (BVN)"
              />
            </ContainerForm>
          )}
        </form>
      </FormProvider>

      {/* Navigation */}

      <div className="flex justify-center">
        {currStep === 3 ? (
          <button type="submit" className="submit-button">
            Save & Continue
          </button>
        ) : (
          <button onClick={next} className="submit-button">
            Register account
          </button>
        )}
      </div>
    </section>
  );
}
