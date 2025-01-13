export const SkeletonUserInfo = () => (
  <div className="animate-pulse flex items-center mx-auto space-x-4 mt-4 w-full pl-2">
    {/* Skeleton for the profile image */}
    <div className="h-14 w-14 bg-gray-300 rounded-lg"></div>

    {/* Skeleton for the user info */}
    <div className="flex flex-col w-full space-y-2">
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);
