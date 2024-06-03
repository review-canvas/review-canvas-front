interface ConfirmProps {
  deleteItem: () => void;
  onClose: () => void;
}

export default function DeleteConfirm({ deleteItem, onClose }: ConfirmProps) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center p-8">
        <div className="relative text-center">
          <p>삭제된 정보는 다시 복구할 수 없습니다.</p>
          <p>
            정말 <span className="text-red-500">삭제</span>하시겠습니까?
          </p>
        </div>
        <div className="flex p-4 gap-8 mt-4">
          <button
            className="text-red-500"
            onClick={deleteItem}
            type="button"
          >
            확인
          </button>
          <button
            onClick={onClose}
            type="button"
          >
            취소
          </button>
        </div>
      </div>
    </main>
  );
}
