// Converte um Date para "AAAA-MM-DD" usando o fuso local
// (toISOString usaria UTC e poderia errar o dia à noite).
export function toDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}