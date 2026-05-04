// src > hooks > mutations > post > use-toggle-post-like.ts
// 좋아요 토글 요청을 관리하는 뮤테이션

import { togglePostLike } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { type Post, type UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });

      const prevPost = queryClient.getQueryData<Post>(QUERY_KEYS.post.byId(postId));

      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), (post) => {
        if (!post) throw new Error("포스트가 존재하지 않습니다.");

        return {
          ...post,
          isLiked: !post.isLiked,
          like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1,
        };
      });

      return {
        prevPost,
      };
    },
    onError: (error, _, context) => {
      if (callbacks?.onError) callbacks.onError(error);
      if (context && context.prevPost) {
        queryClient.setQueryData(QUERY_KEYS.post.byId(context.prevPost.id), context.prevPost);
      }
    },
  });
}
