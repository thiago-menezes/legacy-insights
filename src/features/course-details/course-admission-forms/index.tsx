import { Text, View } from 'reshaped';
import { ButtonOption } from '@/components';
import styles from './styles.module.scss';
import type { CourseAdmissionFormsProps } from './types';

export const CourseAdmissionForms = ({
  availableForms,
  selectedFormId,
  onSelectForm,
}: CourseAdmissionFormsProps) => {
  const dynamicForms =
    availableForms &&
    Array.isArray(availableForms) &&
    availableForms.length > 0 &&
    'code' in availableForms[0]
      ? availableForms
      : undefined;

  // Deduplicate forms by code
  const uniqueForms = dynamicForms
    ? Array.from(
        new Map(dynamicForms.map((form) => [form.code, form])).values(),
      )
    : undefined;

  if (uniqueForms) {
    return (
      <View gap={1}>
        <Text as="label" variant="body-3" weight="medium">
          Forma de ingresso:
        </Text>

        <View className={styles.formsGrid}>
          {uniqueForms.map((form) => {
            const isSelected = selectedFormId === form.code;
            return (
              <ButtonOption
                key={form.code}
                isSelected={isSelected}
                onClick={() => onSelectForm(form.code || '')}
              >
                {form.name}
              </ButtonOption>
            );
          })}
        </View>
      </View>
    );
  }

  return null;
};
