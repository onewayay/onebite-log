// src > hooks > queries > use-comments-data.ts
// 특정 포스트의 모든 댓글 조회 비동기 요청을 관리하는 쿼리

import { fetchComments } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useCommentsData(postId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.comment.post(postId),
    queryFn: () => fetchComments(postId),
  });
}
