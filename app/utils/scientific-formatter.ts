/**
 * Scientific text formatter for display
 * Converts clean database text to properly formatted scientific notation
 */

// Common scientific formatting patterns
const DISPLAY_FORMATTING_RULES = [
  // Primer/Oligo patterns
  {
    pattern: /\b([A-Z][a-z]*)\s*T(\d+)\b/g,
    replacement: '$1 T<sub>$2</sub>',
    description: 'Oligo T primers (T16 → T₁₆)'
  },
  {
    pattern: /\boligo\s*dT(\d+)/gi,
    replacement: 'oligo dT<sub>$1</sub>',
    description: 'Oligo dT primers'
  },
  {
    pattern: /\boligo\s*([A-Z])(\d+)/gi,
    replacement: 'oligo $1<sub>$2</sub>',
    description: 'General oligo primers'
  },
  
  // Chemical formulas (common ones)
  {
    pattern: /\bH2O\b/g,
    replacement: 'H<sub>2</sub>O',
    description: 'Water formula'
  },
  {
    pattern: /\bCO2\b/g,
    replacement: 'CO<sub>2</sub>',
    description: 'Carbon dioxide'
  },
  {
    pattern: /\bH2SO4\b/g,
    replacement: 'H<sub>2</sub>SO<sub>4</sub>',
    description: 'Sulfuric acid'
  },
  {
    pattern: /\bNaCl\b/g,
    replacement: 'NaCl',
    description: 'Sodium chloride (no change needed)'
  },
  {
    pattern: /\bCaCl2\b/g,
    replacement: 'CaCl<sub>2</sub>',
    description: 'Calcium chloride'
  },
  {
    pattern: /\bMgCl2\b/g,
    replacement: 'MgCl<sub>2</sub>',
    description: 'Magnesium chloride'
  },
  {
    pattern: /\bKH2PO4\b/g,
    replacement: 'KH<sub>2</sub>PO<sub>4</sub>',
    description: 'Potassium dihydrogen phosphate'
  },
  
  // Ion charges
  {
    pattern: /\b([A-Z][a-z]?)(\d+)\+/g,
    replacement: '$1<sup>$2+</sup>',
    description: 'Positive ion charges (Ca2+ → Ca²⁺)'
  },
  {
    pattern: /\b([A-Z][a-z]?)(\d+)-/g,
    replacement: '$1<sup>$2-</sup>',
    description: 'Negative ion charges (SO4 2- → SO₄²⁻)'
  },
  {
    pattern: /\b([A-Z][a-z]?)\+/g,
    replacement: '$1<sup>+</sup>',
    description: 'Single positive charges (Na+ → Na⁺)'
  },
  {
    pattern: /\b([A-Z][a-z]?)-/g,
    replacement: '$1<sup>-</sup>',
    description: 'Single negative charges (Cl- → Cl⁻)'
  },
  
  // Temperature and units
  {
    pattern: /(\d+)\s*C\b/g,
    replacement: '$1°C',
    description: 'Celsius temperature'
  },
  {
    pattern: /(-?\d+)‚ÑÉ/g,
    replacement: '$1°C',
    description: 'Fix corrupted Celsius encoding'
  },
  {
    pattern: /(\d+)\s*F\b/g,
    replacement: '$1°F',
    description: 'Fahrenheit temperature'
  },
  {
    pattern: /(\d+)\s*K\b/g,
    replacement: '$1 K',
    description: 'Kelvin temperature'
  },
  
  // Mathematical symbols and units
  {
    pattern: /√ó/g,
    replacement: '×',
    description: 'Fix corrupted multiplication symbol'
  },
  {
    pattern: /‚àÜ/g,
    replacement: '≤',
    description: 'Fix corrupted less than or equal symbol'
  },
  {
    pattern: /‚â•/g,
    replacement: '≥',
    description: 'Fix corrupted greater than or equal symbol'
  },
  {
    pattern: /Ôºà/g,
    replacement: '(',
    description: 'Fix corrupted opening parenthesis'
  },
  {
    pattern: /Ôºâ/g,
    replacement: ')',
    description: 'Fix corrupted closing parenthesis'
  },
  {
    pattern: /\)([A-Z])/g,
    replacement: ') $1',
    description: 'Add space after closing parenthesis before uppercase letter'
  },
  
  // Concentrations and units
  {
    pattern: /\b(\d+\.?\d*)\s*mM\b/g,
    replacement: '$1 mM',
    description: 'Millimolar concentration'
  },
  {
    pattern: /\b(\d+\.?\d*)\s*uM\b/g,
    replacement: '$1 μM',
    description: 'Micromolar concentration'
  },
  {
    pattern: /\b(\d+\.?\d*)\s*nM\b/g,
    replacement: '$1 nM',
    description: 'Nanomolar concentration'
  },
  {
    pattern: /\b(\d+\.?\d*)\s*ug\/ml\b/gi,
    replacement: '$1 μg/mL',
    description: 'Microgram per milliliter'
  },
  {
    pattern: /\b(\d+\.?\d*)\s*ng\/ml\b/gi,
    replacement: '$1 ng/mL',
    description: 'Nanogram per milliliter'
  },
  {
    pattern: /\b(\d+\.?\d*)\s*mg\/ml\b/gi,
    replacement: '$1 mg/mL',
    description: 'Milligram per milliliter'
  },
  
  // Antibody-specific patterns
  {
    pattern: /\banti[\s-]?([A-Z][a-z]*\d*)/gi,
    replacement: 'Anti-$1',
    description: 'Antibody naming (anti-beta → Anti-β)'
  },
  {
    pattern: /\b([A-Z][a-z]*)\s*antibody\b/gi,
    replacement: '$1 Antibody',
    description: 'Antibody capitalization'
  },
  
  // Gene/protein naming
  {
    pattern: /\b([A-Z]+)(\d+)[Aa]\b/g,
    replacement: '$1$2A',
    description: 'Gene variant naming (BRCA1a → BRCA1A)'
  },
  
  // pH values
  {
    pattern: /\bpH\s*(\d+\.?\d*)/g,
    replacement: 'pH $1',
    description: 'pH values'
  },
];

/**
 * Format text for scientific display
 */
export function formatForScientificDisplay(text: string | null | undefined): string {
  if (!text || typeof text !== 'string') return text || '';
  
  let formatted = text;
  
  // Apply all formatting rules
  DISPLAY_FORMATTING_RULES.forEach(({ pattern, replacement }) => {
    formatted = formatted.replace(pattern, replacement);
  });
  
  // Clean up multiple spaces
  formatted = formatted.replace(/\s+/g, ' ').trim();
  
  return formatted;
}

/**
 * Test the formatter with your specific example
 */
export function testScientificFormatter() {
  const testCases = [
    'Universal primers Oligo T16',
    'Oligo dT20 primers for PCR',
    'Anti-beta actin antibody',
    'Buffer with MgCl2 and CaCl2',
    'Incubate at 37 C for 1 hour',
    'Dilute to 1 mM concentration',
    'Store at -20 C in 50 ug/ml aliquots',
    'pH 7.4 phosphate buffer',
    'Na+ and Cl- ions',
    'Ca2+ binding protein',
  ];
  
  console.log('🧪 SCIENTIFIC FORMATTING TEST RESULTS');
  console.log('=' .repeat(60));
  console.log('');
  
  testCases.forEach((test, index) => {
    const formatted = formatForScientificDisplay(test);
    const changed = formatted !== test;
    
    console.log(`TEST ${index + 1}: ${changed ? '🔄 FORMATTED' : '⚪ NO CHANGE'}`);
    console.log(`Input:  "${test}"`);
    console.log(`Output: "${formatted}"`);
    console.log('');
  });
}

/**
 * Generate patterns for common chemical compounds
 */
export function generateChemicalPatterns(compounds: string[]): Array<{pattern: RegExp, replacement: string}> {
  return compounds.map(compound => {
    // Extract letters and numbers
    const parts = compound.match(/([A-Z][a-z]?)(\d*)/g) || [];
    const formatted = parts.map(part => {
      const [, element, number] = part.match(/([A-Z][a-z]?)(\d*)/) || [];
      return number ? `${element}<sub>${number}</sub>` : element;
    }).join('');
    
    return {
      pattern: new RegExp(`\\b${compound}\\b`, 'g'),
      replacement: formatted
    };
  });
}

// Export test function for development
if (typeof window === 'undefined' && require.main === module) {
  testScientificFormatter();
}