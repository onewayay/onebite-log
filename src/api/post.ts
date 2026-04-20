// src > api > post.ts
// 포스트와 관련된 모든 비동기 요청을 관리하는 영역

import { supabase } from "@/lib/supabase";

// 새로운 포스트 생성 비동기 함수
export async function createPost(content: string) {
  const { data, error } = await supabase.from("post").insert({
    content,
  });

  if (error) throw error;

  return data;
}
