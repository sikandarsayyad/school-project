import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>School Project</h1>
      <Link href="/addSchool">Add School</Link> |{" "}
      <Link href="/showSchools">Show Schools</Link>
    </div>
  );
}
