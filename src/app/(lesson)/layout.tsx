export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pt-5 pb-8">
        {children}
      </main>
    </div>
  );
}
