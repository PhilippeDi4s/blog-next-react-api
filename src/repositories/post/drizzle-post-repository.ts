import { PostModel } from "@/models/post/post-models";
import { drizzleDb } from "@/db/drizzle";
import { PostRepository } from "./post-repository";
import { postsTable } from "@/db/drizzle/schemas";
import { eq } from "drizzle-orm";
import { PostUpdateInput } from "@/lib/post/queries/validations";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.published, true), eq(post.slug, slug)),
    });

    if (!post) {
      throw new Error(`Não foi possível encontrar um post pelo slug: ${slug}`);
    }

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) {
      throw new Error(`Não foi possível encontrar um post pelo ID: ${id}`);
    }

    return post;
  }

  async deletePostById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error("Post não existe");
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return post;
  }

  async insertPost(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw Error("Post com ID ou Slug já existe na base de dados");
    }

    await drizzleDb.insert(postsTable).values(post);
    return post;
  }

  async updatePostById(id: string, newPostData: PostUpdateInput): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, {eq}) => eq(posts.id, id)
    })

    if(!oldPost){
      throw Error("Post não existe")
    }

    const updatedAt = new Date().toISOString();

    const updatedPostData: Omit<PostModel, "id" | "createdAt" | "slug"> = {
      author: newPostData.author,
      title: newPostData.title,
      content: newPostData.content,              
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      updatedAt,
    }

    await drizzleDb.update(postsTable).set(updatedPostData).where(eq(postsTable.id, id))

    return{
      ...oldPost,
      ...updatedPostData
    }

  }
}
