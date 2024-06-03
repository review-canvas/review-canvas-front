interface PaginationProps {
  page: number;
  totalPages: number;
  onPage: (page: number) => unknown;
}

export default function Pagination(props: PaginationProps) {
  const { page, totalPages, onPage } = props;

  return (
    <div className="flex gap-2 justify-center ">
      <button
        disabled={page === 0}
        onClick={() => {
          onPage(page - 1);
        }}
        type="button"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          aria-pressed={i === page}
          className={'text-gray-500 [&[aria-pressed="true"]]:text-black cursor-pointer'}
          key={i}
          onClick={() => {
            onPage(i);
          }}
          type="button"
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={page === totalPages - 1}
        onClick={() => {
          onPage(page + 1);
        }}
        type="button"
      >
        Next
      </button>
    </div>
  );
}
