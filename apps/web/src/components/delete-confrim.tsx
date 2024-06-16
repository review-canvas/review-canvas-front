import WaringSvg from '@/assests/icon/icon-waring.svg';

interface ConfirmProps {
  deleteItem: () => void;
  onClose: () => void;
}

export default function DeleteConfirm({ deleteItem, onClose }: ConfirmProps) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <WaringSvg />
        <div className="relative text-center">
          <p>정말 삭제하시겠습니까?</p>
        </div>
        <div className="flex p-4 gap-8">
          <div className="rounded-lg border-2 border-indigo-500/20 bg-gray-900/70 text-white  px-4 py-1">
            <button
              onClick={onClose}
              type="button"
            >
              취소
            </button>
          </div>
          <div className="rounded-lg border-2 border-indigo-500/20 text-white bg-gray-600/70 px-4 py-1">
            <button
              onClick={deleteItem}
              type="button"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
