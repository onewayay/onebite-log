// src > components > post > create-post-button.tsx

import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { useOpenAlertModal } from "@/store/alert-modal";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function DeletePostButton({ id }: { id: number }) {
  // alert modal 여는 전역 함수
  const openAlertModal = useOpenAlertModal();
  const navigate = useNavigate();

  // 포스트 생성 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 deletePost로 이름 설정
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onSuccess() {
      const pathname = window.location.pathname;
      if (pathname.startsWith(`/post/${id}`)) {
        // DETAIL 페이지에 있을 경우
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      toast.error("포스트 삭제에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  // 삭제하기 버튼 클릭 이벤트 핸들러
  const handleDeleteClick = () => {
    // 먼저 경고 모달을 하나 띄워서 정말 삭제할지 체크하기
    openAlertModal({
      title: "포스트 삭제",
      description: "삭제된 포스트는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => {
        // 포스트 삭제 요청
        deletePost(id);
      },
      onNegative: () => {},
    });
  };

  return (
    <Button className="cursor-pointer" variant={"ghost"} onClick={handleDeleteClick} disabled={isDeletePostPending}>
      삭제
    </Button>
  );
}
