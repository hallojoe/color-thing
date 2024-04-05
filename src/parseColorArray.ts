import { parseNumbers } from "@casko/string-thing"
import { SupportedColorTypes } from "./enums"
import { expandHexShorthand } from "./expandHexShorthand"
import { translateColorType } from "./translateColorType"

function parseColorNumbers(rgbOrHslString: string): number[] {

  let channelValues = parseNumbers(rgbOrHslString, [0, 0, 0, 255])

  if (!(channelValues.length === 3 || channelValues.length === 4)) channelValues = [0, 0, 0, 255]

  if (channelValues.length === 3) channelValues.push(255)

  channelValues[3] = channelValues[3] <= 1 ? channelValues[3] * 255 : channelValues[3]

  return channelValues

}

export function parseColorArrayFromRgba(rgba: string): Uint8ClampedArray {

  let channelValues = parseColorNumbers(rgba)

  return new Uint8ClampedArray(channelValues)

}

export function parseColorArrayFromHsl(hslString: string): Uint8ClampedArray {

  let [h, s, l, a] = parseColorNumbers(hslString)

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

function parseColorArrayFromHex(hex: string): Uint8ClampedArray | null {

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

export function parseColorArray(colorString: string): Uint8ClampedArray | null {

  const colorType = translateColorType(colorString);

  if (colorType === SupportedColorTypes.Hex) return parseColorArrayFromHex(colorString);

  if (colorType === SupportedColorTypes.Rgb) return parseColorArrayFromRgba(colorString);

  if (colorType === SupportedColorTypes.Hsl) return parseColorArrayFromHsl(colorString);

  return null;

}

export function parseColorArrays(colorStrings:string[]): Uint8ClampedArray[] {

  return colorStrings.map(colorString => parseColorArray(colorString)).filter(colorArray => colorArray !== null)

}