// src > hooks > mutations > post > use-update-profile.ts
// 프로필 수정 비동기 요청을 관리하는 뮤테이션

import { updateProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import type { ProfileEntity, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateProfile(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedProfile) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 수정 내용 바로 반영되도록 캐시 데이터 조작
      queryClient.setQueryData<ProfileEntity>(QUERY_KEYS.profile.byId(updatedProfile.id), updatedProfile);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
