'use client';

import { useMemo, useState } from 'react';
import { useCityContext } from '@/contexts/city';
import { useGeolocation, useCurrentInstitution } from '@/hooks';
import { useQueryClientUnits, useQueryUnitById } from './api/query';
import type { InfrastructureImage, InfrastructureUnit } from './types';
import { markClosestUnit } from './utils';

const transformClientUnits = (
  units: Array<{ id: number; name: string; state: string; city: string }>,
): InfrastructureUnit[] => {
  return units.map((unit) => ({
    id: unit.id.toString(),
    name: unit.name,
    coordinates: {
      lat: 0,
      lng: 0,
    },
    imageIds: [],
  }));
};

export const useInfrastructure = (
  preselectedUnitId?: number,
  courseId?: string,
) => {
  const { institutionSlug } = useCurrentInstitution();

  const { city: contextCity, state: contextState } = useCityContext();
  const {
    coordinates,
    permissionDenied,
    requestPermission,
    isLoading: isGeoLoading,
  } = useGeolocation({
    manualCity: contextCity || null,
    manualState: contextState || null,
  });

  const city = contextCity;
  const state = contextState;

  const {
    data: clientUnitsResponse,
    error: clientError,
    isError: isClientError,
    isLoading: isClientLoading,
  } = useQueryClientUnits(institutionSlug, state, city, courseId);

  const locationKey = `${city}-${state}`;

  const [selectedState, setSelectedState] = useState<{
    locationKey: string;
    unitId: string | null;
  }>({ locationKey, unitId: null });

  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const currentSelectedUnitId =
    selectedState.locationKey === locationKey ? selectedState.unitId : null;

  const units = useMemo(() => {
    if (!clientUnitsResponse?.data) return [];
    return transformClientUnits(clientUnitsResponse.data);
  }, [clientUnitsResponse]);

  const sortedUnits = useMemo(
    () => markClosestUnit(units, coordinates),
    [units, coordinates],
  );

  const autoSelectedUnitId = useMemo(() => {
    if (preselectedUnitId || currentSelectedUnitId) return null;
    if (sortedUnits.length === 0) return null;
    const firstActiveUnit = sortedUnits.find((unit) => unit.isActive);
    return firstActiveUnit?.id || null;
  }, [sortedUnits, preselectedUnitId, currentSelectedUnitId]);

  const finalSelectedUnitId =
    preselectedUnitId?.toString() ||
    currentSelectedUnitId ||
    autoSelectedUnitId;

  // Ensure we parse the ID back to a number for the Strapi query
  const selectedUnitIdNum = finalSelectedUnitId
    ? parseInt(finalSelectedUnitId, 10)
    : undefined;

  // We reuse the institution slug from the top level context
  const effectiveInstitutionSlug = institutionSlug;

  const { data: strapiUnitResponse, isLoading: isStrapiLoading } =
    useQueryUnitById(
      selectedUnitIdNum,
      !!selectedUnitIdNum && !!effectiveInstitutionSlug,
      effectiveInstitutionSlug,
    );

  const images: InfrastructureImage[] | undefined = useMemo(() => {
    if (!strapiUnitResponse?.data?.[0]?.photos) return [];

    const unit = strapiUnitResponse.data[0];
    return unit?.photos?.map((photo) => ({
      id: photo?.id?.toString(),
      src: photo?.url,
      alt: photo?.alternativeText || photo?.caption || `${unit?.name} - Foto`,
    }));
  }, [strapiUnitResponse]);

  const hasData = units.length > 0;

  const activeUnit = useMemo(() => {
    if (finalSelectedUnitId) {
      return sortedUnits.find((unit) => unit.id === finalSelectedUnitId);
    }
    return sortedUnits.find((unit) => unit.isActive);
  }, [sortedUnits, finalSelectedUnitId]);

  const unitImages = images || [];

  const selectedImage = images?.find((img) => img.id === selectedImageId);

  const handleImageClick = (imageId: string) => {
    setSelectedImageId(imageId);
  };

  const handleCloseModal = () => {
    setSelectedImageId(null);
  };

  const handleUnitClick = (unitId: string) => {
    setSelectedState({ locationKey, unitId });
  };

  const currentImageIndex = useMemo(() => {
    if (!selectedImageId || !images) return -1;
    return images.findIndex((img) => img.id === selectedImageId);
  }, [selectedImageId, images]);

  const hasPreviousImage = currentImageIndex > 0;
  const hasNextImage =
    currentImageIndex >= 0 && currentImageIndex < (images?.length || 0) - 1;

  const handlePreviousImage = () => {
    if (hasPreviousImage && images) {
      setSelectedImageId(images[currentImageIndex - 1].id);
    }
  };

  const handleNextImage = () => {
    if (hasNextImage && images) {
      setSelectedImageId(images[currentImageIndex + 1].id);
    }
  };

  const mainImage = unitImages[0];
  const sideImages = unitImages.slice(1, 5);

  const selectedUnitAddress = strapiUnitResponse?.data?.[0]?.address;

  return {
    city,
    state,
    location: clientUnitsResponse?.meta?.institution || '',
    permissionDenied,
    requestPermission,
    isLoading:
      isClientLoading ||
      isGeoLoading ||
      (!!finalSelectedUnitId && isStrapiLoading),
    hasData,
    selectedImage,
    selectedUnitId: finalSelectedUnitId,
    selectedUnitAddress,
    handleImageClick,
    handleCloseModal,
    handleUnitClick,
    handlePreviousImage,
    handleNextImage,
    hasPreviousImage,
    hasNextImage,
    mainImage,
    sideImages,
    sortedUnits,
    activeUnit,
    unitImages,
    selectedImageId,
    error: clientError,
    isError: isClientError,
  };
};
