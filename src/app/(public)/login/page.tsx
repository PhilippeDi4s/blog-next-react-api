import { LoginUserForm } from "@/components/user/LoginUserForm";
import { Metadata } from "next";
import { Suspense } from "react";
import { SpinLoader } from "@/components/feedBack/SpinLoader";

export const metadata: Metadata = {
  title: "Login",
};

export default async function AdminPostsPage() {

  return (
    <Suspense fallback={<SpinLoader />}>
      <LoginUserForm />
    </Suspense>
  );
}
