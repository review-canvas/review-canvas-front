interface SettingItemProps {
  children?: Readonly<React.ReactNode>;
}

const SettingItem: React.FC<SettingItemProps> & {
  Container: React.FC<SettingItemProps>;
  Title: React.FC<SettingItemProps>;
  Caption: React.FC<SettingItemProps>;
  Content: React.FC<SettingItemProps>;
} = ({ children }) => {
  return <div tw="flex gap-9 px-3 py-6 border-b-[1px] border-b-main-quaternary">{children}</div>;
};

function ContainerComponent({ children }: SettingItemProps) {
  return <div tw="flex basis-1/3 flex-col gap-1">{children}</div>;
}

function TitleComponent({ children }: SettingItemProps) {
  return <div tw="text-xl font-medium break-keep">{children}</div>;
}

function CaptionComponent({ children }: SettingItemProps) {
  return <div tw="text-sm text-stone-400 font-medium break-keep">{children}</div>;
}

function ContentComponent({ children }: SettingItemProps) {
  return <div tw="w-full flex basis-2/3 items-center">{children}</div>;
}

SettingItem.displayName = 'SettingItem';
ContainerComponent.displayName = 'SettingItem.Container';
TitleComponent.displayName = 'SettingItem.Title';
CaptionComponent.displayName = 'SettingItem.Caption';
ContentComponent.displayName = 'SettingItem.Content';

SettingItem.Container = ContainerComponent;
SettingItem.Title = TitleComponent;
SettingItem.Caption = CaptionComponent;
SettingItem.Content = ContentComponent;

export default SettingItem;
