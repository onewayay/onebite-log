// src > components > profile > edit-profile-button.tsx
// '프로필 수정' 버튼

import { Button } from "@/components/ui/button";
import { useOpenProfileEditorModal } from "@/store/profile-editor-modal";

export default function EditProfileButton() {
  // 프로필 수정 전역 모달 스토어의 open 액션 함수
  const openProfileEditorModal = useOpenProfileEditorModal();

  return (
    <Button variant={"secondary"} className="cursor-pointer" onClick={openProfileEditorModal}>
      프로필 수정
    </Button>
  );
}
