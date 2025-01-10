"use client";

import CustomMultiCheckbox from "@/components/CustomCheckbox";
import CustomSwitch from "@/components/CustomSwitch";
import { notificationFormSchema } from "@/components/schemas/NotificationForm";
import { NotificationFormSkeleton } from "@/components/skeltons/NotificationForm";
import { useUser } from "@/Context/UserContextProvider";
import {
  InitialNotificationFormValues,
  websiteNotificationOptions,
} from "@/models/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = yup.InferType<typeof notificationFormSchema>;

const SwitchWithLabel = ({
  fieldName,
  heading,
  description,
}: {
  fieldName: string;
  heading: string;
  description: string;
}) => {
  return (
    <div className="flex justify-between items-center max-w-fit my-6">
      <div>
        <p className="text-sm font-bold py-4">{heading}</p>
        <p>{description}</p>
      </div>
      <div>
        <CustomSwitch fieldName={fieldName} />
      </div>
    </div>
  );
};

const fetchNotificationSettings = async (userId: string): Promise<Inputs> => {
  try {
    const response = await axios.get(`/api/settings/notifications/${userId}`);
    return response?.data?.data;
  } catch (error) {
    console.error("Failed to fetch notification settings:", error);
    return InitialNotificationFormValues;
  }
};

type InputsWithUserId = Inputs & {
  userId: string;
};

const saveNotificationSettings = async (data: InputsWithUserId) => {
  try {
    await axios.post("/api/settings/notifications", data);
    console.log("Notification settings saved successfully!");
  } catch (error) {
    console.error("Failed to save notification settings:", error);
  }
};

const NotificationForm = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const formInstance = useForm<Inputs>({
    resolver: yupResolver(notificationFormSchema),
    defaultValues: InitialNotificationFormValues,
  });
  const { handleSubmit, setValue } = formInstance;
  const { user, isLoading } = useUser();

  const loadNotificationSettings = useCallback(
    async (userId: string) => {
      setIsUpdating(true);
      const notifications = await fetchNotificationSettings(userId);
      setValue("weeklyNewsletter", notifications?.weeklyNewsletter);
      setValue("accountSummary", notifications?.accountSummary);
      setValue("websiteNotifications", notifications?.websiteNotifications);
      setIsUpdating(false);
    },
    [setValue]
  );

  useEffect(() => {
    if (user?._id) {
      loadNotificationSettings(user?._id);
    }
  }, [loadNotificationSettings, user?._id]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsSaving(true);
    await saveNotificationSettings({ ...data, userId: user?._id ?? "" });
    setIsSaving(false);
  };

  if (isLoading || isUpdating) {
    <NotificationFormSkeleton />;
  }

  return (
    <FormProvider {...formInstance}>
      <form onSubmit={handleSubmit(processForm)} noValidate>
        <p className="text-lg font-bold mt-8">Email Notifications</p>
        <SwitchWithLabel
          fieldName="weeklyNewsletter"
          heading="Weekly newsletter"
          description="A small text about what the newsletters might contain."
        />

        <SwitchWithLabel
          fieldName="accountSummary"
          heading="Account summary"
          description="A small text about what the newsletters might contain."
        />
        <p className="text-lg font-bold mt-8">Website Notifications</p>
        <CustomMultiCheckbox
          fieldName="websiteNotifications"
          options={websiteNotificationOptions}
        />

        <div className="flex gap-4 flex-wrap">
          <button
            disabled={isSaving}
            type="submit"
            className="bg-[#1565D8] text-white px-6 py-3 rounded-xl"
          >
            {isSaving ? " Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            className="border px-12 py-3 rounded-xl"
            disabled={isSaving}
          >
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NotificationForm;
