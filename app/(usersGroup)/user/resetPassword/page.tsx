"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { CustomField } from "@/components/Form";
import { Routes } from "@/models/constants";
import { useRouter } from "next/navigation";

const ResetPasswordSchema = yup.object({
  newPassword: yup.string().required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

type Inputs = yup.InferType<typeof ResetPasswordSchema>;

const Page = () => {
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  const formInstance = useForm<Inputs>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const { handleSubmit, register, reset } = formInstance;

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsResettingPassword(true);

    try {
      const response = await axios.patch("/api/users/forgetPassword", {
        newPassword: data.newPassword,
        token,
      });

      reset();
      toast.success(
        response.data.message || "Your password has been successfully reset!"
      );
      router.push(Routes.login);
    } catch (error: any) {
      console.error(error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Password reset failed");
    } finally {
      setIsResettingPassword(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Reset Your Password
      </h1>
      <FormProvider {...formInstance}>
        <form onSubmit={handleSubmit(processForm)} noValidate>
          <CustomField
            register={register}
            fieldName="newPassword"
            label="New Password"
            placeholder="Enter your new password"
            type="password"
          />
          <CustomField
            register={register}
            fieldName="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
            type="password"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
            disabled={isResettingPassword}
          >
            {isResettingPassword ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
