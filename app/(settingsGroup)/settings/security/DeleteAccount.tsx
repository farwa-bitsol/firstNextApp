"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Routes } from "@/models/constants";
import { useRouter } from "next/navigation";

const DeleteAccount = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    setLoading(true);

    try {
      const response = await axios.delete(`/api/users/deleteAccount`);

      if (response.status === 200) {
        toast.success("Your account has been deleted successfully.");
        router.push(Routes.login);
      } else {
        toast.error("Failed to delete your account. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("An error occurred while deleting your account.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  return (
    <div className="pb-2">
      <button
        type="button"
        className="text-[#EE4878] border-b border-[#EE4878]"
        onClick={() => setIsConfirming(true)}
      >
        I want to delete my account
      </button>

      {/* Modal for Confirmation */}
      {isConfirming && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Are you sure you want to delete your account?
            </h2>
            <p className="mb-4 text-gray-600">
              This action is irreversible and will delete all your data.
            </p>
            <div className="flex gap-2">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, delete my account"}
              </button>
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
