// Audience and collaboration data for Sri Saradi Scientific Home Redesign
export interface BenefitItem {
  icon: 'target' | 'document' | 'box' | 'network' | 'support' | 'time' | 'people';
  title: string;
  description: string;
}

export interface RoleCard {
  icon: 'target' | 'document' | 'box' | 'network' | 'support' | 'time' | 'people';
  label: string;
  title: string;
  items: string[];
}

export const audienceBenefits: Record<'enduser' | 'dealer', BenefitItem[]> = {
  "enduser": [
    {
      "icon": "time",
      "title": "Less time translating the requirement",
      "description": "A scientist-led discussion preserves application detail as the requirement moves to procurement and manufacturers."
    },
    {
      "icon": "support",
      "title": "One contact for technical follow-up",
      "description": "We coordinate product questions and supporting documents, helping reduce repeated follow-up by your technical team."
    },
    {
      "icon": "box",
      "title": "A coordinated worldwide supply route",
      "description": "Integrated logistics connects availability, handling, documentation and the quoted delivery commitment."
    },
    {
      "icon": "target",
      "title": "A clearer cost and suitability comparison",
      "description": "Review the exact product, evidence and complete delivered cost before committing to a sourcing route."
    }
  ],
  "dealer": [
    {
      "icon": "network",
      "title": "Specialist portfolios for your customers",
      "description": "Access Solarbio, Orient Filtr and Galactics through Sri Saradi’s principal relationships."
    },
    {
      "icon": "support",
      "title": "Scientists behind your technical enquiry",
      "description": "Bring the customer’s application for requirement clarification, product discussions and manufacturer follow-up."
    },
    {
      "icon": "box",
      "title": "Sourcing and logistics through one contact",
      "description": "Coordinate product availability, the quotation, documents and worldwide delivery under agreed terms."
    },
    {
      "icon": "people",
      "title": "A stronger customer proposal",
      "description": "Connect a reviewed requirement with supporting evidence and a supply plan. Agree commercial and customer-contact responsibilities upfront."
    }
  ]
};

export const collaborationRoles: Record<'enduser' | 'dealer', RoleCard[]> = {
  "enduser": [
    {
      "icon": "target",
      "label": "Application knowledge",
      "title": "Your technical team",
      "items": [
        "Defines the method or process",
        "Sets assessment criteria",
        "Approves product suitability"
      ]
    },
    {
      "icon": "network",
      "label": "Coordination & supply",
      "title": "Sri Saradi Scientific",
      "items": [
        "Translates the application brief",
        "Coordinates evidence and answers",
        "Connects procurement and logistics"
      ]
    },
    {
      "icon": "document",
      "label": "Product expertise",
      "title": "The manufacturer",
      "items": [
        "Provides product specifications",
        "Addresses product questions",
        "Supplies available technical evidence"
      ]
    }
  ],
  "dealer": [
    {
      "icon": "people",
      "label": "Customer relationship",
      "title": "Your dealer team",
      "items": [
        "Brings the customer requirement",
        "Develops the customer proposal",
        "Agrees communication responsibilities"
      ]
    },
    {
      "icon": "network",
      "label": "Portfolio & technical coordination",
      "title": "Sri Saradi Scientific",
      "items": [
        "Clarifies the customer application",
        "Coordinates quotes and evidence",
        "Connects sourcing and logistics"
      ]
    },
    {
      "icon": "document",
      "label": "Product expertise",
      "title": "The manufacturer",
      "items": [
        "Provides product specifications",
        "Addresses product questions",
        "Supplies available technical evidence"
      ]
    }
  ]
};
