// src > pages > sign-up-page.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSignUp from "@/hooks/mutations/use-sign-up";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SignUpPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  // 회원가입 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 signUp으로 이름 설정
  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onError: (error) => {
      const message = generateErrorMessage(error); // 한글화 에러 메세지 생성하는 함수로 error를 한글화

      // 회원가입이 실패했을 경우 toast 메세지로 에러 메세지 보여줌
      toast.error(message, {
        position: "top-center",
      });
    },
  });

  // 회원가입 버튼 클릭 이벤트 핸들러
  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    // supabase 서버로 회원가입 보내기
    // 회원가입을 보내는 비동기 함수 만들어서 작업
    signUp({ email, password });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          placeholder="example@abc.com"
          className="py-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSignUpPending}
        />
        <Input
          type="password"
          placeholder="password"
          className="py-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSignUpPending}
        />
      </div>
      <div>
        <Button className="w-full" onClick={handleSignUpClick} disabled={isSignUpPending}>
          회원가입
        </Button>
      </div>
      <div>
        <Link to={"/sign-in"} className="text-muted-foreground hover:underline">
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
