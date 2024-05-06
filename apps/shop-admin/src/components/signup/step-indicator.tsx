import tw, { styled } from 'twin.macro';

interface StepIndicatorProps {
  currentStep: string;
}

interface LiElementProps {
  isActive: boolean;
}

const Ul = styled.ul`
  ${tw`list-none flex justify-center items-center gap-14`}
`;

const Li = styled.li<LiElementProps>(({ isActive }) => [
  tw`relative text-[#B5B8D0]`,
  isActive && tw`text-main-secondary`,
  `
    &:not(:last-child)::after {
      content: '>';
      position: absolute;
      right: -1.8rem;
      color: #B5B8D0;
    }
    `,
]);

function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <Ul>
      <Li
        isActive={currentStep === 'step1'}
        key="step1"
      >
        1. 약관동의
      </Li>
      <Li
        isActive={currentStep === 'step2'}
        key="step2"
      >
        2. 정보입력
      </Li>
      <Li
        isActive={currentStep === 'step3'}
        key="step3"
      >
        3. 가입완료
      </Li>
    </Ul>
  );
}

export default StepIndicator;
