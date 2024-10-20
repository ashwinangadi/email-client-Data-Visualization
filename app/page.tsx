import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row text-center gap-20 text-5xl font-bold">
        <Link
          href="/emailclient"
          className="border p-5 rounded-lg hover:border-primary shadow-md hover:shadow-primary"
        >
          Email Client
        </Link>
        <Link
          href="/datavisualization"
          className="border p-5 rounded-lg hover:border-primary shadow-md hover:shadow-primary"
        >
          Data Visualization
        </Link>
      </div>
    </main>
  );
}
