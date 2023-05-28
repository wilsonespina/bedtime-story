'use client';
import ClientSection from './components/client-section/ClientSection';

export default async function Index() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="my-4 text-6xl font-bold">Bedtime Story generator</h1>
      <div className="flex flex-col items-center gap-2 font-mono md:flex-row">
        <div className="bg-neuborder-neutral-900 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
          <div className="text-2xl text-neutral-50 dark:text-neutral-900">
            1
          </div>
        </div>
        <p className="font-bold">
          Ask a question.
          <span className="text-neutral-400">(Max. 200 characters)</span>
        </p>
      </div>
      <ClientSection />
    </main>
  );
}
