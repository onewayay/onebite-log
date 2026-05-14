// src > hooks > mutations > comment > use-delete-comment.ts
// 댓글 삭제 비동기 요청을 관리하는 뮤테이션

import { deleteComment } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import type { Comment, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteComment(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (deletedComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Comment[]>(QUERY_KEYS.comment.post(deletedComment.post_id), (comments) => {
        if (!deletedComment) throw new Error("댓글이 캐시 데이터에 보관되어 있지 않습니다.");

        return comments?.filter((comment) => comment.id !== deletedComment.id);
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
