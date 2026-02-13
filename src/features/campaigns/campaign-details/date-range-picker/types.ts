export interface DateRangeValue {
  startDate: string;
  endDate: string;
}

export interface DateRangePreset {
  label: string;
  getDates: () => DateRangeValue;
}

export interface DateRangePickerProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
}
