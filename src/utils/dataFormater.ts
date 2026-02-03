export function dataFormater(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}
