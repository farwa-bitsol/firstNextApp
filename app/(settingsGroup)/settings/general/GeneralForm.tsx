"use client";

import { CustomField } from "@/components/Form";
import { InitialGeneralFormValues } from "@/models/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { Plus } from "lucide-react";

const FormDataSchema = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  location: yup.string(),
  profession: yup.string(),
  bio: yup.string(),
  onlinePresence: yup.array().of(
    yup.object({
      id: yup.string(),
      url: yup.string().url(),
    })
  ),
});

type Inputs = yup.InferType<typeof FormDataSchema>;
const GeneralForm = () => {
  const formInstance = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema),
    defaultValues: InitialGeneralFormValues,
  });
  const { handleSubmit, register, control } = formInstance;

  const { fields, append } = useFieldArray({
    control,
    name: "onlinePresence",
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {};

  return (
    <FormProvider {...formInstance}>
      <form onSubmit={handleSubmit(processForm)} noValidate>
        <CustomField
          register={register}
          fieldName="firstName"
          label="First name"
          placeholder="Enter First name"
        />

        <CustomField
          register={register}
          fieldName="lastName"
          label="Last name"
          placeholder="Enter Last name"
        />

        <CustomField
          register={register}
          fieldName="location"
          label="Location"
          placeholder="Enter Location"
        />

        <CustomField
          register={register}
          fieldName="profession"
          label="Profession"
          placeholder="Enter Profession"
        />

        <CustomField
          register={register}
          fieldName="profession"
          label="Profession"
          placeholder="Enter Profession"
        />

        <CustomField
          register={register}
          fieldName="bio"
          label="Bio"
          type="textarea"
          placeholder="Enter Bio"
          rows={3}
        />

        <div className="mt-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Online presence
          </label>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <CustomField
                noMargin
                register={register}
                fieldName={`onlinePresence[${index}].url`}
                label=""
                placeholder="Enter URL"
                type="url"
              />
            </React.Fragment>
          ))}
          <div className="my-4 text-[#201CCD] flex space-x-2">
            <Plus />
            <button type="button" onClick={() => append({ id: "", url: "" })}>
              Add other
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default GeneralForm;
