import { PostHeading } from "../PostHeading";
import { PostDate } from "../PostDate";

type PostSummaryProps = {
  createdAt: string;
  postTitle: string;
  titleTag: "h1" | "h2";
  excerpt: string;
};

export function PostSummary({createdAt, titleTag, postTitle, excerpt}:PostSummaryProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <PostDate createdAt={createdAt}/>
      <PostHeading as={titleTag}>
        {postTitle}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
