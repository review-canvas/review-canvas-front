'use client';

import { Checkbox, RadioGroup, ToggleButton } from '@review-canvas/admin-ui/components';

export default function Page(): React.ReactNode {
  return (
    <main>
      <Checkbox className="font-roboto">check</Checkbox>
      <RadioGroup>
        <RadioGroup.Item value="a">a</RadioGroup.Item>
        <RadioGroup.Item value="b">b</RadioGroup.Item>
      </RadioGroup>
      <ToggleButton className="font-sans-kr font-medium w-52 h-8">한글</ToggleButton>
    </main>
  );
}
