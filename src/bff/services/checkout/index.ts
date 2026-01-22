export type CheckoutRequest = {
  name: string;
  email: string;
  phone: string;
  productHash: string;
  admissionFormCode: string;
};

export type CheckoutResponse = {
  URL_Carrinho?: string;
};

const CHECKOUT_API_URL =
  process.env.CHECKOUT_API_BASE_URL ||
  'https://checkout.unama.br/pub/rest/landingpage/request';
const CHECKOUT_API_TOKEN = process.env.CHECKOUT_API_KEY;

export const getCheckoutUrl = async (
  data: CheckoutRequest,
): Promise<string | null> => {
  const payload = {
    NomeComprador: data.name,
    EmailComprador: data.email,
    Telefone: data.phone.replace(/\D/g, ''),
    Produto: data.productHash,
    FormaIngresso: data.admissionFormCode,
    TipoPagamento: 'P',
  };

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (CHECKOUT_API_TOKEN) {
    headers['X-API-TOKEN'] = CHECKOUT_API_TOKEN;
  }

  // TODO: test with api token
  headers['X-API-TOKEN'] =
    '5e09c41f55f9e019e73ae8ef667d76374cb6a2acb0855499d5f994b1e2ee2b63';

  try {
    const response = await fetch(CHECKOUT_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      return null;
    }

    const result: CheckoutResponse = JSON.parse(responseText);

    if (result.URL_Carrinho) {
      return result.URL_Carrinho;
    }

    console.warn('[Checkout] ⚠️ No checkout URL in response:', result);
    return null;
  } catch (error) {
    console.error('[Checkout] ❌ Request error:', error);
    if (error instanceof Error) {
      console.error('[Checkout] Error details:', {
        message: error.message,
        stack: error.stack?.substring(0, 300),
      });
    }
    return null;
  }
};
