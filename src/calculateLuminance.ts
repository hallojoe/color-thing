/**
 * Calculates the relative luminance of a color represented by its RGBA values.
 * @param rgba An array representing the RGBA values of the color.
 * @returns The relative luminance of the color.
 */
export function calculateLuminance(rgba: Uint8ClampedArray) {
  // Normalize the RGB values by dividing by 255
  const r = rgba[0] / 255
  const g = rgba[1] / 255
  const b = rgba[2] / 255

  // Calculate the relative luminance using the formula specified in the WCAG 2.0 guidelines
  return (
    0.2126 * ((r <= 0.03928) ? r/12.92 : Math.pow((r+0.055)/1.055, 2.4)) +
    0.7152 * ((g <= 0.03928) ? g/12.92 : Math.pow((g+0.055)/1.055, 2.4)) +
    0.0722 * ((b <= 0.03928) ? b/12.92 : Math.pow((b+0.055)/1.055, 2.4))
  )
}
