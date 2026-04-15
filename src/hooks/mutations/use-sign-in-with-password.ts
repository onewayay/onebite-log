// src > hooks > mutations > use-sign-in-with-passowrd.ts
// 로그인 비동기 요청을 관리하는 뮤테이션

import { signInWithPassword } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithPassword(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      console.error(error);

      // sign-in-page 에서 mutation을 사용할때 설정한 onError 실행 (setPassword 초기화)
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
