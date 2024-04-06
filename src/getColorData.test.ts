import { getColorData } from "./getColorData"

describe("getColorData function", () => {

  it("should return Uint8ClampedArray for valid color strings", () => {

    const validColorString = "rgba(255, 0, 0, 0.5)"

    const colorData = getColorData(validColorString)

    expect(colorData).not.toBeNull()

    const [r, g, b, a] = [...colorData!]

    expect(r).toBe(255)
    expect(g).toBe(0)
    expect(b).toBe(0)
    expect(a).toBeCloseTo(127, -1) 

  })

  it("should return null for invalid color strings", () => {
    const invalidColorString = "invalidColorString"

    expect(getColorData(invalidColorString)).toBeNull()
  })

  it("should return null for empty input", () => {
    const emptyInput = ""

    expect(getColorData(emptyInput)).toBeNull()
  })

  it("should return null if parsing fails for all color strings", () => {
    const multipleInvalidColorStrings = "invalid1 invalid2 invalid3"

    expect(getColorData(multipleInvalidColorStrings)).toBeNull()
  })
})
