import { Button, Divider, View } from 'reshaped';

export type FilterActionsProps = {
  onSubmit: () => void;
  onCancel?: () => void;
};

export const FilterActions = ({ onSubmit, onCancel }: FilterActionsProps) => {
  return (
    <>
      <Divider />

      <View gap={2} paddingTop={4} direction="row" justify="end">
        {onCancel && (
          <Button variant="outline" color="neutral" onClick={onCancel}>
            Cancelar
          </Button>
        )}

        <Button variant="solid" color="primary" onClick={onSubmit}>
          Aplicar filtros
        </Button>
      </View>
    </>
  );
};
