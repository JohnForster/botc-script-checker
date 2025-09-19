export const removeNulls = <T>(array: T[]): NonNullable<T>[] =>
  array.filter((x): x is NonNullable<T> => x !== null);
