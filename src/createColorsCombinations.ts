import { getContrastRatio } from "./calculateColorContrast"
import { evaluateContrast, WCAGColorContrastRatings, WCAGColorContrastSubjects } from "./evaluateContrast"

export interface IColorCombination {
  background: Uint8ClampedArray
  foreground: Uint8ClampedArray
  backgroundLuminance: number
  foregroundLuminance: number
  contrast:number
  evaluation:[WCAGColorContrastSubjects, WCAGColorContrastRatings][]
}

export function createColorsCombinations(colors: Uint8ClampedArray[] | null): IColorCombination[] | null {

  if (colors === null) return null

  const validatedColors:IColorCombination[] = []

  colors.forEach(background => {

    colors.forEach(foreground => {

      const [contrast, backgroundLuminance, foregroundLuminance] = getContrastRatio(background, foreground)
    
      const contrastEvaluation = evaluateContrast(contrast)

      const contrastValidates = contrastEvaluation.some(([_, evaluation]) => evaluation !== WCAGColorContrastRatings.Fail)

      if(contrastValidates) {

        validatedColors.push({
          background, 
          foreground, 
          backgroundLuminance,
          foregroundLuminance,
          contrast, 
          evaluation: contrastEvaluation
        })

      }

      const [contrast2, backgroundLuminance2, foregroundLuminance2] = getContrastRatio(foreground, background)
    
      const contrastEvaluation2 = evaluateContrast(contrast2)

      const contrastValidates2 = contrastEvaluation2.some(([_, evaluation]) => evaluation !== WCAGColorContrastRatings.Fail)

      if(contrastValidates2) {

        validatedColors.push({
          foreground, 
          background, 
          backgroundLuminance: backgroundLuminance2,
          foregroundLuminance: foregroundLuminance2,
          contrast: contrast2, 
          evaluation: contrastEvaluation2
        })

      }
      


    })

  })

  return validatedColors
  
}
