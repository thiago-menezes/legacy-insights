import { StrapiUnitPhoto } from '@/features/infrastructure/api/types';
import { InstitutionDTO } from './institutions';

export type UnitCityDTO = Partial<{
  id: number;
  documentId: string;
  name: string;
  state: string;
}>;

export type UnitQRCodeDTO = Partial<{
  url: string;
  alt: string;
}>;

export type UnitDTO = Partial<{
  id: number;
  documentId: string;
  unitId: number;
  name: string;
  slug: string;
  address: string;
  latitude: string;
  longitude: string;
  photos: StrapiUnitPhoto[];
  institution: InstitutionDTO;
  city: UnitCityDTO;
  qrcode: UnitQRCodeDTO;
  qrcodeLink: string;
}>;
