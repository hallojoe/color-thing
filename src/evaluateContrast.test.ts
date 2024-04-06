import {
    evaluateContrast,
    WCAGColorContrastRatings,
    WCAGColorContrastSubjects,
  } from './evaluateContrast' 
  
  describe('evaluateContrast function', () => {
    it('should evaluate contrast ratings for different color contrast subjects', () => {
      const contrastRatioAA = 4.6 // This should pass AA
      const contrastRatioAAA = 7.1 // This should pass AAA
      const contrastRatioFail = 2.9 // This should fail both AA and AAA
  
      const expectedResultsAA = [
        [WCAGColorContrastSubjects.Text, WCAGColorContrastRatings.AA],
        [WCAGColorContrastSubjects.LargeText, WCAGColorContrastRatings.AA],
        [WCAGColorContrastSubjects.UiElement, WCAGColorContrastRatings.Fail],
      ]
  
      const expectedResultsAAA = [
        [WCAGColorContrastSubjects.Text, WCAGColorContrastRatings.AA],
        [WCAGColorContrastSubjects.LargeText, WCAGColorContrastRatings.AAA],
        [WCAGColorContrastSubjects.UiElement, WCAGColorContrastRatings.Fail],
      ]
  
      const expectedResultsFail = [
        [WCAGColorContrastSubjects.Text, WCAGColorContrastRatings.AA],
        [WCAGColorContrastSubjects.LargeText, WCAGColorContrastRatings.AAA],
        [WCAGColorContrastSubjects.UiElement, WCAGColorContrastRatings.Fail],
      ]
  
      // Test for contrast ratio passing AA
      const actualResultsAA = evaluateContrast(contrastRatioAA)
      expect(actualResultsAA).toEqual(expectedResultsAA)
  
      // Test for contrast ratio passing AAA
      const actualResultsAAA = evaluateContrast(contrastRatioAAA)
      expect(actualResultsAAA).toEqual(expectedResultsAAA)
  
      // Test for failing contrast ratio
      const actualResultsFail = evaluateContrast(contrastRatioFail)
      expect(actualResultsFail).toEqual(expectedResultsFail)
    })
  })
  