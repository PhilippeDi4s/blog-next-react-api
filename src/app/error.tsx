"use client";

import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { Header } from "@/components/layout/Header";

export default function RootErrorPage() {
  return (
    <>
      <Header section="Error" />
      <ErrorMessage
        pageTitle="Internal server error"
        contentTitle="ERROR"
        content="Ocorreu um erro no qual nossa aplicação não conseguiu se recuperar. Tente novamente mais tarde."
      />
    </>
  );
}
