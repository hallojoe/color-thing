export enum WCAGColorContrastSubjects {
  None,
  Text,
  LargeText,
  UiElement
}

export enum WCAGColorContrastRatings {
  None = 0,
  AA = 1,
  AAA = 2,
  Fail = 4
}

export function evaluateUiElementContrast(contrastRatio: number): WCAGColorContrastRatings {

  if (contrastRatio >= 3) return WCAGColorContrastRatings.AA

  if (contrastRatio >= 7) return WCAGColorContrastRatings.AA | WCAGColorContrastRatings.AAA

  return WCAGColorContrastRatings.Fail

}

export function evaluateTextElementContrast(contrastRatio: number): WCAGColorContrastRatings {

  if (contrastRatio >= 4.5) return WCAGColorContrastRatings.AA

  if (contrastRatio >= 7) return WCAGColorContrastRatings.AA | WCAGColorContrastRatings.AAA

  return WCAGColorContrastRatings.Fail

}

export function evaluateLargeTextElementContrast(contrastRatio: number): WCAGColorContrastRatings {

  if (contrastRatio >= 3) return WCAGColorContrastRatings.AA

  if (contrastRatio >= 4.5) return WCAGColorContrastRatings.AA | WCAGColorContrastRatings.AAA

  return WCAGColorContrastRatings.Fail

}

export function evaluateContrast(contrastRatio: number): [WCAGColorContrastSubjects, WCAGColorContrastRatings][] {

  return [
    [WCAGColorContrastSubjects.Text, evaluateTextElementContrast(contrastRatio)],
    [WCAGColorContrastSubjects.LargeText, evaluateTextElementContrast(contrastRatio)],
    [WCAGColorContrastSubjects.UiElement, evaluateTextElementContrast(contrastRatio)],
  ]

}
