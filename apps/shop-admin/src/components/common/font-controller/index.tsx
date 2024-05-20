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
    <div tw="w-full flex items-start gap-4 flex-wrap [& .react-aria-Label]:text-sm [& .react-aria-Label]:text-[#9692A7]">
      <div tw="inline-flex items-start w-1/4 basis-1/4 [& > *]:w-full [& > *]:leading-[0] gap-1">
        <Select
          label="구글 폰트"
          selectedKey={name}
          defaultSelectedKey={name}
          onSelectionChange={(key) => {
            onNameChange(key as string);
          }}
          tw="inline-flex flex-col [& .react-aria-Button]:py-[7px] gap-1"
        >
          {fontNameList.map((_name) => {
            return (
              <Select.Item
                key={_name}
                id={_name}
                style={SelectItemStyles}
              >
                {_name}
              </Select.Item>
            );
          })}
        </Select>
      </div>

      <div tw="inline-flex items-start w-[15%] basis-[15%] [& > *]:w-full [& > *]:gap-1">
        <DesignUnitTextField
          type="FONT"
          label="폰트 사이즈"
          value={size}
          onChange={(_value) => {
            onSizeChange(_value);
          }}
        />
      </div>

      <div tw="inline-flex items-start w-1/6 basis-1/6 [& > *]:w-full [& > *]:leading-[0] gap-1">
        <Select
          label="폰트 두께"
          selectedKey={bold}
          defaultSelectedKey={bold}
          onSelectionChange={(key) => {
            onBoldChange(key as string);
          }}
          tw="inline-flex flex-col [& .react-aria-Button]:py-[7px] gap-1"
        >
          {fontBoldList.map((_bold) => {
            return (
              <Select.Item
                key={_bold}
                id={_bold}
                style={SelectItemStyles}
              >
                {_bold}
              </Select.Item>
            );
          })}
        </Select>
      </div>

      <div tw="inline-flex items-start w-1/5 basis-1/5 [& > *]:w-full">
        <ColorPicker
          color={color}
          onChange={(_value) => {
            onColorChange(_value);
          }}
          label="폰트 색상"
        />
      </div>
    </div>
  );
}

export default FontController;

const SelectItemStyles = {
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  borderRadius: '0.375rem',
  backgroundColor: '#F4F5FB',
};
