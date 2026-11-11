import { CollapsibleCard } from "@/components/layout/CollapsibleCard";
import { Heading } from "@/components/ui/Heading";
import { InputText } from "@/components/ui/InputText";
import { PostResponseDto } from "@/lib/post/schemas";
import { formatDate } from "@/utils/format-datetime";
import {
  CalendarClockIcon,
  CalendarPlusIcon,
  FileTextIcon,
  ImageIcon,
  MailIcon,
  TagIcon,
  UserRoundIcon,
} from "lucide-react";

type PostDataAdminProps = {
  post: PostResponseDto;
};

const CARD_CLASSNAME = "flex flex-col gap-5";
const SECTION_CLASSNAME = "flex flex-col gap-1";
const DIVIDER_SECTION_CLASSNAME =
  "mt-4 flex flex-col gap-1 border-t border-white/30 pt-4";
const HEADING_CLASSNAME = "flex items-center gap-2";
const GRID_CLASSNAME = "grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10";
const HEADING_ICON_SIZE = 20;

export async function PostDataAdmin({ post }: PostDataAdminProps) {
  return (
    <CollapsibleCard
      toggleBtnContent={<>Dados Post</>}
      className={CARD_CLASSNAME}
    >
      <>
        <div className={SECTION_CLASSNAME}>
          <Heading as="h3" className={HEADING_CLASSNAME}>
            <UserRoundIcon size={HEADING_ICON_SIZE} /> Autor
          </Heading>

          <div className={GRID_CLASSNAME}>
            <InputText
              disabled
              labelText="ID do autor"
              icon={TagIcon}
              defaultValue={post.author.id}
            />
            <InputText
              disabled
              labelText="Nome do autor"
              icon={UserRoundIcon}
              defaultValue={post.author.name}
            />
            <InputText
              disabled
              labelText="E-mail do autor"
              icon={MailIcon}
              defaultValue={post.author.email}
            />
          </div>
        </div>

        <div className={DIVIDER_SECTION_CLASSNAME}>
          <Heading as="h3" className={HEADING_CLASSNAME}>
            <FileTextIcon size={HEADING_ICON_SIZE} /> Post
          </Heading>

          <div className={GRID_CLASSNAME}>
            <InputText
              disabled
              labelText="ID do post"
              icon={TagIcon}
              defaultValue={post.id}
            />
            <InputText
              disabled
              labelText="Data de Criação"
              icon={CalendarPlusIcon}
              defaultValue={formatDate(post.createdAt)}
            />
            <InputText
              disabled
              labelText="Última Atualização"
              icon={CalendarClockIcon}
              defaultValue={formatDate(post.updatedAt)}
            />
          </div>
        </div>

        <div className={DIVIDER_SECTION_CLASSNAME}>
          <Heading as="h3" className={HEADING_CLASSNAME}>
            <ImageIcon size={HEADING_ICON_SIZE} /> Capa
          </Heading>

          <div className={GRID_CLASSNAME}>
            <InputText
              disabled
              labelText="ID da capa"
              icon={TagIcon}
              defaultValue={post.coverImage?.id}
            />
            <InputText
              disabled
              labelText="Data de Criação"
              icon={CalendarPlusIcon}
              defaultValue={
                post.coverImage?.createdAt
                  ? formatDate(post.coverImage.createdAt)
                  : "Indisponível"
              }
            />
          </div>
        </div>
      </>
    </CollapsibleCard>
  );
}
