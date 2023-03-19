export function keyify(str: string) {
  return str
    .toLowerCase()
    .replace(/([^a-z0-9])+/gi, " ")
    .trim()
    .split(" ")
    .join("-");
}
