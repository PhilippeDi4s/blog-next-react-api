import { ImagePreview } from "@/components/images/ImagePreview";
import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { ActionType } from "@/lib/logs/enums/actionType";
import { EntityType } from "@/lib/logs/enums/entityType";
import {
  ActivityLog,
  PostLogSnapshot,
  UserLogSnapshot,
} from "@/lib/logs/types/log-types";
import { publishedFilterOptions } from "@/lib/post/enums/publishedFilter";
import { roleOptions } from "@/lib/user/enums/roles";
import { MailIcon, UserIcon } from "lucide-react";

type UpdateMetadataProps = {
  log: ActivityLog;
};

export function UpdateMetadata({ log }: UpdateMetadataProps) {
    console.log(log)
  let PostMetadataBefore;
  let PostMetadataAfter;

  let UserMetadataBefore;
  let UserMetadataAfter;

  if (log.action === ActionType.UPDATED) {
    if (log.entityType === EntityType.POST) {
      PostMetadataAfter = log.metadata.after as PostLogSnapshot;
      PostMetadataBefore = log.metadata.before as PostLogSnapshot;
    }
    if (log.entityType === EntityType.USER) {
      UserMetadataAfter = log.metadata.after as UserLogSnapshot;
      UserMetadataBefore = log.metadata.before as UserLogSnapshot;
    }
  }
  return (
    <div className="flex flex-col px-4 w-full items-start gap-2">
      {log.entityType === EntityType.POST &&
        log.entityType === EntityType.POST && (
          <>
            <CollapsibleSection toggleBtnContent={<>Antes</>} className="px-5">
              <InputText
                disabled
                defaultValue={PostMetadataBefore?.updatedAt}
              />
              <InputText disabled defaultValue={PostMetadataBefore?.title} />
              <InputText disabled defaultValue={PostMetadataBefore?.slug} />
              <ImagePreview imageSrc={PostMetadataBefore?.coverImage} />
              <InputText disabled defaultValue={PostMetadataBefore?.excerpt} />
              <InputText disabled defaultValue={PostMetadataBefore?.content} />
              <InputSelect
                disabled
                options={publishedFilterOptions}
                defaultValue={PostMetadataBefore?.published ? "true" : "false"}
              />
            </CollapsibleSection>

            <CollapsibleSection toggleBtnContent={<>Depois</>} className="px-5">
              <InputText disabled defaultValue={PostMetadataAfter?.updatedAt} />
              <InputText disabled defaultValue={PostMetadataAfter?.title} />
              <InputText disabled defaultValue={PostMetadataAfter?.slug} />
              <ImagePreview imageSrc={PostMetadataAfter?.coverImage} />
              <InputText disabled defaultValue={PostMetadataAfter?.excerpt} />
              <InputText disabled defaultValue={PostMetadataAfter?.content} />
              <InputSelect
                disabled
                options={publishedFilterOptions}
                defaultValue={PostMetadataAfter?.published ? "true" : "false"}
              />
            </CollapsibleSection>
          </>
        )}
      {log.entityType === EntityType.USER &&
        log.entityType === EntityType.USER && (
          <>
            <CollapsibleSection
              toggleBtnContent={<>Antes</>}
              className="p-3 flex flex-col gap-5"
            >
              <InputText
                disabled
                icon={UserIcon}
                defaultValue={UserMetadataBefore?.name}
              />
              <InputText
                disabled
                icon={MailIcon}
                defaultValue={UserMetadataBefore?.email}
              />
              <InputSelect
                disabled
                options={roleOptions}
                defaultValue={UserMetadataBefore?.role}
              />
            </CollapsibleSection>

            <CollapsibleSection
              toggleBtnContent={<>Depois</>}
              className="p-3 flex flex-col gap-5"
            >
              <InputText
                disabled
                icon={UserIcon}
                defaultValue={UserMetadataAfter?.name}
              />
              <InputText
                disabled
                icon={MailIcon}
                defaultValue={UserMetadataAfter?.email}
              />
              <InputSelect
                disabled
                options={roleOptions}
                defaultValue={UserMetadataAfter?.role}
              />
            </CollapsibleSection>
          </>
        )}
    </div>
  );
}
