/**
 * Script to fix special characters in scientific product database
 * Handles common scientific notation and chemical formulas
 */

const { PrismaClient } = require('../app/generated/prisma');
const prisma = new PrismaClient();

// Character mapping for common scientific notation
const characterMap = {
  // Subscripts
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  
  // Superscripts  
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '-',
  
  // Greek letters (commonly used in scientific names)
  'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'ε': 'epsilon', 'ζ': 'zeta',
  'η': 'eta', 'θ': 'theta', 'ι': 'iota', 'κ': 'kappa', 'λ': 'lambda', 'μ': 'mu',
  'ν': 'nu', 'ξ': 'xi', 'ο': 'omicron', 'π': 'pi', 'ρ': 'rho', 'σ': 'sigma',
  'τ': 'tau', 'υ': 'upsilon', 'φ': 'phi', 'χ': 'chi', 'ψ': 'psi', 'ω': 'omega',
  
  // Mathematical symbols
  '±': '+/-', '×': 'x', '÷': '/', '≤': '<=', '≥': '>=', '≈': '~',
  
  // Special quotes and dashes
  '"': '"', '"': '"', ''': "'", ''': "'", '–': '-', '—': '-',
  
  // Temperature
  '°': 'deg',
};

// Enhanced character mapping that preserves scientific meaning
const scientificCharacterMap = {
  // Chemical formulas (keep as HTML entities for web display)
  'H₂O': 'H<sub>2</sub>O',
  'CO₂': 'CO<sub>2</sub>',
  'CaCl₂': 'CaCl<sub>2</sub>',
  'SO₄²⁻': 'SO<sub>4</sub><sup>2-</sup>',
  'Mg²⁺': 'Mg<sup>2+</sup>',
  
  // Concentration units
  'μg/mL': 'µg/mL',
  'μM': 'µM',
  'μL': 'µL',
  '°C': '°C',
  '°F': '°F',
};

/**
 * Clean text while preserving scientific meaning
 */
function cleanText(text, preserveScientific = true) {
  if (!text || typeof text !== 'string') return text;
  
  let cleaned = text;
  
  if (preserveScientific) {
    // First apply scientific mappings
    for (const [original, replacement] of Object.entries(scientificCharacterMap)) {
      cleaned = cleaned.replace(new RegExp(escapeRegex(original), 'g'), replacement);
    }
  }
  
  // Then apply general character mappings
  for (const [original, replacement] of Object.entries(characterMap)) {
    cleaned = cleaned.replace(new RegExp(escapeRegex(original), 'g'), replacement);
  }
  
  return cleaned;
}

/**
 * Escape special regex characters
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Detect problematic characters
 */
function detectProblematicChars(text) {
  if (!text) return [];
  
  const problematic = [];
  const commonProblematic = /[^\x00-\x7F]/g; // Non-ASCII characters
  
  let match;
  while ((match = commonProblematic.exec(text)) !== null) {
    if (!problematic.includes(match[0])) {
      problematic.push(match[0]);
    }
  }
  
  return problematic;
}

/**
 * Main cleanup function
 */
async function cleanupDatabase() {
  console.log('Starting database cleanup for special characters...\n');
  
  const fieldsToClean = [
    'name', 'description', 'manufacturer', 'material', 'volume', 
    'needleShape', 'size', 'abHost', 'abImmunogen', 'abTarget',
    'elisaChineseName', 'applications', 'brand', 'storage',
    'primaryCategory', 'subCategory', 'productLine'
  ];
  
  try {
    // Get all products
    const products = await prisma.product.findMany();
    console.log(`Found ${products.length} products to process\n`);
    
    let processedCount = 0;
    let updatedCount = 0;
    
    for (const product of products) {
      let hasChanges = false;
      const updates = {};
      const problematicChars = new Set();
      
      // Check each field for special characters
      for (const field of fieldsToClean) {
        const value = product[field];
        if (value && typeof value === 'string') {
          const detected = detectProblematicChars(value);
          detected.forEach(char => problematicChars.add(char));
          
          const cleaned = cleanText(value);
          if (cleaned !== value) {
            updates[field] = cleaned;
            hasChanges = true;
          }
        }
      }
      
      if (hasChanges) {
        console.log(`Updating product: ${product.catalogNumber}`);
        if (problematicChars.size > 0) {
          console.log(`  Problematic chars found: ${Array.from(problematicChars).join(', ')}`);
        }
        
        await prisma.product.update({
          where: { id: product.id },
          data: updates
        });
        
        updatedCount++;
      }
      
      processedCount++;
      if (processedCount % 100 === 0) {
        console.log(`Processed ${processedCount}/${products.length} products...`);
      }
    }
    
    console.log(`\nCleanup completed!`);
    console.log(`Processed: ${processedCount} products`);
    console.log(`Updated: ${updatedCount} products`);
    
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Audit function to detect issues without fixing
 */
async function auditSpecialCharacters() {
  console.log('Auditing database for special characters...\n');
  
  const products = await prisma.product.findMany();
  const charCount = {};
  let affectedProducts = 0;
  
  for (const product of products) {
    let hasIssues = false;
    
    for (const [field, value] of Object.entries(product)) {
      if (value && typeof value === 'string') {
        const problematic = detectProblematicChars(value);
        if (problematic.length > 0) {
          hasIssues = true;
          problematic.forEach(char => {
            charCount[char] = (charCount[char] || 0) + 1;
          });
        }
      }
    }
    
    if (hasIssues) affectedProducts++;
  }
  
  console.log(`Products with special characters: ${affectedProducts}/${products.length}`);
  console.log('\nMost common special characters:');
  
  Object.entries(charCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20)
    .forEach(([char, count]) => {
      console.log(`  "${char}" (U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}): ${count} occurrences`);
    });
}

// Run based on command line argument
const command = process.argv[2];

if (command === 'audit') {
  auditSpecialCharacters();
} else if (command === 'clean') {
  cleanupDatabase();
} else {
  console.log('Usage:');
  console.log('  node scripts/fix-special-characters.js audit  # Audit only');
  console.log('  node scripts/fix-special-characters.js clean  # Clean data');
}