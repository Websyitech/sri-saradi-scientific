/**
 * Text utilities for handling scientific notation and special characters
 */

/**
 * Safely render scientific text with proper HTML entities
 */
export function renderScientificText(text) {
  if (!text) return '';
  
  // Convert common scientific notations to HTML
  return text
    // Subscripts for chemical formulas
    .replace(/([A-Za-z])(\d+)/g, '$1<sub>$2</sub>')
    // Superscripts for charges
    .replace(/(\d+)([+-])/g, '<sup>$1$2</sup>')
    // Greek letters (if you want to preserve them)
    .replace(/μ/g, '&micro;')
    .replace(/°/g, '&deg;')
    .replace(/±/g, '&plusmn;')
    .replace(/≤/g, '&le;')
    .replace(/≥/g, '&ge;')
    .replace(/×/g, '&times;')
    .replace(/÷/g, '&divide;');
}

/**
 * Clean text for search indexing
 */
export function cleanForSearch(text) {
  if (!text) return '';
  
  return text
    .normalize('NFD')  // Decompose characters
    .replace(/[\u0300-\u036f]/g, '')  // Remove diacritics
    .replace(/[^\w\s.-]/g, '')  // Keep only word chars, spaces, dots, hyphens
    .toLowerCase()
    .trim();
}

/**
 * Validate if text contains problematic characters
 */
export function hasProblematicChars(text) {
  if (!text) return false;
  
  // Check for common problematic patterns
  const problematicPatterns = [
    /[\uFFFD]/,  // Replacement character
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/,  // Control characters
    /[\uD800-\uDFFF]/,  // Surrogate pairs (indicates encoding issues)
  ];
  
  return problematicPatterns.some(pattern => pattern.test(text));
}

/**
 * Sanitize input for database storage
 */
export function sanitizeInput(text) {
  if (!text) return text;
  
  return text
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')  // Remove control chars
    .replace(/\uFFFD/g, '')  // Remove replacement characters
    .normalize('NFC');  // Canonical composition
}

/**
 * Convert smart quotes and dashes to standard ones
 */
export function standardizeQuotes(text) {
  if (!text) return text;
  
  return text
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...');
}