import type { RadioGroupProps } from '@/types/components/radiogroup';

import React, { useState, useEffect } from 'react';

import Image from 'next/image';

function RadioGroup({ items, selectedId, onSelectedIdChange }: RadioGroupProps) {
  const [localSelectedId, setLocalSelectedId] = useState(selectedId);

  useEffect(() => {
    setLocalSelectedId(selectedId);
  }, [selectedId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSelectedId(event.target.value);
    onSelectedIdChange?.(event.target.value);
  };

  return (
    <div>
      {items.map((item) => (
        <label key={item.id}>
          <input
            type="radio"
            name="radioGroup"
            value={item.id}
            checked={localSelectedId === item.id}
            onChange={handleChange}
          />
          {item.imageSrc ? (
            <Image
              src={item.imageSrc}
              alt={item.name}
              style={{
                width: '50px',
                height: '50px',
              }}
            />
          ) : null}
          {item.name}
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;
