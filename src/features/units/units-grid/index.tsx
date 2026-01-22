import { UnitDTO } from '@/types/api/units';
import { UnitCard } from '../unit-card';
import styles from './styles.module.scss';

type UnitsGridProps = {
  units: UnitDTO[];
  isLoading?: boolean;
};

export const UnitsGrid = ({ units, isLoading }: UnitsGridProps) => {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <span>Carregando unidades...</span>
      </div>
    );
  }

  if (units.length === 0) {
    return (
      <div className={styles.empty}>
        <span>Nenhuma unidade encontrada</span>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
};
