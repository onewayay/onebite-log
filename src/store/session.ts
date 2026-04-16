// src > store > session.ts
// 사용자의 세션 정보를 관리하는 스토어

import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  isLoaded: boolean;
  session: Session | null;
};

// 초기값
const initialState = {
  isLoaded: false,
  session: null,
} as State;

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        // 세션 데이터가 업데이트 되었을때 해당 세션을 보관, isLoaded true 변경
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: "sessionStore",
    },
  ),
);

// 세션 state에 접근하는 커스텀훅
export const useSession = () => {
  const session = useSessionStore((store) => store.session);
  return session;
};

// isLoaded 상태를 가져오는 커스텀훅
export const useIsSessionLoaded = () => {
  const isSessionLoaded = useSessionStore((store) => store.isLoaded);
  return isSessionLoaded;
};

// setSession을 불러오는 커스텀훅
export const useSetSession = () => {
  const setSession = useSessionStore((store) => store.actions.setSession);
  return setSession;
};
