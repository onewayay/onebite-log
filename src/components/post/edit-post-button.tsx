// src < components > post > edit-post-button.tsx
// 포스트 수정 버튼 컴포넌트

import { Button } from "@/components/ui/button";
import { useOpenEditPostModal } from "@/store/post-editor-modal";
import type { PostEntity } from "@/types";

export default function EditPostButton(props: PostEntity) {
  const openEditPostModal = useOpenEditPostModal();

  // 수정 버튼 클릭 이벤트 핸들러
  const handleButtonClick = () => {
    openEditPostModal({
      postId: props.id,
      content: props.content,
      imageUrls: props.image_urls,
    });
  };

  return (
    <Button className="cursor-pointer" variant={"ghost"} onClick={handleButtonClick}>
      수정
    </Button>
  );
}
