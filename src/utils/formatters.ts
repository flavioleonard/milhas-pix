export const formatCurrency = (value: string): string => {
  // Remove tudo que não for número
  const numbers = value.replace(/\D/g, "");

  // Se não tem números, retorna vazio
  if (!numbers) return "";

  // Converte para número e divide por 100 para ter centavos
  const amount = parseFloat(numbers) / 100;

  // Formata como moeda brasileira
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const parseCurrencyToNumber = (value: string): number => {
  // Remove tudo que não for número ou vírgula/ponto
  const numbers = value.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(numbers) || 0;
};
