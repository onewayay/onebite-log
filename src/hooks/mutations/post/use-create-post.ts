// src > hooks > mutations > post > use-create-post.ts
// 새로운 포스트 생성 요청을 관리하는 뮤테이션

import { createPostWithImages } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 추가된 포스트가 바로 화면에 렌더링 하도록 캐시 조작. 아래 방식중 1번 사용할 것임
      // 방식 1. 캐시를 아예 초기화
      // 방식 2. 캐시 데이터에 완성된 포스트만 추가 방식 3. 낙관적 업데이트 방식(onMutate)
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
