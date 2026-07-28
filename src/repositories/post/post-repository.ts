import { PostUpdateInput } from "@/lib/post/queries/validations";
import { PostModel } from "@/models/post/post-models";

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>; // Uma função que não recebe nada e retorna uma Promise que resolve em um array de posts
  findBySlugPublic(slug: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;

  //Mutation
  insertPost(post: PostModel): Promise<PostModel>;
  deletePostById(id: string): Promise<PostModel>;
  updatePostById(
    id: string,
    newPostData:  PostUpdateInput,
  ): Promise<PostModel>;
}
