/**
 * React components for displaying scientific text with proper formatting
 */

import React from 'react';
import { transformForDisplay } from '../lib/character-transformer';

interface ScientificTextProps {
  children: string;
  className?: string;
  fallback?: string;
}

/**
 * Component to safely render scientific text with HTML entities
 */
export function ScientificText({ children, className = '', fallback = '' }: ScientificTextProps) {
  if (!children) return <span className={className}>{fallback}</span>;
  
  const transformedText = transformForDisplay(children);
  
  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: transformedText }}
    />
  );
}

/**
 * Component for product names with scientific notation
 */
export function ProductName({ name, className = '' }: { name: string; className?: string }) {
  return (
    <ScientificText className={`font-medium ${className}`}>
      {name}
    </ScientificText>
  );
}

/**
 * Component for product descriptions
 */
export function ProductDescription({ description, className = '' }: { description: string; className?: string }) {
  return (
    <ScientificText className={`text-gray-600 ${className}`}>
      {description}
    </ScientificText>
  );
}

/**
 * Component for displaying chemical formulas
 */
export function ChemicalFormula({ formula, className = '' }: { formula: string; className?: string }) {
  return (
    <ScientificText className={`font-mono ${className}`}>
      {formula}
    </ScientificText>
  );
}

/**
 * Safe text display that handles encoding issues gracefully
 */
export function SafeText({ 
  text, 
  maxLength, 
  className = '',
  showTooltip = false 
}: { 
  text: string; 
  maxLength?: number;
  className?: string;
  showTooltip?: boolean;
}) {
  if (!text) return null;
  
  const transformedText = transformForDisplay(text);
  const shouldTruncate = maxLength && text.length > maxLength;
  const displayText = shouldTruncate 
    ? `${transformedText.substring(0, maxLength)}...` 
    : transformedText;
  
  const content = (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  );
  
  if (showTooltip && shouldTruncate) {
    return (
      <span title={text} className="cursor-help">
        {content}
      </span>
    );
  }
  
  return content;
}