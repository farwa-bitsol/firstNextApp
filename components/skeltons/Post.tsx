export const PostSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-pulse">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-gray-300 rounded-full w-10 h-10"></div>
        <div className="ml-4">
          <div className="bg-gray-300 w-24 h-4 mb-2"></div>
          <div className="flex items-center text-gray-500 text-xs">
            <div className="bg-gray-300 w-12 h-4 mr-1"></div>
            <div className="bg-gray-300 w-6 h-4"></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
    </div>

    {/* Title */}
    <div className="mt-2 bg-gray-300 w-1/2 h-4"></div>

    {/* Description */}
    <div className="mt-2 bg-gray-300 w-full h-4"></div>

    {/* Post Photo */}
    <div className="mt-2 bg-gray-300 w-full h-40"></div>

    {/* Likes, Comments, Shares */}
    <div className="mt-4 bg-gray-300 w-1/4 h-4"></div>

    {/* Actions */}
    <div className="mt-4 border-t pt-2 flex justify-around text-gray-600 text-sm">
      <div className="flex items-center cursor-pointer">
        <div className="bg-gray-300 w-6 h-6 rounded-full mr-2"></div>
        <div className="bg-gray-300 w-10 h-4"></div>
      </div>
      <div className="flex items-center cursor-pointer">
        <div className="bg-gray-300 w-6 h-6 rounded-full mr-2"></div>
        <div className="bg-gray-300 w-10 h-4"></div>
      </div>
      <div className="flex items-center cursor-pointer">
        <div className="bg-gray-300 w-6 h-6 rounded-full mr-2"></div>
        <div className="bg-gray-300 w-10 h-4"></div>
      </div>
    </div>
  </div>
);
