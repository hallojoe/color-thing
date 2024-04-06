import { parseNumbers } from "@casko/string-thing"
import { SupportedColorTypes } from "./index"
import { expandHexShorthand } from "./expandHexShorthand"
import { translateColorType } from "./translateColorType"
import { parseColor } from "./parseColor"

/**
 * Parses color numbers from an RGBA or HSLA string.
 * @param rgbOrHslString The input string representing RGBA or HSLA color.
 * @returns An array of parsed color numbers, including alpha channel if provided, or null if parsing fails.
 */
function parseColorNumbers(rgbOrHslString: string): number[] {

  // Not this pases number arrray not clamped array 
  // so hsl values can live here too.

  let channelValues = parseNumbers(rgbOrHslString, [0, 0, 0, 255])

  if (!(channelValues.length === 3 || channelValues.length === 4)) channelValues = [0, 0, 0, 255]

  if (channelValues.length === 3) channelValues.push(255)

  channelValues[3] = channelValues[3] <= 1 ? channelValues[3] * 255 : channelValues[3]

  return channelValues

}

/**
 * Parses an array of color data from an RGBA string.
 * @param rgba The RGBA color string to parse.
 * @returns Uint8ClampedArray representing color data, or null if parsing fails.
 */
export function parseColorArrayFromRgba(rgba: string): Uint8ClampedArray|null {

  let [r, g, b, a] = parseColorNumbers(rgba)

  if(r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null

  if(a === null || a < 0 || a > 255) a = 255

  return new Uint8ClampedArray([r, g, b, a])

}

/**
 * Parses an array of color data from an HSLA string.
 * @param hslString The HSLA color string to parse.
 * @returns Uint8ClampedArray representing color data, or null if parsing fails.
 */
export function parseColorArrayFromHsl(hslString: string): Uint8ClampedArray|null {

  let [h, s, l, a] = parseColorNumbers(hslString)

  if(h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) return null

  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s
  let x = c * (1 - Math.abs((h / 60) % 2 - 1))
  let m = l - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return new Uint8ClampedArray([r, g, b, a])

}

/**
 * Parses an array of color data from a hexadecimal string.
 * @param hex The hexadecimal color string to parse.
 * @returns Uint8ClampedArray representing color data, or null if parsing fails.
 */
function parseColorArrayFromHex(hex: string): Uint8ClampedArray | null {

  if(hex.length < 4 || hex.length > 9) return null

  let hexCopy = expandHexShorthand(hex);

  hexCopy = hex.startsWith("#") ? hexCopy.substring(1) : hexCopy;

  if (!(hexCopy.length === 6 || hexCopy.length === 8)) return null;

  const colorChannels: Uint8ClampedArray = new Uint8ClampedArray(4);

  for (let i = 0; i < 4; i++) {

    let parsedValue = parseInt(hexCopy.substring(i * 2, (i * 2) + 2), 16);

    colorChannels[i] = i < 3 ? parsedValue : isNaN(parsedValue) ? 255 : parsedValue;

  }

  return colorChannels;

}

/**
 * Parses an array of color data from a color string.
 * @param colorString The color string to parse.
 * @returns Uint8ClampedArray representing color data, or null if parsing fails.
 */
export function parseColorArray(colorString: string): Uint8ClampedArray | null {

  const colorType = translateColorType(colorString);

  console.log("colorType", colorType)
  console.log("colorString", colorString)

  if (colorType === SupportedColorTypes.Hex) return parseColorArrayFromHex(colorString);

  if (colorType === SupportedColorTypes.Rgb) return parseColorArrayFromRgba(colorString);

  if (colorType === SupportedColorTypes.Hsl) return parseColorArrayFromHsl(colorString);

  return null;

}

/**
 * @deprecated Use getColorData(...). It returns data as getImageData in rendering context 2d
 * Parses an array of color data from an array of color strings.
 * @param colorStrings An array of color strings.
 * @returns An array of Uint8ClampedArray representing color data, or null if parsing fails.
 */
export function parseColorArrays(colorStrings:string[]): (Uint8ClampedArray|null)[]|null {

  if(!colorStrings) return null

  if(colorStrings.length === 0) return null

  const result =  colorStrings.map(colorString => parseColorArray(colorString)).filter(colorArray => colorArray !== null)

  if(!result.length) return null

  return result

}

/**
 * Gets color data from an array of color strings.
 * @param value Any string containing most color strings. Supports hex(both shorthand and alpha hex), rgb(a), hsl(a) or HTML/CSS name.
 * @returns Uint8ClampedArray representing color data, or null if parsing fails.
 */
export function getColorData(value:string): Uint8ClampedArray|null {

  const colorStrings:string[] = parseColor(value)

  console.log("PARSED:", colorStrings)


  if(colorStrings.length === 0) return null

  const result:number[] = []

  colorStrings.forEach(colorString => {

    const colorArray = parseColorArray(colorString)

    console.log("colorArray:", colorString, colorArray)

    if(colorArray !== null) result.push(...colorArray)

  })

  if(!result.length) return null

  return new Uint8ClampedArray(result)

}