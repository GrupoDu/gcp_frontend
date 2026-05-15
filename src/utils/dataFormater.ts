export function dataFormater(date: unknown): string {
  let dataPart;
  const isInvalidType = typeof date !== "string" && !(date instanceof Date);
  if (isInvalidType) throw new Error("Formato de data inválido.");

  if (typeof date === "string") {
    dataPart = date.split("T")[0];
  } else {
    dataPart = new Date(date).toISOString().split("T")[0];
  }

  const [ano, mes, dia] = dataPart.split("-");

  return `${dia}/${mes}/${ano}`;
}
