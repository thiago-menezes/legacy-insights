export function conditionalSpread<T extends Record<string, unknown>>(
  condition: boolean,
  value: T,
): T | Record<string, never> {
  return condition ? value : {};
}
