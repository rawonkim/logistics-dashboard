"use client"; 

import { useRouter } from "next/navigation";

export default function DeleteButton({ trackingNumber }: { trackingNumber: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("정말 이 데이터를 삭제하시겠습니까?")) return;

    const res = await fetch(`/api/shipments/${trackingNumber}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // 성공하면 페이지 데이터를 새로고침합니다.
      router.refresh(); 
    } else {
      alert("삭제 실패 ㅠㅠ");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 font-bold ml-4"
    >
      Delete
    </button>
  );
}