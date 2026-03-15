/**
 * Test script for chemical text cleaning
 * Tests your specific examples to verify fixes
 */

// Simulate the cleanText function here for testing
function cleanText(text) {
  if (!text) return "";
  
  // First handle chemical-specific patterns
  let cleaned = text
    // Remove malformed HTML tags (your specific issue)
    .replace(/<sup>(\d+)-<\/sup>/g, '$1-')
    .replace(/<sup>(\d+)<\/sup>/g, '$1')
    // Fix specific chemical symbols
    .replace(/Œ&ge;/g, 'γ')
    .replace(/Œ&le;/g, 'α')
    .replace(/Œ&beta;/g, 'β')
    // Clean up backslash artifacts
    .replace(/\\\\\n\\\\\n/g, ' ')
    .replace(/\\\\/g, ' ')
    .replace(/\\\n/g, ' ')
    .replace(/\\/g, '')
    // Fix chemical punctuation
    .replace(/\{\s*/g, '(')
    .replace(/\s*\}/g, ')')
    .replace(/,\s*,/g, ',')
    .replace(/\s*,\s*/g, ', ')
    // Clean position numbers in chemical names
    .replace(/(\d+),\s+(\d+)/g, '$1,$2')
    .replace(/\)\s*-/g, ')-')
    .replace(/-\s*\(/g, '-(')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
  
  return cleaned;
}

// Test with your exact examples
const testCases = [
  {
    name: "Isoamyl Methoxycinnamate",
    input: "Isoamyl <sup>4-</sup>Methoxycinnamate",
    expected: "Isoamyl 4-Methoxycinnamate"
  },
  {
    name: "L-Gulonic acid gamma-lactone",
    input: "L-Gulonic acid Œ&ge;-lactone\\\\\\\\",
    expected: "L-Gulonic acid γ-lactone"
  },
  {
    name: "trans-Octadecenoic acid",
    input: "trans-<sup>9-</sup>Octadecenoic acid methyl ester\\\\\\\\",
    expected: "trans-9-Octadecenoic acid methyl ester"
  },
  {
    name: "Complex chemical compound",
    input: "2-{<sup>2-</sup>Chloro-<sup>4-</sup>mesyl-3-[(2, 2, <sup>2-</sup>trifluoroethoxy)methyl]benzoyl}-4, <sup>6-</sup>dihydroxycyclohexane-1, <sup>3-</sup>dione",
    expected: "2-(2-Chloro-4-mesyl-3-[(2, 2, 2-trifluoroethoxy)methyl]benzoyl)-4, 6-dihydroxycyclohexane-1, 3-dione"
  }
];

console.log('🧪 CHEMICAL TEXT CLEANING TEST RESULTS');
console.log('=' .repeat(60));
console.log('');

let allPassed = true;

testCases.forEach((test, index) => {
  const result = cleanText(test.input);
  const passed = result === test.expected;
  allPassed = allPassed && passed;
  
  console.log(`TEST ${index + 1}: ${test.name}`);
  console.log(`Status: ${passed ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Input:    "${test.input}"`);
  console.log(`Expected: "${test.expected}"`);
  console.log(`Got:      "${result}"`);
  
  if (!passed) {
    console.log(`❌ Differences found!`);
  }
  console.log('');
});

console.log('SUMMARY:');
console.log('=' .repeat(60));
console.log(`Overall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
console.log(`Passed: ${testCases.filter((_, i) => cleanText(testCases[i].input) === testCases[i].expected).length}/${testCases.length}`);

// Additional pattern detection
console.log('\n🔍 PATTERN ANALYSIS:');
console.log('=' .repeat(60));

const allInputs = testCases.map(t => t.input).join(' ');
const patterns = {
  'HTML sup tags': (allInputs.match(/<sup>.*?<\/sup>/g) || []).length,
  'Backslashes': (allInputs.match(/\\/g) || []).length,
  'Greek encoding': (allInputs.match(/Œ&\w+;/g) || []).length,
  'Curly braces': (allInputs.match(/[{}]/g) || []).length,
};

Object.entries(patterns).forEach(([pattern, count]) => {
  console.log(`${pattern}: ${count} occurrences`);
});