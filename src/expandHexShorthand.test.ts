import { expandHexShorthand } from "./expandHexShorthand"

describe("expandHexShorthand function", () => {
  it("should expand 3-character shorthand hex codes correctly", () => {
    expect(expandHexShorthand("#123")).toBe("#112233")
    expect(expandHexShorthand("#ABC")).toBe("#AABBCC")
  })

  it("should expand 4-character shorthand hex codes correctly", () => {
    expect(expandHexShorthand("#1234")).toBe("#11223344")
    expect(expandHexShorthand("#ABCD")).toBe("#AABBCCDD")
  })

  it("should expand 6-character hex codes correctly", () => {
    expect(expandHexShorthand("#123456")).toBe("#123456")
    expect(expandHexShorthand("123456")).toBe("#123456")
  })

  it("should expand 8-character hex codes correctly", () => {
    expect(expandHexShorthand("#12345678")).toBe("#12345678")
    expect(expandHexShorthand("12345678")).toBe("#12345678")
  })

  it("should handle lowercase shorthand hex codes correctly", () => {
    expect(expandHexShorthand("#abc")).toBe("#aabbcc")
    expect(expandHexShorthand("#abcd")).toBe("#aabbccdd")
  })

  it("should handle lowercase 6-character hex codes correctly", () => {
    expect(expandHexShorthand("#abcdef")).toBe("#abcdef")
    expect(expandHexShorthand("abcdef")).toBe("#abcdef")
  })

  it("should handle lowercase 8-character hex codes correctly", () => {
    expect(expandHexShorthand("#abcdef12")).toBe("#abcdef12")
    expect(expandHexShorthand("abcdef12")).toBe("#abcdef12")
  })

  it("should return #000000 for invalid input", () => {
    expect(expandHexShorthand("invalid")).toBe("#000000")
    expect(expandHexShorthand("#12")).toBe("#000000")
    expect(expandHexShorthand("#12345")).toBe("#000000")
    expect(expandHexShorthand("#1234567")).toBe("#000000")
  })
})
