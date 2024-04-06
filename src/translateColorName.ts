import { colorNames } from "./colorNames"

/**
 * Translates a color name to its corresponding RGB value.
 * @param colorName The color name to translate.
 * @returns The RGB value corresponding to the color name in the format "rgb(r,g,b)", or null if the color name is not found.
 */
export function translateColorName(colorName: string): string | null {
    // Retrieve the rgb value from the colorNames record if it exists
    const rgbValue = colorNames[colorName.toLowerCase()]
    // If value exists, return it
    if (rgbValue) return `rgb(${rgbValue})`
    // Return null
    return null
}
