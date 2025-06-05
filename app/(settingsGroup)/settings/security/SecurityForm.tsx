"use client";

import { CustomField } from "@/components/Form";
import { InitialSecurityFormValues } from "@/models/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const FormDataSchema = yup.object({
  newPassword: yup.string().required("New password is required"),
  currentPassword: yup.string(),
});

type Inputs = yup.InferType<typeof FormDataSchema>;

const SecurityForm = () => {
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isSendingResetEmail, setIsSendingResetEmail] = useState(false);

  const formInstance = useForm<Inputs>({
    resolver: yupResolver(FormDataSchema),
    defaultValues: InitialSecurityFormValues,
  });

  const { handleSubmit, register, reset } = formInstance;

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsUpdatingPassword(true);
    try {
      const response = await axios.patch("/api/users/updatePassword", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset();
      toast.success(
        response.data.message || "Password has been successfully updated!"
      );
    } catch (error: any) {
      console.error(error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Password reset failed");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email address:");

    if (!email) {
      toast.error("Email is required to reset your password.");
      return;
    }

    setIsSendingResetEmail(true);
    try {
      const response = await axios.post("/api/users/forgetPassword", { email });

      toast.success(
        response.data.message || "Password reset email has been sent!"
      );
    } catch (error: any) {
      console.error(error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Failed to send reset email");
    } finally {
      setIsSendingResetEmail(false);
    }
  };

  return (
    <FormProvider {...formInstance}>
      <form onSubmit={handleSubmit(processForm)} noValidate>
        <div className="flex lg:gap-4 gap-1 flex-wrap">
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
          <button
            type="button"
            className="text-[#1565D8]"
            onClick={handleForgotPassword}
            disabled={isSendingResetEmail}
          >
            {isSendingResetEmail ? "Sending..." : "Reset your password"}
          </button>
        </p>

        <button
          type="submit"
          className="bg-[#1565D8] text-white px-6 py-3 rounded-xl"
          disabled={isUpdatingPassword}
        >
          {isUpdatingPassword ? "Saving..." : "Save password"}
        </button>
      </form>
    </FormProvider>
  );
};

export default SecurityForm;
