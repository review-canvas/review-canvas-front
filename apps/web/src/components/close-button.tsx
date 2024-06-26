interface CloseButtonProps {
  onClose: () => void;
}
export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      className="absolute top-3 right-3 z-10"
      onClick={onClose}
      type="button"
    >
      <svg
        className="bi bi-x-lg"
        fill="black"
        height="24"
        viewBox="0 0 16 16"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
      </svg>
    </button>
  );
}
