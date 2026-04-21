// src > api > image.ts
// 포스트 이미지와 관련된 모든 비동기 요청을 관리하는 영역

import { BUCKET_NAME } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

// supabase 스토리지에 이미지를 업로드하는 비동기 함수
export async function uploadImage({ file, filePath }: { file: File; filePath: string }) {
  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file);

  if (error) throw error;

  // getPublicUrl -> 업로드된 파일의 주소를 반환하는 메서드
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
}
