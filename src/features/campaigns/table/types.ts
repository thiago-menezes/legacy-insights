export interface CellWithChangeProps {
  value: string | number;
  previousValue: string | number;
  change: number;
  prefix?: string;
  suffix?: string;
}
