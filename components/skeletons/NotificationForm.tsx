import { websiteNotificationOptions } from "@/models/constants";

export const NotificationFormSkeleton = () => (
  <div className="animate-pulse space-y-6">
    {/* Skeleton for Email Notifications */}
    <div className="w-full h-8 bg-gray-300 rounded-md"></div>
    <div className="flex justify-between items-center w-full">
      <div className="w-1/2 h-10 bg-gray-300 rounded-md"></div>
      <div className="w-16 h-10 bg-gray-300 rounded-md"></div>
    </div>

    <div className="w-full h-8 bg-gray-300 rounded-md"></div>
    <div className="flex justify-between items-center w-full">
      <div className="w-1/2 h-10 bg-gray-300 rounded-md"></div>
      <div className="w-16 h-10 bg-gray-300 rounded-md"></div>
    </div>

    {/* Skeleton for Website Notifications */}
    <div className="w-full h-8 bg-gray-300 rounded-md"></div>
    <div className="w-full space-y-4">
      {websiteNotificationOptions.map((option, index) => (
        <div key={index} className="flex gap-4 items-center">
          <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
        </div>
      ))}
    </div>

    {/* Skeleton for Buttons */}
    <div className="flex gap-4">
      <div className="w-32 h-12 bg-gray-300 rounded-xl"></div>
      <div className="w-32 h-12 bg-gray-300 rounded-xl"></div>
    </div>
  </div>
);
