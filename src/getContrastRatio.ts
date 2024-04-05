import { calculateLuminance } from "./calculateLuminance";

export function getContrastRatio(background: Uint8ClampedArray, foreground: Uint8ClampedArray): number {

  const lumA = calculateLuminance(background);

  const lumB = calculateLuminance(foreground);

  const brighter = Math.max(lumA, lumB);

  const darker = Math.min(lumA, lumB);

  return (brighter + 0.05) / (darker + 0.05);
}
