export const cleanText = (text: string | null | undefined): string => {
  if (!text) return "";
  
  // First handle HTML tags and chemical-specific patterns
  let cleaned = text
    // Handle escaped HTML subscript entities - convert to Unicode subscripts
    .replace(/&lt;sub&gt;([^&]+)&lt;\/sub&gt;/g, (match, content) => {
      return content.split('').map((char: string) => {
        const subscriptMap: { [key: string]: string } = {
          '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
          '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
          '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
          'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
          'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
          'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
          'v': 'ᵥ', 'x': 'ₓ'
        };
        return subscriptMap[char] || char;
      }).join('');
    })
    // Handle escaped HTML superscript entities - convert to Unicode superscripts
    .replace(/&lt;sup&gt;([^&]+)&lt;\/sup&gt;/g, (match, content) => {
      return content.split('').map((char: string) => {
        const superscriptMap: { [key: string]: string } = {
          '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
          '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
          '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
          'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ',
          'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
          'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ',
          'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ',
          'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ'
        };
        return superscriptMap[char] || char;
      }).join('');
    })
    // Handle HTML subscript tags - just remove tags, keep content as normal text
    .replace(/<sub>([^<]+)<\/sub>/g, '$1')
    // Handle HTML superscript tags - just remove tags, keep content as normal text
    .replace(/<sup>([^<]+)<\/sup>/g, '$1')
    // Remove malformed HTML tags (legacy patterns)
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
    // Clean position numbers in chemical names (preserve some spaces for readability)
    .replace(/(\d+),\s*(\d+)/g, '$1, $2')  // Keep space after comma
    .replace(/\)\s*-/g, ')-')
    .replace(/-\s*\(/g, '-(')
  
  // Then handle general mojibake characters commonly caused by encoding issues
  cleaned = cleaned
    // Apostrophes
    .replace(/Äô|â€™/g, "'")
    // Fix for Äë mojibake
    .replace(/Äë/g, "ë")
    // Accented latin
    .replace(/Ã¡/g, "á")
    .replace(/Ã©/g, "é")
    .replace(/Ã­/g, "í")
    .replace(/Ã³/g, "ó")
    .replace(/Ãº/g, "ú")
    .replace(/Ã /g, "à")
    .replace(/Ã¨/g, "è")
    .replace(/Ã¬/g, "ì")
    .replace(/Ã²/g, "ò")
    .replace(/Ã¹/g, "ù")
    .replace(/Ã§/g, "ç")
    .replace(/Ã±/g, "ñ")
    .replace(/Ã¶/g, "ö")
    .replace(/Ã¼/g, "ü")
    .replace(/Ã¤/g, "ä")
    .replace(/Ã/g, "Á")
    .replace(/Ã‰/g, "É")
    .replace(/Ã/g, "Í")
    .replace(/Ã"/g, "Ó")
    .replace(/Ãš/g, "Ú")
    .replace(/Ã€/g, "À")
    .replace(/Ãˆ/g, "È")
    .replace(/ÃŒ/g, "Ì")
    .replace(/Ã'/g, "Ò")
    .replace(/Ã™/g, "Ù")
    .replace(/Ã‡/g, "Ç")
    .replace(/Ã'/g, "Ñ")
    .replace(/Ã–/g, "Ö")
    .replace(/Ãœ/g, "Ü")
    .replace(/Ã„/g, "Ä")
    // Greek letters (common in scientific text)
    .replace(/Î±/g, "α")
    .replace(/Î²/g, "β")
    .replace(/Î³/g, "γ")
    .replace(/Î´/g, "δ")
    .replace(/Îµ/g, "ε")
    .replace(/Î¶/g, "ζ")
    .replace(/Î·/g, "η")
    .replace(/Î¸/g, "θ")
    .replace(/Î¹/g, "ι")
    .replace(/Îº/g, "κ")
    .replace(/Î»/g, "λ")
    .replace(/Î¼/g, "μ")
    .replace(/Î½/g, "ν")
    .replace(/Î¾/g, "ξ")
    .replace(/Î¿/g, "ο")
    .replace(/Ï€/g, "π")
    .replace(/Ï/g, "ρ")
    .replace(/Ïƒ/g, "σ")
    .replace(/Ï„/g, "τ")
    .replace(/Ï…/g, "υ")
    .replace(/Ï†/g, "φ")
    .replace(/Ï‡/g, "χ")
    .replace(/Ïˆ/g, "ψ")
    .replace(/Ï‰/g, "ω")
    // Capital Greek letters
    .replace(/Î"/g, "Α")
    .replace(/Î'/g, "Β")
    .replace(/Î"/g, "Γ")
    .replace(/Î"/g, "Δ")
    .replace(/Î•/g, "Ε")
    .replace(/Î–/g, "Ζ")
    .replace(/Î—/g, "Η")
    .replace(/Î˜/g, "Θ")
    .replace(/Î™/g, "Ι")
    .replace(/Îš/g, "Κ")
    .replace(/Î›/g, "Λ")
    .replace(/Îœ/g, "Μ")
    .replace(/Î/g, "Ν")
    .replace(/Îž/g, "Ξ")
    .replace(/ÎŸ/g, "Ο")
    .replace(/Î /g, "Π")
    .replace(/Î¡/g, "Ρ")
    .replace(/Î£/g, "Σ")
    .replace(/Î¤/g, "Τ")
    .replace(/Î¥/g, "Υ")
    .replace(/Î¦/g, "Φ")
    .replace(/Î§/g, "Χ")
    .replace(/Îˆ/g, "Ψ")
    .replace(/Î©/g, "Ω")
    // Mathematical symbols
    .replace(/Â±/g, "±")
    .replace(/Â°/g, "°")
    .replace(/Âµ/g, "µ")
    // Fix common encoding artifacts
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/â€˜/g, "'")
    .replace(/â€™/g, "'")
    .replace(/â€"/g, "–")
    .replace(/â€"/g, "—")
    .replace(/â€¦/g, "…")
    // Remove any remaining control characters
    .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim();

  return cleaned;
};