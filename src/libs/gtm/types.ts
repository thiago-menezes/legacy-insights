export type PageData = {
  name: string;
  pagePath: string;
  area: 'checkout' | 'cursos' | 'home';
  flow: 'presencial' | 'digital' | 'ao-vivo';
  productType: 'graduacao' | 'pos-graduacao' | 'doutorado';
  environment: 'app' | 'web' | 'mobile';
  platform: string;
};

export type UserData = {
  id?: string;
  email?: string;
  msisdn?: string;
  isLoggedin: boolean;
  address?: {
    city: string;
    state: string;
    country: string;
  };
  geoLocation?: {
    latitude: number;
    longitude: number;
  };
  machine?: {
    userAgent: string;
    screenResolution: string;
    language: string;
  };
};

export type UserInteractionDetails = {
  component?: 'button' | 'form';
  action?: 'click-button' | 'envio-form';
  description?: string;
  step?: string;
  value?: number;
};

export type LeadCursoDetails = {
  ies: string;
  modalidade: string;
  tipoGraduacao: string;
  turno: string;
  formaDeIngresso: string;
  curso: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  value?: number;
};

export type EcommerceItem = {
  item_name: string;
  item_id: string;
  price: number;
  item_brand: string;
  item_category: string;
  quantity: number;
};

export type EcommerceData = {
  coupon?: string;
  currency: 'BRL';
  value: number;
  items: EcommerceItem[];
};

export type DataLayerEvent =
  | { event: 'pageView'; page: PageData; user: UserData }
  | { event: 'user_interaction'; event_details: UserInteractionDetails }
  | {
      event: 'leadCurso';
      'form-details': {
        ies: string;
        modalidade: string;
        'tipo-graduacao': string;
        turno: string;
        'forma-de-ingresso': string;
        action: 'form-submit';
        step: 'lead-curso';
        curso: string;
        nome: string;
        sobrenome: string;
        email: string;
        telefone: string;
        value: number;
      };
    }
  | { event: 'begin_checkout'; ecommerce: EcommerceData }
  | { event: 'add_to_cart'; ecommerce: EcommerceData };
