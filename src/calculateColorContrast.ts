import { calculateLuminance } from "./calculateLuminance"

/**
 * Calculates the contrast ratio between two colors.
 * @param background The background color represented as a Uint8ClampedArray containing RGBA values.
 * @param foreground The foreground color represented as a Uint8ClampedArray containing RGBA values.
 * @returns An array containing the contrast ratio between the two colors, as well as the luminance values of the background and foreground colors.
 */
export function getContrastRatio(background: Uint8ClampedArray, foreground: Uint8ClampedArray): [number, number, number] {
  // Calculate luminance for the background color
  const luminanceBackground = calculateLuminance(background)
  
  // Calculate luminance for the foreground color
  const luminanceForeground = calculateLuminance(foreground)
  
  // Determine which color is brighter
  const brighter = Math.max(luminanceBackground, luminanceForeground)
  
  // Determine which color is darker
  const darker = Math.min(luminanceBackground, luminanceForeground)
  
  // Calculate contrast ratio using the formula ((L1 + 0.05) / (L2 + 0.05)), where L1 is the brighter color's luminance and L2 is the darker color's luminance
  const contrastRatio = (brighter + 0.05) / (darker + 0.05)
  
  // Return an array containing the contrast ratio and the luminance values of the background and foreground colors
  return [contrastRatio, luminanceBackground, luminanceForeground]
}
