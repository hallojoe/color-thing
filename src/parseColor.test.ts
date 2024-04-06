import { parseColor } from "./parseColor"
import { parseColorCodes } from "./parseColor"
import { parseColorNames } from "./parseColor"

// Mock parseColorCodes function
jest.mock("./parseColorCodes", () => ({
  parseColorCodes: jest.fn().mockReturnValue(["#ffffff", "#000000", "rgb(255,0,0)", "rgba(0,0,255,0.5)", "#ff00ff", "#00ff00", "#0000ff", "#ff0000", "hsl(120,100%,50%)", "hsla(240,100%,50%,0.5)"])
}))

// Mock parseColorNames function
jest.mock("./parseColorNames", () => ({
  parseColorNames: jest.fn().mockReturnValue(["red", "blue", "lime", "teal", "navy", "gold"])
}))

describe("parseColor function", () => {
  it("should return unique color codes and names from the input string", () => {
    const value = "Some text with color codes #ffffff, #000000, rgb(255,0,0), rgba(0,0,255,0.5), #ff00ff, #00ff00, #0000ff, #ff0000, hsl(120,100%,50%), hsla(240,100%,50%,0.5), and color names red, blue, lime, teal, navy, and gold"
    const expectedResult = [
      "#ffffff", "#000000", "rgb(255,0,0)", "rgba(0,0,255,0.5)", "#ff00ff", "#00ff00", "#0000ff", "#ff0000",
      "hsl(120,100%,50%)", "hsla(240,100%,50%,0.5)",
      "red", "blue", "lime", "teal", "navy", "gold"
    ]

    // Call the function under test
    const result = parseColor(value)

    // Expect parseColorCodes and parseColorNames to be called with the input value
    expect(parseColorCodes).toHaveBeenCalledWith(value)
    expect(parseColorNames).toHaveBeenCalledWith(value)

    // Expect the result to contain unique color codes and names
    expect(result).toEqual(expectedResult)
  })

  it("should return an empty array if input string contains no color codes or names", () => {
    const value = "Some text with no color codes or names"

    // Call the function under test
    const result = parseColor(value)

    // Expect parseColorCodes and parseColorNames to be called with the input value
    expect(parseColorCodes).toHaveBeenCalledWith(value)
    expect(parseColorNames).toHaveBeenCalledWith(value)

    // Expect the result to be an empty array
    expect(result).toEqual([])
  })
})
