// src > components > modal > post-editor-modal.tsx

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PostEditorModal() {
  const { isOpen, close } = usePostEditorModal();

  const [content, setContent] = useState(""); // textarea에 써지는 내용 상태
  const textareaRef = useRef<HTMLTextAreaElement>(null); // textarea COM 요소를 참조할 레퍼런스 객체

  // 모달 외부를 누르거나 x 버튼을 눌렀을 때 호출되는 이벤트 핸들러. 모달 닫는 기능
  const handleCloseModal = () => {
    close();
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
        />
        <Button variant={"outline"} className="cursor-pointer">
          <ImageIcon />
          이미지 추가
        </Button>
        <Button className="cursor-pointer">저장</Button>
      </DialogContent>
    </Dialog>
  );
}
