import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Heading } from "@/components/ui/Heading";
import { UserProfile } from "@/components/user/UserProfile";
import { UserProfileLogoutButton } from "@/components/user/UserProfileLogoutButton";
import { getMyProfile } from "@/lib/user/queries/profile";
import { Suspense } from "react";

export default async function UserProfilePage() {
  return (
    <main className="flex flex-col gap-8 mb-16 w-full max-w-5xl px-4 items-start mt-8">
      <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Heading as="h1">Meu perfil</Heading>
        <UserProfileLogoutButton />
      </div>
      <Suspense fallback={<SpinLoader />}>
        <UserProfilePageContent />
      </Suspense>
    </main>
  );
}

async function UserProfilePageContent() {
  const result = await getMyProfile();
  if (!result.success) {
    return <ErrorMessage pageTitle="" contentTitle="" content="" />;
  }
  const profile = result.data;

  return <UserProfile profile={profile} />;
}
