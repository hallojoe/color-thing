import { getContrastRatio } from "./getContrastRatio";

export function suggestForegroundColors(colors: Uint8ClampedArray[] | null): [Uint8ClampedArray, Uint8ClampedArray][] | null {

  if (colors === null) return null;

  const bestMatches: [Uint8ClampedArray, Uint8ClampedArray][] = [];

  colors.forEach(background => {

    let bestContrast = -1;

    let bestForeground: Uint8ClampedArray | null = null;

    colors.forEach(foreground => {

      const contrast = getContrastRatio(background, foreground);

      if (contrast > bestContrast) {

        bestContrast = contrast;

        bestForeground = foreground;

      }

    });

    if (bestForeground) bestMatches.push([background, bestForeground]);

  });

  return bestMatches.length ? bestMatches : null;
}
