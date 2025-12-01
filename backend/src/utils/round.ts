const round = (num: number, precision: number): number => {
  const multiplier = Math.pow(10, precision);
  return Math.round(num * multiplier) / multiplier;
};

export { round };
