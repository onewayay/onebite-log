// src > api > post.ts
// 포스트와 관련된 모든 비동기 요청을 관리하는 영역

import { uploadImage } from "@/api/image";
import { supabase } from "@/lib/supabase";
import type { PostEntity } from "@/types";

// 모든 포스트 조회 요청 비동기 함수
export async function fetchPosts() {
  const { data, error } = await supabase.from("post").select("*, author: profile!author_id (*)").order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

// 새로운 포스트 생성 비동기 함수
export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// 포스트 생성과 함께 이미지도 함께 업로드하는 전체 흐름을 처리하는 비동기 함수
// 흐름 => 포스트 생성 → 생성된 포스트 id 값을 이용해서 스토리지에 이미지 업로드 → 업로드 된 이미지 URL을 다시 포스트에 업데이트
export async function createPostWithImages({ content, images, userId }: { content: string; images: File[]; userId: string }) {
  // 1. 새로운 포스트 생성
  const post = await createPost(content);

  if (images.length === 0) return post; // 이미지 없이 포스트 생성하는 경우

  try {
    // 2. 생성된 포스트의 id를 이용해서 이미지를 스토리지의 경로에 맞게 업로드
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExtension = image.name.split(".").pop() || "webp"; // 파일 확장자 추출. 확장자가 없다면 webp로
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`; // 저장될 파일 이름 지정. 절대 겹치면 안된다.
        const filePath = `${userId}/${post.id}/${fileName}`; // 저장될 경로

        return uploadImage({
          file: image,
          filePath,
        });
      }),
    );

    // 3. 포스트 테이블 업데이트
    const updatedPost = await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });

    return updatedPost;
  } catch (error) {
    // 이미지 업로드중 예외로 실패할 경우 1번에서 만든 포스트 삭제
    await deletePost(post.id);

    throw error;
  }
}

// 포스트 업데이트 비동기 함수
// 업데이트 시 모든 내용을 다 업데이트하지 않고 post의 일부 내용만 업데이트하기에 Partial<T>을 이용해서 post의 프로퍼티들을 선택적 프로퍼티로 변환
// + id는 꼭 전될되어야 하기에 id는 반드시 있도록 설정
export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase.from("post").update(post).eq("id", post.id).select().single();

  if (error) throw error;

  return data;
}

// 포스트 삭제하는 비동기 함수
export async function deletePost(id: number) {
  const { data, error } = await supabase.from("post").delete().eq("id", id).select().single();

  if (error) throw error;

  return data;
}
