import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col text-center gap-4 text-5xl font-bold">
        <Link href="/emailclient">Email Client</Link>
        <Link href="/datavisualization">Data Visualization</Link>
      </div>
    </main>
  );
}
