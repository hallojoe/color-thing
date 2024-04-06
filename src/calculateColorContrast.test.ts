import { getContrastRatio } from "./calculateColorContrast" 
import { calculateLuminance } from "./calculateLuminance" 

describe("getContrastRatio", () => {

    // Helper function to generate random Uint8ClampedArray for RGB values
  const generateRandomColor = (): Uint8ClampedArray => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return new Uint8ClampedArray([r, g, b])
  }

  // Test at least 100 random color combinations
  const numberOfTests = 100
  for (let i = 0; i < numberOfTests; i++) {
    const background = generateRandomColor()
    const foreground = generateRandomColor()
    it(`should calculate contrast ratio for background ${background} and foreground ${foreground}`, () => {
      const expectedContrastRatio = calculateContrastRatio(background, foreground)
      const actualContrastRatio = getContrastRatio(background, foreground)
      // Assert actual contrast ratio is equal to expected contrast ratio
      expect(actualContrastRatio).toBeCloseTo(expectedContrastRatio, 5) // Adjust the precision as needed
    })
  }

  // Additional specific test cases
  it("should calculate contrast ratio for black and white", () => {
    const black = new Uint8ClampedArray([0, 0, 0])
    const white = new Uint8ClampedArray([255, 255, 255])
    expect(getContrastRatio(black, white)).toBeCloseTo(21, 1) // Actual contrast ratio should be close to 21
  })

  it("should calculate contrast ratio for same color", () => {
    const color = generateRandomColor()
    expect(getContrastRatio(color, color)).toBe(1) // Contrast ratio for same color should be 1
  })

  // Add more specific test cases as needed
})

// Helper function to calculate contrast ratio for testing
function calculateContrastRatio(background: Uint8ClampedArray, foreground: Uint8ClampedArray): number {
  const luminanceA = calculateLuminance(background)
  const luminanceB = calculateLuminance(foreground)
  const brighter = Math.max(luminanceA, luminanceB)
  const darker = Math.min(luminanceA, luminanceB)
  return (brighter + 0.05) / (darker + 0.05)
}
