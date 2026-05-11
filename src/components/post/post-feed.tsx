// src < components > post > post-feed.tsx

import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import PostItem from "@/components/post/post-item";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts-data";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostFeed({ authorId }: { authorId?: string }) {
  // 무한 스크롤로 데이터를 나눠 불러오는 비동기 함수를 관리하는 쿼리. data의 값은 2차원 배열이다.
  // fetchNextPage -> 다음 페이지를 불러오도로 queryFn을 다시 호출하는 역할
  // isFetchingNextPage -> 다음 페이지를 불러오는 중이라면 true 아니라면 false. 무한스크롤로 추가 데이터 불러오는 로딩상태를 나타냄
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } = useInfinitePostsData(authorId);
  // 위 data는 쿼리 반환값에 의해 모든 포스트의 id 값들만 가지고 있다.

  // ref -> 관측할 대상 , inView -> 화면에 보이는지 여부 상태
  const { ref, inView } = useInView();

  // inView의 값이 바뀔 때 마다 실행
  useEffect(() => {
    if (inView) {
      // inView가 true일 경우(화면에 ref가 보일 경우) 데이터 추가
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) => page.map((postId) => <PostItem key={postId} postId={postId} type={"FEED"} />))}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
