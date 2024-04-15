import { Switch as AriaSwitch, type SwitchProps as AriaSwitchProps } from 'react-aria-components';

import { useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

interface SwitchProps extends Omit<AriaSwitchProps, 'children'> {
  children?: React.ReactNode;
}

export default function Switch({ children, ...props }: SwitchProps) {
  const theme = useTheme();

  return (
    <AriaSwitch {...props}>
      {({ isSelected }) => (
        <>
          <svg
            fill="none"
            height="17"
            viewBox="0 0 37 17"
            width="37"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.rect
              animate={{
                stroke: isSelected ? `${theme.colors.sub.primary}00` : `${theme.colors.sub.primary}FF`,
                fill: isSelected ? `${theme.colors.main.primary}FF` : `${theme.colors.main.primary}00`,
              }}
              height="16"
              rx="8"
              transition={{ duration: 0.2 }}
              width="36"
              x="0.5"
              y="0.5"
            />
            <motion.circle
              animate={{
                translateX: isSelected ? 20 : 0,
                fill: isSelected ? theme.colors.white : theme.colors.sub.primary,
              }}
              cx="8.5"
              cy="8.5"
              r="5.5"
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
            />
          </svg>
          {children}
        </>
      )}
    </AriaSwitch>
  );
}
