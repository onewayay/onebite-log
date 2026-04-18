// src > provider > session-provider.tsx
// 세션 관리 로직들을 관리하는 provider

import GlobalLoader from "@/components/global-loader";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { supabase } from "@/lib/supabase";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  // 사용자의 프로필 정보 조회 비동기 함수를 관리하는 쿼리, 헷갈리지 않도록 profile로 이름 변경
  // 왜 isLoading 쓰는가 -> QueryFn이 실행중이지 않을때는 false. 실행됭어서 데이터 불러오는 중에만 true.
  // isPending은 QueryFn의 실행여부와는 관계없이 그냥 프로필 데이터를 불러오지 못했다면 무조건 true. 로그인이전에 만약 session 데이터가 없으면 바로 true 되어버려서 무한 로딩 될거임
  const { data: profile, isLoading: isProfileLoading } = useProfileData(session?.user.id);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // event -> 현재 발생한 이벤트
      // session -> 업데이트된 세션 객체

      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}
