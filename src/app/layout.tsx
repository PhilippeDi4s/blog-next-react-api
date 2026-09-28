import type { Metadata } from "next";
// @ts-expect-error Next.js handles global CSS imports at build time.
import "./globals.css";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastifyContainer } from "@/components/feedBack/ToastifyContainer";

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
          <Header />
          {children}
          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
