import type { ReviewListStyle } from '@/contexts/style/review-list';

interface OrderSelectorProps<T extends string> {
  orders: {
    value: T;
    label: string;
  }[];
  orderBy: T;
  type: ReviewListStyle['orderSelectorStyle'];
  onSelect: (order: T) => void;
}

export function OrderSelector<T extends string>({ orders, orderBy, type, onSelect }: OrderSelectorProps<T>) {
  return (
    <div className="flex gap-1 items-center">
      {type === 'dropdown' ? (
        <select
          name="order"
          onChange={(evt) => {
            onSelect(evt.currentTarget.value as T);
          }}
          value={orderBy}
        >
          {orders.map((it) => (
            <option
              key={it.value}
              value={it.value}
            >
              {it.label}
            </option>
          ))}
        </select>
      ) : (
        orders.map((it) => (
          <label
            className="relative text-gray-500 checked:text-black has-[:checked]:text-black cursor-pointer"
            key={it.value}
          >
            <input
              checked={it.value === orderBy}
              className="sr-only"
              name="order"
              onChange={(evt) => {
                onSelect(evt.currentTarget.value as T);
              }}
              type="radio"
              value={it.value}
            />
            {it.label}
          </label>
        ))
      )}
    </div>
  );
}
