import type { CityDTO } from './types';

export const extractUnitIdsFromCity = (city: CityDTO): number[] => {
  const unitIds: number[] = [];

  city.units.forEach((unit) => {
    if (unit.unitId !== null) {
      unitIds.push(unit.unitId);
    }
  });

  city.polos.forEach((polo) => {
    if (polo.unit?.unitId !== null && polo.unit?.unitId !== undefined) {
      unitIds.push(polo.unit.unitId);
    }
  });

  return [...new Set(unitIds)];
};
