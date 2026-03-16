/**
 * Script to audit your database for text encoding issues
 * This will help you identify ALL mojibake patterns like "Äë"
 */

import { PrismaClient } from '@prisma/client';
import { auditTextIssues, detectUnknownMojibake } from '../app/utils/textUtils-enhanced';

const prisma = new PrismaClient();

async function auditDatabase() {
  console.log('🔍 Auditing database for text encoding issues...\n');
  
  try {
    // Get all products with text fields
    const products = await prisma.product.findMany({
      select: {
        id: true,
        catalogNumber: true,
        name: true,
        description: true,
        manufacturer: true,
        brand: true,
        applications: true,
        abTarget: true,
        abReactivity: true,
        abHost: true,
        elisaChineseName: true,
        primaryCategory: true,
        subCategory: true,
        productLine: true,
      }
    });
    
    console.log(`📊 Analyzing ${products.length} products...\n`);
    
    // Collect all text fields
    const allTexts: string[] = [];
    const problemProducts: { id: string, catalogNumber: string, issues: string[] }[] = [];
    
    products.forEach(product => {
      const textFields = [
        product.name,
        product.description,
        product.manufacturer,
        product.brand,
        product.applications,
        product.abTarget,
        product.abReactivity,
        product.abHost,
        product.elisaChineseName,
        product.primaryCategory,
        product.subCategory,
        product.productLine,
      ].filter(Boolean) as string[];
      
      allTexts.push(...textFields);
      
      // Check this specific product for issues
      const productIssues: string[] = [];
      textFields.forEach(text => {
        const unknown = detectUnknownMojibake(text);
        productIssues.push(...unknown);
      });
      
      if (productIssues.length > 0) {
        problemProducts.push({
          id: product.id,
          catalogNumber: product.catalogNumber,
          issues: [...new Set(productIssues)] // Remove duplicates
        });
      }
    });
    
    // Run the audit
    const { knownIssues, unknownPatterns } = auditTextIssues(allTexts);
    
    // Report results
    console.log('🔧 KNOWN ISSUES (patterns we can fix):');
    console.log('=' .repeat(50));
    
    if (Object.keys(knownIssues).length === 0) {
      console.log('✅ No known mojibake patterns found!');
    } else {
      Object.entries(knownIssues)
        .sort(([,a], [,b]) => b - a) // Sort by count descending
        .forEach(([pattern, count]) => {
          console.log(`"${pattern}" → ${count} occurrences`);
        });
    }
    
    console.log('\n🚨 UNKNOWN PATTERNS (need manual review):');
    console.log('=' .repeat(50));
    
    if (Object.keys(unknownPatterns).length === 0) {
      console.log('✅ No unknown mojibake patterns found!');
    } else {
      Object.entries(unknownPatterns)
        .sort(([,a], [,b]) => b - a) // Sort by count descending
        .forEach(([pattern, count]) => {
          // Show character codes to help identify the issue
          const charCodes = pattern.split('').map(char => 
            `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`
          ).join(' ');
          
          console.log(`"${pattern}" (${charCodes}) → ${count} occurrences`);
        });
    }
    
    console.log('\n📋 PRODUCTS WITH ISSUES:');
    console.log('=' .repeat(50));
    
    if (problemProducts.length === 0) {
      console.log('✅ No products with unknown issues!');
    } else {
      problemProducts.slice(0, 10).forEach(product => { // Show first 10
        console.log(`${product.catalogNumber}: [${product.issues.join(', ')}]`);
      });
      
      if (problemProducts.length > 10) {
        console.log(`... and ${problemProducts.length - 10} more products`);
      }
    }
    
    // Summary
    console.log('\n📈 SUMMARY:');
    console.log('=' .repeat(50));
    console.log(`Total products analyzed: ${products.length}`);
    console.log(`Products with known issues: ${Object.keys(knownIssues).length > 0 ? 'Some' : 'None'}`);
    console.log(`Products with unknown patterns: ${problemProducts.length}`);
    console.log(`Unique unknown patterns: ${Object.keys(unknownPatterns).length}`);
    
    if (Object.keys(unknownPatterns).length > 0) {
      console.log('\n💡 NEXT STEPS:');
      console.log('1. Add the unknown patterns to MOJIBAKE_PATTERNS in textUtils-enhanced.ts');
      console.log('2. Test the patterns manually to find correct replacements');
      console.log('3. Re-run this audit to verify fixes');
    }
    
  } catch (error) {
    console.error('❌ Error during audit:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Check specific text for debugging
async function checkSpecificText() {
  const testTexts = [
    'Äë',
    'â€™',
    'Î±-tubulin',
    'Anti-Î²-actin',
    'Some normal text',
  ];
  
  console.log('🧪 Testing specific patterns:\n');
  
  testTexts.forEach(text => {
    const issues = detectUnknownMojibake(text);
    console.log(`"${text}" → Issues: [${issues.join(', ') || 'none'}]`);
  });
}

// Run the script
const command = process.argv[2];

if (command === 'test') {
  checkSpecificText();
} else {
  auditDatabase();
}