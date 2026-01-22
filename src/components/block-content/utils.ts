import { TextProps } from 'reshaped';
import styles from './styles.module.scss';

type BuildHeadingLevelReturn = {
  variant: TextProps['variant'];
  as: TextProps['as'];
  className?: string;
};

export const buildHeadingLevel = (
  level: 1 | 2 | 3 | 4 | 5 | 6,
): BuildHeadingLevelReturn => {
  const variants: Record<1 | 2 | 3 | 4 | 5 | 6, TextProps['variant']> = {
    1: 'title-2',
    2: 'title-3',
    3: 'title-4',
    4: 'featured-1',
    5: 'featured-2',
    6: 'featured-3',
  };
  return {
    variant: variants[level],
    as: `h${level}` as TextProps['as'],
    className: styles[`heading${level}`],
  };
};
