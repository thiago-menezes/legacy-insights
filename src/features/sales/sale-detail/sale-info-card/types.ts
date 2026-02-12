import { IconNames } from '@/components/icon';
import { SaleInfoItem } from '../types';

export interface SaleInfoCardProps {
  title: string;
  icon: IconNames;
  items: SaleInfoItem[];
}
