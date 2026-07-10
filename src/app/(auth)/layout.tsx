import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_32%),radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.12),transparent_35%)] p-4 sm:p-8">
      <div className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 size-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <img
            src="/logos/logo.svg"
            alt="NODEBASE"
            className="size-10"
          />
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight">NODEBASE</h1>
            <p className="text-sm text-muted-foreground">Your intelligent workspace</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
