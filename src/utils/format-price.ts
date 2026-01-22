export const formatPrice = (
  price: number | string | undefined,
): string | undefined => {
  if (!price) {
    return undefined;
  }

  const formattedPrice = Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedPrice;
};
