'use client';

import {
  Checkbox,
  RadioGroup,
  Select,
  SolidButton,
  Switch,
  TextField,
  ToggleButton,
} from '@review-canvas/admin-ui/components';

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
      <SolidButton>버튼</SolidButton>
      <Select
        className="w-[300px]"
        placeholder="선택"
      >
        <Select.Item>설정1</Select.Item>
        <Select.Item>설정2</Select.Item>
        <Select.Item>설정3</Select.Item>
      </Select>
      <TextField
        label="필드"
        variant="underline"
        placeholder="이름"
      />
    </main>
  );
}

// const exampleItems = [
//   { id: 1, value: '설정1' },
//   { id: 2, value: '설정2' },
//   { id: 3, value: '설정3' },
// ];
