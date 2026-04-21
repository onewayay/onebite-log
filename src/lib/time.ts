// src > lib > time.ts

// 인수로 받은 시간(created_at)이 현재로부터 얼마나 지났는지 계산하는 함수
export function formatTimeAgo(time: Date | string | number) {
  const start = new Date(time); // 인수로 받은 created_at이 만들어진 시간
  const end = new Date(); // 현재 시간

  const secondDiff = Math.floor(end.getTime() - start.getTime()) / 1000;

  if (secondDiff < 60) return "방금 전";

  const minuteDiff = Math.floor(secondDiff / 60);

  if (minuteDiff < 60) return `${minuteDiff}분 전`;

  const hourDiff = Math.floor(minuteDiff / 60);

  if (hourDiff < 24) return `${hourDiff}시간 전`;

  const dayDiff = Math.floor(hourDiff / 24);
  return `${dayDiff}일 전`;
}
