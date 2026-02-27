export function dataFormater(date: string): string {
  const dataPart = date.split("T")[0];
  const [ano, mes, dia] = dataPart.split("-");
  return `${dia}/${mes}/${ano}`;
}
