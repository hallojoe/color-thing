import { SupportedColorTypes } from "."
import { translateColorType } from "./translateColorType"

describe("translateColorType function", () => {
  it("should return Hex for color string starting with `#`", () => {
    const colorString = "#ffffff"
    expect(translateColorType(colorString)).toEqual(SupportedColorTypes.Hex)
  })

  it("should return Hsl for color string starting with `hsl`", () => {
    const colorString = "hsl(0, 100%, 50%)"
    expect(translateColorType(colorString)).toEqual(SupportedColorTypes.Hsl)
  })

  it("should return Rgb for color string starting with `rgb`", () => {
    const colorString = "rgb(255, 0, 0)"
    expect(translateColorType(colorString)).toEqual(SupportedColorTypes.Rgb)
  })

  it("should return None for color string not starting with `#`, `hsl`, or `rgb`", () => {
    const invalidColorString = "invalidColorString"
    expect(translateColorType(invalidColorString)).toEqual(SupportedColorTypes.None)
  })

  it("should return None for empty input", () => {
    const emptyInput = ""
    expect(translateColorType(emptyInput)).toEqual(SupportedColorTypes.None)
  })
})
