export const titleFormatter = (acronym?: string, toBeProduced?: number) => {
  if (!acronym || !toBeProduced) return "Carregando...";

  return `${acronym || ""} — ${toBeProduced || ""} Und.`;
};
