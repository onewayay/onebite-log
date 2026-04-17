// src > root-route.tsx

import GlobalLayout from "@/components/layout/global-layout";
import GeustOnlyLayout from "@/components/layout/guest-only-layout";
import MemberOnlyLayout from "@/components/layout/member-only-layout";
import ForgetPasswordPage from "@/pages/forget-password-page";
import IndexPage from "@/pages/index-page";
import PostDetailPage from "@/pages/post-detail-page";
import ProfileDetailPage from "@/pages/profile-detail-page";
import ResetPasswordPage from "@/pages/reset-password-page";
import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";
import { Navigate, Route, Routes } from "react-router";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<GeustOnlyLayout />}>
          <Route path="/sign-in" element={<SignInPage />} /> {/* 로그인 페이지 */}
          <Route path="/sign-up" element={<SignUpPage />} /> {/* 회원가입 페이지 */}
          <Route path="/forget-password" element={<ForgetPasswordPage />} /> {/* 비밀번호 찾기 페이지 */}
        </Route>
        <Route element={<MemberOnlyLayout />}>
          <Route path="/" element={<IndexPage />} /> {/* 인덱스 페이지 */}
          <Route path="/post/:postId" element={<PostDetailPage />} /> {/* 게시물 상세 페이지 */}
          <Route path="/profile/:userId" element={<ProfileDetailPage />} /> {/* 프로필 상세 페이지 */}
          <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* 비밀번호 수정 페이지 */}
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
        {/* ㄴ 위에 설정한 경로가 아닌 다른 모든 경로로 접근할 경우 인덱스 페이지로 리다이렉트 */}
      </Route>
    </Routes>
  );
}
