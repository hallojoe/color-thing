import { calculateLuminance } from "./calculateLuminance"

describe("calculateLuminance", () => {
  // Helper function to generate random Uint8ClampedArray for RGB values
  const generateRandomColor = (): Uint8ClampedArray => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return new Uint8ClampedArray([r, g, b])
  }

  // Test at least 100 random colors
  const numberOfTests = 100
  for (let i = 0; i < numberOfTests; i++) {
    const color = generateRandomColor()
    it(`should calculate luminance for color ${color}`, () => {
      const luminance = calculateLuminance(color)
      // Assert luminance value falls within valid range [0, 1]
      expect(luminance).toBeGreaterThanOrEqual(0)
      expect(luminance).toBeLessThanOrEqual(1)
    })
  }

  // Additional specific test cases
  it("should calculate luminance for black", () => {
    const black = new Uint8ClampedArray([0, 0, 0])
    expect(calculateLuminance(black)).toBe(0)
  })

  it("should calculate luminance for white", () => {
    const white = new Uint8ClampedArray([255, 255, 255])
    expect(calculateLuminance(white)).toBe(1)
  })

  
  // Add more specific test cases as needed for edge cases or specific colors
})
