export const formatCurrency = (value: string): string => {
  const numbers = value.replace(/\D/g, "");

  if (!numbers) return "";

  const amount = parseFloat(numbers) / 100;

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const parseCurrencyToNumber = (value: string): number => {
  const numbers = value.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(numbers) || 0;
};
