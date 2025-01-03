export const GeneralFormSkeleton = () => (
    <div className="animate-pulse space-y-4">
      {/* Image Upload Skeleton */}
      <div className="w-full h-32 bg-gray-300 rounded-lg"></div>
  
      {/* Input Field Skeletons */}
      <div className="space-y-4">
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-20 bg-gray-300 rounded-md"></div>
      </div>
  
      {/* Online Presence Skeleton */}
      <div className="space-y-2">
        <div className="w-1/2 h-10 bg-gray-300 rounded-md"></div>
        <div className="w-1/2 h-10 bg-gray-300 rounded-md"></div>
        <div className="w-1/2 h-10 bg-gray-300 rounded-md"></div>
      </div>
  
      {/* Submit Button Skeleton */}
      <div className="w-32 h-12 bg-gray-300 rounded-xl"></div>
    </div>
  );