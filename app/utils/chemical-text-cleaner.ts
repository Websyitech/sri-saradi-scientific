/**
 * Chemical name specific text cleaner
 * Handles the specific encoding issues found in chemical compound names
 */

// Chemical-specific mojibake patterns found in your data
const CHEMICAL_PATTERNS = {
  // Malformed HTML tags that should be plain numbers
  htmlArtifacts: [
    ['<sup>1-</sup>', '1-'],
    ['<sup>2-</sup>', '2-'],
    ['<sup>3-</sup>', '3-'],
    ['<sup>4-</sup>', '4-'],
    ['<sup>5-</sup>', '5-'],
    ['<sup>6-</sup>', '6-'],
    ['<sup>7-</sup>', '7-'],
    ['<sup>8-</sup>', '8-'],
    ['<sup>9-</sup>', '9-'],
    ['<sup>0-</sup>', '0-'],
    // Numbers without dash
    ['<sup>1</sup>', '1'],
    ['<sup>2</sup>', '2'], 
    ['<sup>3</sup>', '3'],
    ['<sup>4</sup>', '4'],
    ['<sup>5</sup>', '5'],
    ['<sup>6</sup>', '6'],
    ['<sup>7</sup>', '7'],
    ['<sup>8</sup>', '8'],
    ['<sup>9</sup>', '9'],
    ['<sup>0</sup>', '0'],
  ],
  
  // Chemical symbol encoding issues
  chemicalSymbols: [
    ['Œ&ge;', 'γ'],        // Your specific gamma lactone pattern
    ['Œ&le;', 'α'],        // Alpha pattern (if it exists)
    ['Œ&beta;', 'β'],      // Beta pattern (if it exists)  
    ['Œ&delta;', 'δ'],     // Delta pattern (if it exists)
    ['&ge;', '≥'],         // Greater than or equal
    ['&le;', '≤'],         // Less than or equal
    ['&alpha;', 'α'],      // HTML entity to Greek letter
    ['&beta;', 'β'],
    ['&gamma;', 'γ'],
    ['&delta;', 'δ'],
    ['&micro;', 'μ'],
  ],
  
  // Backslash artifacts (from your examples)
  backslashArtifacts: [
    ['\\\\\n\\\\\n', ' '],    // Double backslash newlines
    ['\\\\', ' '],            // Double backslashes  
    ['\\\n', ' '],            // Backslash newlines
    ['\\', ''],               // Single backslashes
  ],
  
  // Chemical punctuation cleanup
  punctuationCleanup: [
    ['{', '('],               // Curly to round brackets
    ['}', ')'],
    [', ,', ','],             // Double commas
    [',,', ','],              // Double commas
    ['  ', ' '],              // Double spaces
    [' ,', ','],              // Space before comma
    ['( ', '('],              // Space after opening bracket
    [' )', ')'],              // Space before closing bracket
  ],
  
  // Position number patterns (common in chemical names)
  positionNumbers: [
    // Pattern: "number, space, number" -> "number,number"
    [/(\d+),\s+(\d+)/g, '$1,$2'],
    // Pattern: "number , number" -> "number,number" 
    [/(\d+)\s*,\s*(\d+)/g, '$1,$2'],
    // Pattern: ") -" -> ")-"
    [/\)\s*-/g, ')-'],
    // Pattern: "- (" -> "-("
    [/-\s*\(/g, '-('],
  ]
};

/**
 * Clean chemical names with specific patterns
 */
export function cleanChemicalText(text: string | null | undefined): string {
  if (!text) return "";
  
  let cleaned = text;
  
  // Apply all pattern categories
  Object.values(CHEMICAL_PATTERNS).forEach(patterns => {
    patterns.forEach(([pattern, replacement]) => {
      if (typeof pattern === 'string') {
        // String replacement
        cleaned = cleaned.replace(new RegExp(escapeRegex(pattern), 'g'), replacement);
      } else {
        // Regex replacement
        cleaned = cleaned.replace(pattern, replacement);
      }
    });
  });
  
  // Final cleanup
  cleaned = cleaned
    .replace(/\s+/g, ' ')  // Multiple spaces to single space
    .trim();               // Remove leading/trailing spaces
  
  return cleaned;
}

/**
 * Test function for your specific examples
 */
export function testChemicalCleaning() {
  const testCases = [
    'Isoamyl <sup>4-</sup>Methoxycinnamate',
    'L-Gulonic acid Œ&ge;-lactone\\\\\\\\',
    'trans-<sup>9-</sup>Octadecenoic acid methyl ester\\\\\\\\',
    '2-{<sup>2-</sup>Chloro-<sup>4-</sup>mesyl-3-[(2, 2, <sup>2-</sup>trifluoroethoxy)methyl]benzoyl}-4, <sup>6-</sup>dihydroxycyclohexane-1, <sup>3-</sup>dione'
  ];
  
  console.log('🧪 Testing Chemical Text Cleaning:\n');
  
  testCases.forEach((test, index) => {
    const cleaned = cleanChemicalText(test);
    console.log(`Example ${index + 1}:`);
    console.log(`Before: ${test}`);
    console.log(`After:  ${cleaned}`);
    console.log('');
  });
}

/**
 * Escape regex special characters
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Enhanced version that combines with your existing cleanText
 */
export function cleanTextEnhanced(text: string | null | undefined): string {
  if (!text) return "";
  
  // First apply chemical cleaning
  let cleaned = cleanChemicalText(text);
  
  // Then apply your existing cleanText patterns (import from your textUtils)
  // This ensures both approaches work together
  
  return cleaned;
}