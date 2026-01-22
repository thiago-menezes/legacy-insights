'use client';

import { FormControl, TextField } from 'reshaped';

export type CourseInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  name?: string;
};

export const CourseInput = ({
  value,
  onChange,
  onSubmit,
  label = 'Qual curso quer estudar?',
  placeholder = 'Encontre seu curso',
  disabled = false,
  size = 'medium',
  name = 'course',
}: CourseInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <FormControl disabled={disabled}>
      <FormControl.Label>{label}</FormControl.Label>
      <TextField
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={({ value }) => onChange(value || '')}
        disabled={disabled}
        size={size}
        inputAttributes={{
          onKeyDown: handleKeyDown,
        }}
      />
    </FormControl>
  );
};
