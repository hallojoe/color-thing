import { SupportedColorTypes } from "./enums";

export function translateColorType(colorString: string): SupportedColorTypes {
    if (colorString.startsWith("#")) return SupportedColorTypes.Hex;
    if (colorString.startsWith("hsl")) return SupportedColorTypes.Hsl;
    if (colorString.startsWith("rgb")) return SupportedColorTypes.Rgb;
    return SupportedColorTypes.None;
}
