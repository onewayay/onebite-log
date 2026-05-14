// src < components > comment > comment-list.tsx

import CommentItem from "@/components/comment/comment-item";
import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { useCommentsData } from "@/hooks/queries/use-comments-data";
import type { Comment, NestedComment } from "@/types";

function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach((comment) => {
    if (!comment.parent_comment_id) {
      // 부모 댓글이 없다. = 대댓글이 아니다.
      return result.push({ ...comment, children: [] });
    } else {
      // 부모 댓글이 존재. = 대댓글이다.
      const parentCommentIndex = result.findIndex((item) => item.id === comment.parent_comment_id);
      result[parentCommentIndex].children.push({ ...comment, children: [], parentComment: result[parentCommentIndex] });
    }
  });
  return result;
}

export default function CommentList({ postId }: { postId: number }) {
  //  특정 포스트 모든 댓글 조회 비동기 요청 관리하는 쿼리. 헷갈리지 않도록 comments로 이름 설정
  const { data: comments, error: fetchCommentsError, isPending: isFetchCommentsPending } = useCommentsData(postId);

  if (fetchCommentsError) return <Fallback />;
  if (isFetchCommentsPending) return <Loader />;

  const nestedComments = toNestedComments(comments); // 중첩된 구조로 댓글 리스트 변경

  return (
    <div className="flex flex-col gap-5">
      {nestedComments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
