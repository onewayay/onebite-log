// src > components > layout > header > profile-button.tsx
// 헤더의 프로필 버튼 영역

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useSession } from "@/store/session";
import defaultAvatar from "@/assets/default-avatar.png";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router";
import { signOut } from "@/api/auth";

export default function ProfileButton() {
  const session = useSession();
  // 사용자의 프로필 정보 조회 비동기 함수를 관리하는 쿼리, 헷갈리지 않도록 profile로 이름 변경
  const { data: profile } = useProfileData(session?.user.id);

  if (!session) return null; // 세션값(로그인 정보)이 없다면 null값으로 아무것도 렌더링하지 않도록 함

  return (
    <Popover>
      <PopoverTrigger>
        <img src={profile?.avatar_url || defaultAvatar} className="h-6 w-6 cursor-pointer rounded-full object-cover" />
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col p-0">
        <PopoverClose asChild>
          <Link to={`/profile/${session.user.id}`}>
            <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">프로필</div>
          </Link>
        </PopoverClose>
        <PopoverClose asChild>
          <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm" onClick={signOut}>
            로그아웃
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
