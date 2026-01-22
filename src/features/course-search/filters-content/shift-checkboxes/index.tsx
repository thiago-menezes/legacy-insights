import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Checkbox, FormControl, View } from 'reshaped';
import type { CourseFiltersFormValues } from '../../types';

export type ShiftCheckboxesProps = {
  control: Control<CourseFiltersFormValues>;
};

export const ShiftCheckboxes = ({ control }: ShiftCheckboxesProps) => {
  return (
    <Controller
      name="shifts"
      control={control}
      render={({ field }) => (
        <FormControl>
          <FormControl.Label>Turno</FormControl.Label>
          <View direction="row" gap={2}>
            <Checkbox
              name="shift-morning"
              checked={field?.value?.includes('matutino')}
              onChange={({ checked }) => {
                if (checked) {
                  field.onChange([...(field?.value || []), 'matutino']);
                } else {
                  field.onChange(field?.value?.filter((s) => s !== 'matutino'));
                }
              }}
            >
              Manhã
            </Checkbox>
            <Checkbox
              name="shift-afternoon"
              checked={field?.value?.includes('vespertino')}
              onChange={({ checked }) => {
                if (checked) {
                  field.onChange([...(field?.value || []), 'vespertino']);
                } else {
                  field.onChange(
                    field?.value?.filter((s) => s !== 'vespertino'),
                  );
                }
              }}
            >
              Tarde
            </Checkbox>
            <Checkbox
              name="shift-night"
              checked={field?.value?.includes('noturno')}
              onChange={({ checked }) => {
                if (checked) {
                  field.onChange([...(field?.value || []), 'noturno']);
                } else {
                  field.onChange(field?.value?.filter((s) => s !== 'noturno'));
                }
              }}
            >
              Noite
            </Checkbox>
          </View>
        </FormControl>
      )}
    />
  );
};
