export function formatterDate(date: string | Date) {
  const dateFormatted = new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return dateFormatted;
}
