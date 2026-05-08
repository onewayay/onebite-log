// src > components > modal > profile-editor-modal.tsx

import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useSession } from "@/store/session";
import defaultAvatar from "@/assets/default-avatar.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfileEditormodal } from "@/store/profile-editor-modal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import useUpdateProfile from "@/hooks/mutations/profile/use-update-profile";
import { toast } from "sonner";

type Image = {
  file: File;
  previewUrl: string;
};

export default function ProfileEditorModal() {
  const session = useSession();

  // 사용자의 프로필 정보 조회 비동기 함수를 관리하는 쿼리, 헷갈리지 않도록 profile로 이름 변경
  const { data: profile, error: fetchProfileError, isPending: isFetchProfilePending } = useProfileData(session?.user.id);

  // 프로필 수정 전역 모달 스토어
  const store = useProfileEditormodal();

  const {
    isOpen,
    actions: { close },
  } = store;

  // 프로필 수정 비동기 요청 관리하는 뮤테이션. 헷갈리지 않도록 updateProfile로 이름 설정
  const { mutate: updateProfile, isPending: isUpdateProfilePending } = useUpdateProfile({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      toast.error("프로필 수정에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const [avatarImage, setAvatarImage] = useState<Image | null>(null); // 아바타 이미지 상태 관리
  const [nickname, setNickname] = useState(""); // 닉네임 상태 관리
  const [bio, setBio] = useState(""); // 소개글 상태 관리
  const fileInputRef = useRef<HTMLInputElement>(null); // 이미지 선택 인풋 레퍼런스 객체

  // 모달이 닫힐 때 avatarImage의 previewUrl을 메모리에서 해제
  useEffect(() => {
    if (!isOpen) {
      if (avatarImage) {
        URL.revokeObjectURL(avatarImage.previewUrl);
      }
    }
  }, [isOpen]);

  // 기존 유저의 정보들을 state들의 기본값으로 초기화
  useEffect(() => {
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage(null);
    }
  }, [profile, isOpen]);

  // 수정하기 버튼 클릭 이벤트 핸들러
  const handleUpdateClick = () => {
    if (nickname.trim() === "") return;

    updateProfile({
      userId: session!.user.id,
      nickname,
      bio,
      avatarImageFile: avatarImage?.file,
    });
  };

  // 이미지 선택 이벤트 핸들러
  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    setAvatarImage({ file, previewUrl: URL.createObjectURL(file) });
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle>프로필 수정하기</DialogTitle>
        {fetchProfileError && <Fallback />}
        {isFetchProfilePending && <Loader />}
        {!fetchProfileError && !isFetchProfilePending && (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">프로필 이미지</div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleSelectImage}
                disabled={isUpdateProfilePending}
              />
              <img
                src={avatarImage?.previewUrl || profile.avatar_url || defaultAvatar}
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
                onClick={() => {
                  // 클릭하면 위의 fileInputRef로 이미지 선택창 열림
                  if (fileInputRef) fileInputRef.current?.click();
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">닉네임</div>
              <Input value={nickname} onChange={(e) => setNickname(e.target.value)} disabled={isUpdateProfilePending} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">소개</div>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} disabled={isUpdateProfilePending} />
            </div>

            <Button className="cursor-pointer" onClick={handleUpdateClick} disabled={isUpdateProfilePending}>
              수정하기
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
