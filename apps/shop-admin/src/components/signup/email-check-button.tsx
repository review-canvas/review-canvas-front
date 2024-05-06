import type { SizeLevel } from '@ui/types/theme';

import { SolidButton } from '@ui/components';

import { AuthService } from '@/service/auth';
import type { EmailCheckStatus } from '@/types/signup';

interface EmailCheckButtonProps {
  email: string;
  status: EmailCheckStatus;
  size?: SizeLevel;
  disabled?: boolean;
  onSetStatus: (status: EmailCheckStatus) => void;
}

type DuplicateCheckButtonProps = Required<Omit<EmailCheckButtonProps, 'status'>>;
type DuplicateCheckCompleteButtonProps = Required<Pick<EmailCheckButtonProps, 'size'>>;

function DuplicateCheckButton({ email, size, disabled, onSetStatus }: DuplicateCheckButtonProps) {
  const handlePress = async () => {
    try {
      const isDuplicate = await AuthService.isEmailDuplicate(email);
      onSetStatus(isDuplicate ? 'duplicate' : 'checked');

      if (isDuplicate) {
        // eslint-disable-next-line no-alert -- requre alert
        alert('이미 존재하는 이메일입니다. 다른 이메일로 다시 시도해 주세요.');
      }
    } catch (err) {
      // eslint-disable-next-line no-console -- track stace
      console.error(err);
      // eslint-disable-next-line no-alert -- require alert
      alert('일시적으로 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <SolidButton
      variant={disabled ? 'gray' : 'primary'}
      size={size}
      isDisabled={disabled}
      onPress={() => {
        void handlePress();
      }}
    >
      중복 확인
    </SolidButton>
  );
}

function DuplicateCheckCompleteButton({ size }: DuplicateCheckCompleteButtonProps) {
  return (
    <SolidButton
      variant="gray"
      size={size}
      isDisabled
    >
      확인 완료
    </SolidButton>
  );
}

function EmailCheckButton({ email, status, size = 'sm', disabled = false, onSetStatus }: EmailCheckButtonProps) {
  switch (status) {
    case 'unchecked':
    case 'duplicate':
      return (
        <DuplicateCheckButton
          email={email}
          size={size}
          disabled={disabled}
          onSetStatus={onSetStatus}
        />
      );

    case 'checked':
      return <DuplicateCheckCompleteButton size={size} />;
  }
}

export default EmailCheckButton;
