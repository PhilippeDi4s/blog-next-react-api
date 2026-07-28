"use client";

import { ErrorMessage } from "@/components/feedBack/ErrorMessage";

export default function RootErrorPage() {
  return (
    <ErrorMessage
      pageTitle="Internal server error"
      contentTitle="ERROR"
      content="Ocorreu um erro no qual nossa aplicação não conseguiu se recuperar. Tente novamente mais tarde."
    />
  );
}
