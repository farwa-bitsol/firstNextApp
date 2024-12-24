"use client";

import CustomMultiCheckbox from "@/components/CustomCheckbox";
import CustomSwitch from "@/components/CustomSwitch";
import { InitialNotificationFormValues } from "@/models/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IUser } from "@/models/types";

const FormDataSchema = yup.object({
  weeklyNewsletter: yup.boolean(),
  accountSummary: yup.boolean(),
  websiteNotifications: yup.array(),
});

type Inputs = yup.InferType<typeof FormDataSchema>;

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

const websiteNotificationOptions = [
  { label: "New follower", value: "newfollower" },
  { label: "Post like", value: "postLike" },
  { label: "Someone you followed posted", value: "followedPosted" },
  { label: "Post added to collection", value: "postAddedToCollection" },
  { label: "Post downloaded", value: "postDownloaded" },
];

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
  const [user, setUser] = useState<IUser | null>(null);
  const formInstance = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema),
    defaultValues: InitialNotificationFormValues,
  });
  const { handleSubmit, setValue } = formInstance;

  const loadNotificationSettings = useCallback(
    async (userId: string) => {
      const notifications = await fetchNotificationSettings(userId);
      setValue("weeklyNewsletter", notifications?.weeklyNewsletter);
      setValue("accountSummary", notifications?.accountSummary);
      setValue("websiteNotifications", notifications?.websiteNotifications);
    },
    [setValue]
  );

  useEffect(() => {
    if (user?._id) {
      loadNotificationSettings(user?._id);
    }
  }, [loadNotificationSettings, user?._id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<{ data: IUser }>(`/api/users/me`);
        setUser(response.data.data);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.error ||
          error?.message ||
          error?.error ||
          "Failed to fetch user";
        toast.error(errorMessage);
      }
    };

    fetchUser();
  }, []);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    await saveNotificationSettings({ ...data, userId: user?._id ?? "" });
  };

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
            type="submit"
            className="bg-[#1565D8] text-white px-6 py-3 rounded-xl"
          >
            Save changes
          </button>
          <button type="button" className="border px-12 py-3 rounded-xl">
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NotificationForm;
