
export function parseColorCodes(value: string): string[] {

    const colorExpression = /(rgba?|hsla?)\(\s?\d{1,3}\s?,\s?\d{1,3}%?\s?,\s?\d{1,3}%?(?:\s?,\s?(?:\d*(?:\.\d+)?)\s?)?\)|#(?:[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?|[0-9a-fA-F]{3})/gm;

    const matchResult = value.match(colorExpression) || [];

    const result = Array.from(new Set(matchResult));

    return result;
}
