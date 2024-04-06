import { colorNames } from "./colorNames"
/**
 * Parses color codes and names from a given string and returns an array of unique color codes and names.
 * @param value The string containing color codes and names.
 * @returns An array of unique color codes and names extracted from the input string.
 */
export function parseColor(value: string): string[] {
    const colorCodes = parseColorCodes(value)
    const colorNames = parseColorNames(value)
    return Array.from(new Set([...colorCodes, ...colorNames]))
}

/**
 * Parses color names from a given string and returns an array of unique color names found.
 * @param value The string containing color names.
 * @returns An array of unique color names extracted from the input string.
 */

export function parseColorNames(value: string): string[] {
    // Create pattern
    const colorNamesPattern = new RegExp(`\\b(${Object.keys(colorNames).join("|")})\\b`, "gi")
    // Extract color codes from the input string based on the regular expression
    const matchResult = value.toLowerCase().match(colorNamesPattern) || []
    // Remove duplicates by converting the array to a Set and then back to an array
    const result = Array.from(new Set(matchResult))
    // Return the array of unique color codes
    return result
}

/**
 * Parses color codes from a given string and returns an array of unique color codes. Supports hex, hex shorthand, hsl, rgb
 * @param value The string containing color codes.
 * @returns An array of unique color codes extracted from the input string.
 */
export function parseColorCodes(value: string): string[] {
    // Regular expression to match color codes in various formats (hexadecimal, RGB, RGBA, HSL, HSLA)
    const colorExpression = /(rgba?|hsla?)\(\s?\d{1,3}\s?,\s?\d{1,3}%?\s?,\s?\d{1,3}%?(?:\s?,\s?(?:\d*(?:\.\d+)?)\s?)?\)|#(?:[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?|[0-9a-fA-F]{3})/gm;
    // Extract color codes from the input string based on the regular expression
    const matchResult = value.match(colorExpression) || [];
    // Remove duplicates by converting the array to a Set and then back to an array
    const result = Array.from(new Set(matchResult));
    // Return the array of unique color codes
    return result;
}

