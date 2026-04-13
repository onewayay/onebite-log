// src > hooks > mutations > use-sign-in-with-passowrd.ts
// 로그인 비동기 요청을 관리하는 뮤테이션

import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithPassword() {
  return useMutation({
    mutationFn: signInWithPassword,
  });
}
