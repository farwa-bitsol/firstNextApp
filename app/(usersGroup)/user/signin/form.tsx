"use client";

import { Routes } from "@/models/constants";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {  useState, Suspense } from "react";
import toast from "react-hot-toast";
import { CustomField } from "@/components/Form";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignInFormSchema = yup.object({
  email: yup.string().required("Email is required*"),
  password: yup.string().required("Password is required*"),
});

type SignInInputs = yup.InferType<typeof SignInFormSchema>;

function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formInstance = useForm<SignInInputs>({
    resolver: yupResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = formInstance;

  const onSubmit = async (data: SignInInputs) => {
    try {
      const { email, password } = data;
      
      setLoading(true);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // Get the callback URL from the search params or use default
      const callbackUrl = Routes.users;
      router.push(callbackUrl);
      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error(error?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen mx-auto max-w-md mt-10">
      <FormProvider {...formInstance}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <CustomField
            fieldName="email"
            type="email"
            label="Email address"
            required
            placeholder="Enter email"
          />
          <CustomField
            fieldName="password"
            type="password"
            label="Password"
            required
            placeholder="Enter password"
          />
          <div className="flex flex-col items-center gap-4 mt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="submit-button"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href={Routes.signupForm}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default function Form() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
