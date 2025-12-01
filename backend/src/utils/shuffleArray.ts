export const shuffleArray = <T>(
  array: T[],
  options?: {
    inPlace?: boolean;
    rng?: () => number;
  }
): T[] => {
  const rng = options?.rng ?? Math.random;
  const result = options?.inPlace ? array : [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
