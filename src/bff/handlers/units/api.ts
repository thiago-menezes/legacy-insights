import { buildClientApiUrl, clientApiFetch } from '../../services/client-api';

export type Unit = {
  ID: number;
  Nome_Unidade: string;
  Estado: string;
  Cidade: string;
};

export type UnitsResponse = {
  data: Unit[];
};

export const fetchUnits = async (
  institution: string,
  state: string,
  city: string,
): Promise<UnitsResponse> => {
  const url = buildClientApiUrl('/cursos/unidades', {
    marca: institution.toLowerCase(),
    estado: state.toLowerCase(),
    cidade: city.toLowerCase(),
  });
  const data = clientApiFetch<UnitsResponse>(url);
  return data;
};

export const fetchUnitsByCourse = async (
  institution: string,
  state: string,
  city: string,
  courseId: string,
): Promise<UnitsResponse> => {
  const url = buildClientApiUrl('/cursos/unidades', {
    marca: institution.toLowerCase(),
    estado: state.toLowerCase(),
    cidade: city.toLowerCase(),
    cursoId: courseId,
  });

  const data = clientApiFetch<UnitsResponse>(url);

  return data;
};
