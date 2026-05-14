// src < components > comment > comment-item.tsx

import { Link } from "react-router";
import defaultAvatar from "@/assets/default-avatar.png";
import type { Comment } from "@/types";
import { formatTimeAgo } from "@/lib/time";
import { useSession } from "@/store/session";
import { useState } from "react";
import CommentEditor from "@/components/comment/comment-editor";

export default function CommentItem(props: Comment) {
  const session = useSession();
  const isMine = props.author_id === session?.user.id; // 현재 댓글의 작성자가 나 자신인지 여부

  const [isEditing, setisEditing] = useState(false); // 현재 수정 상태인지 상태 관리

  // isEditing 상태 토글 함수
  const toggleIsEdition = () => {
    setisEditing(!isEditing);
  };

  return (
    <div className={"flex flex-col gap-8 border-b pb-5"}>
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
              <div className="cursor-pointer hover:underline">댓글</div>
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
                  <div className="cursor-pointer hover:underline">삭제</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
