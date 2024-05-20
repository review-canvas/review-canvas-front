import { useEffect, useState } from 'react';

import { ColorPicker, Select } from '@ui/components';

import { SettingDesignService } from '@/service/setting/design';

import DesignUnitTextField from '../design-unit-text-field';

interface FontControllerProps {
  name: string;
  size: string;
  bold: string;
  color: string;
  onNameChange: (_name: string) => void;
  onSizeChange: (_size: string) => void;
  onBoldChange: (_bold: string) => void;
  onColorChange: (_color: string) => void;
}

function FontController({
  name,
  size,
  bold,
  color,
  onNameChange,
  onSizeChange,
  onBoldChange,
  onColorChange,
}: FontControllerProps) {
  const [fontNameList, setFontNameList] = useState<string[]>(['noto-sans-kr']);
  const [fontBoldList, setFontBoldList] = useState<string[]>(['400']);

  const getFontInfo = async () => {
    try {
      const fontInfo = await SettingDesignService.getFontInfo();
      const { fontNames, fontBolds } = fontInfo;

      setFontNameList(fontNames);
      setFontBoldList(fontBolds);
    } catch (error) {
      // eslint-disable-next-line no-console -- track error
      console.error('Font 정보 조회에 실패했습니다 : ', error);
      // eslint-disable-next-line no-alert -- required alert
      alert('일시적으로 폰트 정보를 조회하지 못하고 있습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    void getFontInfo();
  }, []);

  return (
    <div tw="w-full flex items-center gap-4 flex-wrap [& .react-aria-Label]:text-sm [& .react-aria-Label]:text-[#9692A7]">
      <Select
        label="구글 폰트"
        selectedKey={name}
        defaultSelectedKey={name}
        onSelectionChange={(key) => {
          onNameChange(key as string);
        }}
      >
        {fontNameList.map((_name) => {
          return (
            <Select.Item
              key={_name}
              id={_name}
              tw="bg-sub-secondary rounded-md text-sm"
            >
              {_name}
            </Select.Item>
          );
        })}
      </Select>

      <DesignUnitTextField
        type="FONT"
        label="폰트 사이즈"
        value={size}
        onChange={(_value) => {
          onSizeChange(_value);
        }}
      />

      <Select
        label="폰트 두께"
        selectedKey={bold}
        defaultSelectedKey={bold}
        onSelectionChange={(key) => {
          onBoldChange(key as string);
        }}
      >
        {fontBoldList.map((_bold) => {
          return (
            <Select.Item
              key={_bold}
              id={_bold}
              tw="bg-sub-secondary rounded-md text-sm"
            >
              {_bold}
            </Select.Item>
          );
        })}
      </Select>

      <ColorPicker
        color={color}
        onChange={(_value) => {
          onColorChange(_value);
        }}
      />
    </div>
  );
}

export default FontController;
