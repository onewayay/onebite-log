// src < components > comment > comment-list.tsx

import CommentItem from "@/components/comment/comment-item";
import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { useCommentsData } from "@/hooks/queries/use-comments-data";

export default function CommentList({ postId }: { postId: number }) {
  //  특정 포스트 모든 댓글 조회 비동기 요청 관리하는 쿼리. 헷갈리지 않도록 comments로 이름 설정
  const { data: comments, error: fetchCommentsError, isPending: isFetchCommentsPending } = useCommentsData(postId);

  if (fetchCommentsError) return <Fallback />;
  if (isFetchCommentsPending) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
