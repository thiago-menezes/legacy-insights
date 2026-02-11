export const getBarColor = (index: number) => {
  const baseHue = 267;
  const initialSaturation = 72;
  const saturationStep = 5;
  const initialLightness = 72;
  const lightnessStep = 12;

  const saturation = Math.min(100, initialSaturation + index * saturationStep);
  const lightness = Math.max(10, initialLightness - index * lightnessStep);

  return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
};
