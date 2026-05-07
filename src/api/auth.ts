// src > api > auth.ts
// 인증과 관련된 모든 비동기 함수 보관 영역

import { supabase } from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

// 사용자 로그아웃 요청 비동기 함수
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    await supabase.auth.signOut({
      scope: "local",
    });
  }
}

// 회원가입 요청 비동기 함수
export async function signUp({ email, password }: { email: string; password: string }) {
  // 나중에 매개변수 순서가 헷갈릴 수 있기에 객체로 묶었음

  // 실제 Supabase에 회원가입 요청을 위해 Supabase client 불러와야 함
  // src > lib > supabase.ts 안에 미리 만들어놓은 Supabase client 있음

  // 응답에는 성공시 data 객체 (user와 session을 가짐),
  // 실패시 error를 반환한다
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // 회원가입만 진행하기에 특별히 처리할 내용이 없다. 그래서 결과값 data를 그대로 반환
  return data;
}

// 로그인 요청 비동기 함수
export async function signInWithPassword({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

// supabase 서버에게 소셜 로그인을 요청하는 비동기 함수
export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider, // 인증을 제공할 외부 서비스의 이름을 인수로 받음. 타입은 supabase에서 제공하는 타입을 넣는다면 소셜 로그인 이름이 유니온으로 제공되어 있어서 좋음.
  });

  if (error) throw error;

  return data;
}

// 비밀번호 재설정을 위한 인증 메일 요청하는 비동기 함수
export async function requestPasswordResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    // 인증 완료시 리다이렉트 시킬 주소
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });

  if (error) throw error;

  return data;
}

// 비밀번호 변경 요청하는 비동기 함수
export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;

  return data;
}
