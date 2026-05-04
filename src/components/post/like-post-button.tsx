// src > components > post > like-post-button.tsx
// 포스트 좋아요 버튼

import useTogglePostLike from "@/hooks/mutations/post/use-toggle-post-like";
import { useSession } from "@/store/session";
import { HeartIcon } from "lucide-react";
import { toast } from "sonner";

export default function LikePostButton({ id, likeCount }: { id: number; likeCount: number }) {
  const session = useSession();

  // 좋아요 토글 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 togglePostLike로 이름 설정
  const { mutate: togglePostLike, isPending } = useTogglePostLike({
    // onSuccess, 성공시 특별히 ui에서 할 일은 없다. 생략
    onError: (error) => {
      toast.error("좋아요 오청에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  // 좋아요(하트) 버튼 클릭 이벤트 핸들러
  const handleLikeClick = () => {
    togglePostLike({ postId: id, userId: session!.user.id });
  };

  return (
    <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm" onClick={handleLikeClick}>
      <HeartIcon className="h-4 w-4" />
      <span>{likeCount}</span>
    </div>
  );
}
