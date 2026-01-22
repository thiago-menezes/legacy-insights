import type { ReactNode } from 'react';

export type ButtonOptionProps = {
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  textAlign?: 'left' | 'center' | 'right';
};
