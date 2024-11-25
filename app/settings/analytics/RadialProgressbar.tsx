const RadialProgressbar = () => {
  const progress = 75;
  const radius = 20; // Circle radius
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  const offset = circumference - (progress / 100) * circumference; // Stroke offset

  return (
    <div className="flex gap-4 items-center pb-4">
      <div className="relative w-28 h-28">
        <svg
          className="w-full h-full transform -rotate-90 filter drop-shadow-sm"
          viewBox="0 0 44 44"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-gray-300"
          ></circle>

          {/* Progress Circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-[#D5D4F0] transition-all duration-300"
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-black">{progress}%</span>
        </div>
      </div>

      <div className="pt-6">
        <p className="font-bold"> 32 of 42 complete</p>
        <p className="text-medium py-1">Finish course to get certificate.</p>
      </div>
    </div>
  );
};

export default RadialProgressbar;
