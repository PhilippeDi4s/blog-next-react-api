import { Suspense } from "react";
import Link from "next/link";
import { PublicHeaderSession } from "./PublicHeaderSession";
import { PublicHeaderSessionVisibility } from "./PublicHeaderSessionVisibility";
import { Heading } from "@/components/ui/Heading";

export function PublicHeader() {
  return (
    <header className="flex min-h-20 w-full items-center justify-between py-4">
      <Heading as="h1" className="md:text-5xl my-3"><Link href="/">The Blog</Link></Heading>
      <PublicHeaderSessionVisibility>
        <Suspense fallback={<div aria-hidden="true" className="h-11 w-11" />}>
          <PublicHeaderSession />
        </Suspense>
      </PublicHeaderSessionVisibility>
    </header>
  );
}
