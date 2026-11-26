import { Suspense } from "react";
import Link from "next/link";
import { PublicHeaderSession } from "./PublicHeaderSession";
import { PublicHeaderSessionVisibility } from "./PublicHeaderSessionVisibility";

export function PublicHeader() {
  return (
    <header className="flex min-h-20 w-full items-center justify-between py-4">
      <Link href="/" className="text-2xl font-bold">The Blog</Link>
      <PublicHeaderSessionVisibility>
        <Suspense fallback={<div aria-hidden="true" className="h-11 w-11" />}>
          <PublicHeaderSession />
        </Suspense>
      </PublicHeaderSessionVisibility>
    </header>
  );
}
