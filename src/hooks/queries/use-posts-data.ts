// src > hooks > queries > use-poasts-data.ts
// 모든 포스트 조회 비동기 요청을 관리하는 쿼리

import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function usePostsData() {
  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: () => fetchPosts(),
  });
}
