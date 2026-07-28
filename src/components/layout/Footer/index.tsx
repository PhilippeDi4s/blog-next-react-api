import Link from "next/link";
const year = new Date().getFullYear();
export function Footer() {
  return (
    <footer className="pb-16 text-center">
      <p>
        Copyright &copy; {year} - <Link href="/">The Blog</Link>
      </p>
    </footer>
  );
}
