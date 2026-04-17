// src > components > layout > guset-only-layout.tsx
// 로그인 하지 않은 상용자에 대한 레이아웃

import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function GeustOnlyLayout() {
  const session = useSession();

  // 사용자의 세션 데이터가 있다면 (로그인 했다면) 인덱스 페이지로 리디렉션
  if (session) return <Navigate to={"/"} replace={true} />;

  return <Outlet />;
}
