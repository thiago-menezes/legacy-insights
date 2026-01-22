export type CoursesApiOfertaEntrada = {
  startMonth: number;
  endMonth: number;
  type: 'Percent' | 'Amount';
  value: string;
};

export type CoursesApiValorPagamento = {
  condicaoFormaPagamento: string;
  Valor: string;
  TemplateCampanha: string | null;
  OfertaEntrada: CoursesApiOfertaEntrada[];
  PrecoBase: string;
  Mensalidade: string;
  PrioridadeAbrangencia: number;
};

export type CoursesApiTipoPagamento = {
  ID: string;
  Nome_TipoPagamento: string;
  Codigo: string;
  LinkCheckout: string;
  ValoresPagamento: CoursesApiValorPagamento[];
  PrecoBase: string;
  Mensalidade: string;
};

export type CoursesApiFormaIngresso = {
  ID: string;
  Nome_FormaIngresso: string;
  Codigo: string;
  TiposPagamento: CoursesApiTipoPagamento[];
};

export type CoursesApiTurno = {
  ID: string;
  Nome_Turno: string;
  Periodo: string;
  FormasIngresso: CoursesApiFormaIngresso[];
  Hash_CursoTurno: string;
};

export type CoursesApiUnidade = {
  ID: number;
  Nome: string;
};

export type CoursesApiData = {
  ID: number;
  Nome_Curso: string;
  Modalidade: string;
  Periodo: number;
  Turnos: CoursesApiTurno[];
  Unidade: CoursesApiUnidade;
  Cidade: string;
};

export type CoursesApiResponse = {
  data: CoursesApiData[];
  page: number;
  limit: number;
  total: number;
};
