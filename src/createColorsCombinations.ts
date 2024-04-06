import { getContrastRatio } from "./calculateColorContrast"
import { evaluateContrast, WCAGColorContrastRatings, WCAGColorContrastSubjects } from "./evaluateContrast"

export function suggestForegroundColors(colors: Uint8ClampedArray[] | null): [Uint8ClampedArray, Uint8ClampedArray][] | null {

  if (colors === null) return null

  const bestMatches: [Uint8ClampedArray, Uint8ClampedArray][] = []

  colors.forEach(background => {

    let bestContrast = -1

    let bestForeground: Uint8ClampedArray | null = null

    colors.forEach(foreground => {

      const contrast = getContrastRatio(background, foreground)

      if (contrast > bestContrast) {

        bestContrast = contrast

        bestForeground = foreground

      }

    })

    if (bestForeground) bestMatches.push([background, bestForeground])

  })

  return bestMatches.length ? bestMatches : null

}

export interface IColorCombination {
  background: Uint8ClampedArray
  foreground: Uint8ClampedArray
  contrast:number,
  evaluation:[WCAGColorContrastSubjects, WCAGColorContrastRatings][]
}

export function createColorsCombinations(colors: Uint8ClampedArray[] | null): IColorCombination[] | null {

  if (colors === null) return null

  const validatedColors:IColorCombination[] = []

  colors.forEach(background => {

    colors.forEach(foreground => {

      const contrast = getContrastRatio(background, foreground)

      const contrastEvaluation = evaluateContrast(contrast)

      const contrastValidates = contrastEvaluation.some(([_, evaluation]) => evaluation !== WCAGColorContrastRatings.Fail)

      if(contrastValidates) {

        validatedColors.push({
          background, 
          foreground, 
          contrast, 
          evaluation: contrastEvaluation
        })

      }
      
    })

  })

  return validatedColors
  
}
