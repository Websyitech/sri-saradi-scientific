/**
 * Script to automatically find more encoding patterns in your database
 * This will help you discover patterns similar to <sup>4-</sup> and Œ&ge;
 */

const { PrismaClient } = require('../app/generated/prisma');
const prisma = new PrismaClient();

async function findEncodingPatterns() {
  console.log('🔍 Scanning database for encoding patterns...\n');
  
  try {
    // Get all products
    const products = await prisma.product.findMany({
      select: {
        catalogNumber: true,
        name: true,
        description: true,
        manufacturer: true,
        brand: true,
        applications: true,
        abTarget: true,
        abReactivity: true,
        elisaChineseName: true,
        primaryCategory: true,
        subCategory: true,
        productLine: true,
      }
    });
    
    console.log(`📊 Analyzing ${products.length} products...\n`);
    
    const patternCounts = {};
    const examples = {};
    
    products.forEach(product => {
      const fields = [
        product.name, product.description, product.manufacturer,
        product.brand, product.applications, product.abTarget,
        product.abReactivity, product.elisaChineseName,
        product.primaryCategory, product.subCategory, product.productLine
      ];
      
      fields.forEach(field => {
        if (field && typeof field === 'string') {
          // Find various suspicious patterns
          findPatterns(field, patternCounts, examples, product.catalogNumber);
        }
      });
    });
    
    // Sort patterns by frequency
    const sortedPatterns = Object.entries(patternCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 50); // Top 50 patterns
    
    console.log('🚨 TOP ENCODING PATTERNS FOUND:');
    console.log('=' .repeat(70));
    
    sortedPatterns.forEach(([pattern, count], index) => {
      const example = examples[pattern];
      console.log(`${index + 1}. "${pattern}" → ${count} times`);
      console.log(`   Example: ${example.text} (${example.catalog})`);
      console.log('');
    });
    
    // Generate suggested fixes
    console.log('\n💡 SUGGESTED PATTERN ADDITIONS:');
    console.log('=' .repeat(70));
    
    const suggestions = generateSuggestions(sortedPatterns);
    suggestions.forEach(suggestion => {
      console.log(suggestion);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function findPatterns(text, patternCounts, examples, catalogNumber) {
  // HTML-like patterns (similar to <sup>4-</sup>)
  const htmlPatterns = text.match(/<[^>]+>/g) || [];
  htmlPatterns.forEach(pattern => {
    addPattern(pattern, patternCounts, examples, text, catalogNumber);
  });
  
  // Special character sequences (like Œ&ge;)
  const specialSequences = text.match(/[ÀÿŒŽ][&\w;]{2,}/g) || [];
  specialSequences.forEach(pattern => {
    addPattern(pattern, patternCounts, examples, text, catalogNumber);
  });
  
  // Backslash patterns
  const backslashPatterns = text.match(/\\+[\w\n]*/g) || [];
  backslashPatterns.forEach(pattern => {
    addPattern(pattern, patternCounts, examples, text, catalogNumber);
  });
  
  // HTML entities that might be malformed
  const entityPatterns = text.match(/&[a-zA-Z0-9]{2,8};?/g) || [];
  entityPatterns.forEach(pattern => {
    addPattern(pattern, patternCounts, examples, text, catalogNumber);
  });
  
  // Unicode-looking patterns
  const unicodePatterns = text.match(/[^\x00-\x7F]{2,}/g) || [];
  unicodePatterns.forEach(pattern => {
    if (pattern.length <= 10) { // Avoid very long matches
      addPattern(pattern, patternCounts, examples, text, catalogNumber);
    }
  });
  
  // Chemical formula artifacts
  const chemicalPatterns = text.match(/[A-Z][a-z]?[0-9]+[^\w\s][0-9]*/g) || [];
  chemicalPatterns.forEach(pattern => {
    addPattern(pattern, patternCounts, examples, text, catalogNumber);
  });
  
  // Punctuation anomalies
  const punctuationPatterns = text.match(/[{}[\]]+|[,;:]{2,}|\s[,;:]/g) || [];
  punctuationPatterns.forEach(pattern => {
    addPattern(pattern, patternCounts, examples, text, catalogNumber);
  });
}

function addPattern(pattern, patternCounts, examples, text, catalogNumber) {
  patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
  
  if (!examples[pattern] || examples[pattern].text.length > text.length) {
    examples[pattern] = {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      catalog: catalogNumber
    };
  }
}

function generateSuggestions(patterns) {
  const suggestions = [];
  
  patterns.forEach(([pattern, count]) => {
    // HTML tag suggestions
    if (pattern.match(/<sup>\d+<\/sup>/)) {
      suggestions.push(`// HTML superscript: .replace(/${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/g, '${pattern.match(/\d+/)[0]}')`);
    }
    
    if (pattern.match(/<sup>\d+-<\/sup>/)) {
      suggestions.push(`// HTML superscript with dash: .replace(/${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/g, '${pattern.match(/\d+/)[0]}-')`);
    }
    
    // Special character sequences
    if (pattern.match(/Œ&\w+;/)) {
      const entity = pattern.match(/&(\w+);/)?.[1];
      if (entity === 'ge') suggestions.push(`// Greek gamma: .replace(/Œ&ge;/g, 'γ')`);
      if (entity === 'le') suggestions.push(`// Greek alpha: .replace(/Œ&le;/g, 'α')`);
      if (entity === 'beta') suggestions.push(`// Greek beta: .replace(/Œ&beta;/g, 'β')`);
    }
    
    // Backslash patterns
    if (pattern.match(/\\{2,}/)) {
      suggestions.push(`// Backslash cleanup: .replace(/${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/g, ' ')`);
    }
    
    // Curly brace patterns
    if (pattern.includes('{') || pattern.includes('}')) {
      suggestions.push(`// Curly braces: .replace(/\\{/g, '(').replace(/\\}/g, ')')`);
    }
  });
  
  return [...new Set(suggestions)]; // Remove duplicates
}

// Run the scanner
findEncodingPatterns();