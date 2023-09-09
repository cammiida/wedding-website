export function assertUnreachable(x: never): never {
  throw new Error(`Unknown value ${x}`);
}
