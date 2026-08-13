import { PublicUserDto } from "@/lib/user/schemas";

type ImageAuthor = Pick<PublicUserDto, "name" | "email">;

export type ImageModel = {
  image_id: string;
  url: string;
  created_at: string;
  uploaded_by: ImageAuthor;
};
