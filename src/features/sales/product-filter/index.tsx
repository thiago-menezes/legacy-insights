'use client';

import { Select } from 'reshaped';
import { useProductOptions } from './hooks';
import { ProductFilterProps } from './types';

export const ProductFilter = ({ value, onChange }: ProductFilterProps) => {
  const { options } = useProductOptions();

  return (
    <Select
      name="product-filter"
      onChange={({ value: val }) => onChange(val || undefined)}
      value={value || ''}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
