import { Badge, Button, View } from 'reshaped';
import { Icon } from '@/components';
import { useCourseFiltersContext } from '../context';
import styles from './styles.module.scss';

export type FiltersButtonProps = {
  onClick: () => void;
};

export const FiltersButton = ({ onClick }: FiltersButtonProps) => {
  const { activeFiltersCount } = useCourseFiltersContext();

  return (
    <View className={styles.filtersButtonSection}>
      <Badge.Container>
        <Badge color="critical" rounded hidden={activeFiltersCount === 0}>
          {activeFiltersCount}
        </Badge>

        <Button
          variant="outline"
          className={styles.filtersButton}
          icon={<Icon name="filter" />}
          onClick={onClick}
        >
          Filtros
        </Button>
      </Badge.Container>
    </View>
  );
};
