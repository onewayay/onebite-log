// src > pages > reset-password-page.tsx
// 비밀번호 재설정을 위한 이메일 인증을 거치고 리디렉션되어 실제로 비밀번호 변경 요청을 보내는 페이지

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUpdatePassword from "@/hooks/mutations/use-update-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const navigate = useNavigate();

  // 비밀번호 재설정 비동기 요청을 관리하는 뮤테이션. 헷갈리지 않도록 updatePassword로 이름 설정
  const { mutate: updatePassword, isPending: isUpdatePasswordPending } = useUpdatePassword({
    onSuccess: () => {
      toast.info("비밀번호가 성공적으로 변경되었습니다.", {
        position: "top-center",
      });

      navigate("/"); // 성공시 인덱스 페이지로 이동시킴
    },
    onError(error) {
      const message = generateErrorMessage(error);

      toast.error(message, {
        position: "top-center",
      });

      setPassword("");
    },
  });

  // 비밀번호 변경하기 버튼 이벤트 핸들러
  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;

    // 비밀번호 변경 요청
    updatePassword(password);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호 재설정하기</div>
        <div className="text-muted-foreground">새로운 비밀번호를 입력하세요.</div>
      </div>
      <Input
        type="password"
        placeholder="password"
        className="py-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isUpdatePasswordPending}
      />
      <Button className="w-full" onClick={handleUpdatePasswordClick} disabled={isUpdatePasswordPending}>
        비밀번호 변경하기
      </Button>
    </div>
  );
}
