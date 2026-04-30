// src > hooks > mutations > post > use-update-post.ts
// 포스트 수정 요청을 관리하는 뮤테이션

import { updatePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { Post, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 업데이트된 포스트가 바로 화면에 렌더링 하도록 캐시 조작.
      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(updatedPost.id), (prevPost) => {
        if (!prevPost) throw new Error(`${updatedPost.id}에 해당하는 포스트를 캐시 데이터에서 찾을 수 없습니다.`);

        return { ...prevPost, ...updatedPost };
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
