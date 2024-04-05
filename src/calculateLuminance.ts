export function calculateLuminance(color: Uint8ClampedArray): number {

  const rgba = color.map(val => val / 255);

  const r = rgba[0];
  const g = rgba[1];
  const b = rgba[2];

  const [red, green, blue] = [r, g, b].map(val => (val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)));

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;

}
