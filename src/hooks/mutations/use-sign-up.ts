// src > hooks > mutations > use-sign-up.to-secondary
// 회원가입 비동기 요청을 관리하는 뮤테이션

import { signUp } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useSignUp(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
