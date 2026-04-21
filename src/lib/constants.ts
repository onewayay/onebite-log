// src> lib > constants.ts
// 상수들을 보관하는 영역

// 쿼리키 팩토리
export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "all"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
};

// 이미지 보관하는 스토리지 버킷 이름
export const BUCKET_NAME = "uploads";
