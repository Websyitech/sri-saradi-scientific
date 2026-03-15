/**
 * Middleware to validate and clean character encoding on data input
 */

import { sanitizeInput, hasProblematicChars } from '../utils/text-helpers.js';

/**
 * Middleware for API routes to validate character encoding
 */
export function validateCharacterEncoding(req, res, next) {
  const textFields = ['name', 'description', 'manufacturer', 'material', 'volume'];
  
  if (req.body) {
    for (const field of textFields) {
      if (req.body[field] && typeof req.body[field] === 'string') {
        // Check for problematic characters
        if (hasProblematicChars(req.body[field])) {
          return res.status(400).json({
            error: `Invalid characters detected in field: ${field}`,
            field,
            suggestion: 'Please ensure your data is properly encoded in UTF-8'
          });
        }
        
        // Sanitize the input
        req.body[field] = sanitizeInput(req.body[field]);
      }
    }
  }
  
  next();
}

/**
 * Validate CSV import data
 */
export function validateCsvData(csvRow) {
  const errors = [];
  const cleaned = {};
  
  for (const [key, value] of Object.entries(csvRow)) {
    if (value && typeof value === 'string') {
      if (hasProblematicChars(value)) {
        errors.push(`Invalid characters in column: ${key}`);
      } else {
        cleaned[key] = sanitizeInput(value);
      }
    } else {
      cleaned[key] = value;
    }
  }
  
  return { errors, cleaned };
}