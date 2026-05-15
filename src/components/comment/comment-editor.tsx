// src < components > comment > comment-editor.tsx

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";
import { useUpdateComment } from "@/hooks/mutations/comment/use-update-comment";

type CreateMode = {
  type: "CREATE";
  postId: number;
};

type EditMode = {
  type: "EDIT";
  commentId: number;
  initialContent: string;
  onClose: () => void;
};

type ReplyMode = {
  type: "REPLY";
  postId: number;
  parentCommentId: number;
  rootCommentId: number;
  onClose: () => void;
};

type Props = CreateMode | EditMode | ReplyMode;

export default function CommentEditor(props: Props) {
  // 댓글 생성 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 createComment로 이름 설정
  const { mutate: createComment, isPending: isCreateCommentPending } = useCreateComment({
    onSuccess() {
      setContent(""); // 댓글 입력값 초기화
      if (props.type === "REPLY") props.onClose();
    },
    onError(error) {
      toast.error("댓글 추가에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  // 댓글 수정 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 updateComment로 이름 설정
  const { mutate: updateComment, isPending: isUpdateCommentPending } = useUpdateComment({
    onSuccess() {
      (props as EditMode).onClose(); // 수정이 끝났으니 CommentEditor 컴포넌트 닫히고 댓글 컨텐츠가 렌더링 되도록
    },
    onError(error) {
      toast.error("댓글 수정에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  // 댓글 내용 입력 상태 관리
  const [content, setContent] = useState("");

  // EDITMODE일 경우 content에 기존 댓글 내용 보여주도록 초기화
  useEffect(() => {
    if (props.type === "EDIT") {
      setContent(props.initialContent);
    }
  }, []);

  // 작성 버튼 클릭 이벤트 핸들러
  const handleSubmitClick = () => {
    if (content.trim() === "") return;

    // CREATEMODE 모드 일 경우 댓글 추가 비동기 요청
    if (props.type === "CREATE") {
      // 댓글 추가 비동기 요청
      createComment({ postId: props.postId, content });
    } else if (props.type === "REPLY") {
      // REPLY 모드 일 경우 댓댓글 생성 비동기 요청
      createComment({ postId: props.postId, content, parentCommentId: props.parentCommentId, rootCommentId: props.rootCommentId });
    } else {
      // EDITMODE 모드 일 경우 댓글 수정 비동기 요청

      // 댓글 수정 비동기 요청
      updateComment({ id: props.commentId, content });
    }
  };

  const isPending = isCreateCommentPending || isUpdateCommentPending;

  return (
    <div className="flex flex-col gap-2">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} disabled={isPending} />
      <div className="flex justify-end gap-2">
        {props.type === "EDIT" ||
          (props.type === "REPLY" && (
            <Button variant={"outline"} onClick={() => props.onClose()} disabled={isPending}>
              취소
            </Button>
          ))}
        <Button onClick={handleSubmitClick} disabled={isPending}>
          작성
        </Button>
      </div>
    </div>
  );
}
