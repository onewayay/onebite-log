// src > hooks > queries > use-post-by-id-data.ts
// 하나의 포스트 조회 비동기 요청을 관리하는 쿼리

import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function usePostByIdData({ postId, type }: { postId: number; type: "FEED" | "DETAIL" }) {
  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById(postId),

    // type이 FEED일 때는 queryFn 실행 없이 캐싱된 데이터 사용, DETAIL일 경우 queryFn 실행해서 서버로 부터 데이터 불러오도록
    enabled: type === "FEED" ? false : true,
  });
}
