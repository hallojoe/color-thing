import { calculateLuminance } from "./calculateLuminance";

export function getContrastRatio(background: Uint8ClampedArray, foreground: Uint8ClampedArray): number {

  const luminanceA = calculateLuminance(background);

  const luminanceB = calculateLuminance(foreground);

  const brighter = Math.max(luminanceA, luminanceB);

  const darker = Math.min(luminanceA, luminanceB);

  return (brighter + 0.05) / (darker + 0.05);
}
