import { UserProfileResponseDto } from "@/lib/user/schemas";
import { UserProfileData } from "../UserProfileData";
import { UserProfileUpdateDataForm } from "../UserProfileUpdateDataForm";
import { UserProfileUpdatePasswordForm } from "../UserProfileUpdatePasswordForm";
import { UserProfileDeleteAccount } from "../UserProfileDeleteAccount";

type UserProfileProps = {
  profile: UserProfileResponseDto;
};

export function UserProfile({ profile }: UserProfileProps) {
  return (
    <>
      <UserProfileData profile={profile} />
      <UserProfileUpdateDataForm profile={profile} />
      <UserProfileUpdatePasswordForm />
      <UserProfileDeleteAccount />
    </>
  );
}
