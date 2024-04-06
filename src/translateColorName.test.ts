import { translateColorName } from './translateColorName'; // Replace 'yourFileName' with the actual file name

describe('translateColorName function', () => {
  it('should return RGB value for valid color name', () => {
    const colorName = 'red';
    expect(translateColorName(colorName)).toEqual('rgb(255,0,0)');
  });

  it('should return null for invalid color name', () => {
    const invalidColorName = 'invalidColor';
    expect(translateColorName(invalidColorName)).toBeNull();
  });

  it('should return null for empty input', () => {
    const emptyInput = '';
    expect(translateColorName(emptyInput)).toBeNull();
  });
});
