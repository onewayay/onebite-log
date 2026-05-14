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

// 특정 포스트의 모든 댓글 조회 요청 비동기 함수
export async function fetchComments(postId: number) {
  const { data, error } = await supabase
    .from("comment")
    .select("*, author: profile!author_id (*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

// 댓글 수정 요청 비동기 함수
export async function updateComment({ id, content }: { id: number; content: string }) {
  const { data, error } = await supabase
    .from("comment")
    .update({
      content,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// 댓글 삭제 요청 비동기 함수
export async function deleteComment(id: number) {
  const { data, error } = await supabase.from("comment").delete().eq("id", id).select().single();

  if (error) throw error;

  return data;
}
