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
  
  // Use browser's built-in HTML decoding if available
  if (typeof document !== 'undefined') {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  
  // For server-side, do simple character replacements for the most common issues
  return text
    // Common HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Greek letters - decode common entities
    .replace(/&alpha;/g, 'α')
    .replace(/&beta;/g, 'β')
    .replace(/&gamma;/g, 'γ')
    .replace(/&delta;/g, 'δ')
    .replace(/&epsilon;/g, 'ε')
    .replace(/&theta;/g, 'θ')
    .replace(/&lambda;/g, 'λ')
    .replace(/&mu;/g, 'μ')
    .replace(/&pi;/g, 'π')
    .replace(/&sigma;/g, 'σ')
    .replace(/&tau;/g, 'τ')
    .replace(/&phi;/g, 'φ')
    .replace(/&psi;/g, 'ψ')
    .replace(/&omega;/g, 'ω')
    // Special characters for scientific notation
    .replace(/&deg;/g, '°')
    .replace(/&plusmn;/g, '±')
    .replace(/&times;/g, '×')
    .replace(/&divide;/g, '÷')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥')
    .replace(/&ne;/g, '≠')
    // Fix the specific corrupted characters you mentioned
    .replace(/Œ/g, 'α')  // Anti-Œ-Tubulin → Anti-α-Tubulin
    .replace(/≤/g, 'β')  // Fix corrupted symbols
    // Numeric character references
    .replace(/&#(\d+);/g, (match, num) => String.fromCharCode(parseInt(num, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
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