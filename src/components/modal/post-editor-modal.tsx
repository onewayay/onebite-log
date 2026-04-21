// src > components > modal > post-editor-modal.tsx

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useSession } from "@/store/session";
import { ImageIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";

// 사용자 입력 이미지 타입
type Image = {
  file: File; // 파일 자체
  previewUrl: string; // 파일 미리보기 URL
};

export default function PostEditorModal() {
  const session = useSession();

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
  const [images, setImages] = useState<Image[]>([]); // 사용자가 입력한 이미지 상태

  const textareaRef = useRef<HTMLTextAreaElement>(null); // textarea DOM 요소를 참조할 레퍼런스 객체
  const fileInputRef = useRef<HTMLInputElement>(null); // input DOM 요소를 참조할 레퍼런스 객체

  // 모달 외부를 누르거나 x 버튼을 눌렀을 때 호출되는 이벤트 핸들러. 모달 닫는 기능
  const handleCloseModal = () => {
    close();
  };

  // 포스트 생성후 저장하기 버튼 클릭 이벤트 핸들러
  const handleCreatePostClick = () => {
    if (content.trim() === "") return;

    // 포스트 생성 요청
    createPost({ content, images: images.map((image) => image.file), userId: session!.user.id });
  };

  // 이미지 파일들이 선택되었을 때 실행할 이벤트 핸들러
  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // 사용자가 선택한 파일을 files 변수에 자바스크립트 배열 형태로 담아준다.
      const files = Array.from(e.target.files);

      // 각 파일을 순회하면서 images 상태에 저장
      // createObjectUrl -> 인수로 전달한 파일을 가져가서 임시용 URL 주소를 만들어서 반환해준다
      files.forEach((file) => {
        setImages((prev) => [...prev, { file, previewUrl: URL.createObjectURL(file) }]);
      });
    }

    // 입력값 초기화
    e.target.value = "";
  };

  // 이미지 삭제 버튼 클릭 이벤트 핸들러
  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) => prevImages.filter((item) => item.previewUrl !== image.previewUrl));
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
    setImages([]); // 이미지 상태 초기화
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
        <input type="file" accept="image/*" multiple className="hidden" ref={fileInputRef} onChange={handleSelectImages} />
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.previewUrl} className="basis-2/5">
                  <div className="relative">
                    <img src={image.previewUrl} className="h-full w-full rounded-sm object-cover" />
                    <div className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1" onClick={() => handleDeleteImage(image)}>
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Button
          variant={"outline"}
          className="cursor-pointer"
          disabled={isCreatePostPending}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
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
