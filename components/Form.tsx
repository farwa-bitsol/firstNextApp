"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactElement, useMemo, useState } from "react";

import { InitialFormValues, steps } from "@/models/constants";
import { ICurrentForm, ICustomField, IUser } from "@/models/types";
import { createUser, fetchUsers } from "@/services/userService";
import { yupResolver } from "@hookform/resolvers/yup";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import * as yup from "yup";
import { useQuery } from "react-query";

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

export const CustomField = ({
  fieldName,
  type = "text",
  label,
  required = false,
  placeholder,
  rows,
  noMargin,
}: ICustomField) => {
  const { clearErrors, setError } = useFormContext();

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
          render={({ field, fieldState }) => (
            <div>
              {type === "textarea" ? (
                <textarea
                  id={fieldName}
                  placeholder={placeholder}
                  value={field.value || ""}
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
                  id={fieldName}
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
      <div className="flex justify-center flex-col h-full lg:px-24">
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

  const currentForm: ICurrentForm = useMemo(() => steps[currStep], [currStep]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const limit = 4;
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

  const { data: fetchedUsers, isError } = useQuery({
    queryKey: ["users", { pageNumber, limit }],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?_page=${pageNumber}&_limit=${limit}`
      );
      return (await response.json()) as IUser[];
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const newUser = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      };

      // const fetchedUsers: IUser[] = await fetchUsers();
      const emailExists = fetchedUsers?.find(
        (user) => data.email === user.email
      );

      if (emailExists) {
        // show Error
        window.alert("Email already exists");
        return;
      }

      await createUser(newUser);
      router.push("/");
    } catch (error) {
      console.error("Error creating user:", error);
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

    router.push(`/form/${currStep + 1}`);
  };

  return (
    <section>
      {/* Form */}
      <FormProvider {...formInstance}>
        <form className="mt-12" onSubmit={handleSubmit(processForm)} noValidate>
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
                      className="block w-full rounded-md border-0 px-5 py-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600  sm:text-sm "
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

          {/* Navigation */}

          {currStep === 3 && (
            <div className="flex justify-center mt-8">
              <button type="submit" className="submit-button">
                Register account
              </button>
            </div>
          )}
        </form>
      </FormProvider>
      {currStep !== 3 && (
        <div className="flex justify-center">
          <button type="button" onClick={next} className="submit-button">
            Save & Continue
          </button>
        </div>
      )}

      <div className="flex justify-center flex-col items-center">
        <p className="text-gray-500">or</p>
        {session?.user?.email ? (
          <p>
            Logged in by&nbsp;{session?.user?.email}.
            <button
              onClick={() => signOut()}
              className="text-blue-500  font-bold"
            >
              Logout
            </button>
          </p>
        ) : (
          <button
            onClick={() => signIn("google")}
            type="button"
            className="login-with-google focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                fill="#FFC107"
              />
              <path
                d="M3.15298 7.3455L6.43848 9.755C7.32748 7.554 9.48048 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15898 2 4.82798 4.1685 3.15298 7.3455Z"
                fill="#FF3D00"
              />
              <path
                d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3037 18.0011 12 18C9.399 18 7.1905 16.3415 6.3585 14.027L3.0975 16.5395C4.7525 19.778 8.1135 22 12 22Z"
                fill="#4CAF50"
              />
              <path
                d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                fill="#1976D2"
              />
            </svg>
            <p className="pl-2"> Register with Google</p>
          </button>
        )}
      </div>
    </section>
  );
}
