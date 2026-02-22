import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6 text-center text-text">
      <div className="space-y-4">
        <p className="mono text-sm text-text-muted">404</p>
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="mx-auto max-w-lg text-text-muted">
          The page you requested does not exist. Continue to the launch waitlist page.
        </p>
        <Link
          href="/en"
          className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          Go to Landing Page
        </Link>
      </div>
    </main>
  );
}
