"use client";

const Pagination = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: number;
  setCurrentPage: (curr: number) => void;
}) => {
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-between px-2 py-4">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19l-7-7 7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
           
        </svg>
      </button>

      <button onClick={handleNext}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
           
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
