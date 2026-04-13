// src > api > auth.ts
// 인증과 관련된 모든 비동기 함수 보관 영역

import { supabase } from "@/lib/supabase";

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
