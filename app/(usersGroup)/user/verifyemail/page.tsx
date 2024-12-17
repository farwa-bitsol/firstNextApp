"use client";

import React, { useEffect, useState } from "react";
import { Routes } from "@/models/constants";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [isVerificationProcessing, setIsVerificationProcessing] =
    useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    try {
      setIsVerificationProcessing(true);
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        error?.error ||
        "An unknown error occurred";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsVerificationProcessing(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token?.length) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl p-4">
        {isVerificationProcessing ? "Verifying..." : "Email Verification"}
      </h1>

      {verified ? (
        <React.Fragment>
          <h2 className="text-green-700 font-bold">
            Email Verified Successfully
          </h2>
          <Link href={Routes.login} className="text-blue-500 font-bold">
            Login
          </Link>
        </React.Fragment>
      ) : (
        <p className="text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}
