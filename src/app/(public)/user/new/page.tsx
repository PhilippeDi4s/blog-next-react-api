import { CreateUserForm } from "@/components/user/CreateUserForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Crie sua conta",
};

export default async function CreateUserPage() {
  return <CreateUserForm />;
}
