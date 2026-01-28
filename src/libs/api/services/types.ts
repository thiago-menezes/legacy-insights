export type ServiceConfig<T> = Promise<
  {
    keys: unknown[];
  } & T
>;
