export function debugLogger(log: string): void {
  if (process.env.NODE_ENV !== "production") return;

  console.log("---------------------");
  console.log("|=== START DEBUG ===|");
  console.log(log);
  console.log("|=== END DEBUG ===|");
  console.log("-------------------");
}
