// src > components > layout > global-layout.tsx

import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import defaultAvatar from "@/assets/default-avatar.png";
import { SunIcon } from "lucide-react";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 justify-between px-4">
          <Link to={"/"} className="flex items-center gap-2">
            <img src={logo} alt="한입 로그의 로고, 메세지 말풍선을 형상화한 모양" className="h-5" />
            <div className="font-bold">한입로그</div>
          </Link>
          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <img src={defaultAvatar} className="h-6" />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        <Outlet /> {/* 레이아웃이 적용될 페이지 컴포넌트가 들어갈 부분 */}
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">@onewayay</footer>
    </div>
  );
}
