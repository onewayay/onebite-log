// src > provider > session-provider.tsx
// 세션 관리 로직들을 관리하는 provider

import GlobalLoader from "@/components/global-loader";
import { supabase } from "@/lib/supabase";
import { useIsSessionLoaded, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // event -> 현재 발생한 이벤트
      // session -> 업데이트된 세션 객체

      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  return children;
}
