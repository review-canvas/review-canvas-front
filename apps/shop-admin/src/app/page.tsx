'use client';

import { Checkbox, ToggleButton } from '@review-canvas/admin-ui/components';

export default function Page(): React.ReactNode {
  return (
    <main>
      <Checkbox className="font-roboto">check</Checkbox>
      <ToggleButton className="font-sans-kr font-medium w-52 h-8">한글</ToggleButton>
    </main>
  );
}
