interface FilterProps<T extends string> {
  selectedFilter: T;
  filters: {
    value: T;
    label: string;
  }[];
  onFilter: (filter: T) => void;
}

export function Filter<T extends string>({ filters, selectedFilter, onFilter }: FilterProps<T>) {
  return (
    <div className="flex gap-1 items-center">
      {filters.map((it) => (
        <label
          className="relative text-gray-500 checked:text-black has-[:checked]:text-black cursor-pointer"
          key={it.value}
        >
          <input
            checked={it.value === selectedFilter}
            className="sr-only"
            name="filter"
            onChange={(evt) => {
              onFilter(evt.currentTarget.value as T);
            }}
            type="radio"
            value={it.value}
          />
          {it.label}
        </label>
      ))}
    </div>
  );
}
