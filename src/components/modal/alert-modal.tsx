// src > components > modal > alert-modal.tsx

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlertModal } from "@/store/alert-modal";

export default function AlertModal() {
  const store = useAlertModal(); // alert modal store의 전체 값을 모두 불러옴

  if (!store.isOpen) return null;

  // 취소 버튼 클릭 이벤트 핸들러
  const handleCancleClick = () => {
    if (store.onNegative) store.onNegative();
    store.actions.close();
  };

  // 확인 버튼 클릭 이벤트 핸들러
  const handleActionClick = () => {
    if (store.onPositive) store.onPositive();
    store.actions.close();
  };

  return (
    <AlertDialog open={store.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{store.title}</AlertDialogTitle>
          <AlertDialogDescription>{store.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancleClick}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleActionClick}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
