import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Checkbox, FormControl, View } from 'reshaped';
import { DURATION_OPTIONS } from '../../constants';
import type { CourseFiltersFormValues } from '../../types';

export type CourseDurationCheckboxesProps = {
  control: Control<CourseFiltersFormValues>;
};

export const CourseDurationCheckboxes = ({
  control,
}: CourseDurationCheckboxesProps) => {
  return (
    <Controller
      name="durations"
      control={control}
      render={({ field }) => {
        const currentLabels = (field.value || []) as string[];

        const isOptionChecked = (label: string) => {
          return currentLabels.includes(label);
        };

        const toggleOption = (label: string) => {
          const isChecked = isOptionChecked(label);
          const nextLabels = isChecked
            ? currentLabels.filter((l) => l !== label)
            : [...currentLabels, label];

          field.onChange(nextLabels);
        };

        return (
          <FormControl>
            <FormControl.Label>Duração do curso</FormControl.Label>
            <View direction="row" gap={2} wrap>
              {DURATION_OPTIONS.map((option) => (
                <Checkbox
                  key={option.label}
                  name="duration"
                  checked={isOptionChecked(option.label)}
                  onChange={() => toggleOption(option.label)}
                >
                  {option.label}
                </Checkbox>
              ))}
            </View>
          </FormControl>
        );
      }}
    />
  );
};
