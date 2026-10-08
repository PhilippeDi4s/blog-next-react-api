import type { Metadata } from "next";
import "./globals.css";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/layout/Footer";
import { ToastifyContainer } from "@/components/feedBack/ToastifyContainer";
import { NoticeHandler } from "@/components/feedBack/NoticeHandler";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | The Blog",
    default: "The Blog",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-br" className="dark">
      <body>
        <Container>
          {children}
          <Footer />
        </Container>
        <Suspense fallback={null}>
          <NoticeHandler />
        </Suspense>
        <ToastifyContainer />
      </body>
    </html>
  );
}
