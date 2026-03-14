/**
 * Utility functions for text processing and formatting
 */

/**
 * Decode HTML entities and fix corrupted Unicode characters in a string
 * @param text The text containing HTML entities or corrupted Unicode
 * @returns The decoded and corrected text
 */
export function decodeHtmlEntities(text: string): string {
  if (typeof text !== 'string') return text;
  
  // First, fix common Unicode corruption issues that affect scientific names
  let fixed = text
    // Fix corrupted characters commonly seen in scientific product names
    .replace(/Œ/g, 'α')  // Anti-Œ-Tubulin → Anti-α-Tubulin
    .replace(/œ/g, 'α')
    .replace(/≤/g, 'β')  // Fix corrupted less-than-or-equal
    .replace(/≥/g, 'γ')  // Fix corrupted greater-than-or-equal
    // Fix UTF-8 double encoding issues
    .replace(/Ã¡/g, 'á')
    .replace(/Ã©/g, 'é')
    .replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã¼/g, 'ü')
    .replace(/Î±/g, 'α')
    .replace(/Î²/g, 'β')
    .replace(/Î³/g, 'γ')
    .replace(/Î´/g, 'δ');
  
  // Use browser's built-in HTML decoding if available
  if (typeof document !== 'undefined') {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = fixed;
    return textArea.value;
  }
  
  // Fallback for server-side rendering - decode common HTML entities
  const entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&hellip;': '…',
    '&mdash;': '—',
    '&ndash;': '–',
    '&lsquo;': '\u2018',
    '&rsquo;': '\u2019',
    '&ldquo;': '\u201C',
    '&rdquo;': '\u201D',
    '&bull;': '•',
    '&deg;': '°',
    '&plusmn;': '±',
    '&times;': '×',
    '&divide;': '÷',
    '&alpha;': 'α',
    '&beta;': 'β',
    '&gamma;': 'γ',
    '&delta;': 'δ',
    '&epsilon;': 'ε',
    '&zeta;': 'ζ',
    '&eta;': 'η',
    '&theta;': 'θ',
    '&iota;': 'ι',
    '&kappa;': 'κ',
    '&lambda;': 'λ',
    '&mu;': 'μ',
    '&nu;': 'ν',
    '&xi;': 'ξ',
    '&omicron;': 'ο',
    '&pi;': 'π',
    '&rho;': 'ρ',
    '&sigma;': 'σ',
    '&tau;': 'τ',
    '&upsilon;': 'υ',
    '&phi;': 'φ',
    '&chi;': 'χ',
    '&psi;': 'ψ',
    '&omega;': 'ω',
    '&OElig;': 'Œ',
    '&oelig;': 'œ',
    '&le;': '≤',
    '&ge;': '≥',
    '&ne;': '≠',
    '&asymp;': '≈',
    '&prop;': '∝',
    '&infin;': '∞',
    '&part;': '∂',
    '&sum;': '∑',
    '&prod;': '∏',
    '&radic;': '√',
    '&int;': '∫',
    '&there4;': '∴',
    '&sim;': '∼',
    '&cong;': '≅',
  };
  
  // Replace all HTML entities with their corresponding characters
  return text.replace(/&[#\w]+;/g, (entity) => {
    // First check our predefined map
    if (entityMap[entity]) {
      return entityMap[entity];
    }
    
    // Handle numeric entities like &#39; &#8217; etc.
    if (entity.startsWith('&#')) {
      const numMatch = entity.match(/^&#(\d+);$/);
      if (numMatch) {
        const charCode = parseInt(numMatch[1], 10);
        if (!isNaN(charCode)) {
          return String.fromCharCode(charCode);
        }
      }
      
      // Handle hex entities like &#x27;
      const hexMatch = entity.match(/^&#x([0-9a-fA-F]+);$/);
      if (hexMatch) {
        const charCode = parseInt(hexMatch[1], 16);
        if (!isNaN(charCode)) {
          return String.fromCharCode(charCode);
        }
      }
    }
    
    // If we can't decode it, return the original entity
    return entity;
  });
}

/**
 * Clean and format product names by decoding HTML entities and normalizing whitespace
 * @param name The product name to clean
 * @returns The cleaned product name
 */
export function cleanProductName(name: string): string {
  if (!name) return name;
  
  // Decode HTML entities
  let cleaned = decodeHtmlEntities(name);
  
  // Normalize whitespace (replace multiple spaces with single space, trim)
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}