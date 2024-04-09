import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from 'react-aria-components';

import { AnimatePresence, motion } from 'framer-motion';

interface CheckboxProps extends Omit<AriaCheckboxProps, 'children'> {
  children?: React.ReactNode;
}

export default function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      tw="flex items-center gap-[7px] w-fit"
      {...props}
    >
      {({ isSelected }) => (
        <>
          <svg
            fill="none"
            height="18"
            viewBox="0 0 18 18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <AnimatePresence>
              {isSelected ? (
                <motion.g
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  key="on"
                  transition={{ duration: 0.125 }}
                >
                  <rect
                    className="fill-main-primary"
                    height="18"
                    rx="5"
                    width="18"
                  />
                  <path
                    clipRule="evenodd"
                    d="M15.364 4.40732C15.5515 4.59484 15.6568 4.84915 15.6568 5.11432C15.6568 5.37948 15.5515 5.63379 15.364 5.82132L7.8687 13.3166C7.76965 13.4157 7.65205 13.4943 7.52262 13.5479C7.39319 13.6016 7.25447 13.6292 7.11437 13.6292C6.97427 13.6292 6.83555 13.6016 6.70612 13.5479C6.57669 13.4943 6.45909 13.4157 6.36004 13.3166L2.63604 9.59332C2.54053 9.50107 2.46435 9.39072 2.41194 9.26872C2.35953 9.14672 2.33194 9.0155 2.33079 8.88272C2.32963 8.74994 2.35494 8.61826 2.40522 8.49536C2.4555 8.37247 2.52975 8.26081 2.62364 8.16692C2.71754 8.07303 2.82919 7.99878 2.95208 7.94849C3.07498 7.89821 3.20666 7.87291 3.33944 7.87407C3.47222 7.87522 3.60344 7.90281 3.72544 7.95521C3.84745 8.00762 3.95779 8.08381 4.05004 8.17932L7.11404 11.2433L13.9494 4.40732C14.0422 4.31439 14.1525 4.24067 14.2739 4.19038C14.3952 4.14008 14.5253 4.1142 14.6567 4.1142C14.7881 4.1142 14.9182 4.14008 15.0395 4.19038C15.1609 4.24067 15.2712 4.31439 15.364 4.40732Z"
                    fill="#F4F5FB"
                    fillRule="evenodd"
                  />
                </motion.g>
              ) : (
                <motion.rect
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  height="17"
                  initial={{ opacity: 0 }}
                  key="off"
                  rx="5"
                  stroke="#8B7FC0"
                  transition={{ duration: 0.125 }}
                  width="17"
                  x="0.5"
                  y="0.5"
                />
              )}
            </AnimatePresence>
          </svg>
          <span tw="text-sm -translate-y-px">{children}</span>
        </>
      )}
    </AriaCheckbox>
  );
}
