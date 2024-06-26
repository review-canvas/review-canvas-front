import createCompositeComponent from '@ui/components/composite-component';

import type { ReviewDataType } from '@/types/review';

export interface ReviewModalProps extends ReviewDataType {
  onClose: () => void;
}

interface CommonProps {
  children: React.ReactNode;
}

const ReviewModal = createCompositeComponent(
  ({ children, ...props }: CommonProps) => {
    return (
      <div
        tw="flex flex-col gap-4 w-[80vw] max-w-[800px] max-h-[90vh] p-10 bg-white rounded-md overflow-y-auto"
        {...props}
      >
        {children}
      </div>
    );
  },
  {
    Title: ({ children, ...props }: CommonProps) => {
      return (
        <div
          tw="text-xl font-normal break-keep"
          {...props}
        >
          {children}
        </div>
      );
    },
    Caption: ({ children, ...props }: CommonProps) => {
      return (
        <div
          tw="text-sm text-stone-400 font-medium break-keep"
          {...props}
        >
          {children}
        </div>
      );
    },
    Table: ({ children, ...props }: CommonProps) => {
      return (
        <div
          tw="flex flex-col gap-2"
          {...props}
        >
          {children}
        </div>
      );
    },
    Row: ({ children, ...props }: CommonProps) => {
      return (
        <div
          tw="flex gap-4 py-2 border-t-[1px] border-t-sub-primary"
          {...props}
        >
          {children}
        </div>
      );
    },
    RowTitle: ({ children, ...props }: CommonProps) => {
      return (
        <div
          tw="inline-flex min-w-28 text-[#838383] text-base items-center"
          {...props}
        >
          {children}
        </div>
      );
    },
    RowContent: ({ children, ...props }: CommonProps) => {
      return (
        <div
          tw="inline-flex"
          {...props}
        >
          {children}
        </div>
      );
    },
    Footer: ({ children, ...props }: CommonProps) => {
      return (
        <div
          tw="flex justify-between items-center"
          {...props}
        >
          {children}
        </div>
      );
    },
    FooterItem: ({ children, ...props }: CommonProps) => {
      return (
        <div
          tw="inline-flex items-center"
          {...props}
        >
          {children}
        </div>
      );
    },
  },
);

export default ReviewModal;
