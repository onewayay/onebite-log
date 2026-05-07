// src > components > profile > profile-detail.ts
// 프로필 상세 페이지 > 해당 유저의 프로필 정보 영역

import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import defaultAvatar from "@/assets/default-avatar.png";

export default function ProfileInfo({ userId }: { userId: string }) {
  // 프로필 정보 조회 비동기 요청을 관리하는 쿼리. 헷갈리지 않도록 profile로 이름 변경
  const { data: profile, error: fetchProfileError, isPending: isFetchingProfilePending } = useProfileData(userId);

  if (fetchProfileError) return <Fallback />;
  if (isFetchingProfilePending) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img src={profile.avatar_url || defaultAvatar} className="h-30 w-30 rounded-full object-cover" />
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile.nickname}</div>
        <div className="text-muted-foreground">{profile.bio}</div>
      </div>
    </div>
  );
}
