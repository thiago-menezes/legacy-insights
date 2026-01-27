import clsx from 'clsx';
import Link from 'next/link';
import { Button, View } from 'reshaped';
import { Icon, IconProps } from '@/components/icon';
import styles from './styles.module.scss';

interface SidebarItemProps {
  href: string;
  label: string;
  icon?: IconProps['name'];
  isActive: boolean;
  isMobile: boolean;
  onToggle: () => void;
  disabled?: boolean;
  disabledTooltip?: string;
}

export const SidebarItem = ({
  href,
  label,
  icon,
  isActive,
  isMobile,
  onToggle,
  disabled,
  disabledTooltip,
}: SidebarItemProps) => {
  const content = (
    <Button
      variant="ghost"
      color="neutral"
      fullWidth
      disabled={disabled}
      attributes={{ title: disabled ? disabledTooltip : undefined }}
      className={clsx(styles.navButton, {
        [styles.navButtonActive]: isActive,
      })}
    >
      {icon && <Icon name={icon} className={styles.navButtonIcon} />}
      {label}
    </Button>
  );

  if (disabled) {
    return <View width="100%">{content}</View>;
  }

  return (
    <Link href={href} onClick={isMobile ? onToggle : undefined}>
      {content}
    </Link>
  );
};
