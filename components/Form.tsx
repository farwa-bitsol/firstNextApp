"use client";

import { ReactElement, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";

import { InitialFormValues, Routes, steps } from "@/models/constants";
import { ICurrentForm, ICustomField } from "@/models/types";
import { yupResolver } from "@hookform/resolvers/yup";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import * as yup from "yup";
import Logout from "./Logout";

const FormDataSchema = yup.object({
  fullName: yup.string().required("name is required*"),
  email: yup.string().required("email is required*"),
  address: yup.string(),
  country: yup.string(),
  phone: yup.string(),
  password: yup.string().required("password is required*"),
  remember: yup.boolean(),
});

export type Inputs = yup.InferType<typeof FormDataSchema>;

export const CustomField = <T extends Record<string, any>>({
  fieldName,
  type = "text",
  label,
  required = false,
  placeholder,
  rows,
  noMargin,
}: ICustomField<T>) => {
  const { clearErrors, setError, control } = useFormContext<T>();

  return (
    <div className={`sm:col-span-3 ${noMargin ? "" : "my-4"}`}>
      {label && (
        <label
          htmlFor={String(fieldName)}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="mt-2">
        <Controller
          name={fieldName as any}
          control={control}
          render={({ field, fieldState }) => (
            <div>
              {type === "textarea" ? (
                <textarea
                  id={String(fieldName)}
                  placeholder={placeholder}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    // clear error
                    if (e.target.value) clearErrors(fieldName as any);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    if (!field.value)
                      setError(fieldName as any, {
                        type: "manual",
                        message: "required(*)",
                      });
                  }}
                  rows={rows}
                  className={`block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                    fieldState.error
                      ? "input-error"
                      : "border-gray-300 ring-gray-300 focus:border-sky-600 focus:ring-sky-600"
                  } placeholder:text-gray-400 sm:text-sm`}
                />
              ) : (
                <input
                  type={type}
                  id={String(fieldName)}
                  placeholder={placeholder}
                  {...field}
                  autoComplete="given-name"
                  className={`block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                    fieldState.error
                      ? "input-error"
                      : "border-gray-300 ring-gray-300 focus:border-sky-600 focus:ring-sky-600"
                  } placeholder:text-gray-400 sm:text-sm`}
                  onChange={(e) => {
                    field.onChange(e);
                    // clear error
                    if (e.target.value) clearErrors(fieldName as any);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    if (!field.value)
                      setError(fieldName as any, {
                        type: "manual",
                        message: "required(*)",
                      });
                  }}
                />
              )}
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
      <div className="flex justify-center flex-col h-full lg:px-14">
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

export default function Form({
  currStep,
  handleNext,
}: Readonly<{
  currStep: number;
  handleNext?: () => void;
}>) {
  const { data: session } = useSession();
  const router = useRouter();
  const previousStep = currStep - 1;
  const delta = currStep - previousStep;
  const [isLoading, setIsLoading] = useState(false);

  const currentForm: ICurrentForm = useMemo(() => steps[currStep], [currStep]);
  const formInstance = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema),
    defaultValues: InitialFormValues,
  });

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = formInstance;

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const newUser = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      };

      const response = await axios.post("/api/users/signup", newUser);
      console.log("Signup success", response.data);
      toast.success("Signup success!");
      router.push(Routes.login);
    } catch (error: any) {
      console.error("Error creating user:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        error?.error ||
        "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currStep - 1].fields;

    const isValid = await trigger(fields as FieldName[], { shouldFocus: true });
    if (!isValid) return;

    if (handleNext) {
      handleNext();
      return;
    }

    router.push(`${Routes.signupForm}/${currStep + 1}`);
  };

  return (
    <section>
      <FormProvider {...formInstance}>
        <form className="mt-12" onSubmit={handleSubmit(processForm)} noValidate>
          {/* Step 1 */}
          {currStep === 1 && (
            <ContainerForm delta={delta} currentForm={currentForm}>
              <>
                <CustomField
                  register={register}
                  fieldName="fullName"
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

          {/* Step 2 */}
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
                  <div className="mt-2 mb-6">
                    <select
                      id="country"
                      {...register("country")}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
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

          {/* Step 3 */}
          {currStep === 3 && (
            <ContainerForm delta={delta} currentForm={currentForm}>
              <CustomField
                register={register}
                fieldName="phone"
                label="Bank verification number (BVN)"
              />
            </ContainerForm>
          )}

          {/* Navigation */}
          {currStep === 3 && (
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Register account"}
              </button>
            </div>
          )}
        </form>
      </FormProvider>

      {currStep !== 3 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={next}
            className="submit-button"
            disabled={isLoading}
          >
            Save & Continue
          </button>
        </div>
      )}

      <div className="flex justify-center flex-col items-center">
        <p className="text-gray-500">or</p>
        {session?.user?.email ? (
          <p>
            Logged in by&nbsp;{session?.user?.email}.
            <Logout />
          </p>
        ) : (
          <button
            onClick={() => signIn("google")}
            type="button"
            className="login-with-google"
            disabled={isLoading}
          >
            Register with Google
          </button>
        )}
      </div>
    </section>
  );
}
