import Link from "next/link";
import Form from "@/components/Form";
import { Routes, steps } from "@/models/constants";

// dynamic routes just for practice
export default function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  return (
    <div className="form1-container">
      <div className="flex justify-between items-center">
        <Link
          href={
            +params.slug - 1 == 0
              ? "/"
              : `${Routes.signupForm}/${+params.slug - 1}`
          }
          className="text-grey flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <p className="text-base text-gray-900 dark:text-white pl-2">Back</p>
        </Link>
        <div>
          <p className="text-gray-700 text-sm">STEP {`0${params.slug}/03`}</p>
          <p className="text-grey">{steps[+params.slug - 1].stepName}</p>
        </div>
      </div>

      <Form currStep={+params.slug || 0} />
    </div>
  );
}
