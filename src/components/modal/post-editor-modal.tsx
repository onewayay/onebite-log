// src > components > modal > post-editor-modal.tsx

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function PostEditorModal() {
  const { isOpen, close } = usePostEditorModal(); // 모달 열림상태, 닫는기능 전역 관리

  // 포스트 생성 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 createPost로 이름 설정
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      close();
    },
    onError: () => {
      toast.error(" 포스트 생성에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const [content, setContent] = useState(""); // textarea에 써지는 내용 상태
  const textareaRef = useRef<HTMLTextAreaElement>(null); // textarea COM 요소를 참조할 레퍼런스 객체

  // 모달 외부를 누르거나 x 버튼을 눌렀을 때 호출되는 이벤트 핸들러. 모달 닫는 기능
  const handleCloseModal = () => {
    close();
  };

  // 포스트 생성후 저장하기 버튼 클릭 이벤트 핸들러
  const handleCreatePostClick = () => {
    if (content.trim() === "") return;

    // 포스트 생성 요청
    createPost(content);
  };

  // textarea 내용에 따라 textarea 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 일단 높이값 한번 초기화
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // 현재 높이로 변경
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) return;
    textareaRef.current?.focus(); // 모달이 열릴 때 textarea에 포커스 되도록 설정
    setContent(""); // 모달이 열릴 때 textarea 내용 초기화
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          ref={textareaRef}
          placeholder="무슨 일이 있었나요?"
          value={content}
          className="max-h-125 min-h-25 focus:outline-none"
          onChange={(e) => setContent(e.target.value)}
          disabled={isCreatePostPending}
        />
        <Button variant={"outline"} className="cursor-pointer" disabled={isCreatePostPending}>
          <ImageIcon />
          이미지 추가
        </Button>
        <Button className="cursor-pointer" onClick={handleCreatePostClick} disabled={isCreatePostPending}>
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
