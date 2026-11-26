import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-brand-navy text-brand-text-primary">
      <p className="font-mono text-xs text-brand-coral-light">404</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
        Page Not Found
      </h1>
      <p className="text-sm text-brand-text-secondary max-w-md">
        Choose your language workspace to continue exploring Fontivo.
      </p>
      <div className="flex items-center gap-4 text-sm font-mono pt-2">
        <Link
          href="/en"
          className="px-4 py-2 rounded-lg bg-brand-coral text-brand-navy font-semibold hover:opacity-90 transition-opacity"
        >
          English (/en)
        </Link>
        <Link
          href="/ar"
          className="px-4 py-2 rounded-lg border border-brand-border bg-brand-surface-200 text-white hover:border-brand-lavender transition-colors"
        >
          العربية (/ar)
        </Link>
      </div>
    </div>
  );
}
