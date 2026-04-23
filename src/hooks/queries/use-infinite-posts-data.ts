// src > hooks > queries > use-infinite-posts-data.ts
// 무한스크롤을 위한 포스트 조회 비동기 요청을 관리하는 쿼리

import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinitePostsData() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE; // 불러오기 시작할 데이터 순서
      const to = from + PAGE_SIZE - 1; // 마지막으로 불러올 데이터 순서

      const posts = await fetchPosts({ from, to });
      return posts;
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPage.length;
    },
  });
}
