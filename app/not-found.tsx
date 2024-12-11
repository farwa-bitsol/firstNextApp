import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-72">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="text-blue-500">
        Return Home
      </Link>
    </div>
  );
}
