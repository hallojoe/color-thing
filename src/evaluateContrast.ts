import { addFlag } from "@casko/enum-thing"

export enum WCAGColorContrastRatings {
  None = 0,
  AA = 1,
  AAA = 2,
  Fail = 4
}

export interface IContrastResult {
  text: WCAGColorContrastRatings,
  largeText: WCAGColorContrastRatings,
  ui: WCAGColorContrastRatings,  
}

export function evaluateUiElementContrast(contrastRatio: number): WCAGColorContrastRatings {

  let result = WCAGColorContrastRatings.None

  if (contrastRatio >= 3) result = addFlag(result, WCAGColorContrastRatings.AA)

  if (contrastRatio >= 7) result = addFlag(result, WCAGColorContrastRatings.AAA)

  return result === WCAGColorContrastRatings.None ? WCAGColorContrastRatings.Fail : result

}

export function evaluateTextElementContrast(contrastRatio: number): WCAGColorContrastRatings {

  let result = WCAGColorContrastRatings.None

  if (contrastRatio >= 4.5) result = addFlag(result, WCAGColorContrastRatings.AA)

  if (contrastRatio >= 7) result = addFlag(result, WCAGColorContrastRatings.AAA)
  
  return result === WCAGColorContrastRatings.None ? WCAGColorContrastRatings.Fail : result

}

export function evaluateLargeTextElementContrast(contrastRatio: number): WCAGColorContrastRatings {

  let result = WCAGColorContrastRatings.None

  if (contrastRatio >= 3) result = addFlag(result, WCAGColorContrastRatings.AA)

  if (contrastRatio >= 4.5) result = addFlag(result, WCAGColorContrastRatings.AAA)

  return result === WCAGColorContrastRatings.None ? WCAGColorContrastRatings.Fail : result

}

export function evaluateContrast(contrastRatio: number): IContrastResult {
  return {
    text: evaluateTextElementContrast(contrastRatio),
    largeText: evaluateLargeTextElementContrast(contrastRatio),
    ui: evaluateUiElementContrast(contrastRatio)
  }
}
