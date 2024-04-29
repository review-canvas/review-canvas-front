interface SettingLayoutProps {
  children: Readonly<React.ReactNode>;
}

const SettingLayout: React.FC<SettingLayoutProps> & {
  Title: React.FC<SettingLayoutProps>;
  Content: React.FC<SettingLayoutProps>;
  Footer: React.FC<SettingLayoutProps>;
  Divider: React.FC;
} = ({ children }) => {
  return <div>{children}</div>;
};

function TitleComponent({ children }: SettingLayoutProps) {
  return (
    <div tw="pl-3 py-5 text-xl text-main-primary font-semibold break-keep border-b-[1px] border-b-main-quaternary">
      {children}
    </div>
  );
}

function ContentComponent({ children }: SettingLayoutProps) {
  return <div>{children}</div>;
}

function FooterComponent({ children }: SettingLayoutProps) {
  return <div tw="flex mt-14 gap-3">{children}</div>;
}

function DividerComponent() {
  return <div tw="border-[1px] border-black" />;
}

SettingLayout.displayName = 'SettingLayout';
TitleComponent.displayName = 'SettingLayout.Title';
ContentComponent.displayName = 'SettingLayout.Content';
FooterComponent.displayName = 'SettingLayout.Footer';
DividerComponent.displayName = 'SettingLayout.Divider';

SettingLayout.Title = TitleComponent;
SettingLayout.Content = ContentComponent;
SettingLayout.Footer = FooterComponent;
SettingLayout.Divider = DividerComponent;

export default SettingLayout;
