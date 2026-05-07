// src > pages > profile-detail-page.tsx

import PostFeed from "@/components/post/post-feed";
import ProfileInfo from "@/components/profile/profile-info";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

export default function ProfileDetailPage() {
  const params = useParams(); // 해당 상세페이지에 저장되는 모든 파라미터 값
  const userId = params.userId; // 해당 페이지에 userId로 전달되는 파라미터 값

  // 페이지가 마운트 되었을 때 스크롤이 최상단으로 이동하도록 처리
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  if (!userId) return <Navigate to={"/"} replace />; // 파라미터로 전달된 userId 값이 없다면 인덱스페이지로 이동 + 뒤로가기 방지

  return (
    <div className="flex flex-col gap-10">
      <ProfileInfo userId={userId} />
      <div className="border-b"></div>
      <PostFeed authorId={userId} />
    </div>
  );
}
