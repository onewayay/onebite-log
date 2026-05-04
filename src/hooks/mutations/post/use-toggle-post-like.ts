// src > hooks > mutations > post > use-toggle-post-like.ts
// 좋아요 토글 요청을 관리하는 뮤테이션

import { togglePostLike } from "@/api/post";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: togglePostLike,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
