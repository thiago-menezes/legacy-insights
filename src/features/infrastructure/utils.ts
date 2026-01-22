import type { InfrastructureUnit } from './types';

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const sortUnitsByProximity = (
  units: InfrastructureUnit[],
  userCoordinates: { lat: number; lng: number } | null,
): InfrastructureUnit[] => {
  if (!userCoordinates) {
    return [...units].sort((a, b) => a.name.localeCompare(b.name));
  }

  const unitsWithDistance = units.map((unit) => {
    if (!unit.coordinates) {
      return { unit, distance: Infinity };
    }

    const distance = calculateDistance(
      userCoordinates.lat,
      userCoordinates.lng,
      unit.coordinates.lat,
      unit.coordinates.lng,
    );

    return { unit, distance };
  });

  unitsWithDistance.sort((a, b) => {
    if (a.distance === b.distance) {
      return a.unit.name.localeCompare(b.unit.name);
    }
    return a.distance - b.distance;
  });

  return unitsWithDistance.map(({ unit }) => unit);
};

export const markClosestUnit = (
  units: InfrastructureUnit[],
  userCoordinates: { lat: number; lng: number } | null,
): InfrastructureUnit[] => {
  const sortedUnits = sortUnitsByProximity(units, userCoordinates);

  if (!userCoordinates) {
    return sortedUnits.map((unit, index) => ({
      ...unit,
      isActive: index === 0,
    }));
  }

  const closestUnit = sortedUnits.find((unit) => unit.coordinates);

  if (closestUnit) {
    return sortedUnits.map((unit) => ({
      ...unit,
      isActive: unit.id === closestUnit.id,
    }));
  }

  return sortedUnits.map((unit, index) => ({
    ...unit,
    isActive: index === 0,
  }));
};
