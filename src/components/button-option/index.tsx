import styles from './styles.module.scss';
import type { ButtonOptionProps } from './types';

export const ButtonOption = ({
  isSelected,
  isDisabled,
  onClick,
  className = '',
  children,
  textAlign = 'center',
}: ButtonOptionProps) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${isSelected ? styles.selected : ''} ${
        isDisabled ? styles.disabled : ''
      } ${className}`}
      style={{ textAlign }}
      aria-pressed={isSelected}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
