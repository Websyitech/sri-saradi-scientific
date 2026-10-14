// Documentation data for Sri Saradi Scientific Home Redesign
export interface DocumentItem {
  number: string;
  label: string;
  title: string;
  description: string;
  checks: string[];
}

export const documentsData: Record<'datasheet' | 'coa' | 'citations', DocumentItem> = {
  "datasheet": {
    "number": "01",
    "label": "Product-level information",
    "title": "Will this product fit the method?",
    "description": "The manufacturer datasheet helps you assess the intended application and conditions of use.",
    "checks": [
      "Product specifications & format",
      "Application and protocol guidance",
      "Storage & handling requirements"
    ]
  },
  "coa": {
    "number": "02",
    "label": "Batch-level information",
    "title": "What is reported for this lot?",
    "description": "The relevant certificate of analysis provides the manufacturer’s reported quality information for the product batch.",
    "checks": [
      "Catalogue and batch identification",
      "Reported tests & acceptance criteria",
      "Results available for the supplied lot"
    ]
  },
  "citations": {
    "number": "03",
    "label": "Published-use evidence",
    "title": "How has this product been used?",
    "description": "Available product citations help you review the published experimental context. They do not guarantee performance in a new method.",
    "checks": [
      "Identify the product used in the paper",
      "Review sample, method and conditions",
      "Assess relevance to your application"
    ]
  }
};
