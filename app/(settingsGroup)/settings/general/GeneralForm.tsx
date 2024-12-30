"use client";

import { CustomField } from "@/components/Form";
import { InitialGeneralFormValues } from "@/models/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { Plus } from "lucide-react";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";

const FormDataSchema = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  location: yup.string(),
  profession: yup.string(),
  bio: yup.string(),
  generalProfile: yup.string(),
  onlinePresence: yup
    .array()
    .of(
      yup.object({
        id: yup.string(),
        url: yup.string(),
      })
    )
    .default([]),
});

type Inputs = yup.InferType<typeof FormDataSchema>;

const GeneralForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formInstance = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema),
    defaultValues: InitialGeneralFormValues,
  });
  const { handleSubmit, register, control } = formInstance;

  const { fields, append } = useFieldArray({
    control,
    name: "onlinePresence",
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append("generalProfile", image ?? "");

    const { firstName, lastName, location, profession, bio, onlinePresence } =
      data;
    formData.append("firstName", firstName ?? "");
    formData.append("lastName", lastName ?? "");
    formData.append("location", location ?? "");
    formData.append("profession", profession ?? "");
    formData.append("bio", bio ?? "");
    formData.append("onlinePresence", JSON.stringify(onlinePresence));

    try {
      const response = await axios.post("/api/settings/general", formData);

      if (response.status === 200) {
        toast.success("Form submitted successfully!");
        console.log("Server Response:", response.data);
      } else {
        toast.error("Failed to submit the form.");
      }
      setIsSaving(false);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An error occurred while submitting the form.");
      setIsSaving(false);
    }
  };

  return (
    <React.Fragment>
      <ImageUpload
        setImage={setImage}
        image={image}
        fileInputRef={fileInputRef}
      />
      <div className="md:w-1/2">
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
                <button
                  type="button"
                  onClick={() => append({ id: "", url: "" })}
                >
                  Add other
                </button>
              </div>
            </div>

            <button
              disabled={isSaving}
              type="submit"
              className="bg-[#1565D8] text-white px-6 py-3 rounded-xl"
            >
              {isSaving ? " Saving..." : "Save changes"}
            </button>
          </form>
        </FormProvider>
      </div>
    </React.Fragment>
  );
};

export default GeneralForm;
