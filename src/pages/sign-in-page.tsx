// src > pages > sign-in-page.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  // 로그인 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 signInWithPassword로 이름 설정
  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } = useSignInWithPassword({
    onError: (error) => {
      const message = generateErrorMessage(error); // 한글화 에러 메세지 생성하는 함수로 error를 한글화

      // 로그인이 실패했을 경우 toast 메세지로 에러 메세지 보여줌
      toast.error(message, {
        position: "top-center",
      });

      setPassword("");
    },
  });
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } = useSignInWithOAuth({
    onError: (error) => {
      const message = generateErrorMessage(error); // 한글화 에러 메세지 생성하는 함수로 error를 한글화

      // 로그인이 실패했을 경우 toast 메세지로 에러 메세지 보여줌
      toast.error(message, {
        position: "top-center",
      });
    },
  }); // 소셜 로그인 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 signInWithOAuth로 이름 설정

  // 로그인 버튼 클릭 이벤트 핸들러
  const handleSignInWithPasswordCLick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({ email, password });
  };
  // GitHub 계정으로 로그인 버튼 클릭 이벤트 핸들러
  const handleSignInWithGitHubCLick = () => {
    signInWithOAuth("github");
  };

  // 둘중 하나라도 Pending 상태면 IsPending 은 true로 Pending 상태 처리
  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          placeholder="example@abc.com"
          className="py-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <Input
          type="password"
          placeholder="password"
          className="py-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSignInWithPasswordCLick} disabled={isPending}>
          로그인
        </Button>
        <Button className="w-full" variant={"outline"} onClick={handleSignInWithGitHubCLick} disabled={isPending}>
          <img src={gitHubLogo} alt="깃허브 로고" className="h-4 w-4" />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={"/sign-up"} className="text-muted-foreground hover:underline">
          계정이 없으시다면? 회원가입
        </Link>
        <Link to={"/forget-password"} className="text-muted-foreground hover:underline">
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}
