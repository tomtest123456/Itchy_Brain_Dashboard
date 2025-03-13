// src/app/page.tsx
// This is the homepage (`/`) of the application.
// It defines the UI for the main page and is wrapped by `layout.tsx`.
// Every `page.tsx` inside a folder creates a new route in Next.js.


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-primary">
        Welcome to Cycling Dashboard
      </h1>
    </main>
  );
}
