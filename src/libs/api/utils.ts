export type ServiceKeys<T extends Record<string, unknown>> = {
  keys: <K extends keyof T>(methodName: K, ...args: unknown[]) => unknown[];
} & T;

export const createServiceKeys = <T extends Record<string, unknown>>(
  service: T,
  alternativeKeys?: string[],
): ServiceKeys<T> => {
  return {
    keys: <K extends keyof T>(methodName: K, ...args: unknown[]) => {
      return [
        alternativeKeys?.[0] ?? Object.keys(service)[0],
        methodName,
        ...args,
      ];
    },
    ...service,
  };
};
