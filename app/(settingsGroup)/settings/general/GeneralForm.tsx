"use client";

import { CustomField } from "@/components/Form";
import { generalFormSchema } from "@/components/schemas/GeneralForm";
import { GeneralFormSkeleton } from "@/components/skeltons/GeneralForm";
import { useUser } from "@/Context/UserContextProvider";
import { InitialGeneralFormValues } from "@/models/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import ImageUpload from "./ImageUpload";

type Inputs = yup.InferType<typeof generalFormSchema>;

const GeneralForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [initialValues, setInitialValues] = useState<Inputs | null>(null);
  const { user, isLoading: isUserDetailLoading } = useUser();

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
          if (responseImage) {
            setImageUrl(
              `data:${responseImage?.contentType};base64,${responseImage?.data}`
            );
          }
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
    resolver: yupResolver(generalFormSchema),
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
      // First API Call: Submit general form data
      const response = await axios.post("/api/settings/general", formData);

      if (response.status === 200) {
        console.log("General form response:", response.data);
      } else {
        toast.error("Failed to submit general form.");
        setIsSaving(false);
        return;
      }

      // Second API Call: Update user image if image exists
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("userImage", image);

        const imageResponse = await axios.patch("/api/users", imageFormData);

        if (imageResponse.status === 200) {
          console.log("User image response:", imageResponse.data);
        } else {
          toast.error("Failed to update user image.");
          setIsSaving(false);
          return;
        }
      }

      // If both API calls are successful
      toast.success("General form submitted successfully!");
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
    if (user) {
      // Split full name into first name and last name
      const [firstName, ...lastNameArr] = user.fullName.split(" ");
      const lastName = lastNameArr.join(" ");

      formInstance.reset({
        ...initialValues,
        firstName: firstName || "",
        lastName: lastName || "",
      });
    }
  }, [formInstance, initialValues, user]);

  if (isLoading || isUserDetailLoading) {
    return <GeneralFormSkeleton />;
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
