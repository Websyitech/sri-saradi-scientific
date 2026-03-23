/**
 * Character transformation utilities for API responses
 * Handles scientific notation without touching the database
 */

// Scientific character mappings for display
export const SCIENTIFIC_DISPLAY_MAP = {
  // Subscripts for chemical formulas
  '₀': '<sub>0</sub>', '₁': '<sub>1</sub>', '₂': '<sub>2</sub>', '₃': '<sub>3</sub>', 
  '₄': '<sub>4</sub>', '₅': '<sub>5</sub>', '₆': '<sub>6</sub>', '₇': '<sub>7</sub>', 
  '₈': '<sub>8</sub>', '₉': '<sub>9</sub>',
  
  // Superscripts for charges and powers
  '⁰': '<sup>0</sup>', '¹': '<sup>1</sup>', '²': '<sup>2</sup>', '³': '<sup>3</sup>', 
  '⁴': '<sup>4</sup>', '⁵': '<sup>5</sup>', '⁶': '<sup>6</sup>', '⁷': '<sup>7</sup>', 
  '⁸': '<sup>8</sup>', '⁹': '<sup>9</sup>', '⁺': '<sup>+</sup>', '⁻': '<sup>-</sup>',
  
  // Greek letters commonly used in scientific names
  'α': '&alpha;', 'β': '&beta;', 'γ': '&gamma;', 'δ': '&delta;', 'ε': '&epsilon;',
  'ζ': '&zeta;', 'η': '&eta;', 'θ': '&theta;', 'ι': '&iota;', 'κ': '&kappa;',
  'λ': '&lambda;', 'μ': '&micro;', 'µ': '&micro;', 'ν': '&nu;', 'ξ': '&xi;', 'ο': '&omicron;',
  'π': '&pi;', 'ρ': '&rho;', 'σ': '&sigma;', 'τ': '&tau;', 'υ': '&upsilon;',
  'φ': '&phi;', 'χ': '&chi;', 'ψ': '&psi;', 'ω': '&omega;',
  
  // Mathematical and scientific symbols
  '°': '&deg;', '±': '&plusmn;', '×': '&times;', '÷': '&divide;',
  '≤': '&le;', '≥': '&ge;', '≈': '&asymp;', '≠': '&ne;',
  
  // Special quotes and dashes (clean up encoding issues)
  '\u201C': '"', '\u201D': '"', '\u2018': "'", '\u2019': "'", '\u2013': '-', '\u2014': '-',
  
  // Common encoding artifacts
  'â€™': "'", 'â€œ': '"', 'â€\u009D': '"', 'â€"': '-', 'â€\u0094': '-',
  'Œº': 'µ'  // µ symbol corrupted as Latin-1
};

// Text-only mappings for search and plain text
export const SCIENTIFIC_TEXT_MAP = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '-',
  'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'μ': 'micro', 'µ': 'micro',
  '°': 'deg', '±': '+/-', '×': 'x', '≤': '<=', '≥': '>=',
  '\u201C': '"', '\u201D': '"', '\u2018': "'", '\u2019': "'", '\u2013': '-', '\u2014': '-',
  'Œº': 'micro'  // µ symbol corrupted as Latin-1
};

/**
 * Transform text for HTML display with proper scientific notation
 */
export function transformForDisplay(text) {
  if (!text || typeof text !== 'string') return text;
  
  let result = text;
  
  // Apply character mappings
  for (const [original, replacement] of Object.entries(SCIENTIFIC_DISPLAY_MAP)) {
    result = result.replace(new RegExp(escapeRegex(original), 'g'), replacement);
  }
  
  // Auto-detect and format chemical formulas (H2O -> H₂O)
  result = result.replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>');
  
  // Auto-detect charges (2+ -> ²⁺)
  result = result.replace(/(\d+)([+-])\b/g, '<sup>$1$2</sup>');
  
  return result;
}

/**
 * Transform text for plain text/search (removes special chars)
 */
export function transformForSearch(text) {
  if (!text || typeof text !== 'string') return text;
  
  let result = text.toLowerCase();
  
  // Apply text mappings
  for (const [original, replacement] of Object.entries(SCIENTIFIC_TEXT_MAP)) {
    result = result.replace(new RegExp(escapeRegex(original), 'g'), replacement);
  }
  
  // Remove remaining non-ASCII characters
  result = result.replace(/[^\x00-\x7F]/g, '');
  
  return result.trim();
}

/**
 * Clean input text (for forms before sending to API)
 */
export function cleanInput(text) {
  if (!text || typeof text !== 'string') return text;
  
  return text
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Remove control chars
    .replace(/\uFFFD/g, '') // Remove replacement characters
    .normalize('NFC'); // Normalize Unicode
}

/**
 * Escape regex special characters
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Transform product object for API response
 */
export function transformProductForDisplay(product) {
  if (!product) return product;
  
  const textFields = [
    'name', 'description', 'manufacturer', 'material', 'volume', 
    'needleShape', 'size', 'abHost', 'abImmunogen', 'abTarget',
    'elisaChineseName', 'applications', 'brand', 'storage',
    'primaryCategory', 'subCategory', 'productLine', 'purity'
  ];
  
  const transformed = { ...product };
  
  // Add both display and search versions
  textFields.forEach(field => {
    if (transformed[field]) {
      // Keep original for editing
      transformed[`${field}_original`] = transformed[field];
      // Transform for display
      transformed[field] = transformForDisplay(transformed[field]);
      // Add search version
      transformed[`${field}_search`] = transformForSearch(transformed[field]);
    }
  });
  
  return transformed;
}

/**
 * Transform multiple products
 */
export function transformProductsForDisplay(products) {
  if (!Array.isArray(products)) return products;
  return products.map(transformProductForDisplay);
}