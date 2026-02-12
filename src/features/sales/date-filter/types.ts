export type DatePreset = '7d' | '30d' | '90d' | 'custom';

export interface DateFilterProps {
  startDate?: Date;
  endDate?: Date;
  preset: DatePreset;
  onPresetChange: (preset: DatePreset) => void;
  onDateRangeChange: (startDate?: Date, endDate?: Date) => void;
}
