interface StarProps {
  star: number;
  setStar: (star: number) => void;
}

export function Star({ star, setStar }: StarProps) {
  const StarArrary = [1, 2, 3, 4, 5];

  return StarArrary.map((it) => (
    <div key={it}>
      <button
        onClick={() => {
          setStar(it);
        }}
        type="button"
      >
        <svg
          fill="none"
          height="16"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.56795 14.943C3.18652 15.141 2.7537 14.794 2.83077 14.351L3.65096 9.62118L0.169623 6.26529C-0.155486 5.9513 0.0134919 5.37732 0.449276 5.31532L5.28935 4.61935L7.44752 0.29249C7.64219 -0.0974968 8.16888 -0.0974968 8.36355 0.29249L10.5217 4.61935L15.3618 5.31532C15.7976 5.37732 15.9666 5.9513 15.6405 6.26529L12.1601 9.62118L12.9803 14.351C13.0574 14.794 12.6246 15.141 12.2431 14.943L7.90405 12.6871L3.56795 14.943Z"
            fill={it <= star ? '#FBB230' : '#E1E1E1'}
          />
        </svg>
      </button>
    </div>
  ));
}
