import { CollapsibleCard } from "@/components/layout/CollapsibleCard";
import { Heading } from "@/components/ui/Heading";
import { InputText } from "@/components/ui/InputText";
import { ImageResponseDto } from "@/lib/image/schema";
import { formatDate } from "@/utils/format-datetime";
import {
  CalendarPlusIcon,
  FileTextIcon,
  MailIcon,
  TagIcon,
  UserRoundIcon,
} from "lucide-react";

type ImageDataAdminProps = {
  image: ImageResponseDto;
};

const CARD_CLASSNAME = "flex flex-col gap-5";
const SECTION_CLASSNAME = "flex flex-col gap-1";
const DIVIDER_SECTION_CLASSNAME =
  "mt-4 flex flex-col gap-1 border-t border-white/30 pt-4";
const HEADING_CLASSNAME = "flex items-center gap-2";
const GRID_CLASSNAME = "grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10";
const HEADING_ICON_SIZE = 20;

export async function ImageDataAdmin({ image }: ImageDataAdminProps) {
  return (
    <CollapsibleCard
      toggleBtnContent={<>Dados Imagem</>}
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
              defaultValue={
                image.uploadedBy?.id ? image.uploadedBy.id : "Indisponível"
              }
            />
            <InputText
              disabled
              labelText="Nome do autor"
              icon={UserRoundIcon}
              defaultValue={
                image.uploadedBy?.name ? image.uploadedBy.name : "Indisponível"
              }
            />
            <InputText
              disabled
              labelText="E-mail do autor"
              icon={MailIcon}
              defaultValue={
                image.uploadedBy?.email
                  ? image.uploadedBy.email
                  : "Indisponível"
              }
            />
          </div>
        </div>

        <div className={DIVIDER_SECTION_CLASSNAME}>
          <Heading as="h3" className={HEADING_CLASSNAME}>
            <FileTextIcon size={HEADING_ICON_SIZE} /> Image
          </Heading>

          <div className={GRID_CLASSNAME}>
            <InputText
              disabled
              labelText="ID da imagem"
              icon={TagIcon}
              defaultValue={image.id}
            />
            <InputText
              disabled
              labelText="Data de Upload"
              icon={CalendarPlusIcon}
              defaultValue={formatDate(image.createdAt)}
            />
          </div>
        </div>
      </>
    </CollapsibleCard>
  );
}
