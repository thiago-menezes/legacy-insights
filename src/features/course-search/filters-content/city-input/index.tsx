import { Controller, useWatch } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { CitySelect } from '@/components';
import { useCourseFiltersContext } from '../../context';
import type { CourseFiltersFormValues } from '../../types';

export type CityInputProps = {
  control: Control<CourseFiltersFormValues>;
};

export const CityInput = ({ control }: CityInputProps) => {
  const cityValue = useWatch({ control, name: 'city' });
  const { filters, applyFilters } = useCourseFiltersContext();

  const handleCityChange = (newCity: string) => {
    // Aplicar filtros imediatamente com a nova cidade
    applyFilters({
      ...filters,
      city: newCity,
    });
  };

  return (
    <Controller
      name="city"
      control={control}
      render={({ field }) => (
        <CitySelect
          selectedCity={cityValue}
          handleChange={(value) => {
            field.onChange(value);
            handleCityChange(value);
          }}
          label="Cidade"
          size="medium"
        />
      )}
    />
  );
};
