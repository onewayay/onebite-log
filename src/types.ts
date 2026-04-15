// src > types.ts

import type { Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

// mutation의 callbacks 타입
export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
