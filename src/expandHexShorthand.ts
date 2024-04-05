import { SupportedColorTypes } from "./enums";

export function expandHexShorthand(hexShorthand: string): string {

    let sign = hexShorthand.startsWith("#") ? "#" : "";

    const hexShorthandCopy = sign === "#" ? hexShorthand.substring(1) : hexShorthand;

    if (hexShorthandCopy.length === 6 || hexShorthandCopy.length === 8) {

        return `${sign}${hexShorthandCopy}`;

    }

    if (hexShorthandCopy.length === 3 || hexShorthandCopy.length === 4) {

        const expandedHex = hexShorthandCopy.split("").map(character => character.repeat(2)).join("");

        return `${sign}${expandedHex}`;

    }

    return `${sign}000000`;

}

