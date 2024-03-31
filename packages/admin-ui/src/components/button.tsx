'use client';

export default function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      tw="bg-black text-white"
      type="button"
    >
      {children}
    </button>
  );
}
