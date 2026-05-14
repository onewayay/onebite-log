// src > hooks > mutations > comment > use-update-comment.ts
// 댓글 수정 비동기 요청을 관리하는 뮤테이션

import { updateComment } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import type { Comment, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateComment(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Comment[]>(QUERY_KEYS.comment.post(updatedComment.post_id), (comments) => {
        if (!comments) throw new Error("댓글이 캐시 데이터에 보관되어있지 않습니다.");

        return comments.map((comment) => {
          if (comment.id === updatedComment.id) return { ...comment, ...updatedComment };
          return comment;
        });
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
