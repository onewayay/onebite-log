// src > stor > profile-editor-modal.ts
// 전역으로 사용하는 프로필 에디터 모달의 상태를 관리하는 스토어

import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const useProfileEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: "ProfileEditorModalStore" },
  ),
);

export const useOpenProfileEditorModal = () => {
  const open = useProfileEditorModalStore((store) => store.actions.open);
  return open;
};

export const useProfileEditormodal = () => {
  const store = useProfileEditorModalStore();
  return store;
};
