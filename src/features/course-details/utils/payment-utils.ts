export type PaymentMethodType = 'Cartão' | 'Pix' | 'Boleto';

export type PaymentMethodDisplay = {
  type: PaymentMethodType;
  icon: string;
  name: string;
  description: string;
  promotionalPrice: number;
  monthlyPrice: number;
  basePrice: number;
  discountPercentage: number;
  isBestOption: boolean;
  checkoutUrl: string;
};

export const PAYMENT_METHOD_CONFIG: Record<
  PaymentMethodType,
  { icon: string; name: string; description: string }
> = {
  Pix: {
    icon: 'box-model-2',
    name: 'Pix',
    description: 'Aprovação instantânea',
  },
  Boleto: {
    icon: 'barcode',
    name: 'Boleto',
    description: 'Vencimento em 3 dias',
  },
  Cartão: {
    icon: 'credit-card',
    name: 'Cartão de Crédito',
    description: 'Parcelamento facilitado',
  },
};

const PAYMENT_CODE_MAP: Record<string, PaymentMethodType> = {
  '0': 'Pix',
  '1': 'Cartão',
  '2': 'Boleto',
};

export const calculateDiscountPercentage = (
  basePrice: number,
  monthlyPrice: number,
): number => {
  if (basePrice <= 0 || monthlyPrice <= 0) return 0;
  const discount = ((basePrice - monthlyPrice) / basePrice) * 100;
  return Math.round(discount);
};

export const getPaymentMethodConfig = (method: string) => {
  const mappedMethod = PAYMENT_CODE_MAP[method] || method;
  const key = mappedMethod as PaymentMethodType;
  return (
    PAYMENT_METHOD_CONFIG[key] || {
      icon: 'credit-card',
      name: method,
      description: '',
    }
  );
};

export const findBestPaymentOption = (
  options: PaymentMethodDisplay[],
): PaymentMethodDisplay | null => {
  if (!options || options.length === 0) return null;

  return options.reduce((best, current) => {
    if (current.discountPercentage > best.discountPercentage) {
      return current;
    }
    return best;
  }, options[0]);
};

export const buildPaymentMethodDisplays = (
  paymentOptions: Array<{
    condicaoFormaPagamento: string;
    Valor: string;
    PrecoBase: string;
    Mensalidade: string;
  }>,
  checkoutUrl: string,
): PaymentMethodDisplay[] => {
  return paymentOptions.map((option) => {
    const promotionalPrice = parseFloat(option.Valor) || 0;
    const basePrice = parseFloat(option.PrecoBase) || 0;
    const monthlyPrice = parseFloat(option.Mensalidade) || 0;
    const config = getPaymentMethodConfig(option.condicaoFormaPagamento);

    return {
      type: option.condicaoFormaPagamento as PaymentMethodType,
      icon: config.icon,
      name: config.name,
      description: config.description,
      promotionalPrice,
      monthlyPrice,
      basePrice,
      discountPercentage: calculateDiscountPercentage(basePrice, monthlyPrice),
      isBestOption: false,
      checkoutUrl,
    };
  });
};
