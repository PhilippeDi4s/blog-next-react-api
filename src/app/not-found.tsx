import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { Header } from "@/components/layout/Header";

export default function NotFoundPage() {
  return (
    <>
    <Header section="Not Found"/>
      <ErrorMessage
        pageTitle="Página não encontrada"
        contentTitle="404 😅"
        content="Erro 404 - A página que você está tentando acessar não existe nesse
          site."
      />
    </>
  );
}
