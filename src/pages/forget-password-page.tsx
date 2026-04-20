// src > pages > forget-password-page.tsx
// 비밀번호 재설정을 위한 인증 메일 보내는 페이지

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestPasswordResetEmail } from "@/hooks/mutations/auth/use-request-password-reset-email";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState(""); // 이메일 상태

  // 비밀번호 재설정 인증 메일 발송 비동기 요청을 관리하는 뮤테이션. 헷갈리지 않도록 requestPasswordResetEmail로 이름 설정
  const { mutate: requestPasswordResetEmail, isPending: isRequestPasswordResetEmailPending } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toast.info("인증 메일이 잘 발송되었습니다.", {
        position: "top-center",
      });
      setEmail("");
    },
    onError: (error) => {
      const message = generateErrorMessage(error); // 에러 메세지 한글화

      toast.error(message, {
        position: "top-center",
      });
      setEmail("");
    },
  });

  // 인증 메일 요청하기 버튼 클릭 이벤트 핸들러
  const handleSendEmailClick = () => {
    if (email.trim() === "") return;

    // supabase 서버에게 인증 메일 요청
    requestPasswordResetEmail(email);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호를 잊으셨나요?</div>
        <div className="text-muted-foreground">이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.</div>
      </div>
      <Input
        placeholder="example@abc.com"
        className="py-6"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isRequestPasswordResetEmailPending}
      />
      <Button className="w-full" onClick={handleSendEmailClick} disabled={isRequestPasswordResetEmailPending}>
        인증 메일 요청하기
      </Button>
    </div>
  );
}
