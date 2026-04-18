// src > api > profile.ts
// 프로필과 관련되 모든 비동기 요청을 관리하는 영역

import { supabase } from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";

// 프로필 정보 조회를 요청하는 비동기 함수
export async function fetchProfile(userId: string) {
  // from -> 어떤 테이블로부터 데이터를 불러올 건지
  // select -> 테이블의 어떤 컬럼들의 데이터를 불러올지 *는 모든 컬럼의 데이터
  // eq -> 인수의 값들이 동일한 데이터의 값들만 불러오도록 (아래는 id컬럼이 인수로 받은 userId와 동일한 값만 불러오도록 설정)
  // single -> 위에 있는 조건들에 일치하는 하나의 데이터만 불러오도록 설정
  const { data, error } = await supabase.from("profile").select("*").eq("id", userId).single();

  if (error) throw error;

  return data;
}

// 프로필을 생성을 요청하는 비동기 함수
export async function createProfile(userId: string) {
  // insert -> 새로운 데이터 추가. 인수로 프로필 데이터 넣기
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
