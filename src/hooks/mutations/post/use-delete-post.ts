// src > hooks > mutations > post > use-delete-post.ts
// 포스트 삭제 요청을 관리하는 뮤테이션

import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 삭제된 포스트에 이미지가 있을 때만 스토리지의 이미지 삭제 진행
      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        // 스토리지의 이미지 삭제
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
