// src > hooks > mutations > use-sign-in-with-oauth.ts
// 소셜 로그인 요청을 관리하는 뮤테이션

import { signInWithOAuth } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithOAuth(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
