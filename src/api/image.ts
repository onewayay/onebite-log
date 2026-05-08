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

// 특정 경로 밑에 있는 이미지를 삭제하는 함수
// user_id > post_id 경로 하위의 이미지를 모두 삭제
export async function deleteImagesInPath(path: string) {
  // 일단 매개변수로 받은 경로 아래의 모든 파일들을 다 불러옴. -> 그래야 어떤 파일들을 삭제할 건지 목록을 구할 수 있음.
  const { data: files, error: fetchFilesError } = await supabase.storage.from(BUCKET_NAME).list(path);

  // 기본 아바타 이미지(프로필 이미지)가 등록 된것이 없다면 삭제 요청 없이 그냥 return
  if (!files || files.length === 0) {
    return;
  }

  if (fetchFilesError) throw fetchFilesError;

  const { error: removeError } = await supabase.storage.from(BUCKET_NAME).remove(files.map((file) => `${path}/${file.name}`));

  if (removeError) throw removeError;
}
