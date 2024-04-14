'use client';

import { Button, Checkbox, RadioGroup, Switch, ToggleButton } from '@review-canvas/admin-ui/components';

export default function Page(): React.ReactNode {
  return (
    <main>
      <Checkbox className="font-roboto">check</Checkbox>
      <RadioGroup
        label="dd"
        name="abc"
        orientation="horizontal"
      >
        <RadioGroup.Item value="a">a</RadioGroup.Item>
        <RadioGroup.Item value="b">b</RadioGroup.Item>
        <RadioGroup.Item value="c">c</RadioGroup.Item>
      </RadioGroup>
      <ToggleButton className="font-sans-kr font-medium w-52 h-8">한글</ToggleButton>
      <Switch>switch</Switch>
      <Button>버튼</Button>
    </main>
  );
}
