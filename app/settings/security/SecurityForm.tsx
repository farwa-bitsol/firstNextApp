"use client";

import { CustomField } from "@/components/Form";
import { InitialSecurityFormValues } from "@/models/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const FormDataSchema = yup.object({
  newPassword: yup.string(),
  currentPassword: yup.string(),
});

type Inputs = yup.InferType<typeof FormDataSchema>;
const SecurityForm = () => {
  const formInstance = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema),
    defaultValues: InitialSecurityFormValues,
  });
  const { handleSubmit, register } = formInstance;

  const processForm: SubmitHandler<Inputs> = async (data) => {};

  return (
    <FormProvider {...formInstance}>
      <form onSubmit={handleSubmit(processForm)} noValidate>
        <div className="flex md:gap-4  gap-1 flex-wrap">
          <CustomField
            register={register}
            fieldName="newPassword"
            label="New password"
            placeholder="Enter new password"
            type="password"
          />

          <CustomField
            register={register}
            fieldName="currentPassword"
            label="Current password"
            placeholder="Enter current password"
            type="password"
          />
        </div>
        <p className="py-4 mt-2">
          Can’t remember your current password?&nbsp;
          <button type="button" className="text-[#1565D8]">
            Reset your password
          </button>
        </p>

        <button
          type="button"
          className="bg-[#1565D8] text-white px-6 py-3 rounded-xl"
        >
          Save password
        </button>
      </form>
    </FormProvider>
  );
};

export default SecurityForm;
