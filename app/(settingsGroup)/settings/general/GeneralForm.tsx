"use client";

import { CustomField } from "@/components/Form";
import { InitialGeneralFormValues } from "@/models/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
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
  generalProfile: yup.object({
    name: yup.string(),
    data: yup.string(),
    contentType: yup.string(),
  }),
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [initialValues, setInitialValues] = useState<Inputs | null>(null);

  useEffect(() => {
    // Fetch initial data for the form
    const fetchFormData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/settings/general");
        if (response.status === 200) {
          setInitialValues(response.data.data);
          const responseImage = response?.data?.data?.generalProfile;
          setImage(responseImage);
          setImageUrl(
            `data:${responseImage?.contentType};base64,${responseImage?.data}`
          );
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Failed to fetch form data.");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
        toast.error("An error occurred while fetching the form data.");
        setIsLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const formInstance = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema),
    defaultValues: InitialGeneralFormValues,
  });

  const { handleSubmit, control } = formInstance;

  const { fields, append } = useFieldArray({
    control,
    name: "onlinePresence",
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsSaving(true);
    const formData = new FormData();
    if (image) {
      formData.append("generalProfile", image as unknown as File);
    }

    Object.entries(data).forEach(([key, value]) => {
      formData.append(
        key,
        typeof value === "object" ? JSON.stringify(value) : value
      );
    });

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

  useEffect(() => {
    if (initialValues) {
      formInstance.reset(initialValues); //reset the form values when form data fetched
    }
  }, [formInstance, initialValues]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <ImageUpload
        setImage={setImage}
        imageUrl={imageUrl}
        fileInputRef={fileInputRef}
      />
      <div className="md:w-1/2">
        <FormProvider {...formInstance}>
          <form onSubmit={handleSubmit(processForm)} noValidate>
            <CustomField
              fieldName="firstName"
              label="First name"
              placeholder="Enter First name"
            />

            <CustomField
              fieldName="lastName"
              label="Last name"
              placeholder="Enter Last name"
            />

            <CustomField
              fieldName="location"
              label="Location"
              placeholder="Enter Location"
            />

            <CustomField
              fieldName="profession"
              label="Profession"
              placeholder="Enter Profession"
            />

            <CustomField
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
