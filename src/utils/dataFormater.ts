export function dataFormater(date: unknown): string {
  let dataPart;
  if (typeof date === "string") {
    dataPart = date.split("T")[0];
  } else {
    dataPart = date.toISOString().split("T")[0];
  }
  const [ano, mes, dia] = dataPart.split("-");
  return `${dia}/${mes}/${ano}`;
}
