/**
 * Expandable pattern library for chemical text cleaning
 * Add new patterns here as you discover them
 */

// Common patterns we know work
const KNOWN_PATTERNS = {
  htmlSupTags: [
    { pattern: /<sup>(\d+)-<\/sup>/g, replacement: '$1-', description: 'HTML superscript with dash' },
    { pattern: /<sup>(\d+)<\/sup>/g, replacement: '$1', description: 'HTML superscript numbers' },
    { pattern: /<sub>(\d+)<\/sub>/g, replacement: '$1', description: 'HTML subscript numbers' },
  ],
  
  greekLetters: [
    { pattern: /Œ&ge;/g, replacement: 'γ', description: 'Greek gamma lactone' },
    { pattern: /Œ&le;/g, replacement: 'α', description: 'Greek alpha' },
    { pattern: /Œ&beta;/g, replacement: 'β', description: 'Greek beta' },
    { pattern: /Œ&delta;/g, replacement: 'δ', description: 'Greek delta' },
    { pattern: /Œ&mu;/g, replacement: 'μ', description: 'Greek mu' },
  ],
  
  backslashes: [
    { pattern: /\\\\\\\\/g, replacement: ' ', description: 'Quadruple backslashes' },
    { pattern: /\\\\/g, replacement: ' ', description: 'Double backslashes' },
    { pattern: /\\\n/g, replacement: ' ', description: 'Backslash newlines' },
    { pattern: /\\(?!n|t|r)/g, replacement: '', description: 'Single backslashes (not escape chars)' },
  ],
  
  punctuation: [
    { pattern: /\{\s*/g, replacement: '(', description: 'Opening curly brace to parenthesis' },
    { pattern: /\s*\}/g, replacement: ')', description: 'Closing curly brace to parenthesis' },
    { pattern: /,\s*,/g, replacement: ',', description: 'Double commas' },
    { pattern: /\s*,\s*/g, replacement: ', ', description: 'Comma spacing' },
    { pattern: /\)\s*-/g, replacement: ')-', description: 'Parenthesis dash spacing' },
    { pattern: /-\s*\(/g, replacement: '-(', description: 'Dash parenthesis spacing' },
  ]
};

// New patterns to test - add here when you find them
const NEW_PATTERNS_TO_TEST = [
  // Add patterns like this:
  // { pattern: /<i>(\w+)<\/i>/g, replacement: '$1', description: 'Italic tags' },
  // { pattern: /Œ&\w+;/g, replacement: '?', description: 'Unknown Greek letters' },
];

/**
 * Apply all known patterns to text
 */
function cleanWithAllPatterns(text) {
  if (!text) return "";
  
  let cleaned = text;
  
  // Apply all known patterns
  Object.values(KNOWN_PATTERNS).forEach(patternGroup => {
    patternGroup.forEach(({ pattern, replacement }) => {
      cleaned = cleaned.replace(pattern, replacement);
    });
  });
  
  // Apply new patterns being tested
  NEW_PATTERNS_TO_TEST.forEach(({ pattern, replacement }) => {
    cleaned = cleaned.replace(pattern, replacement);
  });
  
  // Final cleanup
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

/**
 * Test a new pattern against known good examples
 */
function testNewPattern(pattern, replacement, testCases) {
  console.log(`\n🧪 Testing pattern: ${pattern} → "${replacement}"`);
  console.log('=' .repeat(50));
  
  testCases.forEach((testCase, index) => {
    const result = testCase.replace(pattern, replacement);
    const changed = result !== testCase;
    
    console.log(`Test ${index + 1}: ${changed ? '🔄 CHANGED' : '⚪ NO CHANGE'}`);
    if (changed) {
      console.log(`Before: ${testCase}`);
      console.log(`After:  ${result}`);
    }
    console.log('');
  });
}

/**
 * Generate code for adding new patterns to textUtils.ts
 */
function generateCleanTextCode() {
  const codeLines = [];
  
  Object.entries(KNOWN_PATTERNS).forEach(([category, patterns]) => {
    codeLines.push(`    // ${category.charAt(0).toUpperCase() + category.slice(1)}`);
    patterns.forEach(({ pattern, replacement, description }) => {
      const patternStr = pattern.toString();
      codeLines.push(`    .replace(${patternStr}, '${replacement}') // ${description}`);
    });
    codeLines.push('');
  });
  
  return codeLines.join('\n');
}

// Export for use in other scripts
if (typeof module !== 'undefined') {
  module.exports = {
    KNOWN_PATTERNS,
    NEW_PATTERNS_TO_TEST,
    cleanWithAllPatterns,
    testNewPattern,
    generateCleanTextCode
  };
}

// If run directly, show current patterns
if (require.main === module) {
  console.log('📚 CURRENT PATTERN LIBRARY');
  console.log('=' .repeat(50));
  
  Object.entries(KNOWN_PATTERNS).forEach(([category, patterns]) => {
    console.log(`\n${category.toUpperCase()}:`);
    patterns.forEach(({ description, pattern }) => {
      console.log(`  • ${description}: ${pattern}`);
    });
  });
  
  console.log('\n💻 GENERATED CODE FOR textUtils.ts:');
  console.log('=' .repeat(50));
  console.log(generateCleanTextCode());
}