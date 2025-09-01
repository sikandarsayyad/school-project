import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-80 text-center">
      <h1 className="text-3xl font-bold pb-5">School Project</h1>
      <div className="space-x-4">
        <Link href="/addSchool" className="text-blue-600 hover:underline">
          Add School
        </Link>
        <span>|</span>
        <Link href="/showSchools" className="text-blue-600 hover:underline">
          Show Schools
        </Link>
      </div>
    </div>
  );
}
