export const groupBy = <T, K extends keyof T>(
  items: T[],
  keySelector: ((item: T) => T[K]) | K
): Record<string | number | symbol, T[]> => {
  const result: Record<string | number | symbol, T[]> = {};

  items.forEach((item) => {
    const key =
      typeof keySelector === "function"
        ? keySelector(item)
        : item[keySelector];

    if (!result[key as string | number | symbol]) {
      result[key as string | number | symbol] = [];
    }
    result[key as string | number | symbol].push(item);
  });

  return result;
};
