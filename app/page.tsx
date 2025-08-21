
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">AI-Powered Portfolio</h1>
        <p className="text-lg">Explore my projects and ask questions about them using the AI chatbot.</p>
      </div>
    </main>
  );
}
