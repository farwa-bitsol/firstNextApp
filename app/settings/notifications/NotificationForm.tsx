"use client";

import CustomMultiCheckbox from "@/components/CustomCheckbox";
import CustomSwitch from "@/components/CustomSwitch";
import { InitialNotificationFormValues } from "@/models/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

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

const NotificationForm = () => {
  const formInstance = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema),
    defaultValues: InitialNotificationFormValues,
  });
  const { handleSubmit, register, control } = formInstance;

  const processForm: SubmitHandler<Inputs> = async (data) => {};

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
            type="button"
            className="bg-[#1565D8] text-white px-6 py-3 rounded-xl"
          >
            Save changes
          </button>
          <button type="button" className=" border px-12 py-3 rounded-xl">
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NotificationForm;
