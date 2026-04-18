// src > hooks > queries > use-profile-data.ts
// 프로필 정보 조회 비동기 요청을 관리하는 쿼리

import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useProfileData(userId?: string) {
  const session = useSession();
  const isMine = userId === session?.user.id; // 나의 프로필 조회 요청인지 확인

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          // 나의 프로필을 조회한 경우 && 조회한 프로필의 데이터가 없을 경우
          return await createProfile(userId!);
        }
        throw error;
      }
    },
    enabled: !!userId, // useId가 없으면 아무일도 일어나지 않도록
  });
}
