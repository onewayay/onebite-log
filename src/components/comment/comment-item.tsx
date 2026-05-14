// src < components > comment > comment-item.tsx

import { Link } from "react-router";
import defaultAvatar from "@/assets/default-avatar.png";
import type { NestedComment } from "@/types";
import { formatTimeAgo } from "@/lib/time";
import { useSession } from "@/store/session";
import { useState } from "react";
import CommentEditor from "@/components/comment/comment-editor";
import { useDeleteComment } from "@/hooks/mutations/comment/use-delete-comment";
import { toast } from "sonner";
import { useOpenAlertModal } from "@/store/alert-modal";

export default function CommentItem(props: NestedComment) {
  const session = useSession();

  const openAlertModal = useOpenAlertModal();

  // 댓글 삭제 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 deleteComment로 이름 설정
  const { mutate: deleteComment, isPending: isDeleteCommentPending } = useDeleteComment({
    onError(error) {
      toast.error("댓글 삭제에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const [isEditing, setisEditing] = useState(false); // 현재 수정 상태인지 상태 관리

  const [isReply, setIsReply] = useState(false); // 대댓글을 위한 '댓글'버튼 클릭했는지 여부 상태 관리

  // isEditing 상태 토글 함수
  const toggleIsEdition = () => {
    setisEditing(!isEditing);
  };

  // isReply 상태 토글 함수
  const toggleIsReply = () => {
    setIsReply(!isReply);
  };

  // 삭제 버튼 클릭 이벤트 핸들러
  const handleDeleteClick = () => {
    openAlertModal({
      title: "댓글 삭제",
      description: "삭제된 댓글은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => {
        // 댓글 삭제 비동기 요청
        deleteComment(props.id);
      },
    });
  };

  const isMine = props.author_id === session?.user.id; // 현재 댓글의 작성자가 나 자신인지 여부
  const isRooteComment = props.parentComment === undefined; // 현재 댓글이 일반 댓글인지(true) 대댓글인지(false) 여부 확인

  return (
    <div className={`flex flex-col gap-8 pb-5 ${isRooteComment ? "border-b" : "ml-6"}`}>
      <div className="flex items-start gap-4">
        <Link to={"#"}>
          <div className="flex h-full flex-col">
            <img className="h-10 w-10 rounded-full object-cover" src={props.author.avatar_url || defaultAvatar} />
          </div>
        </Link>
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">{props.author.nickname}</div>
          {isEditing ? (
            <CommentEditor type={"EDIT"} commentId={props.id} initialContent={props.content} onClose={toggleIsEdition} />
          ) : (
            <div>{props.content}</div>
          )}

          <div className="text-muted-foreground flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="cursor-pointer hover:underline" onClick={toggleIsReply}>
                댓글
              </div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div>{formatTimeAgo(props.created_at)}</div>
            </div>
            <div className="flex items-center gap-2">
              {isMine && (
                <>
                  <div className="cursor-pointer hover:underline" onClick={toggleIsEdition}>
                    수정
                  </div>
                  <div className="bg-border h-[13px] w-[2px]"></div>
                  <div className="cursor-pointer hover:underline" onClick={handleDeleteClick}>
                    삭제
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isReply && <CommentEditor type={"REPLY"} postId={props.post_id} parentCommentId={props.id} onClose={toggleIsReply} />}
      {props.children.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
