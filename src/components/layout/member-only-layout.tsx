// src > components > layout > member-only-layout.tsx
// 로그인 완료한 상용자에 대한 레이아웃

import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function MemberOnlyLayout() {
  const session = useSession();

  // 사용자의 세션 데이터가 없다면 (로그인하지 않았다면) 로그인 페이지로 리디렉션
  if (!session) return <Navigate to={"/sign-in"} replace={true} />;

  return <Outlet />;
}
