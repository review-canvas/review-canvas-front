'use client';

import { Checkbox, RadioGroup, Select, Switch, TextField, ToggleButton } from '@review-canvas/admin-ui/components';

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
      <ToggleButton
        className="font-sans-kr font-medium w-52 h-8"
        size="md"
      >
        한글
      </ToggleButton>
      <Switch>switch</Switch>
      <Select
        className="w-[300px]"
        placeholder="선택"
      >
        <Select.Item>설정1</Select.Item>
        <Select.Item>설정2</Select.Item>
        <Select.Item>설정3</Select.Item>
      </Select>
      <form>
        <TextField
          label="필드"
          leftIcon={<span>asd</span>}
          placeholder="이름"
          variant="underline"
        />
      </form>
      <div>{process.env.NEXT_PUBLIC_CAFE24_REDIRECT_URI}</div>
    </main>
  );
}

// const exampleItems = [
//   { id: 1, value: '설정1' },
//   { id: 2, value: '설정2' },
//   { id: 3, value: '설정3' },
// ];
