// src > api > comment.ts
// 댓글과 관련된 모든 비동기 함수 보관 영역

import { supabase } from "@/lib/supabase";

// 새로운 댓글 추가 요청 비동기 함수
export async function createComment({ postId, content }: { postId: number; content: string }) {
  const { data, error } = await supabase
    .from("comment")
    .insert({
      post_id: postId,
      content: content,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
