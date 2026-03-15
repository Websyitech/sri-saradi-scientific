/**
 * Enhanced text cleaning with systematic pattern matching
 * Better approach for handling multi-character encoding issues
 */

// Define mojibake patterns systematically
const MOJIBAKE_PATTERNS = {
  // Common UTF-8 to Latin-1 encoding issues
  punctuation: [
    ['â€™', "'"],     // Right single quotation mark
    ['â€œ', '"'],     // Left double quotation mark  
    ['â€', '"'],      // Right double quotation mark
    ['â€˜', "'"],     // Left single quotation mark
    ['â€"', '–'],     // En dash
    ['â€"', '—'],     // Em dash
    ['â€¦', '…'],     // Horizontal ellipsis
  ],
  
  // Greek letters (common in scientific text)
  greekLower: [
    ['Î±', 'α'],     // alpha
    ['Î²', 'β'],     // beta  
    ['Î³', 'γ'],     // gamma
    ['Î´', 'δ'],     // delta
    ['Îµ', 'ε'],     // epsilon
    ['Î¶', 'ζ'],     // zeta
    ['Î·', 'η'],     // eta
    ['Î¸', 'θ'],     // theta
    ['Î¹', 'ι'],     // iota
    ['Îº', 'κ'],     // kappa
    ['Î»', 'λ'],     // lambda
    ['Î¼', 'μ'],     // mu (very common in scientific units)
    ['Î½', 'ν'],     // nu
    ['Î¾', 'ξ'],     // xi
    ['Î¿', 'ο'],     // omicron
    ['Ï€', 'π'],     // pi
    ['Ï', 'ρ'],      // rho
    ['Ïƒ', 'σ'],     // sigma
    ['Ï„', 'τ'],     // tau
    ['Ï…', 'υ'],     // upsilon
    ['Ï†', 'φ'],     // phi
    ['Ï‡', 'χ'],     // chi
    ['Ïˆ', 'ψ'],     // psi
    ['Ï‰', 'ω'],     // omega
  ],
  
  // Mathematical and scientific symbols
  scientific: [
    ['Â±', '±'],     // Plus-minus
    ['Â°', '°'],     // Degree symbol
    ['Âµ', 'μ'],     // Micro symbol (same as mu)
    ['Ã—', '×'],     // Multiplication sign
    ['Ã·', '÷'],     // Division sign
    ['â‰¤', '≤'],     // Less than or equal
    ['â‰¥', '≥'],     // Greater than or equal
    ['â‰ˆ', '≈'],     // Approximately equal
  ],
  
  // Latin characters with diacritics (common in scientific names)
  latinAccented: [
    ['Ã¡', 'á'], ['Ã©', 'é'], ['Ã­', 'í'], ['Ã³', 'ó'], ['Ãº', 'ú'],
    ['Ã ', 'à'], ['Ã¨', 'è'], ['Ã¬', 'ì'], ['Ã²', 'ò'], ['Ã¹', 'ù'],
    ['Ã¢', 'â'], ['Ãª', 'ê'], ['Ã®', 'î'], ['Ã´', 'ô'], ['Ã»', 'û'],
    ['Ã¤', 'ä'], ['Ã«', 'ë'], ['Ã¯', 'ï'], ['Ã¶', 'ö'], ['Ã¼', 'ü'],
    ['Ã£', 'ã'], ['Ã±', 'ñ'], ['Ã§', 'ç'], ['Ã½', 'ý'], ['Ã¿', 'ÿ'],
    // Special case you mentioned
    ['Äë', 'ë'],
  ],
  
  // Chemical formula patterns (multi-character)
  chemical: [
    ['H2O', 'H₂O'],
    ['CO2', 'CO₂'],
    ['CaCl2', 'CaCl₂'],
    ['H2SO4', 'H₂SO₄'],
    ['NaCl', 'NaCl'],
  ],
};

/**
 * Enhanced cleaning function with pattern-based approach
 */
export const cleanTextEnhanced = (text: string | null | undefined): string => {
  if (!text) return "";
  
  let cleaned = text;
  
  // Apply all mojibake pattern replacements systematically
  Object.values(MOJIBAKE_PATTERNS).forEach(patterns => {
    patterns.forEach(([mojibake, correct]) => {
      // Use global flag to replace all occurrences
      cleaned = cleaned.replace(new RegExp(escapeRegex(mojibake), 'g'), correct);
    });
  });
  
  // Remove any remaining control characters
  cleaned = cleaned.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  
  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  
  return cleaned;
};

/**
 * Escape special regex characters
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Detect and log unknown mojibake patterns for future fixing
 */
export const detectUnknownMojibake = (text: string): string[] => {
  if (!text) return [];
  
  const suspiciousPatterns: string[] = [];
  
  // Look for potential mojibake patterns (using safer character class definitions)
  const mojibakeRegex = /Ã[‚-ÿ][\x80-\xFF]|â€[\x80-\xFF]|Î[\x80-\xFF]|Ï[\x80-\xFF]/g;
  
  let match;
  while ((match = mojibakeRegex.exec(text)) !== null) {
    const pattern = match[0];
    
    // Check if we already handle this pattern
    const isKnown = Object.values(MOJIBAKE_PATTERNS)
      .flat()
      .some(([mojibake]) => mojibake === pattern);
    
    if (!isKnown && !suspiciousPatterns.includes(pattern)) {
      suspiciousPatterns.push(pattern);
    }
  }
  
  return suspiciousPatterns;
};

/**
 * Audit function to find all mojibake patterns in your database
 */
export const auditTextIssues = (texts: string[]): {
  knownIssues: Record<string, number>;
  unknownPatterns: Record<string, number>;
} => {
  const knownIssues: Record<string, number> = {};
  const unknownPatterns: Record<string, number> = {};
  
  // Get all known patterns
  const allKnownPatterns = Object.values(MOJIBAKE_PATTERNS)
    .flat()
    .map(([mojibake]) => mojibake);
  
  texts.forEach(text => {
    if (!text) return;
    
    // Count known issues
    allKnownPatterns.forEach(pattern => {
      const matches = text.match(new RegExp(escapeRegex(pattern), 'g'));
      if (matches) {
        knownIssues[pattern] = (knownIssues[pattern] || 0) + matches.length;
      }
    });
    
    // Find unknown patterns
    const unknown = detectUnknownMojibake(text);
    unknown.forEach(pattern => {
      unknownPatterns[pattern] = (unknownPatterns[pattern] || 0) + 1;
    });
  });
  
  return { knownIssues, unknownPatterns };
};

// Keep your original function for backward compatibility
export const cleanText = cleanTextEnhanced;