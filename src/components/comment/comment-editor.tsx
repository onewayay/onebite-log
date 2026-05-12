// src < components > comment > comment-editor.tsx

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";

export default function CommentEditor({ postId }: { postId: number }) {
  // 댓글 생성 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 createComment로 이름 설정
  const { mutate: createComment, isPending: isCreateCommentPending } = useCreateComment({
    onSuccess() {
      setContent(""); // 댓글 입력값 초기화
    },
    onError(error) {
      toast.error("댓글 추가에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  // 댓글 내용 입력 상태 관리
  const [content, setContent] = useState("");

  // 작성 버튼 클릭 이벤트 핸들러
  const handleSubmitClick = () => {
    if (content.trim() === "") return;

    // 댓글 추가 비동기 요청
    createComment({ postId, content });
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="flex justify-end">
        <Button onClick={handleSubmitClick}>작성</Button>
      </div>
    </div>
  );
}
