'use client';

import { useState } from 'react';
import { cleanText } from "../utils/textUtils";

interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  specs: Array<{
    label: string;
    value: string;
  }>;
  applications: string[];
  features: string[];
}

const PRODUCT_CATEGORIES: Product[] = [
 {
    "id": "A384FS-004N",
    "category": "PCR Plates",
    "title": "384-well Full-Skirted PCR Plate (Nature)",
    "description": "G2 generation 384-well full-skirted PCR plate in nature/clear colour. Produced in 100,000-level clean room. Compatible with up to 97% of current PCR machines.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "A384FS-004N"
      },
      {
        "label": "Well Format",
        "value": "384-well"
      },
      {
        "label": "Volume",
        "value": "30µL"
      },
      {
        "label": "Skirting",
        "value": "Full-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "High-throughput screening"
    ],
    "features": [
      "G2 best-in-class injection moulding",
      "Special polypropylene for PCR and qPCR cycler compatibility",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer"
    ]
  },
  {
    "id": "A384FS-004W",
    "category": "PCR Plates",
    "title": "384-well Full-Skirted PCR Plate (White)",
    "description": "G2 generation 384-well full-skirted PCR plate in white. Ideal for fluorescence-based detection.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "A384FS-004W"
      },
      {
        "label": "Well Format",
        "value": "384-well"
      },
      {
        "label": "Volume",
        "value": "30µL"
      },
      {
        "label": "Skirting",
        "value": "Full-skirted"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "qPCR",
      "Fluorescence detection",
      "High-throughput screening"
    ],
    "features": [
      "G2 best-in-class injection moulding",
      "White for enhanced fluorescence signal",
      "DNase-free, RNase-free, Non-pyrogenic"
    ]
  },
  {
    "id": "B96NS-01N",
    "category": "PCR Plates",
    "title": "96-well Non-skirted PCR Plate 0.1mL (Nature)",
    "description": "G2 96-well non-skirted PCR plate, 0.1mL well volume, Nature colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B96NS-01N"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.1mL"
      },
      {
        "label": "Skirting",
        "value": "Non-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "B96NS-01W",
    "category": "PCR Plates",
    "title": "96-well Non-skirted PCR Plate 0.1mL (White)",
    "description": "G2 96-well non-skirted PCR plate, 0.1mL well volume, White colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B96NS-01W"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.1mL"
      },
      {
        "label": "Skirting",
        "value": "Non-skirted"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "B96NS-02N",
    "category": "PCR Plates",
    "title": "96-well Non-skirted PCR Plate 0.2mL (Nature)",
    "description": "G2 96-well non-skirted PCR plate, 0.2mL well volume, Nature colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B96NS-02N"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL"
      },
      {
        "label": "Skirting",
        "value": "Non-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "B96NS-02W",
    "category": "PCR Plates",
    "title": "96-well Non-skirted PCR Plate 0.2mL (White)",
    "description": "G2 96-well non-skirted PCR plate, 0.2mL well volume, White colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B96NS-02W"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL"
      },
      {
        "label": "Skirting",
        "value": "Non-skirted"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "ET96NSN-02PF",
    "category": "PCR Plates",
    "title": "96-well Non-skirted PCR Plate 0.2mL (Eppendorf style, cuttable) (Nature)",
    "description": "G2 96-well non-skirted PCR plate, 0.2mL (Eppendorf style, cuttable) well volume, Nature colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "ET96NSN-02PF"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL (Eppendorf style, cuttable)"
      },
      {
        "label": "Skirting",
        "value": "Non-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (10 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "B96HS-01N",
    "category": "PCR Plates",
    "title": "96-well Semi-skirted PCR Plate 0.1mL (Nature)",
    "description": "G2 96-well semi-skirted PCR plate, 0.1mL well volume, Nature colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B96HS-01N"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.1mL"
      },
      {
        "label": "Skirting",
        "value": "Semi-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "B96HS-01W",
    "category": "PCR Plates",
    "title": "96-well Semi-skirted PCR Plate 0.1mL (White)",
    "description": "G2 96-well semi-skirted PCR plate, 0.1mL well volume, White colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B96HS-01W"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.1mL"
      },
      {
        "label": "Skirting",
        "value": "Semi-skirted"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "B96HS-02N",
    "category": "PCR Plates",
    "title": "96-well Semi-skirted PCR Plate 0.2mL (cuttable) (Nature)",
    "description": "G2 96-well semi-skirted PCR plate, 0.2mL (cuttable) well volume, Nature colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B96HS-02N"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL (cuttable)"
      },
      {
        "label": "Skirting",
        "value": "Semi-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "B96HS-02W",
    "category": "PCR Plates",
    "title": "96-well Semi-skirted PCR Plate 0.2mL (cuttable) (White)",
    "description": "G2 96-well semi-skirted PCR plate, 0.2mL (cuttable) well volume, White colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B96HS-02W"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL (cuttable)"
      },
      {
        "label": "Skirting",
        "value": "Semi-skirted"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "A96WS-02N",
    "category": "PCR Plates",
    "title": "96-well Semi-skirted PCR Plate 0.2mL (Nature)",
    "description": "G2 96-well semi-skirted PCR plate, 0.2mL well volume, Nature colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "A96WS-02N"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL"
      },
      {
        "label": "Skirting",
        "value": "Semi-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "A96WS-02W",
    "category": "PCR Plates",
    "title": "96-well Semi-skirted PCR Plate 0.2mL (White)",
    "description": "G2 96-well semi-skirted PCR plate, 0.2mL well volume, White colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "A96WS-02W"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL"
      },
      {
        "label": "Skirting",
        "value": "Semi-skirted"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "A96WS-02PN",
    "category": "PCR Plates",
    "title": "96-well Semi-skirted PCR Plate 0.2mL (raised side) (Nature)",
    "description": "G2 96-well semi-skirted PCR plate, 0.2mL (raised side) well volume, Nature colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "A96WS-02PN"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL (raised side)"
      },
      {
        "label": "Skirting",
        "value": "Semi-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "T96HS-02N",
    "category": "PCR Plates",
    "title": "96-well Semi-skirted PCR Plate 0.2mL (cuttable) (Nature)",
    "description": "G2 96-well semi-skirted PCR plate, 0.2mL (cuttable) well volume, Nature colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "T96HS-02N"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL (cuttable)"
      },
      {
        "label": "Skirting",
        "value": "Semi-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (15 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "S96NS-02PN",
    "category": "PCR Plates",
    "title": "96-well Non-skirted PCR Plate 0.2mL (optical, cuttable) (Nature)",
    "description": "G2 96-well non-skirted PCR plate, 0.2mL (optical, cuttable) well volume, Nature colour. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "S96NS-02PN"
      },
      {
        "label": "Well Format",
        "value": "96-well"
      },
      {
        "label": "Volume",
        "value": "0.2mL (optical, cuttable)"
      },
      {
        "label": "Skirting",
        "value": "Non-skirted"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Wall Thickness",
        "value": "0.30mm"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (10 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "Compatible with 97% of current PCR machines",
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Uniform thin wall 0.30mm for optimal heat transfer",
      "Transparent well for easy observation"
    ]
  },
  {
    "id": "PCR-S96GC",
    "category": "PCR Plates",
    "title": "Full-Plate PCR Cap Strip (Optical, Cuttable, 96-well)",
    "description": "Optical cuttable full-plate PCR caps for 96-well plates. Individually selectable wells.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR-S96GC"
      },
      {
        "label": "Type",
        "value": "Optical, cuttable full-plate cap"
      },
      {
        "label": "Cap Numbers",
        "value": "96 well"
      },
      {
        "label": "Packaging",
        "value": "10 Boxes (10 PCS/Box, 10 Boxes/Case)"
      }
    ],
    "applications": [
      "PCR",
      "qPCR"
    ],
    "features": [
      "Cuttable design for flexible use",
      "Optical clarity for real-time detection"
    ]
  },
  {
    "id": "QPCR96F-1",
    "category": "Sealing Films & Foils",
    "title": "Pressure-sensitive Film, High Transparent (with Perforated Lines)",
    "description": "Sealing film/foil for microplates. For qpcr. Material: Polyester resin. Dimension: 141.5×77mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "QPCR96F-1"
      },
      {
        "label": "Use",
        "value": "for qPCR"
      },
      {
        "label": "Material",
        "value": "Polyester resin"
      },
      {
        "label": "Dimension",
        "value": "141.5×77mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "qPCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Polyester resin"
    ]
  },
  {
    "id": "QPCR96F",
    "category": "Sealing Films & Foils",
    "title": "Pressure-sensitive Film, High Transparent",
    "description": "Sealing film/foil for microplates. For qpcr. Material: Polyester resin. Dimension: 118×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "QPCR96F"
      },
      {
        "label": "Use",
        "value": "for qPCR"
      },
      {
        "label": "Material",
        "value": "Polyester resin"
      },
      {
        "label": "Dimension",
        "value": "118×80mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "qPCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Polyester resin"
    ]
  },
  {
    "id": "PCR96F",
    "category": "Sealing Films & Foils",
    "title": "Self-adhesive Film (Common)",
    "description": "Sealing film/foil for microplates. For pcr. Material: Polyester resin. Dimension: 141.5×77mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR96F"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Polyester resin"
      },
      {
        "label": "Dimension",
        "value": "141.5×77mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Polyester resin"
    ]
  },
  {
    "id": "AF00001",
    "category": "Sealing Films & Foils",
    "title": "Self-adhesive Foil",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 138×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00001"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "138×80mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "PF00006",
    "category": "Sealing Films & Foils",
    "title": "Self-adhesive Foil, Pierceable",
    "description": "Sealing film/foil for microplates. For qpcr. Material: PET. Dimension: 137×81mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PF00006"
      },
      {
        "label": "Use",
        "value": "for qPCR"
      },
      {
        "label": "Material",
        "value": "PET"
      },
      {
        "label": "Dimension",
        "value": "137×81mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "qPCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: PET"
    ]
  },
  {
    "id": "AF00011",
    "category": "Sealing Films & Foils",
    "title": "25µm Vitl-style Heat-sealing Foil, Pierceable",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 129×78mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00011"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "129×78mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "AF00004",
    "category": "Sealing Films & Foils",
    "title": "25µm 4titude-style Heat-sealing Foil, Pierceable",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 125×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00004"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "125×80mm"
      },
      {
        "label": "Packaging",
        "value": "100 Sheets/Box"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "AF00005",
    "category": "Sealing Films & Foils",
    "title": "35µm Vitl-style Heat-sealing Foil, Pierceable",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 125×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00005"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "125×80mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "AF00006",
    "category": "Sealing Films & Foils",
    "title": "25µm 4titude-style Heat-sealing Foil, Pierceable (Sheet)",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 125×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00006"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "125×80mm"
      },
      {
        "label": "Packaging",
        "value": "100 Sheets/Box"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "AF00013",
    "category": "Sealing Films & Foils",
    "title": "25µm 4titude-style Heat-sealing Foil, Pierceable (Roll 80mm)",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 300m×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00013"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "300m×80mm"
      },
      {
        "label": "Packaging",
        "value": "1 Roll/Case"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "AF00014",
    "category": "Sealing Films & Foils",
    "title": "25µm 4titude-style Heat-sealing Foil, Pierceable (Roll 115mm)",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 300m×115mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00014"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "300m×115mm"
      },
      {
        "label": "Packaging",
        "value": "1 Roll/Case"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "AF00007",
    "category": "Sealing Films & Foils",
    "title": "35µm 4titude-style Heat-sealing Foil, Pierceable (Sheet)",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 125×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00007"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "125×80mm"
      },
      {
        "label": "Packaging",
        "value": "100 Sheets/Box"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "AF00015",
    "category": "Sealing Films & Foils",
    "title": "35µm 4titude-style Heat-sealing Foil, Pierceable (Roll 80mm)",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 300m×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00015"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "300m×80mm"
      },
      {
        "label": "Packaging",
        "value": "1 Roll/Case"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "AF00016",
    "category": "Sealing Films & Foils",
    "title": "35µm 4titude-style Heat-sealing Foil, Pierceable (Roll 115mm)",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 300m×115mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00016"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "300m×115mm"
      },
      {
        "label": "Packaging",
        "value": "1 Roll/Case"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "PF00007",
    "category": "Sealing Films & Foils",
    "title": "4titude-style Heat-sealing Film (Sheet)",
    "description": "Sealing film/foil for microplates. For qpcr. Material: PET. Dimension: 125×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PF00007"
      },
      {
        "label": "Use",
        "value": "for qPCR"
      },
      {
        "label": "Material",
        "value": "PET"
      },
      {
        "label": "Dimension",
        "value": "125×80mm"
      },
      {
        "label": "Packaging",
        "value": "100 Sheets/Box"
      }
    ],
    "applications": [
      "qPCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: PET"
    ]
  },
  {
    "id": "PF00017",
    "category": "Sealing Films & Foils",
    "title": "4titude-style Heat-sealing Film (Roll 80mm)",
    "description": "Sealing film/foil for microplates. For qpcr. Material: PET. Dimension: 300m×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PF00017"
      },
      {
        "label": "Use",
        "value": "for qPCR"
      },
      {
        "label": "Material",
        "value": "PET"
      },
      {
        "label": "Dimension",
        "value": "300m×80mm"
      },
      {
        "label": "Packaging",
        "value": "1 Roll/Case"
      }
    ],
    "applications": [
      "qPCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: PET"
    ]
  },
  {
    "id": "PF00018",
    "category": "Sealing Films & Foils",
    "title": "4titude-style Heat-sealing Film (Roll 115mm)",
    "description": "Sealing film/foil for microplates. For qpcr. Material: PET. Dimension: 300m×115mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PF00018"
      },
      {
        "label": "Use",
        "value": "for qPCR"
      },
      {
        "label": "Material",
        "value": "PET"
      },
      {
        "label": "Dimension",
        "value": "300m×115mm"
      },
      {
        "label": "Packaging",
        "value": "1 Roll/Case"
      }
    ],
    "applications": [
      "qPCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: PET"
    ]
  },
  {
    "id": "PF00010",
    "category": "Sealing Films & Foils",
    "title": "4titude-style Heat-sealing Film, Breathable (Sheet)",
    "description": "Sealing film/foil for microplates. For cell culture. Material: Paper. Dimension: 125×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PF00010"
      },
      {
        "label": "Use",
        "value": "for cell culture"
      },
      {
        "label": "Material",
        "value": "Paper"
      },
      {
        "label": "Dimension",
        "value": "125×80mm"
      },
      {
        "label": "Packaging",
        "value": "100 Sheets/Box"
      }
    ],
    "applications": [
      "Cell culture"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Paper"
    ]
  },
  {
    "id": "PF00019",
    "category": "Sealing Films & Foils",
    "title": "4titude-style Heat-sealing Film, Breathable (Roll 80mm)",
    "description": "Sealing film/foil for microplates. For cell culture. Material: Paper. Dimension: 300m×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PF00019"
      },
      {
        "label": "Use",
        "value": "for cell culture"
      },
      {
        "label": "Material",
        "value": "Paper"
      },
      {
        "label": "Dimension",
        "value": "300m×80mm"
      },
      {
        "label": "Packaging",
        "value": "1 Roll/Case"
      }
    ],
    "applications": [
      "Cell culture"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Paper"
    ]
  },
  {
    "id": "PF00020",
    "category": "Sealing Films & Foils",
    "title": "4titude-style Heat-sealing Film, Breathable (Roll 115mm)",
    "description": "Sealing film/foil for microplates. For cell culture. Material: Paper. Dimension: 300m×115mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PF00020"
      },
      {
        "label": "Use",
        "value": "for cell culture"
      },
      {
        "label": "Material",
        "value": "Paper"
      },
      {
        "label": "Dimension",
        "value": "300m×115mm"
      },
      {
        "label": "Packaging",
        "value": "1 Roll/Case"
      }
    ],
    "applications": [
      "Cell culture"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Paper"
    ]
  },
  {
    "id": "PF00004",
    "category": "Sealing Films & Foils",
    "title": "Axygen-style Self-adhesive Film",
    "description": "Sealing film/foil for microplates. For qpcr. Material: BOPP. Dimension: 136×80mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PF00004"
      },
      {
        "label": "Use",
        "value": "for qPCR"
      },
      {
        "label": "Material",
        "value": "BOPP"
      },
      {
        "label": "Dimension",
        "value": "136×80mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "qPCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: BOPP"
    ]
  },
  {
    "id": "PF00008",
    "category": "Sealing Films & Foils",
    "title": "Axygen-style Self-adhesive Film, Breathable",
    "description": "Sealing film/foil for microplates. For cell culture. Material: Non-woven fabric. Dimension: 142×83mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PF00008"
      },
      {
        "label": "Use",
        "value": "for cell culture"
      },
      {
        "label": "Material",
        "value": "Non-woven fabric"
      },
      {
        "label": "Dimension",
        "value": "142×83mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "Cell culture"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Non-woven fabric"
    ]
  },
  {
    "id": "AF00002",
    "category": "Sealing Films & Foils",
    "title": "Heat-sealing Foil, Cuttable (for Cuttable PCR Plates)",
    "description": "Sealing film/foil for microplates. For pcr. Material: Aluminum. Dimension: 132×81mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AF00002"
      },
      {
        "label": "Use",
        "value": "for PCR"
      },
      {
        "label": "Material",
        "value": "Aluminum"
      },
      {
        "label": "Dimension",
        "value": "132×81mm"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Box"
      }
    ],
    "applications": [
      "PCR"
    ],
    "features": [
      "Compatible with standard 96-well SBS microplates",
      "Material: Aluminum"
    ]
  },
  {
    "id": "PCR8WC-02N",
    "category": "PCR Strips",
    "title": "PCR 8-Strip Tube with Cap (Simport Style, Nature)",
    "description": "G2 PCR tube strip. 0.2mL Regular well volume. 8 tubes. Colour: Nature. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR8WC-02N"
      },
      {
        "label": "Volume",
        "value": "0.2mL Regular"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "PCR8WC-02TN",
    "category": "PCR Strips",
    "title": "PCR 8-Strip Tube with Cap (Thermo Fisher Style, Nature)",
    "description": "G2 PCR tube strip. 0.2mL Regular well volume. 8 tubes. Colour: Nature. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR8WC-02TN"
      },
      {
        "label": "Volume",
        "value": "0.2mL Regular"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "PCR8WC-02BN",
    "category": "PCR Strips",
    "title": "PCR 8-Strip Tube with Cap (No Handle, Nature)",
    "description": "G2 PCR tube strip. 0.2mL Regular well volume. 8 tubes. Colour: Nature. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR8WC-02BN"
      },
      {
        "label": "Volume",
        "value": "0.2mL Regular"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "B8RT-02N",
    "category": "PCR Strips",
    "title": "8-Strip Tube, Regular Profile (Nature)",
    "description": "G2 PCR tube strip. 0.2mL Regular well volume. 8 tubes. Colour: Nature. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B8RT-02N"
      },
      {
        "label": "Volume",
        "value": "0.2mL Regular"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "B8RT-02W",
    "category": "PCR Strips",
    "title": "8-Strip Tube, Regular Profile (White)",
    "description": "G2 PCR tube strip. 0.2mL Regular well volume. 8 tubes. Colour: White. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B8RT-02W"
      },
      {
        "label": "Volume",
        "value": "0.2mL Regular"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "B8LT-01N",
    "category": "PCR Strips",
    "title": "8-Strip Tube, Low Profile (Nature)",
    "description": "G2 PCR tube strip. 0.1/0.2mL Low well volume. 8 tubes. Colour: Nature. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B8LT-01N"
      },
      {
        "label": "Volume",
        "value": "0.1/0.2mL Low"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "B8LT-01W",
    "category": "PCR Strips",
    "title": "8-Strip Tube, Low Profile (White)",
    "description": "G2 PCR tube strip. 0.1/0.2mL Low well volume. 8 tubes. Colour: White. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B8LT-01W"
      },
      {
        "label": "Volume",
        "value": "0.1/0.2mL Low"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "B12RT-02N",
    "category": "PCR Strips",
    "title": "12-Strip Tube, Regular Profile (Nature)",
    "description": "G2 PCR tube strip. 0.2mL Regular well volume. 12 tubes. Colour: Nature. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B12RT-02N"
      },
      {
        "label": "Volume",
        "value": "0.2mL Regular"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "12 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "B12RT-02W",
    "category": "PCR Strips",
    "title": "12-Strip Tube, Regular Profile (White)",
    "description": "G2 PCR tube strip. 0.2mL Regular well volume. 12 tubes. Colour: White. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B12RT-02W"
      },
      {
        "label": "Volume",
        "value": "0.2mL Regular"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Tube Numbers",
        "value": "12 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "B12LT-01N",
    "category": "PCR Strips",
    "title": "12-Strip Tube, Low Profile (Nature)",
    "description": "G2 PCR tube strip. 0.1/0.2mL Low well volume. 12 tubes. Colour: Nature. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B12LT-01N"
      },
      {
        "label": "Volume",
        "value": "0.1/0.2mL Low"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "12 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "B12LT-01W",
    "category": "PCR Strips",
    "title": "12-Strip Tube, Low Profile (White)",
    "description": "G2 PCR tube strip. 0.1/0.2mL Low well volume. 12 tubes. Colour: White. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B12LT-01W"
      },
      {
        "label": "Volume",
        "value": "0.1/0.2mL Low"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Tube Numbers",
        "value": "12 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "A8LT-01N",
    "category": "PCR Strips",
    "title": "8-Strip Tube, Low Profile, Axygen Style (Nature)",
    "description": "G2 PCR tube strip. 0.1/0.2mL Low well volume. 8 tubes. Colour: Nature. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "A8LT-01N"
      },
      {
        "label": "Volume",
        "value": "0.1/0.2mL Low"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "A8LT-01W",
    "category": "PCR Strips",
    "title": "8-Strip Tube, Low Profile, Axygen Style (White)",
    "description": "G2 PCR tube strip. 0.1/0.2mL Low well volume. 8 tubes. Colour: White. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "A8LT-01W"
      },
      {
        "label": "Volume",
        "value": "0.1/0.2mL Low"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "A8RT-02N",
    "category": "PCR Strips",
    "title": "8-Strip Tube, Regular Profile, Axygen Style (Nature)",
    "description": "G2 PCR tube strip. 0.2mL Regular well volume. 8 tubes. Colour: Nature. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "A8RT-02N"
      },
      {
        "label": "Volume",
        "value": "0.2mL Regular"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "A8RT-02W",
    "category": "PCR Strips",
    "title": "8-Strip Tube, Regular Profile, Axygen Style (White)",
    "description": "G2 PCR tube strip. 0.2mL Regular well volume. 8 tubes. Colour: White. Produced in 100,000-level clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "A8RT-02W"
      },
      {
        "label": "Volume",
        "value": "0.2mL Regular"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Tube Numbers",
        "value": "8 tubes"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Thermal cycling"
    ],
    "features": [
      "DNase-free, RNase-free, No Human DNA, Non-pyrogenic",
      "Compatible with standard 96-well formats"
    ]
  },
  {
    "id": "PCR-B8GC",
    "category": "PCR Strips",
    "title": "PCR Cap Strip — 8 Flat Caps",
    "description": "PCR cap strip with 8 flat caps. Colour: Nature.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR-B8GC"
      },
      {
        "label": "Cap Numbers",
        "value": "8 flat caps"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR"
    ],
    "features": [
      "Secure sealing",
      "Compatible with GenFollower PCR tube strips"
    ]
  },
  {
    "id": "PCR-B12GC",
    "category": "PCR Strips",
    "title": "PCR Cap Strip — 12 Flat Caps",
    "description": "PCR cap strip with 12 flat caps. Colour: Nature.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR-B12GC"
      },
      {
        "label": "Cap Numbers",
        "value": "12 flat caps"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR"
    ],
    "features": [
      "Secure sealing",
      "Compatible with GenFollower PCR tube strips"
    ]
  },
  {
    "id": "PCR-A8GC",
    "category": "PCR Strips",
    "title": "PCR Cap Strip — 8 Flat Caps (Axygen Style)",
    "description": "PCR cap strip with 8 flat caps. Colour: Nature.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR-A8GC"
      },
      {
        "label": "Cap Numbers",
        "value": "8 flat caps"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR"
    ],
    "features": [
      "Secure sealing",
      "Compatible with GenFollower PCR tube strips"
    ]
  },
  {
    "id": "PCR-A8TC",
    "category": "PCR Strips",
    "title": "PCR Cap Strip — 8 Domed Caps (Axygen Style)",
    "description": "PCR cap strip with 8 domed caps. Colour: Nature.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR-A8TC"
      },
      {
        "label": "Cap Numbers",
        "value": "8 domed caps"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Packaging",
        "value": "125 PCS/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR"
    ],
    "features": [
      "Secure sealing",
      "Compatible with GenFollower PCR tube strips"
    ]
  },
  {
    "id": "PCR4RG",
    "category": "PCR Strips",
    "title": "PCR 4-Tube Strip with Separate Cap Strip (Qiagen/RotorGene Style)",
    "description": "4-tube PCR strip with separate cap strip for Qiagen RotorGene instruments. 0.1mL, nature colour.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR4RG"
      },
      {
        "label": "Volume",
        "value": "0.1mL"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Tube Numbers",
        "value": "4 tubes"
      },
      {
        "label": "Style",
        "value": "Qiagen RotorGene"
      },
      {
        "label": "Packaging",
        "value": "250 Kits/Box, 10 Boxes/Case"
      }
    ],
    "applications": [
      "PCR",
      "RotorGene qPCR"
    ],
    "features": [
      "Specific design for Qiagen RotorGene instruments",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "PCR001FG",
    "category": "PCR Tubes",
    "title": "Single PCR Tube 0.1mL — Optical Cap",
    "description": "Single PCR tube 0.1mL with Optical cap. Transparent. Uniform thin wall down to 0.25mm for optimal heat transfer. Conical bottom.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR001FG"
      },
      {
        "label": "Volume",
        "value": "0.1mL"
      },
      {
        "label": "Cap Type",
        "value": "Optical"
      },
      {
        "label": "Color",
        "value": "Transparent"
      },
      {
        "label": "Wall Thickness",
        "value": "Down to 0.25mm"
      },
      {
        "label": "Packaging",
        "value": "1000 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Sample storage"
    ],
    "features": [
      "Uniform thin wall 0.25mm for optimal heat transfer",
      "Conical bottom minimises sample loss during transfer",
      "RNase-free, DNase-free, Endotoxin-free, No Human DNA",
      "Produced in class 100,000 clean room"
    ]
  },
  {
    "id": "PCR002F",
    "category": "PCR Tubes",
    "title": "Single PCR Tube 0.2mL — Flat Cap",
    "description": "Single PCR tube 0.2mL with Flat, frosting cap. Transparent. Uniform thin wall down to 0.25mm for optimal heat transfer. Conical bottom.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR002F"
      },
      {
        "label": "Volume",
        "value": "0.2mL"
      },
      {
        "label": "Cap Type",
        "value": "Flat, frosting"
      },
      {
        "label": "Color",
        "value": "Transparent"
      },
      {
        "label": "Wall Thickness",
        "value": "Down to 0.25mm"
      },
      {
        "label": "Packaging",
        "value": "1000 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Sample storage"
    ],
    "features": [
      "Uniform thin wall 0.25mm for optimal heat transfer",
      "Conical bottom minimises sample loss during transfer",
      "RNase-free, DNase-free, Endotoxin-free, No Human DNA",
      "Produced in class 100,000 clean room"
    ]
  },
  {
    "id": "PCR002FG",
    "category": "PCR Tubes",
    "title": "Single PCR Tube 0.2mL — Optical Cap",
    "description": "Single PCR tube 0.2mL with Optical cap. Transparent. Uniform thin wall down to 0.25mm for optimal heat transfer. Conical bottom.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR002FG"
      },
      {
        "label": "Volume",
        "value": "0.2mL"
      },
      {
        "label": "Cap Type",
        "value": "Optical"
      },
      {
        "label": "Color",
        "value": "Transparent"
      },
      {
        "label": "Wall Thickness",
        "value": "Down to 0.25mm"
      },
      {
        "label": "Packaging",
        "value": "1000 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Sample storage"
    ],
    "features": [
      "Uniform thin wall 0.25mm for optimal heat transfer",
      "Conical bottom minimises sample loss during transfer",
      "RNase-free, DNase-free, Endotoxin-free, No Human DNA",
      "Produced in class 100,000 clean room"
    ]
  },
  {
    "id": "PCR002D",
    "category": "PCR Tubes",
    "title": "Single PCR Tube 0.2mL — Domed Cap",
    "description": "Single PCR tube 0.2mL with Domed cap. Transparent. Uniform thin wall down to 0.25mm for optimal heat transfer. Conical bottom.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR002D"
      },
      {
        "label": "Volume",
        "value": "0.2mL"
      },
      {
        "label": "Cap Type",
        "value": "Domed"
      },
      {
        "label": "Color",
        "value": "Transparent"
      },
      {
        "label": "Wall Thickness",
        "value": "Down to 0.25mm"
      },
      {
        "label": "Packaging",
        "value": "1000 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Sample storage"
    ],
    "features": [
      "Uniform thin wall 0.25mm for optimal heat transfer",
      "Conical bottom minimises sample loss during transfer",
      "RNase-free, DNase-free, Endotoxin-free, No Human DNA",
      "Produced in class 100,000 clean room"
    ]
  },
  {
    "id": "PCR005",
    "category": "PCR Tubes",
    "title": "Single PCR Tube 0.5mL — Flat Cap",
    "description": "Single PCR tube 0.5mL with Flat, frosting cap. Transparent. Uniform thin wall down to 0.25mm for optimal heat transfer. Conical bottom.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PCR005"
      },
      {
        "label": "Volume",
        "value": "0.5mL"
      },
      {
        "label": "Cap Type",
        "value": "Flat, frosting"
      },
      {
        "label": "Color",
        "value": "Transparent"
      },
      {
        "label": "Wall Thickness",
        "value": "Down to 0.25mm"
      },
      {
        "label": "Packaging",
        "value": "1000 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "PCR",
      "qPCR",
      "Sample storage"
    ],
    "features": [
      "Uniform thin wall 0.25mm for optimal heat transfer",
      "Conical bottom minimises sample loss during transfer",
      "RNase-free, DNase-free, Endotoxin-free, No Human DNA",
      "Produced in class 100,000 clean room"
    ]
  },
  {
    "id": "E-FTR10S-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Short — Common (Rack)",
    "description": "E Series filtered pipette tip, 10µL Short, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR10S-S"
      },
      {
        "label": "Volume",
        "value": "10µL Short"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB10S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Short — Common (Bag)",
    "description": "E Series filtered pipette tip, 10µL Short, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB10S"
      },
      {
        "label": "Volume",
        "value": "10µL Short"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR10S-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Short — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 10µL Short, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR10S-L-S"
      },
      {
        "label": "Volume",
        "value": "10µL Short"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB10S-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Short — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 10µL Short, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB10S-L"
      },
      {
        "label": "Volume",
        "value": "10µL Short"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTR10M-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Middle — Common (Rack)",
    "description": "E Series filtered pipette tip, 10µL Middle, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR10M-S"
      },
      {
        "label": "Volume",
        "value": "10µL Middle"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB10M",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Middle — Common (Bag)",
    "description": "E Series filtered pipette tip, 10µL Middle, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB10M"
      },
      {
        "label": "Volume",
        "value": "10µL Middle"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR10M-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Middle — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 10µL Middle, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR10M-L-S"
      },
      {
        "label": "Volume",
        "value": "10µL Middle"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB10M-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Middle — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 10µL Middle, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB10M-L"
      },
      {
        "label": "Volume",
        "value": "10µL Middle"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTR10GL-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Long — Common (Rack)",
    "description": "E Series filtered pipette tip, 10µL Long, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR10GL-S"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB10GL",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Long — Common (Bag)",
    "description": "E Series filtered pipette tip, 10µL Long, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB10GL"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR10GL-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Long — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 10µL Long, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR10GL-L-S"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB10GL-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 10µL Long — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 10µL Long, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB10GL-L"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTR20-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 20µL — Common (Rack)",
    "description": "E Series filtered pipette tip, 20µL, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR20-S"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB20",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 20µL — Common (Bag)",
    "description": "E Series filtered pipette tip, 20µL, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB20"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR20-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 20µL — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 20µL, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR20-L-S"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB20-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 20µL — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 20µL, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB20-L"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTR50-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 50µL — Common (Rack)",
    "description": "E Series filtered pipette tip, 50µL, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR50-S"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB50",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 50µL — Common (Bag)",
    "description": "E Series filtered pipette tip, 50µL, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB50"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR50-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 50µL — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 50µL, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR50-L-S"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB50-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 50µL — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 50µL, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB50-L"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTR100-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 100µL — Common (Rack)",
    "description": "E Series filtered pipette tip, 100µL, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR100-S"
      },
      {
        "label": "Volume",
        "value": "100µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB100",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 100µL — Common (Bag)",
    "description": "E Series filtered pipette tip, 100µL, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB100"
      },
      {
        "label": "Volume",
        "value": "100µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR100-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 100µL — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 100µL, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR100-L-S"
      },
      {
        "label": "Volume",
        "value": "100µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB100-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 100µL — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 100µL, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB100-L"
      },
      {
        "label": "Volume",
        "value": "100µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTR200-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 200µL — Common (Rack)",
    "description": "E Series filtered pipette tip, 200µL, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR200-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB200",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 200µL — Common (Bag)",
    "description": "E Series filtered pipette tip, 200µL, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB200"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR200-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 200µL — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 200µL, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR200-L-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB200-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 200µL — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 200µL, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB200-L"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTR300-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 300µL — Common (Rack)",
    "description": "E Series filtered pipette tip, 300µL, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR300-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB300",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 300µL — Common (Bag)",
    "description": "E Series filtered pipette tip, 300µL, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB300"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR300-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 300µL — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 300µL, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR300-L-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB300-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 300µL — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 300µL, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB300-L"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTR1000-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 1000µL — Common (Rack)",
    "description": "E Series filtered pipette tip, 1000µL, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR1000-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB1000",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 1000µL — Common (Bag)",
    "description": "E Series filtered pipette tip, 1000µL, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB1000"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR1000-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 1000µL — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 1000µL, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR1000-L-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB1000-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 1000µL — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 1000µL, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB1000-L"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTR1250-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 1250µL — Common (Rack)",
    "description": "E Series filtered pipette tip, 1250µL, Common class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR1250-S"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTB1250",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 1250µL — Common (Bag)",
    "description": "E Series filtered pipette tip, 1250µL, Common class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB1250"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available"
    ]
  },
  {
    "id": "E-FTR1250-L-S",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 1250µL — Ultra Low Retention (Rack)",
    "description": "E Series filtered pipette tip, 1250µL, Ultra Low Retention class, supplied in rack. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTR1250-L-S"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-FTB1250-L",
    "category": "E Series Filter Pipette Tips",
    "title": "E Series Filter Tip 1250µL — Ultra Low Retention (Bag)",
    "description": "E Series filtered pipette tip, 1250µL, Ultra Low Retention class, supplied in bag. RoHS compliant. ANSI-SLAS rack footprint. DNase/RNase/Pyrogen-free.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-FTB1250-L"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000 tips/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "PCR setup",
      "Cell culture",
      "General pipetting"
    ],
    "features": [
      "Integrated filter barrier for aerosol and contamination protection",
      "Thinner entrance wall for softer hand feel, reducing wrist strain in long-term use",
      "More graduations for wider volume range and precise pipetting",
      "ANSI-SLAS standard rack — compatible with automated workstations",
      "RoHS compliant (2011/65/EU and amendment 2015/863)",
      "DNase-free, RNase-free, Pyrogen-free",
      "5 Racks per Pack available",
      "Ultra Low Retention surface treatment minimises sample loss"
    ]
  },
  {
    "id": "E-TR10S-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Short — Common (Rack)",
    "description": "E Series non-filter pipette tip, 10µL Short, Common class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR10S-S"
      },
      {
        "label": "Volume",
        "value": "10µL Short"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TB10S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Short — Common (Bag)",
    "description": "E Series non-filter pipette tip, 10µL Short, Common class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB10S"
      },
      {
        "label": "Volume",
        "value": "10µL Short"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TR10S-L-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Short — Ultra Low Retention (Rack)",
    "description": "E Series non-filter pipette tip, 10µL Short, Ultra Low Retention class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR10S-L-S"
      },
      {
        "label": "Volume",
        "value": "10µL Short"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TB10S-L",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Short — Ultra Low Retention (Bag)",
    "description": "E Series non-filter pipette tip, 10µL Short, Ultra Low Retention class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB10S-L"
      },
      {
        "label": "Volume",
        "value": "10µL Short"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TR10M-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Middle — Common (Rack)",
    "description": "E Series non-filter pipette tip, 10µL Middle, Common class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR10M-S"
      },
      {
        "label": "Volume",
        "value": "10µL Middle"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TB10M",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Middle — Common (Bag)",
    "description": "E Series non-filter pipette tip, 10µL Middle, Common class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB10M"
      },
      {
        "label": "Volume",
        "value": "10µL Middle"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TR10M-L-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Middle — Ultra Low Retention (Rack)",
    "description": "E Series non-filter pipette tip, 10µL Middle, Ultra Low Retention class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR10M-L-S"
      },
      {
        "label": "Volume",
        "value": "10µL Middle"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TB10M-L",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Middle — Ultra Low Retention (Bag)",
    "description": "E Series non-filter pipette tip, 10µL Middle, Ultra Low Retention class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB10M-L"
      },
      {
        "label": "Volume",
        "value": "10µL Middle"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TR10GL-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Long — Common (Rack)",
    "description": "E Series non-filter pipette tip, 10µL Long, Common class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR10GL-S"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TB10GL",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Long — Common (Bag)",
    "description": "E Series non-filter pipette tip, 10µL Long, Common class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB10GL"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TR10GL-L-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Long — Ultra Low Retention (Rack)",
    "description": "E Series non-filter pipette tip, 10µL Long, Ultra Low Retention class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR10GL-L-S"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TB10GL-L",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 10µL Long — Ultra Low Retention (Bag)",
    "description": "E Series non-filter pipette tip, 10µL Long, Ultra Low Retention class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB10GL-L"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TR200-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 200µL — Common (Rack)",
    "description": "E Series non-filter pipette tip, 200µL, Common class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR200-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TB200",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 200µL — Common (Bag)",
    "description": "E Series non-filter pipette tip, 200µL, Common class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB200"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TR200-L-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 200µL — Ultra Low Retention (Rack)",
    "description": "E Series non-filter pipette tip, 200µL, Ultra Low Retention class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR200-L-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TB200-L",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 200µL — Ultra Low Retention (Bag)",
    "description": "E Series non-filter pipette tip, 200µL, Ultra Low Retention class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB200-L"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TR300-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 300µL — Common (Rack)",
    "description": "E Series non-filter pipette tip, 300µL, Common class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR300-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TB300",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 300µL — Common (Bag)",
    "description": "E Series non-filter pipette tip, 300µL, Common class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB300"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TR300-L-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 300µL — Ultra Low Retention (Rack)",
    "description": "E Series non-filter pipette tip, 300µL, Ultra Low Retention class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR300-L-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TB300-L",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 300µL — Ultra Low Retention (Bag)",
    "description": "E Series non-filter pipette tip, 300µL, Ultra Low Retention class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB300-L"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TR1000-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 1000µL — Common (Rack)",
    "description": "E Series non-filter pipette tip, 1000µL, Common class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR1000-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TB1000",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 1000µL — Common (Bag)",
    "description": "E Series non-filter pipette tip, 1000µL, Common class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB1000"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TR1000-L-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 1000µL — Ultra Low Retention (Rack)",
    "description": "E Series non-filter pipette tip, 1000µL, Ultra Low Retention class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR1000-L-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TB1000-L",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 1000µL — Ultra Low Retention (Bag)",
    "description": "E Series non-filter pipette tip, 1000µL, Ultra Low Retention class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB1000-L"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TR1250-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 1250µL — Common (Rack)",
    "description": "E Series non-filter pipette tip, 1250µL, Common class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR1250-S"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TB1250",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 1250µL — Common (Bag)",
    "description": "E Series non-filter pipette tip, 1250µL, Common class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB1250"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint"
    ]
  },
  {
    "id": "E-TR1250-L-S",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 1250µL — Ultra Low Retention (Rack)",
    "description": "E Series non-filter pipette tip, 1250µL, Ultra Low Retention class, rack. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TR1250-L-S"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-TB1250-L",
    "category": "E Series Pipette Tips",
    "title": "E Series Pipette Tip 1250µL — Ultra Low Retention (Bag)",
    "description": "E Series non-filter pipette tip, 1250µL, Ultra Low Retention class, bag. ANSI-SLAS footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-TB1250-L"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Molecular biology",
      "General pipetting",
      "Cell culture",
      "Genomics"
    ],
    "features": [
      "ANSI-SLAS standard rack footprint for workstation compatibility",
      "DNase-free, RNase-free",
      "Comply with ANSI/SLAS footprint",
      "Ultra Low Retention surface treatment"
    ]
  },
  {
    "id": "E-RS10GL-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 10µL Long — Common, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 10µL Long, Common, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS10GL-S"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS10GL-L-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 10µL Long — Ultra Low Retention, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 10µL Long, Ultra Low Retention, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS10GL-L-S"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS10GL",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 10µL Long — Common, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 10µL Long, Common, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS10GL"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS10GL-L",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 10µL Long — Ultra Low Retention, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 10µL Long, Ultra Low Retention, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS10GL-L"
      },
      {
        "label": "Volume",
        "value": "10µL Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS200-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 200µL — Common, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 200µL, Common, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS200-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS200-L-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 200µL — Ultra Low Retention, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 200µL, Ultra Low Retention, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS200-L-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS200",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 200µL — Common, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 200µL, Common, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS200"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS200-L",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 200µL — Ultra Low Retention, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 200µL, Ultra Low Retention, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS200-L"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS300-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 300µL — Common, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 300µL, Common, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS300-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS300-L-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 300µL — Ultra Low Retention, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 300µL, Ultra Low Retention, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS300-L-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS300",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 300µL — Common, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 300µL, Common, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS300"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS300-L",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 300µL — Ultra Low Retention, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 300µL, Ultra Low Retention, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS300-L"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "960/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS1000-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 1000µL — Common, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 1000µL, Common, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS1000-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "768/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS1000-L-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 1000µL — Ultra Low Retention, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 1000µL, Ultra Low Retention, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS1000-L-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "768/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS1000",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 1000µL — Common, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 1000µL, Common, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS1000"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "768/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS1000-L",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 1000µL — Ultra Low Retention, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 1000µL, Ultra Low Retention, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS1000-L"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "768/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS1250-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 1250µL — Common, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 1250µL, Common, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS1250-S"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "768/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS1250-L-S",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 1250µL — Ultra Low Retention, Sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 1250µL, Ultra Low Retention, Sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS1250-L-S"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "768/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS1250",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 1250µL — Common, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 1250µL, Common, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS1250"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "768/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-RS1250-L",
    "category": "E Series Pipette Tips Refill System",
    "title": "Refill Pack 1250µL — Ultra Low Retention, Non-sterile",
    "description": "Eco-friendly E Series pipette tip refill pack. 1250µL, Ultra Low Retention, Non-sterile. Simply press the top to install in an empty rack.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RS1250-L"
      },
      {
        "label": "Volume",
        "value": "1250µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Tips per Unit",
        "value": "768/Unit"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Units/Case"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "Eco-conscious laboratories"
    ],
    "features": [
      "Go Green — reduces plastic waste by reusing empty racks",
      "Easy to use: press top to install",
      "Sterile packaging maintains purity",
      "Devoid of DNA, RNA, and pyrogens"
    ]
  },
  {
    "id": "E-WER-A",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 10µL — PP, Red, With wafer",
    "description": "Empty reusable pipette tip rack for 10µL tips. Material: PP. Colour: Red. With wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-WER-A"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Red"
      },
      {
        "label": "For Tips",
        "value": "10µL"
      },
      {
        "label": "Wafer",
        "value": "With wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PP construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-ER-A",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 10µL — PP, Red, Without wafer",
    "description": "Empty reusable pipette tip rack for 10µL tips. Material: PP. Colour: Red. Without wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-ER-A"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Red"
      },
      {
        "label": "For Tips",
        "value": "10µL"
      },
      {
        "label": "Wafer",
        "value": "Without wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PP construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-WER-B",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 200/300µL — PP, Yellow, With wafer",
    "description": "Empty reusable pipette tip rack for 200/300µL tips. Material: PP. Colour: Yellow. With wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-WER-B"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Yellow"
      },
      {
        "label": "For Tips",
        "value": "200/300µL"
      },
      {
        "label": "Wafer",
        "value": "With wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PP construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-ER-B",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 200/300µL — PP, Yellow, Without wafer",
    "description": "Empty reusable pipette tip rack for 200/300µL tips. Material: PP. Colour: Yellow. Without wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-ER-B"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Yellow"
      },
      {
        "label": "For Tips",
        "value": "200/300µL"
      },
      {
        "label": "Wafer",
        "value": "Without wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PP construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-WER-C",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 1000/1250µL — PP, Blue, With wafer",
    "description": "Empty reusable pipette tip rack for 1000/1250µL tips. Material: PP. Colour: Blue. With wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-WER-C"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Blue"
      },
      {
        "label": "For Tips",
        "value": "1000/1250µL"
      },
      {
        "label": "Wafer",
        "value": "With wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PP construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-ER-C",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 1000/1250µL — PP, Blue, Without wafer",
    "description": "Empty reusable pipette tip rack for 1000/1250µL tips. Material: PP. Colour: Blue. Without wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-ER-C"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Blue"
      },
      {
        "label": "For Tips",
        "value": "1000/1250µL"
      },
      {
        "label": "Wafer",
        "value": "Without wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PP construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-WRC-A",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 10µL — PC, Red, With wafer",
    "description": "Empty reusable pipette tip rack for 10µL tips. Material: PC. Colour: Red. With wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-WRC-A"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Color",
        "value": "Red"
      },
      {
        "label": "For Tips",
        "value": "10µL"
      },
      {
        "label": "Wafer",
        "value": "With wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PC construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-RC-A",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 10µL — PC, Red, Without wafer",
    "description": "Empty reusable pipette tip rack for 10µL tips. Material: PC. Colour: Red. Without wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RC-A"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Color",
        "value": "Red"
      },
      {
        "label": "For Tips",
        "value": "10µL"
      },
      {
        "label": "Wafer",
        "value": "Without wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PC construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-WRC-B",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 200/300µL — PC, Yellow, With wafer",
    "description": "Empty reusable pipette tip rack for 200/300µL tips. Material: PC. Colour: Yellow. With wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-WRC-B"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Color",
        "value": "Yellow"
      },
      {
        "label": "For Tips",
        "value": "200/300µL"
      },
      {
        "label": "Wafer",
        "value": "With wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PC construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-RC-B",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 200/300µL — PC, Yellow, Without wafer",
    "description": "Empty reusable pipette tip rack for 200/300µL tips. Material: PC. Colour: Yellow. Without wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RC-B"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Color",
        "value": "Yellow"
      },
      {
        "label": "For Tips",
        "value": "200/300µL"
      },
      {
        "label": "Wafer",
        "value": "Without wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PC construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-WRC-C",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 1000/1250µL — PC, Blue, With wafer",
    "description": "Empty reusable pipette tip rack for 1000/1250µL tips. Material: PC. Colour: Blue. With wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-WRC-C"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Color",
        "value": "Blue"
      },
      {
        "label": "For Tips",
        "value": "1000/1250µL"
      },
      {
        "label": "Wafer",
        "value": "With wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PC construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "E-RC-C",
    "category": "Empty Pipette Tip Racks",
    "title": "Empty Tip Rack 1000/1250µL — PC, Blue, Without wafer",
    "description": "Empty reusable pipette tip rack for 1000/1250µL tips. Material: PC. Colour: Blue. Without wafer. Designed for use with E Series refill system.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "E-RC-C"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Color",
        "value": "Blue"
      },
      {
        "label": "For Tips",
        "value": "1000/1250µL"
      },
      {
        "label": "Wafer",
        "value": "Without wafer"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Laboratory pipetting",
      "Refill system compatibility"
    ],
    "features": [
      "Reusable — reduces plastic waste",
      "PC construction",
      "Compatible with E Series Refill Packs and Single Wafer Refill Packs"
    ]
  },
  {
    "id": "FTR1500-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 1500µL 130mm — Common (Rack)",
    "description": "Large volume filtered pipette tip, 1500µL 130mm, Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR1500-S"
      },
      {
        "label": "Volume",
        "value": "1500µL 130mm"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "25 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB1500",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 1500µL 130mm — Common (Bag)",
    "description": "Large volume filtered pipette tip, 1500µL 130mm, Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB1500"
      },
      {
        "label": "Volume",
        "value": "1500µL 130mm"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR1500-L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 1500µL 130mm — Ultra Low Retention (Rack)",
    "description": "Large volume filtered pipette tip, 1500µL 130mm, Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR1500-L-S"
      },
      {
        "label": "Volume",
        "value": "1500µL 130mm"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "25 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB1500-L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 1500µL 130mm — Ultra Low Retention (Bag)",
    "description": "Large volume filtered pipette tip, 1500µL 130mm, Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB1500-L"
      },
      {
        "label": "Volume",
        "value": "1500µL 130mm"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Long — Common (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Long, Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Long — Common (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Long, Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000L-L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Long — Ultra Low Retention (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Long, Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000L-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000L-L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Long — Ultra Low Retention (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Long, Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000L-L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000T-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Small Entrance (T) — Common (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Small Entrance (T), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000T-S"
      },
      {
        "label": "Volume",
        "value": "5mL Small Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "40/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000T",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Small Entrance (T) — Common (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Small Entrance (T), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000T"
      },
      {
        "label": "Volume",
        "value": "5mL Small Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000T-L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Small Entrance (T) — Ultra Low Retention (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Small Entrance (T), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000T-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Small Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "40/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000T-L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Small Entrance (T) — Ultra Low Retention (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Small Entrance (T), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000T-L"
      },
      {
        "label": "Volume",
        "value": "5mL Small Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000E-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Short (E) — Common (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Short (E), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000E-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (E)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000E",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Short (E) — Common (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Short (E), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000E"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (E)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000E-L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Short (E) — Ultra Low Retention (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Short (E), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000E-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (E)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000E-L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Short (E) — Ultra Low Retention (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Short (E), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000E-L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (E)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000G-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Short (G) — Common (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Short (G), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000G-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (G)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000G",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Short (G) — Common (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Short (G), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000G"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (G)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000G-L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Short (G) — Ultra Low Retention (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Short (G), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000G-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (G)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000G-L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Short (G) — Ultra Low Retention (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Short (G), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000G-L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (G)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000F-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Middle (F) — Common (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Middle (F), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000F-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Middle (F)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000F",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Middle (F) — Common (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Middle (F), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000F"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Middle (F)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR5000F-L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Middle (F) — Ultra Low Retention (Rack)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Middle (F), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR5000F-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Middle (F)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB5000F-L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 5mL Large Entrance Middle (F) — Ultra Low Retention (Bag)",
    "description": "Large volume filtered pipette tip, 5mL Large Entrance Middle (F), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB5000F-L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Middle (F)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR10000T-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Large Entrance (T) — Common (Rack)",
    "description": "Large volume filtered pipette tip, 10mL Large Entrance (T), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR10000T-S"
      },
      {
        "label": "Volume",
        "value": "10mL Large Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB10000T",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Large Entrance (T) — Common (Bag)",
    "description": "Large volume filtered pipette tip, 10mL Large Entrance (T), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB10000T"
      },
      {
        "label": "Volume",
        "value": "10mL Large Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR10000T-L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Large Entrance (T) — Ultra Low Retention (Rack)",
    "description": "Large volume filtered pipette tip, 10mL Large Entrance (T), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR10000T-L-S"
      },
      {
        "label": "Volume",
        "value": "10mL Large Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB10000T-L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Large Entrance (T) — Ultra Low Retention (Bag)",
    "description": "Large volume filtered pipette tip, 10mL Large Entrance (T), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB10000T-L"
      },
      {
        "label": "Volume",
        "value": "10mL Large Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR10000D-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Small Entrance (D) — Common (Rack)",
    "description": "Large volume filtered pipette tip, 10mL Small Entrance (D), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR10000D-S"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (D)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB10000D",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Small Entrance (D) — Common (Bag)",
    "description": "Large volume filtered pipette tip, 10mL Small Entrance (D), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB10000D"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (D)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR10000D-L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Small Entrance (D) — Ultra Low Retention (Rack)",
    "description": "Large volume filtered pipette tip, 10mL Small Entrance (D), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR10000D-L-S"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (D)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB10000D-L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Small Entrance (D) — Ultra Low Retention (Bag)",
    "description": "Large volume filtered pipette tip, 10mL Small Entrance (D), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB10000D-L"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (D)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR10000E-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Small Entrance (E) — Common (Rack)",
    "description": "Large volume filtered pipette tip, 10mL Small Entrance (E), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR10000E-S"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (E)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB10000E",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Small Entrance (E) — Common (Bag)",
    "description": "Large volume filtered pipette tip, 10mL Small Entrance (E), Common. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB10000E"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (E)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTR10000E-L-S",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Small Entrance (E) — Ultra Low Retention (Rack)",
    "description": "Large volume filtered pipette tip, 10mL Small Entrance (E), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTR10000E-L-S"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (E)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "FTB10000E-L",
    "category": "Large Volume Filter Pipette Tips",
    "title": "Large Volume Filter Tip 10mL Small Entrance (E) — Ultra Low Retention (Bag)",
    "description": "Large volume filtered pipette tip, 10mL Small Entrance (E), Ultra Low Retention. Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius and other major brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "FTB10000E-L"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (E)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume transfers",
      "HPLC preparation"
    ],
    "features": [
      "Transparent tip with clear graduations for easy observation",
      "Compatible with Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA and others",
      "Large & small entrance options available",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "TR1500-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 1500µL 130mm — Common (Rack)",
    "description": "Large volume non-filter pipette tip, 1500µL 130mm, Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR1500-S"
      },
      {
        "label": "Volume",
        "value": "1500µL 130mm"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "25 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB1500",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 1500µL 130mm — Common (Bag)",
    "description": "Large volume non-filter pipette tip, 1500µL 130mm, Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB1500"
      },
      {
        "label": "Volume",
        "value": "1500µL 130mm"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR1500-L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 1500µL 130mm — Ultra Low Retention (Rack)",
    "description": "Large volume non-filter pipette tip, 1500µL 130mm, Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR1500-L-S"
      },
      {
        "label": "Volume",
        "value": "1500µL 130mm"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "25 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB1500-L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 1500µL 130mm — Ultra Low Retention (Bag)",
    "description": "Large volume non-filter pipette tip, 1500µL 130mm, Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB1500-L"
      },
      {
        "label": "Volume",
        "value": "1500µL 130mm"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Long — Common (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Long, Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Long — Common (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Long, Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Long"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000L-L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Long — Ultra Low Retention (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Long, Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000L-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000L-L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Long — Ultra Low Retention (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Long, Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000L-L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Long"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000T-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Small Entrance (T) — Common (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Small Entrance (T), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000T-S"
      },
      {
        "label": "Volume",
        "value": "5mL Small Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "40/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000T",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Small Entrance (T) — Common (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Small Entrance (T), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000T"
      },
      {
        "label": "Volume",
        "value": "5mL Small Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000T-L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Small Entrance (T) — Ultra Low Retention (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Small Entrance (T), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000T-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Small Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "40/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000T-L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Small Entrance (T) — Ultra Low Retention (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Small Entrance (T), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000T-L"
      },
      {
        "label": "Volume",
        "value": "5mL Small Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000E-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Short (E) — Common (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Short (E), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000E-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (E)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000E",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Short (E) — Common (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Short (E), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000E"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (E)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000E-L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Short (E) — Ultra Low Retention (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Short (E), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000E-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (E)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000E-L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Short (E) — Ultra Low Retention (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Short (E), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000E-L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (E)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000G-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Short (G) — Common (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Short (G), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000G-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (G)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000G",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Short (G) — Common (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Short (G), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000G"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (G)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000G-L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Short (G) — Ultra Low Retention (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Short (G), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000G-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (G)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000G-L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Short (G) — Ultra Low Retention (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Short (G), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000G-L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Short (G)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000F-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Middle (F) — Common (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Middle (F), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000F-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Middle (F)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000F",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Middle (F) — Common (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Middle (F), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000F"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Middle (F)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR5000F-L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Middle (F) — Ultra Low Retention (Rack)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Middle (F), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR5000F-L-S"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Middle (F)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB5000F-L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 5mL Large Entrance Middle (F) — Ultra Low Retention (Bag)",
    "description": "Large volume non-filter pipette tip, 5mL Large Entrance Middle (F), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB5000F-L"
      },
      {
        "label": "Volume",
        "value": "5mL Large Entrance Middle (F)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR10000T-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Large Entrance (T) — Common (Rack)",
    "description": "Large volume non-filter pipette tip, 10mL Large Entrance (T), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR10000T-S"
      },
      {
        "label": "Volume",
        "value": "10mL Large Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB10000T",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Large Entrance (T) — Common (Bag)",
    "description": "Large volume non-filter pipette tip, 10mL Large Entrance (T), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB10000T"
      },
      {
        "label": "Volume",
        "value": "10mL Large Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR10000T-L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Large Entrance (T) — Ultra Low Retention (Rack)",
    "description": "Large volume non-filter pipette tip, 10mL Large Entrance (T), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR10000T-L-S"
      },
      {
        "label": "Volume",
        "value": "10mL Large Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB10000T-L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Large Entrance (T) — Ultra Low Retention (Bag)",
    "description": "Large volume non-filter pipette tip, 10mL Large Entrance (T), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB10000T-L"
      },
      {
        "label": "Volume",
        "value": "10mL Large Entrance (T)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR10000D-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Small Entrance (D) — Common (Rack)",
    "description": "Large volume non-filter pipette tip, 10mL Small Entrance (D), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR10000D-S"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (D)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB10000D",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Small Entrance (D) — Common (Bag)",
    "description": "Large volume non-filter pipette tip, 10mL Small Entrance (D), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB10000D"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (D)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR10000D-L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Small Entrance (D) — Ultra Low Retention (Rack)",
    "description": "Large volume non-filter pipette tip, 10mL Small Entrance (D), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR10000D-L-S"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (D)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB10000D-L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Small Entrance (D) — Ultra Low Retention (Bag)",
    "description": "Large volume non-filter pipette tip, 10mL Small Entrance (D), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB10000D-L"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (D)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR10000E-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Small Entrance (E) — Common (Rack)",
    "description": "Large volume non-filter pipette tip, 10mL Small Entrance (E), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR10000E-S"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (E)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB10000E",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Small Entrance (E) — Common (Bag)",
    "description": "Large volume non-filter pipette tip, 10mL Small Entrance (E), Common. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB10000E"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (E)"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TR10000E-L-S",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Small Entrance (E) — Ultra Low Retention (Rack)",
    "description": "Large volume non-filter pipette tip, 10mL Small Entrance (E), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TR10000E-L-S"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (E)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "TB10000E-L",
    "category": "Large Volume Pipette Tips",
    "title": "Large Volume Tip 10mL Small Entrance (E) — Ultra Low Retention (Bag)",
    "description": "Large volume non-filter pipette tip, 10mL Small Entrance (E), Ultra Low Retention. Compatible with major pipette brands. Transparent with clear graduations.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TB10000E-L"
      },
      {
        "label": "Volume",
        "value": "10mL Small Entrance (E)"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Color",
        "value": "Nature"
      }
    ],
    "applications": [
      "Cell culture",
      "Sample preparation",
      "Large volume liquid transfers"
    ],
    "features": [
      "Transparent tip with clear graduations for observation while pipetting",
      "Compatible with major pipette brands (Eppendorf, Dragon, Brand, Thermo, Sartorius, Gilson, Rainin, IKA, Watson)",
      "Large & small entrance options available"
    ]
  },
  {
    "id": "CC-FWTR200-S",
    "category": "Wide Bore Filter Pipette Tips",
    "title": "Wide Bore Filter Tip 200µL — Common (Rack)",
    "description": "Wide bore filtered pipette tip with 1.50mm orifice for high-viscosity samples. 200µL, Common. Universally compatible. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-FWTR200-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Orifice Diameter",
        "value": "1.50mm"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Sterile",
        "value": "Yes"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions",
      "Sample preparation"
    ],
    "features": [
      "Wide orifice minimises shear forces on delicate samples",
      "Universally compatible with a range of pipettes",
      "Sterile, DNase-free, RNase-free, DNA-free, Pyrogen-free"
    ]
  },
  {
    "id": "CC-FWTB200",
    "category": "Wide Bore Filter Pipette Tips",
    "title": "Wide Bore Filter Tip 200µL — Common (Bag)",
    "description": "Wide bore filtered pipette tip with 1.50mm orifice for high-viscosity samples. 200µL, Common. Universally compatible. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-FWTB200"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Orifice Diameter",
        "value": "1.50mm"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Sterile",
        "value": "Yes"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions",
      "Sample preparation"
    ],
    "features": [
      "Wide orifice minimises shear forces on delicate samples",
      "Universally compatible with a range of pipettes",
      "Sterile, DNase-free, RNase-free, DNA-free, Pyrogen-free"
    ]
  },
  {
    "id": "CC-FWTR200-L-S",
    "category": "Wide Bore Filter Pipette Tips",
    "title": "Wide Bore Filter Tip 200µL — Ultra Low Retention (Rack)",
    "description": "Wide bore filtered pipette tip with 1.50mm orifice for high-viscosity samples. 200µL, Ultra Low Retention. Universally compatible. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-FWTR200-L-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Orifice Diameter",
        "value": "1.50mm"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Sterile",
        "value": "Yes"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions",
      "Sample preparation"
    ],
    "features": [
      "Wide orifice minimises shear forces on delicate samples",
      "Universally compatible with a range of pipettes",
      "Sterile, DNase-free, RNase-free, DNA-free, Pyrogen-free"
    ]
  },
  {
    "id": "CC-FWTB200-L",
    "category": "Wide Bore Filter Pipette Tips",
    "title": "Wide Bore Filter Tip 200µL — Ultra Low Retention (Bag)",
    "description": "Wide bore filtered pipette tip with 1.50mm orifice for high-viscosity samples. 200µL, Ultra Low Retention. Universally compatible. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-FWTB200-L"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Orifice Diameter",
        "value": "1.50mm"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Sterile",
        "value": "Yes"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions",
      "Sample preparation"
    ],
    "features": [
      "Wide orifice minimises shear forces on delicate samples",
      "Universally compatible with a range of pipettes",
      "Sterile, DNase-free, RNase-free, DNA-free, Pyrogen-free"
    ]
  },
  {
    "id": "CC-FWTR1000-S",
    "category": "Wide Bore Filter Pipette Tips",
    "title": "Wide Bore Filter Tip 1000µL — Common (Rack)",
    "description": "Wide bore filtered pipette tip with 2.05mm orifice for high-viscosity samples. 1000µL, Common. Universally compatible. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-FWTR1000-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Orifice Diameter",
        "value": "2.05mm"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Sterile",
        "value": "Yes"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions",
      "Sample preparation"
    ],
    "features": [
      "Wide orifice minimises shear forces on delicate samples",
      "Universally compatible with a range of pipettes",
      "Sterile, DNase-free, RNase-free, DNA-free, Pyrogen-free"
    ]
  },
  {
    "id": "CC-FWTB1000",
    "category": "Wide Bore Filter Pipette Tips",
    "title": "Wide Bore Filter Tip 1000µL — Common (Bag)",
    "description": "Wide bore filtered pipette tip with 2.05mm orifice for high-viscosity samples. 1000µL, Common. Universally compatible. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-FWTB1000"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Orifice Diameter",
        "value": "2.05mm"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Sterile",
        "value": "Yes"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions",
      "Sample preparation"
    ],
    "features": [
      "Wide orifice minimises shear forces on delicate samples",
      "Universally compatible with a range of pipettes",
      "Sterile, DNase-free, RNase-free, DNA-free, Pyrogen-free"
    ]
  },
  {
    "id": "CC-FWTR1000-L-S",
    "category": "Wide Bore Filter Pipette Tips",
    "title": "Wide Bore Filter Tip 1000µL — Ultra Low Retention (Rack)",
    "description": "Wide bore filtered pipette tip with 2.05mm orifice for high-viscosity samples. 1000µL, Ultra Low Retention. Universally compatible. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-FWTR1000-L-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Orifice Diameter",
        "value": "2.05mm"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Sterile",
        "value": "Yes"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions",
      "Sample preparation"
    ],
    "features": [
      "Wide orifice minimises shear forces on delicate samples",
      "Universally compatible with a range of pipettes",
      "Sterile, DNase-free, RNase-free, DNA-free, Pyrogen-free"
    ]
  },
  {
    "id": "CC-FWTB1000-L",
    "category": "Wide Bore Filter Pipette Tips",
    "title": "Wide Bore Filter Tip 1000µL — Ultra Low Retention (Bag)",
    "description": "Wide bore filtered pipette tip with 2.05mm orifice for high-viscosity samples. 1000µL, Ultra Low Retention. Universally compatible. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-FWTB1000-L"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Orifice Diameter",
        "value": "2.05mm"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Sterile",
        "value": "Yes"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions",
      "Sample preparation"
    ],
    "features": [
      "Wide orifice minimises shear forces on delicate samples",
      "Universally compatible with a range of pipettes",
      "Sterile, DNase-free, RNase-free, DNA-free, Pyrogen-free"
    ]
  },
  {
    "id": "CC-WTR200-S",
    "category": "Wide Bore Pipette Tips",
    "title": "Wide Bore Tip 200µL — Common (Rack)",
    "description": "Wide bore non-filter pipette tip with 1.50mm orifice for high-viscosity samples. 200µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-WTR200-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Orifice Diameter",
        "value": "1.50mm"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions"
    ],
    "features": [
      "Wide orifice minimises shear forces",
      "Universally compatible",
      "Sterile, DNase-free, RNase-free"
    ]
  },
  {
    "id": "CC-WTB200",
    "category": "Wide Bore Pipette Tips",
    "title": "Wide Bore Tip 200µL — Common (Bag)",
    "description": "Wide bore non-filter pipette tip with 1.50mm orifice for high-viscosity samples. 200µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-WTB200"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Orifice Diameter",
        "value": "1.50mm"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions"
    ],
    "features": [
      "Wide orifice minimises shear forces",
      "Universally compatible",
      "Sterile, DNase-free, RNase-free"
    ]
  },
  {
    "id": "CC-WTR200-L-S",
    "category": "Wide Bore Pipette Tips",
    "title": "Wide Bore Tip 200µL — Ultra Low Retention (Rack)",
    "description": "Wide bore non-filter pipette tip with 1.50mm orifice for high-viscosity samples. 200µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-WTR200-L-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Orifice Diameter",
        "value": "1.50mm"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions"
    ],
    "features": [
      "Wide orifice minimises shear forces",
      "Universally compatible",
      "Sterile, DNase-free, RNase-free"
    ]
  },
  {
    "id": "CC-WTB200-L",
    "category": "Wide Bore Pipette Tips",
    "title": "Wide Bore Tip 200µL — Ultra Low Retention (Bag)",
    "description": "Wide bore non-filter pipette tip with 1.50mm orifice for high-viscosity samples. 200µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-WTB200-L"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Orifice Diameter",
        "value": "1.50mm"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions"
    ],
    "features": [
      "Wide orifice minimises shear forces",
      "Universally compatible",
      "Sterile, DNase-free, RNase-free"
    ]
  },
  {
    "id": "CC-WTR1000-S",
    "category": "Wide Bore Pipette Tips",
    "title": "Wide Bore Tip 1000µL — Common (Rack)",
    "description": "Wide bore non-filter pipette tip with 2.05mm orifice for high-viscosity samples. 1000µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-WTR1000-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Orifice Diameter",
        "value": "2.05mm"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions"
    ],
    "features": [
      "Wide orifice minimises shear forces",
      "Universally compatible",
      "Sterile, DNase-free, RNase-free"
    ]
  },
  {
    "id": "CC-WTB1000",
    "category": "Wide Bore Pipette Tips",
    "title": "Wide Bore Tip 1000µL — Common (Bag)",
    "description": "Wide bore non-filter pipette tip with 2.05mm orifice for high-viscosity samples. 1000µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-WTB1000"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Orifice Diameter",
        "value": "2.05mm"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions"
    ],
    "features": [
      "Wide orifice minimises shear forces",
      "Universally compatible",
      "Sterile, DNase-free, RNase-free"
    ]
  },
  {
    "id": "CC-WTR1000-L-S",
    "category": "Wide Bore Pipette Tips",
    "title": "Wide Bore Tip 1000µL — Ultra Low Retention (Rack)",
    "description": "Wide bore non-filter pipette tip with 2.05mm orifice for high-viscosity samples. 1000µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-WTR1000-L-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Orifice Diameter",
        "value": "2.05mm"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions"
    ],
    "features": [
      "Wide orifice minimises shear forces",
      "Universally compatible",
      "Sterile, DNase-free, RNase-free"
    ]
  },
  {
    "id": "CC-WTB1000-L",
    "category": "Wide Bore Pipette Tips",
    "title": "Wide Bore Tip 1000µL — Ultra Low Retention (Bag)",
    "description": "Wide bore non-filter pipette tip with 2.05mm orifice for high-viscosity samples. 1000µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CC-WTB1000-L"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Orifice Diameter",
        "value": "2.05mm"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      }
    ],
    "applications": [
      "Viscous sample handling",
      "Genomic DNA pipetting",
      "Cell suspensions"
    ],
    "features": [
      "Wide orifice minimises shear forces",
      "Universally compatible",
      "Sterile, DNase-free, RNase-free"
    ]
  },
  {
    "id": "GTR200-S",
    "category": "Gel-Loading Pipette Tips",
    "title": "Gel-Loading Pipette Tip 200µL (Rack)",
    "description": "Gel-loading pipette tip for electrophoresis applications. 200µL volume, 68.40mm length. Easily loads tiny 1µL samples without damaging gel.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "GTR200-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Length",
        "value": "68.40mm"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96 tips/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      }
    ],
    "applications": [
      "SDS-PAGE electrophoresis",
      "Agarose gel electrophoresis",
      "2D-electrophoresis",
      "Gel loading"
    ],
    "features": [
      "Loads 1µL samples without damaging gel",
      "Compatible with most pipettes (excluding Rainin LTS and Thermo Clip-Tip)",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR20-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 20µL — Common (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 20µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR20-S"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB20",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 20µL — Common (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 20µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB20"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR20-L-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 20µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 20µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR20-L-S"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB20-L",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 20µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 20µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB20-L"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR200-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 200µL — Common (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 200µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR200-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB200",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 200µL — Common (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 200µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB200"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR200-L-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 200µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 200µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR200-L-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB200-L",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 200µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 200µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB200-L"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR200XL-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 200µL Extended 102mm — Common (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 200µL Extended 102mm, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR200XL-S"
      },
      {
        "label": "Volume",
        "value": "200µL Extended 102mm"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR200XL-L-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 200µL Extended 102mm — Ultra Low Retention (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 200µL Extended 102mm, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR200XL-L-S"
      },
      {
        "label": "Volume",
        "value": "200µL Extended 102mm"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR300-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 300µL — Common (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 300µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR300-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB300",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 300µL — Common (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 300µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB300"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR300-L-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 300µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 300µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR300-L-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB300-L",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 300µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 300µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB300-L"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR1000-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 1000µL — Common (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 1000µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR1000-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB1000",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 1000µL — Common (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 1000µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB1000"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR1000-L-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 1000µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 1000µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR1000-L-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB1000-L",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 1000µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 1000µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB1000-L"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR1200-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 1200µL — Common (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 1200µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR1200-S"
      },
      {
        "label": "Volume",
        "value": "1200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB1200",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 1200µL — Common (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 1200µL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB1200"
      },
      {
        "label": "Volume",
        "value": "1200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR1200-L-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 1200µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 1200µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR1200-L-S"
      },
      {
        "label": "Volume",
        "value": "1200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB1200-L",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 1200µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 1200µL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB1200-L"
      },
      {
        "label": "Volume",
        "value": "1200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR5000-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 5000µL/5mL — Common (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 5000µL/5mL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR5000-S"
      },
      {
        "label": "Volume",
        "value": "5000µL/5mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB5000",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 5000µL/5mL — Common (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 5000µL/5mL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB5000"
      },
      {
        "label": "Volume",
        "value": "5000µL/5mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR5000-L-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 5000µL/5mL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 5000µL/5mL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR5000-L-S"
      },
      {
        "label": "Volume",
        "value": "5000µL/5mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB5000-L",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 5000µL/5mL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 5000µL/5mL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB5000-L"
      },
      {
        "label": "Volume",
        "value": "5000µL/5mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR10000-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 10000µL/10mL — Common (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 10000µL/10mL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR10000-S"
      },
      {
        "label": "Volume",
        "value": "10000µL/10mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB10000",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 10000µL/10mL — Common (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 10000µL/10mL, Common. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB10000"
      },
      {
        "label": "Volume",
        "value": "10000µL/10mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTR10000-L-S",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 10000µL/10mL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 10000µL/10mL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTR10000-L-S"
      },
      {
        "label": "Volume",
        "value": "10000µL/10mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-FTB10000-L",
    "category": "LTS-Compatible Filter Pipette Tips",
    "title": "LTS Filter Tip 10000µL/10mL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible filtered pipette tip for Rainin liquid handling systems. 10000µL/10mL, Ultra Low Retention. CC Rack for manual use.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-FTB10000-L"
      },
      {
        "label": "Volume",
        "value": "10000µL/10mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "Yes"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "Molecular biology",
      "Genomics",
      "High-throughput pipetting with Rainin"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use",
      "DNase-free, RNase-free"
    ]
  },
  {
    "id": "LTS-TR20-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 20µL — Common (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 20µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR20-S"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB20",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 20µL — Common (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 20µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB20"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR20-L-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 20µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 20µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR20-L-S"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB20-L",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 20µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 20µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB20-L"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR200-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 200µL — Common (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 200µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR200-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB200",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 200µL — Common (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 200µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB200"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR200-L-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 200µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 200µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR200-L-S"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB200-L",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 200µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 200µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB200-L"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR200XL-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 200µL Extended 102mm — Common (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 200µL Extended 102mm, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR200XL-S"
      },
      {
        "label": "Volume",
        "value": "200µL Extended 102mm"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR200XL-L-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 200µL Extended 102mm — Ultra Low Retention (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 200µL Extended 102mm, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR200XL-L-S"
      },
      {
        "label": "Volume",
        "value": "200µL Extended 102mm"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR300-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 300µL — Common (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 300µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR300-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB300",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 300µL — Common (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 300µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB300"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR300-L-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 300µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 300µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR300-L-S"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB300-L",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 300µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 300µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB300-L"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR1000-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 1000µL — Common (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 1000µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR1000-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB1000",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 1000µL — Common (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 1000µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB1000"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR1000-L-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 1000µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 1000µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR1000-L-S"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB1000-L",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 1000µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 1000µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB1000-L"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR1200-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 1200µL — Common (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 1200µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR1200-S"
      },
      {
        "label": "Volume",
        "value": "1200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB1200",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 1200µL — Common (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 1200µL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB1200"
      },
      {
        "label": "Volume",
        "value": "1200µL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR1200-L-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 1200µL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 1200µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR1200-L-S"
      },
      {
        "label": "Volume",
        "value": "1200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "96/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB1200-L",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 1200µL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 1200µL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB1200-L"
      },
      {
        "label": "Volume",
        "value": "1200µL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "5 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR5000-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 5000µL/5mL — Common (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 5000µL/5mL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR5000-S"
      },
      {
        "label": "Volume",
        "value": "5000µL/5mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB5000",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 5000µL/5mL — Common (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 5000µL/5mL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB5000"
      },
      {
        "label": "Volume",
        "value": "5000µL/5mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR5000-L-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 5000µL/5mL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 5000µL/5mL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR5000-L-S"
      },
      {
        "label": "Volume",
        "value": "5000µL/5mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB5000-L",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 5000µL/5mL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 5000µL/5mL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB5000-L"
      },
      {
        "label": "Volume",
        "value": "5000µL/5mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR10000-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 10000µL/10mL — Common (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 10000µL/10mL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR10000-S"
      },
      {
        "label": "Volume",
        "value": "10000µL/10mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB10000",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 10000µL/10mL — Common (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 10000µL/10mL, Common.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB10000"
      },
      {
        "label": "Volume",
        "value": "10000µL/10mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TR10000-L-S",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 10000µL/10mL — Ultra Low Retention (Rack)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 10000µL/10mL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TR10000-L-S"
      },
      {
        "label": "Volume",
        "value": "10000µL/10mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "24/Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "16 Racks/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "LTS-TB10000-L",
    "category": "LTS-Compatible Pipette Tips",
    "title": "LTS Tip 10000µL/10mL — Ultra Low Retention (Bag)",
    "description": "LTS-compatible non-filter pipette tip for Rainin liquid handling systems. 10000µL/10mL, Ultra Low Retention.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LTS-TB10000-L"
      },
      {
        "label": "Volume",
        "value": "10000µL/10mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Packaging",
        "value": "100/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case"
      },
      {
        "label": "Filter",
        "value": "No"
      },
      {
        "label": "Compatibility",
        "value": "Rainin LTS"
      }
    ],
    "applications": [
      "High-throughput pipetting with Rainin",
      "Molecular biology",
      "Genomics"
    ],
    "features": [
      "Compatible with Rainin LTS liquid handling systems",
      "Ultra Low Retention available",
      "CC Rack for manual use"
    ]
  },
  {
    "id": "AFT50HA5",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Filter, Clear (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Filter, clear tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT50HA5"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 12 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT50HA5",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Non-Filter, Clear (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Non-Filter, clear tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT50HA5"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 12 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT50HA5-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Filter, Conductive (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Filter, conductive tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT50HA5-C"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 12 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Filter tip for contamination protection",
      "Conductive tip material"
    ]
  },
  {
    "id": "AT50HA5-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Non-Filter, Conductive (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Non-Filter, conductive tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT50HA5-C"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 12 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Non-Filter tip for standard pipetting",
      "Conductive tip material"
    ]
  },
  {
    "id": "AFT300HA5",
    "category": "Robotic Tips",
    "title": "Robotic Tip 300µL — Filter, Clear (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 300µL, Filter, clear tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT300HA5"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 12 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT300HA5",
    "category": "Robotic Tips",
    "title": "Robotic Tip 300µL — Non-Filter, Clear (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 300µL, Non-Filter, clear tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT300HA5"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 12 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT300HA5-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 300µL — Filter, Conductive (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 300µL, Filter, conductive tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT300HA5-C"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 12 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Filter tip for contamination protection",
      "Conductive tip material"
    ]
  },
  {
    "id": "AT300HA5-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 300µL — Non-Filter, Conductive (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 300µL, Non-Filter, conductive tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT300HA5-C"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 12 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Non-Filter tip for standard pipetting",
      "Conductive tip material"
    ]
  },
  {
    "id": "AFT1000HA5",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Filter, Clear (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Filter, clear tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT1000HA5"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 8 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT1000HA5",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Non-Filter, Clear (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Non-Filter, clear tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT1000HA5"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 8 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT1000HA5-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Filter, Conductive (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Filter, conductive tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT1000HA5-C"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 8 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Filter tip for contamination protection",
      "Conductive tip material"
    ]
  },
  {
    "id": "AT1000HA5-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Non-Filter, Conductive (HA Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Non-Filter, conductive tip. Compatible with HA Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT1000HA5-C"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "HA Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96×5 tips/Unit, 8 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for HA Liquid Handling Systems",
      "Non-Filter tip for standard pipetting",
      "Conductive tip material"
    ]
  },
  {
    "id": "AFT10TC",
    "category": "Robotic Tips",
    "title": "Robotic Tip 10µL — Filter, Clear (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 10µL, Filter, clear tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT10TC"
      },
      {
        "label": "Volume",
        "value": "10µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT10TC",
    "category": "Robotic Tips",
    "title": "Robotic Tip 10µL — Non-Filter, Clear (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 10µL, Non-Filter, clear tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT10TC"
      },
      {
        "label": "Volume",
        "value": "10µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT10TC-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 10µL — Filter, Conductive (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 10µL, Filter, conductive tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT10TC-C"
      },
      {
        "label": "Volume",
        "value": "10µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Filter tip for contamination protection",
      "Conductive tip material"
    ]
  },
  {
    "id": "AT10TC-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 10µL — Non-Filter, Conductive (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 10µL, Non-Filter, conductive tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT10TC-C"
      },
      {
        "label": "Volume",
        "value": "10µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Non-Filter tip for standard pipetting",
      "Conductive tip material"
    ]
  },
  {
    "id": "AFT50TC",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Filter, Clear (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Filter, clear tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT50TC"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT50TC",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Non-Filter, Clear (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Non-Filter, clear tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT50TC"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT50TC-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Filter, Conductive (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Filter, conductive tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT50TC-C"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Filter tip for contamination protection",
      "Conductive tip material"
    ]
  },
  {
    "id": "AT50TC-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Non-Filter, Conductive (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Non-Filter, conductive tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT50TC-C"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Non-Filter tip for standard pipetting",
      "Conductive tip material"
    ]
  },
  {
    "id": "AFT200TC",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Filter, Clear (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Filter, clear tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT200TC"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT200TC",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Non-Filter, Clear (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Non-Filter, clear tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT200TC"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT200TC-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Filter, Conductive (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Filter, conductive tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT200TC-C"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Filter tip for contamination protection",
      "Conductive tip material"
    ]
  },
  {
    "id": "AT200TC-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Non-Filter, Conductive (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Non-Filter, conductive tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT200TC-C"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Non-Filter tip for standard pipetting",
      "Conductive tip material"
    ]
  },
  {
    "id": "AFT1000TC",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Filter, Clear (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Filter, clear tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT1000TC"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT1000TC",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Non-Filter, Clear (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Non-Filter, clear tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT1000TC"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT1000TC-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Filter, Conductive (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Filter, conductive tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT1000TC-C"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Filter tip for contamination protection",
      "Conductive tip material"
    ]
  },
  {
    "id": "AT1000TC-C",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Non-Filter, Conductive (Tecan Freedom EVO)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Non-Filter, conductive tip. Compatible with Tecan Freedom EVO/Fluent.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT1000TC-C"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Conductive"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO/Fluent"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 24 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO/Fluent",
      "Non-Filter tip for standard pipetting",
      "Conductive tip material"
    ]
  },
  {
    "id": "AFT50TM",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Filter, Clear (Tecan Freedom EVO MCA 96)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Filter, clear tip. Compatible with Tecan Freedom EVO MCA 96/384, Fluent MCA 384.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT50TM"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO MCA 96/384, Fluent MCA 384"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO MCA 96/384",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT50TM",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Non-Filter, Clear (Tecan Freedom EVO MCA 96)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Non-Filter, clear tip. Compatible with Tecan Freedom EVO MCA 96/384, Fluent MCA 384.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT50TM"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO MCA 96/384, Fluent MCA 384"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO MCA 96/384",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT200TM",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Filter, Clear (Tecan Freedom EVO MCA 96)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Filter, clear tip. Compatible with Tecan Freedom EVO MCA 96/384, Fluent MCA 384.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT200TM"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO MCA 96/384, Fluent MCA 384"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO MCA 96/384",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT200TM",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Non-Filter, Clear (Tecan Freedom EVO MCA 96)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Non-Filter, clear tip. Compatible with Tecan Freedom EVO MCA 96/384, Fluent MCA 384.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT200TM"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Tecan Freedom EVO MCA 96/384, Fluent MCA 384"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Tecan Freedom EVO MCA 96/384",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AT20-OT",
    "category": "Robotic Tips",
    "title": "Robotic Tip 20µL — Non-Filter, Clear (Opentrons OT-2 GEN1)",
    "description": "Robotic pipette tip for automated liquid handling. 20µL, Non-Filter, clear tip. Compatible with Opentrons OT-2 GEN1/GEN2 P10-P20.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT20-OT"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons OT-2 GEN1/GEN2 P10-P20"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons OT-2 GEN1/GEN2 P10-P20",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT20-OT",
    "category": "Robotic Tips",
    "title": "Robotic Tip 20µL — Filter, Clear (Opentrons OT-2 GEN1)",
    "description": "Robotic pipette tip for automated liquid handling. 20µL, Filter, clear tip. Compatible with Opentrons OT-2 GEN1/GEN2 P10-P20.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT20-OT"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons OT-2 GEN1/GEN2 P10-P20"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons OT-2 GEN1/GEN2 P10-P20",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT20-OT-RS",
    "category": "Robotic Tips",
    "title": "Robotic Tip 20µL — Non-Filter, Clear (Opentrons OT-2 GEN1)",
    "description": "Robotic pipette tip for automated liquid handling. 20µL, Non-Filter, clear tip. Compatible with Opentrons OT-2 GEN1/GEN2.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT20-OT-RS"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons OT-2 GEN1/GEN2"
      },
      {
        "label": "Packaging",
        "value": "960/Refill, 10 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons OT-2 GEN1/GEN2",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT200-OT",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Filter, Clear (Opentrons OT-2 GEN1)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Filter, clear tip. Compatible with Opentrons OT-2 GEN1/GEN2 P10-P20.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT200-OT"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons OT-2 GEN1/GEN2 P10-P20"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons OT-2 GEN1/GEN2 P10-P20",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT300-OT",
    "category": "Robotic Tips",
    "title": "Robotic Tip 300µL — Non-Filter, Clear (Opentrons OT-2 GEN1)",
    "description": "Robotic pipette tip for automated liquid handling. 300µL, Non-Filter, clear tip. Compatible with Opentrons OT-2 GEN1/GEN2 P10-P20.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT300-OT"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons OT-2 GEN1/GEN2 P10-P20"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons OT-2 GEN1/GEN2 P10-P20",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AT300-OT-RS",
    "category": "Robotic Tips",
    "title": "Robotic Tip 300µL — Non-Filter, Clear (Opentrons OT-2 GEN1)",
    "description": "Robotic pipette tip for automated liquid handling. 300µL, Non-Filter, clear tip. Compatible with Opentrons OT-2 GEN1/GEN2.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT300-OT-RS"
      },
      {
        "label": "Volume",
        "value": "300µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons OT-2 GEN1/GEN2"
      },
      {
        "label": "Packaging",
        "value": "960/Refill, 10 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons OT-2 GEN1/GEN2",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AT1000-OT",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Non-Filter, Clear (Opentrons OT-2 GEN1)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Non-Filter, clear tip. Compatible with Opentrons OT-2 GEN1/GEN2 P10-P20.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT1000-OT"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons OT-2 GEN1/GEN2 P10-P20"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons OT-2 GEN1/GEN2 P10-P20",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT1000-OT",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Filter, Clear (Opentrons OT-2 GEN1)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Filter, clear tip. Compatible with Opentrons OT-2 GEN1/GEN2 P10-P20.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT1000-OT"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons OT-2 GEN1/GEN2 P10-P20"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons OT-2 GEN1/GEN2 P10-P20",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT1000-OT-RS",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Non-Filter, Clear (Opentrons OT-2 GEN1)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Non-Filter, clear tip. Compatible with Opentrons OT-2 GEN1/GEN2.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT1000-OT-RS"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons OT-2 GEN1/GEN2"
      },
      {
        "label": "Packaging",
        "value": "480/Refill, 10 Units/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons OT-2 GEN1/GEN2",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT50-OF",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Filter, Clear (Opentrons Flex)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Filter, clear tip. Compatible with Opentrons Flex.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT50-OF"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons Flex"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 20 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons Flex",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT50-OF",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Non-Filter, Clear (Opentrons Flex)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Non-Filter, clear tip. Compatible with Opentrons Flex.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT50-OF"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons Flex"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 20 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons Flex",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT200-OF",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Filter, Clear (Opentrons Flex)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Filter, clear tip. Compatible with Opentrons Flex.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT200-OF"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons Flex"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 20 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons Flex",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT200-OF",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Non-Filter, Clear (Opentrons Flex)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Non-Filter, clear tip. Compatible with Opentrons Flex.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT200-OF"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons Flex"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 20 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons Flex",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT1000-OF",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Filter, Clear (Opentrons Flex)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Filter, clear tip. Compatible with Opentrons Flex.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT1000-OF"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons Flex"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 20 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons Flex",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT1000-OF",
    "category": "Robotic Tips",
    "title": "Robotic Tip 1000µL — Non-Filter, Clear (Opentrons Flex)",
    "description": "Robotic pipette tip for automated liquid handling. 1000µL, Non-Filter, clear tip. Compatible with Opentrons Flex.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT1000-OF"
      },
      {
        "label": "Volume",
        "value": "1000µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Opentrons Flex"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 20 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Opentrons Flex",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT20BK",
    "category": "Robotic Tips",
    "title": "Robotic Tip 20µL — Filter, Clear (BKM Coulter Biomek 3000)",
    "description": "Robotic pipette tip for automated liquid handling. 20µL, Filter, clear tip. Compatible with BKM Coulter Biomek 3000.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT20BK"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "BKM Coulter Biomek 3000"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for BKM Coulter Biomek 3000",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT20BK",
    "category": "Robotic Tips",
    "title": "Robotic Tip 20µL — Non-Filter, Clear (BKM Coulter Biomek 3000)",
    "description": "Robotic pipette tip for automated liquid handling. 20µL, Non-Filter, clear tip. Compatible with BKM Coulter Biomek 3000.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT20BK"
      },
      {
        "label": "Volume",
        "value": "20µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "BKM Coulter Biomek 3000"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for BKM Coulter Biomek 3000",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT50BK",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Filter, Clear (BKM Coulter Biomek 3000)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Filter, clear tip. Compatible with BKM Coulter Biomek 3000.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT50BK"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "BKM Coulter Biomek 3000"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for BKM Coulter Biomek 3000",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT50BK",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Non-Filter, Clear (BKM Coulter Biomek 3000)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Non-Filter, clear tip. Compatible with BKM Coulter Biomek 3000.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT50BK"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "BKM Coulter Biomek 3000"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for BKM Coulter Biomek 3000",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT250BK",
    "category": "Robotic Tips",
    "title": "Robotic Tip 250µL — Filter, Clear (BKM Coulter Biomek 3000)",
    "description": "Robotic pipette tip for automated liquid handling. 250µL, Filter, clear tip. Compatible with BKM Coulter Biomek 3000.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT250BK"
      },
      {
        "label": "Volume",
        "value": "250µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "BKM Coulter Biomek 3000"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for BKM Coulter Biomek 3000",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT250BK",
    "category": "Robotic Tips",
    "title": "Robotic Tip 250µL — Non-Filter, Clear (BKM Coulter Biomek 3000)",
    "description": "Robotic pipette tip for automated liquid handling. 250µL, Non-Filter, clear tip. Compatible with BKM Coulter Biomek 3000.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT250BK"
      },
      {
        "label": "Volume",
        "value": "250µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "BKM Coulter Biomek 3000"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for BKM Coulter Biomek 3000",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT50ZM",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Filter, Clear (Zymark Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Filter, clear tip. Compatible with Zymark Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT50ZM"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Zymark Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Zymark Liquid Handling Systems",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT50ZM",
    "category": "Robotic Tips",
    "title": "Robotic Tip 50µL — Non-Filter, Clear (Zymark Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 50µL, Non-Filter, clear tip. Compatible with Zymark Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT50ZM"
      },
      {
        "label": "Volume",
        "value": "50µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Zymark Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Zymark Liquid Handling Systems",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AFT200ZM",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Filter, Clear (Zymark Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Filter, clear tip. Compatible with Zymark Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AFT200ZM"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Zymark Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Zymark Liquid Handling Systems",
      "Filter tip for contamination protection",
      "Clear tip material"
    ]
  },
  {
    "id": "AT200ZM",
    "category": "Robotic Tips",
    "title": "Robotic Tip 200µL — Non-Filter, Clear (Zymark Liquid Handling Systems)",
    "description": "Robotic pipette tip for automated liquid handling. 200µL, Non-Filter, clear tip. Compatible with Zymark Liquid Handling Systems.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT200ZM"
      },
      {
        "label": "Volume",
        "value": "200µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Zymark Liquid Handling Systems"
      },
      {
        "label": "Packaging",
        "value": "96/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Zymark Liquid Handling Systems",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "AT30AG",
    "category": "Robotic Tips",
    "title": "Robotic Tip 30µL — Non-Filter, Clear (Agilent Bravo Automated Liquid Handling Platform)",
    "description": "Robotic pipette tip for automated liquid handling. 30µL, Non-Filter, clear tip. Compatible with Agilent Bravo Automated Liquid Handling Platform.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "AT30AG"
      },
      {
        "label": "Volume",
        "value": "30µL"
      },
      {
        "label": "Filter",
        "value": "Non-Filter"
      },
      {
        "label": "Tip Type",
        "value": "Clear"
      },
      {
        "label": "Compatibility",
        "value": "Agilent Bravo Automated Liquid Handling Platform"
      },
      {
        "label": "Packaging",
        "value": "384/Rack, 50 Racks/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "High-throughput screening",
      "NGS library preparation",
      "ELISA automation"
    ],
    "features": [
      "Designed specifically for Agilent Bravo Automated Liquid Handling Platform",
      "Non-Filter tip for standard pipetting",
      "Clear tip material"
    ]
  },
  {
    "id": "SF012135",
    "category": "Syringe Filters",
    "title": "Syringe Filter PES 0.22µm 25mm",
    "description": "Syringe filter with PES membrane, 0.22µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF012135"
      },
      {
        "label": "Membrane",
        "value": "PES"
      },
      {
        "label": "Pore Size",
        "value": "0.22µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Light blue"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Box,  20 Boxes/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "PES membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF012120",
    "category": "Syringe Filters",
    "title": "Syringe Filter PES 0.22µm 25mm",
    "description": "Syringe filter with PES membrane, 0.22µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF012120"
      },
      {
        "label": "Membrane",
        "value": "PES"
      },
      {
        "label": "Pore Size",
        "value": "0.22µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Light blue"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Container, 50 Containers/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "PES membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF012235",
    "category": "Syringe Filters",
    "title": "Syringe Filter PES 0.45µm 25mm",
    "description": "Syringe filter with PES membrane, 0.45µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF012235"
      },
      {
        "label": "Membrane",
        "value": "PES"
      },
      {
        "label": "Pore Size",
        "value": "0.45µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Dark blue"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Box,  20 Boxes/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "PES membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF012220",
    "category": "Syringe Filters",
    "title": "Syringe Filter PES 0.45µm 25mm",
    "description": "Syringe filter with PES membrane, 0.45µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF012220"
      },
      {
        "label": "Membrane",
        "value": "PES"
      },
      {
        "label": "Pore Size",
        "value": "0.45µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Dark blue"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Container, 50 Containers/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "PES membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF022135",
    "category": "Syringe Filters",
    "title": "Syringe Filter Nylon 0.22µm 25mm",
    "description": "Syringe filter with Nylon membrane, 0.22µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF022135"
      },
      {
        "label": "Membrane",
        "value": "Nylon"
      },
      {
        "label": "Pore Size",
        "value": "0.22µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Light green"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Box,  20 Boxes/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "Nylon membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF022120",
    "category": "Syringe Filters",
    "title": "Syringe Filter Nylon 0.22µm 25mm",
    "description": "Syringe filter with Nylon membrane, 0.22µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF022120"
      },
      {
        "label": "Membrane",
        "value": "Nylon"
      },
      {
        "label": "Pore Size",
        "value": "0.22µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Light green"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Container, 50 Containers/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "Nylon membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF022235",
    "category": "Syringe Filters",
    "title": "Syringe Filter Nylon 0.45µm 25mm",
    "description": "Syringe filter with Nylon membrane, 0.45µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF022235"
      },
      {
        "label": "Membrane",
        "value": "Nylon"
      },
      {
        "label": "Pore Size",
        "value": "0.45µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Dark green"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Box,  20 Boxes/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "Nylon membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF022220",
    "category": "Syringe Filters",
    "title": "Syringe Filter Nylon 0.45µm 25mm",
    "description": "Syringe filter with Nylon membrane, 0.45µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF022220"
      },
      {
        "label": "Membrane",
        "value": "Nylon"
      },
      {
        "label": "Pore Size",
        "value": "0.45µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Dark green"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Container, 50 Containers/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "Nylon membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF032135",
    "category": "Syringe Filters",
    "title": "Syringe Filter CA 0.22µm 25mm",
    "description": "Syringe filter with CA membrane, 0.22µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF032135"
      },
      {
        "label": "Membrane",
        "value": "CA"
      },
      {
        "label": "Pore Size",
        "value": "0.22µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Light yellow"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Box, 20 Boxes/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "CA membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF032120",
    "category": "Syringe Filters",
    "title": "Syringe Filter CA 0.22µm 25mm",
    "description": "Syringe filter with CA membrane, 0.22µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF032120"
      },
      {
        "label": "Membrane",
        "value": "CA"
      },
      {
        "label": "Pore Size",
        "value": "0.22µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Light yellow"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Container, 50 Containers/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "CA membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF032235",
    "category": "Syringe Filters",
    "title": "Syringe Filter CA 0.45µm 25mm",
    "description": "Syringe filter with CA membrane, 0.45µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF032235"
      },
      {
        "label": "Membrane",
        "value": "CA"
      },
      {
        "label": "Pore Size",
        "value": "0.45µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Dark yellow"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Box, 20 Boxes/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "CA membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "SF032220",
    "category": "Syringe Filters",
    "title": "Syringe Filter CA 0.45µm 25mm",
    "description": "Syringe filter with CA membrane, 0.45µm pore size, 25mm diameter. Housing withstands pressure up to 87 psi. High flow rate and throughput.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SF032220"
      },
      {
        "label": "Membrane",
        "value": "CA"
      },
      {
        "label": "Pore Size",
        "value": "0.45µm"
      },
      {
        "label": "Diameter",
        "value": "25mm"
      },
      {
        "label": "Color",
        "value": "Dark yellow"
      },
      {
        "label": "Max Pressure",
        "value": "87 psi"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Container, 50 Containers/Case"
      }
    ],
    "applications": [
      "HPLC sample preparation",
      "Sterile filtration",
      "Particle removal",
      "Buffer filtration"
    ],
    "features": [
      "High flow rate and throughput ideal for HPLC",
      "Housing withstands up to 87 psi",
      "High consistency for reliable performance",
      "CA membrane for broad chemical compatibility"
    ]
  },
  {
    "id": "DW00005",
    "category": "Deep Well Plates",
    "title": "384-well Deep Well Plate, Square well, V bottom, 120µL",
    "description": "Deep well plate, 384 wells, Square well, V bottom, 120µL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00005"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "120µL"
      },
      {
        "label": "Well Type",
        "value": "Square well, V bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 100 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00029",
    "category": "Deep Well Plates",
    "title": "384-well Deep Well Plate, Square well, V bottom, 240µL",
    "description": "Deep well plate, 384 wells, Square well, V bottom, 240µL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00029"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "240µL"
      },
      {
        "label": "Well Type",
        "value": "Square well, V bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00024",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Round well, V bottom, 0.36mL",
    "description": "Deep well plate, 96 wells, Round well, V bottom, 0.36mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00024"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.36mL"
      },
      {
        "label": "Well Type",
        "value": "Round well, V bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 100 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00025",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Round well, U bottom, 0.40mL",
    "description": "Deep well plate, 96 wells, Round well, U bottom, 0.40mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00025"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.40mL"
      },
      {
        "label": "Well Type",
        "value": "Round well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 100 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00026",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Round well, Flat bottom, 0.40mL",
    "description": "Deep well plate, 96 wells, Round well, Flat bottom, 0.40mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00026"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.40mL"
      },
      {
        "label": "Well Type",
        "value": "Round well, Flat bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 100 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00028",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Round well, V bottom, 0.45mL",
    "description": "Deep well plate, 96 wells, Round well, V bottom, 0.45mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00028"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.45mL"
      },
      {
        "label": "Well Type",
        "value": "Round well, V bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 100 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00027",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Round well, U bottom, 0.50mL",
    "description": "Deep well plate, 96 wells, Round well, U bottom, 0.50mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00027"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.50mL"
      },
      {
        "label": "Well Type",
        "value": "Round well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 100 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00018",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, U bottom, 1.0mL",
    "description": "Deep well plate, 96 wells, Square well, U bottom, 1.0mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00018"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "1.0mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 100 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00006",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, V bottom, 1.2mL",
    "description": "Deep well plate, 96 wells, Square well, V bottom, 1.2mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00006"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "1.2mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, V bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 100 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00013",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, U bottom, 1.2mL",
    "description": "Deep well plate, 96 wells, Square well, U bottom, 1.2mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00013"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "1.2mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00014",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Round well, U bottom, 1.2mL",
    "description": "Deep well plate, 96 wells, Round well, U bottom, 1.2mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00014"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "1.2mL"
      },
      {
        "label": "Well Type",
        "value": "Round well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 100 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00015",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Round well, U bottom, 1.3mL",
    "description": "Deep well plate, 96 wells, Round well, U bottom, 1.3mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00015"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "1.3mL"
      },
      {
        "label": "Well Type",
        "value": "Round well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00023",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Round well, V bottom, 1.3mL",
    "description": "Deep well plate, 96 wells, Round well, V bottom, 1.3mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00023"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "1.3mL"
      },
      {
        "label": "Well Type",
        "value": "Round well, V bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00019",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, U bottom, 1.6mL",
    "description": "Deep well plate, 96 wells, Square well, U bottom, 1.6mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00019"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "1.6mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00020",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, V bottom, 1.6mL",
    "description": "Deep well plate, 96 wells, Square well, V bottom, 1.6mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00020"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "1.6mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, V bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00010",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Round well, U bottom, 2.0mL",
    "description": "Deep well plate, 96 wells, Round well, U bottom, 2.0mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00010"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "2.0mL"
      },
      {
        "label": "Well Type",
        "value": "Round well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00008",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, Conical bottom, 2.2mL",
    "description": "Deep well plate, 96 wells, Square well, Conical bottom, 2.2mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00008"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "2.2mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, Conical bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00009",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, V bottom, 2.2mL",
    "description": "Deep well plate, 96 wells, Square well, V bottom, 2.2mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00009"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "2.2mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, V bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00011",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, U bottom, 2.2mL",
    "description": "Deep well plate, 96 wells, Square well, U bottom, 2.2mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00011"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "2.2mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00016",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, U bottom (low), 2.2mL",
    "description": "Deep well plate, 96 wells, Square well, U bottom (low), 2.2mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00016"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "2.2mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, U bottom (low)"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00021",
    "category": "Deep Well Plates",
    "title": "96-well Deep Well Plate, Square well, Diamond bottom, 2.3mL",
    "description": "Deep well plate, 96 wells, Square well, Diamond bottom, 2.3mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00021"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "2.3mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, Diamond bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00030",
    "category": "Deep Well Plates",
    "title": "48-well Deep Well Plate, Square well, U bottom, 4.6mL",
    "description": "Deep well plate, 48 wells, Square well, U bottom, 4.6mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00030"
      },
      {
        "label": "Wells",
        "value": "48"
      },
      {
        "label": "Volume/Well",
        "value": "4.6mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00007",
    "category": "Deep Well Plates",
    "title": "48-well Deep Well Plate, Rectangle well, V bottom, 5.0mL",
    "description": "Deep well plate, 48 wells, Rectangle well, V bottom, 5.0mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00007"
      },
      {
        "label": "Wells",
        "value": "48"
      },
      {
        "label": "Volume/Well",
        "value": "5.0mL"
      },
      {
        "label": "Well Type",
        "value": "Rectangle well, V bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00031",
    "category": "Deep Well Plates",
    "title": "24-well Deep Well Plate, Square well, Conical bottom, 10.0mL",
    "description": "Deep well plate, 24 wells, Square well, Conical bottom, 10.0mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00031"
      },
      {
        "label": "Wells",
        "value": "24"
      },
      {
        "label": "Volume/Well",
        "value": "10.0mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, Conical bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00032",
    "category": "Deep Well Plates",
    "title": "24-well Deep Well Plate, Square well, U bottom, 10.0mL",
    "description": "Deep well plate, 24 wells, Square well, U bottom, 10.0mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00032"
      },
      {
        "label": "Wells",
        "value": "24"
      },
      {
        "label": "Volume/Well",
        "value": "10.0mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, U bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DW00033",
    "category": "Deep Well Plates",
    "title": "24-well Deep Well Plate, Square well, Conical bottom, 15.0mL",
    "description": "Deep well plate, 24 wells, Square well, Conical bottom, 15.0mL per well. SBS/ANSI standard footprint. PP material.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DW00033"
      },
      {
        "label": "Wells",
        "value": "24"
      },
      {
        "label": "Volume/Well",
        "value": "15.0mL"
      },
      {
        "label": "Well Type",
        "value": "Square well, Conical bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "5 PCS/Bag, 50 PCS/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "High-throughput screening",
      "DNA/RNA extraction",
      "Compound management",
      "Automated liquid handling"
    ],
    "features": [
      "SBS/ANSI standard footprint for workstation compatibility",
      "PP material for chemical resistance",
      "Compatible with GenFollower sealing mats"
    ]
  },
  {
    "id": "DKT0096",
    "category": "Tip Combs",
    "title": "96 Tip Comb — KingFisher Flex",
    "description": "Tip comb for nucleic acid extraction. Compatible with 96-well deep well plates, KingFisher Flex.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DKT0096"
      },
      {
        "label": "Compatibility",
        "value": "96-well deep well plates, KingFisher Flex"
      },
      {
        "label": "Packaging",
        "value": "2 PCS/Bag, 25 Bags/Case"
      }
    ],
    "applications": [
      "Nucleic acid extraction",
      "Magnetic bead-based purification"
    ],
    "features": [
      "Designed for KingFisher Flex",
      "Precise tip positioning for efficient magnetic bead transfer"
    ]
  },
  {
    "id": "DKT1008",
    "category": "Tip Combs",
    "title": "8 Tip Comb — EXM3000",
    "description": "Tip comb for nucleic acid extraction. Compatible with 96-well deep well plates, EXM3000.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DKT1008"
      },
      {
        "label": "Compatibility",
        "value": "96-well deep well plates, EXM3000"
      },
      {
        "label": "Packaging",
        "value": "2 PCS/Bag, 240 Bags/Case"
      }
    ],
    "applications": [
      "Nucleic acid extraction",
      "Magnetic bead-based purification"
    ],
    "features": [
      "Designed for EXM3000",
      "Precise tip positioning for efficient magnetic bead transfer"
    ]
  },
  {
    "id": "DKT2008",
    "category": "Tip Combs",
    "title": "8 Tip Comb — VNP-32",
    "description": "Tip comb for nucleic acid extraction. Compatible with 96-well deep well plates, VNP-32.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DKT2008"
      },
      {
        "label": "Compatibility",
        "value": "96-well deep well plates, VNP-32"
      },
      {
        "label": "Packaging",
        "value": "2 PCS/Bag, 250 Bags/Case"
      }
    ],
    "applications": [
      "Nucleic acid extraction",
      "Magnetic bead-based purification"
    ],
    "features": [
      "Designed for VNP-32",
      "Precise tip positioning for efficient magnetic bead transfer"
    ]
  },
  {
    "id": "MC00001",
    "category": "Tip Combs",
    "title": "8 Tip Comb — TIANLONG GeneRotex 96",
    "description": "Tip comb for nucleic acid extraction. Compatible with 96-well deep well plates, TIANLONG GeneRotex 96.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MC00001"
      },
      {
        "label": "Compatibility",
        "value": "96-well deep well plates, TIANLONG GeneRotex 96"
      },
      {
        "label": "Packaging",
        "value": "1 Set/Bag, 450 Bags/Case"
      }
    ],
    "applications": [
      "Nucleic acid extraction",
      "Magnetic bead-based purification"
    ],
    "features": [
      "Designed for TIANLONG GeneRotex 96",
      "Precise tip positioning for efficient magnetic bead transfer"
    ]
  },
  {
    "id": "SSM00005",
    "category": "Sealing Mats",
    "title": "Sealing Mat — 96 square well, Pierceable",
    "description": "Silicone sealing mat for 96 square well, Pierceable deep well plates. Opening type: Standard pierceable. Compatible with plates: DW00016/018/006/013/019/020/008/009/011/012/021.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SSM00005"
      },
      {
        "label": "For Wells",
        "value": "96 square well, Pierceable"
      },
      {
        "label": "Opening Type",
        "value": "Standard pierceable"
      },
      {
        "label": "Compatible Plates",
        "value": "DW00016/018/006/013/019/020/008/009/011/012/021"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample sealing",
      "Evaporation prevention",
      "High-throughput storage"
    ],
    "features": [
      "Silicone material for excellent sealing",
      "Pierceable options for automated liquid handling",
      "Reusable for multiple sealing cycles"
    ]
  },
  {
    "id": "SSM00001",
    "category": "Sealing Mats",
    "title": "Sealing Mat — 96 square well, Pre-slit '+' Opening",
    "description": "Silicone sealing mat for 96 square well, Pre-slit '+' Opening deep well plates. Opening type: Pre-slit '+' pierceable. Compatible with plates: DW00016/018/006/013/019/020/008/009/011/012/021.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SSM00001"
      },
      {
        "label": "For Wells",
        "value": "96 square well, Pre-slit '+' Opening"
      },
      {
        "label": "Opening Type",
        "value": "Pre-slit '+' pierceable"
      },
      {
        "label": "Compatible Plates",
        "value": "DW00016/018/006/013/019/020/008/009/011/012/021"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample sealing",
      "Evaporation prevention",
      "High-throughput storage"
    ],
    "features": [
      "Silicone material for excellent sealing",
      "Pierceable options for automated liquid handling",
      "Reusable for multiple sealing cycles"
    ]
  },
  {
    "id": "SSM00002",
    "category": "Sealing Mats",
    "title": "Sealing Mat — 96 round well, Pre-slit '+' Opening",
    "description": "Silicone sealing mat for 96 round well, Pre-slit '+' Opening deep well plates. Opening type: Pre-slit '+' pierceable. Compatible with plates: DW00010/014/015/027/028.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SSM00002"
      },
      {
        "label": "For Wells",
        "value": "96 round well, Pre-slit '+' Opening"
      },
      {
        "label": "Opening Type",
        "value": "Pre-slit '+' pierceable"
      },
      {
        "label": "Compatible Plates",
        "value": "DW00010/014/015/027/028"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample sealing",
      "Evaporation prevention",
      "High-throughput storage"
    ],
    "features": [
      "Silicone material for excellent sealing",
      "Pierceable options for automated liquid handling",
      "Reusable for multiple sealing cycles"
    ]
  },
  {
    "id": "SSM00003",
    "category": "Sealing Mats",
    "title": "Sealing Mat — 384 square well, Pre-slit '+' Opening",
    "description": "Silicone sealing mat for 384 square well, Pre-slit '+' Opening deep well plates. Opening type: Pre-slit '+' pierceable. Compatible with plates: DW00005/DW00029.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SSM00003"
      },
      {
        "label": "For Wells",
        "value": "384 square well, Pre-slit '+' Opening"
      },
      {
        "label": "Opening Type",
        "value": "Pre-slit '+' pierceable"
      },
      {
        "label": "Compatible Plates",
        "value": "DW00005/DW00029"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample sealing",
      "Evaporation prevention",
      "High-throughput storage"
    ],
    "features": [
      "Silicone material for excellent sealing",
      "Pierceable options for automated liquid handling",
      "Reusable for multiple sealing cycles"
    ]
  },
  {
    "id": "SSM00006",
    "category": "Sealing Mats",
    "title": "Sealing Mat — 96 round well (Axygen), Pre-slit '+' Opening",
    "description": "Silicone sealing mat for 96 round well (Axygen), Pre-slit '+' Opening deep well plates. Opening type: Pre-slit '+' Axygen pierceable. Compatible with plates: DW00024/025/026.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SSM00006"
      },
      {
        "label": "For Wells",
        "value": "96 round well (Axygen), Pre-slit '+' Opening"
      },
      {
        "label": "Opening Type",
        "value": "Pre-slit '+' Axygen pierceable"
      },
      {
        "label": "Compatible Plates",
        "value": "DW00024/025/026"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample sealing",
      "Evaporation prevention",
      "High-throughput storage"
    ],
    "features": [
      "Silicone material for excellent sealing",
      "Pierceable options for automated liquid handling",
      "Reusable for multiple sealing cycles"
    ]
  },
  {
    "id": "SSM00007",
    "category": "Sealing Mats",
    "title": "Sealing Mat — 96 round well (Axygen), Pre-slit '−' Opening",
    "description": "Silicone sealing mat for 96 round well (Axygen), Pre-slit '−' Opening deep well plates. Opening type: Pre-slit '−' Axygen pierceable. Compatible with plates: DW00024/025/026.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SSM00007"
      },
      {
        "label": "For Wells",
        "value": "96 round well (Axygen), Pre-slit '−' Opening"
      },
      {
        "label": "Opening Type",
        "value": "Pre-slit '−' Axygen pierceable"
      },
      {
        "label": "Compatible Plates",
        "value": "DW00024/025/026"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample sealing",
      "Evaporation prevention",
      "High-throughput storage"
    ],
    "features": [
      "Silicone material for excellent sealing",
      "Pierceable options for automated liquid handling",
      "Reusable for multiple sealing cycles"
    ]
  },
  {
    "id": "SSM00004",
    "category": "Sealing Mats",
    "title": "Sealing Mat — 96 square well (Axygen style)",
    "description": "Silicone sealing mat for 96 square well (Axygen style) deep well plates. Opening type: Standard Axygen. Compatible with plates: DW00016/018/006/013/019/020/008/009/011/012/021.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SSM00004"
      },
      {
        "label": "For Wells",
        "value": "96 square well (Axygen style)"
      },
      {
        "label": "Opening Type",
        "value": "Standard Axygen"
      },
      {
        "label": "Compatible Plates",
        "value": "DW00016/018/006/013/019/020/008/009/011/012/021"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample sealing",
      "Evaporation prevention",
      "High-throughput storage"
    ],
    "features": [
      "Silicone material for excellent sealing",
      "Pierceable options for automated liquid handling",
      "Reusable for multiple sealing cycles"
    ]
  },
  {
    "id": "SSM00009",
    "category": "Sealing Mats",
    "title": "Sealing Mat — 48 square well (Axygen style)",
    "description": "Silicone sealing mat for 48 square well (Axygen style) deep well plates. Opening type: Standard Axygen. Compatible with plates: DW00030/DW00007.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SSM00009"
      },
      {
        "label": "For Wells",
        "value": "48 square well (Axygen style)"
      },
      {
        "label": "Opening Type",
        "value": "Standard Axygen"
      },
      {
        "label": "Compatible Plates",
        "value": "DW00030/DW00007"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample sealing",
      "Evaporation prevention",
      "High-throughput storage"
    ],
    "features": [
      "Silicone material for excellent sealing",
      "Pierceable options for automated liquid handling",
      "Reusable for multiple sealing cycles"
    ]
  },
  {
    "id": "SSM00008",
    "category": "Sealing Mats",
    "title": "Sealing Mat — 24 square well",
    "description": "Silicone sealing mat for 24 square well deep well plates. Opening type: Standard. Compatible with plates: DW00031/032/033.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "SSM00008"
      },
      {
        "label": "For Wells",
        "value": "24 square well"
      },
      {
        "label": "Opening Type",
        "value": "Standard"
      },
      {
        "label": "Compatible Plates",
        "value": "DW00031/032/033"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample sealing",
      "Evaporation prevention",
      "High-throughput storage"
    ],
    "features": [
      "Silicone material for excellent sealing",
      "Pierceable options for automated liquid handling",
      "Reusable for multiple sealing cycles"
    ]
  },
  {
    "id": "EP00001H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Clear, High binding, C-shaped flat bottom",
    "description": "96-well detachable ELISA plate. Clear colour, High binding, C-shaped flat bottom, 8-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00001H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High binding"
      },
      {
        "label": "Type",
        "value": "C-shaped flat bottom, 8-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "High binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00001M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Clear, Medium binding, C-shaped flat bottom",
    "description": "96-well detachable ELISA plate. Clear colour, Medium binding, C-shaped flat bottom, 8-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00001M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium binding"
      },
      {
        "label": "Type",
        "value": "C-shaped flat bottom, 8-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "Medium binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00006H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Clear, High binding, Flat bottom",
    "description": "96-well detachable ELISA plate. Clear colour, High binding, Flat bottom, 8-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00006H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 8-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "High binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00004H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Clear, High binding, Flat bottom",
    "description": "96-well detachable ELISA plate. Clear colour, High binding, Flat bottom, 8-strip detachable (Corning style, repl. Corning 42592). 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00004H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 8-strip detachable (Corning style, repl. Corning 42592)"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "High binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00004M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Clear, Medium binding, Flat bottom",
    "description": "96-well detachable ELISA plate. Clear colour, Medium binding, Flat bottom, 8-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00004M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 8-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "Medium binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00003H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — White, High binding, Flat bottom",
    "description": "96-well detachable ELISA plate. White colour, High binding, Flat bottom, 8-strip detachable (Corning style). 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00003H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "High binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 8-strip detachable (Corning style)"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "High binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00003M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — White, Medium binding, Flat bottom",
    "description": "96-well detachable ELISA plate. White colour, Medium binding, Flat bottom, 8-strip detachable (Corning style). 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00003M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "Medium binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 8-strip detachable (Corning style)"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "Medium binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00005H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Black, High binding, Flat bottom",
    "description": "96-well detachable ELISA plate. Black colour, High binding, Flat bottom, 8-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00005H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "High binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 8-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "High binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00005M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Black, Medium binding, Flat bottom",
    "description": "96-well detachable ELISA plate. Black colour, Medium binding, Flat bottom, 8-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00005M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "Medium binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 8-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "Medium binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00007H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Clear, High binding, Flat bottom",
    "description": "96-well detachable ELISA plate. Clear colour, High binding, Flat bottom, 8-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00007H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 8-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "High binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00007M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Clear, Medium binding, Flat bottom",
    "description": "96-well detachable ELISA plate. Clear colour, Medium binding, Flat bottom, 8-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00007M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 8-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "Medium binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00008H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — White, High binding, Flat bottom",
    "description": "96-well detachable ELISA plate. White colour, High binding, Flat bottom, 12-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00008H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "High binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 12-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "High binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00008M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — White, Medium binding, Flat bottom",
    "description": "96-well detachable ELISA plate. White colour, Medium binding, Flat bottom, 12-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00008M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "Medium binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 12-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "Medium binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00009H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Black, High binding, Flat bottom",
    "description": "96-well detachable ELISA plate. Black colour, High binding, Flat bottom, 12-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00009H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "High binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 12-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "High binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00009M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Detachable — Black, Medium binding, Flat bottom",
    "description": "96-well detachable ELISA plate. Black colour, Medium binding, Flat bottom, 12-strip detachable. 0.2mL per well. SBS/ANSI footprint.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00009M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "0.2mL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "Medium binding"
      },
      {
        "label": "Type",
        "value": "Flat bottom, 12-strip detachable"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Antibody screening",
      "Enzyme activity assay"
    ],
    "features": [
      "SBS/ANSI footprint for automated workstations",
      "Detachable strips for flexible sample numbers",
      "Medium binding surface for optimal antibody/antigen binding",
      "Non-pyrogenic, non-cytotoxic PS material"
    ]
  },
  {
    "id": "EP00011M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, Medium binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Clear, Medium binding, U bottom, 340µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00011M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "340µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "U bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60011M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, Medium binding, With Lid",
    "description": "96-well undetachable ELISA plate. Clear, Medium binding, U bottom, 340µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60011M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "340µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "U bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00011H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, High binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Clear, High binding, U bottom, 340µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00011H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "340µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "U bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60011H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, High binding, With Lid",
    "description": "96-well undetachable ELISA plate. Clear, High binding, U bottom, 340µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60011H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "340µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "U bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00012M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, Medium binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Clear, Medium binding, V bottom, 300µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00012M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "300µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "V bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60012M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, Medium binding, With Lid",
    "description": "96-well undetachable ELISA plate. Clear, Medium binding, V bottom, 300µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60012M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "300µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "V bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00012H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, High binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Clear, High binding, V bottom, 300µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00012H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "300µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "V bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60012H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, High binding, With Lid",
    "description": "96-well undetachable ELISA plate. Clear, High binding, V bottom, 300µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60012H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "300µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "V bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00002M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, Medium binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Clear, Medium binding, Flat bottom, 350µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00002M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60002M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, Medium binding, With Lid",
    "description": "96-well undetachable ELISA plate. Clear, Medium binding, Flat bottom, 350µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60002M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00002H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, High binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Clear, High binding, Flat bottom, 350µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00002H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60002H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, High binding, With Lid",
    "description": "96-well undetachable ELISA plate. Clear, High binding, Flat bottom, 350µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60002H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00013M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — White, Medium binding, Without Lid",
    "description": "96-well undetachable ELISA plate. White, Medium binding, Flat bottom, 350µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00013M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "White plate for absorbance assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60013M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — White, Medium binding, With Lid",
    "description": "96-well undetachable ELISA plate. White, Medium binding, Flat bottom, 350µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60013M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "White plate for absorbance assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00013H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — White, High binding, Without Lid",
    "description": "96-well undetachable ELISA plate. White, High binding, Flat bottom, 350µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00013H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "White plate for absorbance assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60013H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — White, High binding, With Lid",
    "description": "96-well undetachable ELISA plate. White, High binding, Flat bottom, 350µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60013H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "White plate for absorbance assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00010M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Black, Medium binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Black, Medium binding, Flat bottom, 350µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00010M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Black plate for fluorescence/luminescence assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60010M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Black, Medium binding, With Lid",
    "description": "96-well undetachable ELISA plate. Black, Medium binding, Flat bottom, 350µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60010M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Black plate for fluorescence/luminescence assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00010H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Black, High binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Black, High binding, Flat bottom, 350µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00010H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Black plate for fluorescence/luminescence assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60010H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Black, High binding, With Lid",
    "description": "96-well undetachable ELISA plate. Black, High binding, Flat bottom, 350µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60010H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Black plate for fluorescence/luminescence assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00014M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, Medium binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Clear, Medium binding, Flat bottom, 350µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00014M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60014M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, Medium binding, With Lid",
    "description": "96-well undetachable ELISA plate. Clear, Medium binding, Flat bottom, 350µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60014M"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00014H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, High binding, Without Lid",
    "description": "96-well undetachable ELISA plate. Clear, High binding, Flat bottom, 350µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00014H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60014H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 96-well Undetachable — Clear, High binding, With Lid",
    "description": "96-well undetachable ELISA plate. Clear, High binding, Flat bottom, 350µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60014H"
      },
      {
        "label": "Wells",
        "value": "96"
      },
      {
        "label": "Volume/Well",
        "value": "350µL"
      },
      {
        "label": "Color",
        "value": "Clear"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Clear plate for general assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00015M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 384-well Undetachable — White, Medium binding, Without Lid",
    "description": "384-well undetachable ELISA plate. White, Medium binding, Flat bottom, 130µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00015M"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "130µL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "White plate for absorbance assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60015M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 384-well Undetachable — White, Medium binding, With Lid",
    "description": "384-well undetachable ELISA plate. White, Medium binding, Flat bottom, 130µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60015M"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "130µL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "White plate for absorbance assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00015H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 384-well Undetachable — White, High binding, Without Lid",
    "description": "384-well undetachable ELISA plate. White, High binding, Flat bottom, 130µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00015H"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "130µL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "White plate for absorbance assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60015H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 384-well Undetachable — White, High binding, With Lid",
    "description": "384-well undetachable ELISA plate. White, High binding, Flat bottom, 130µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60015H"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "130µL"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "White plate for absorbance assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00016M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 384-well Undetachable — Black, Medium binding, Without Lid",
    "description": "384-well undetachable ELISA plate. Black, Medium binding, Flat bottom, 130µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00016M"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "130µL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Black plate for fluorescence/luminescence assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60016M",
    "category": "ELISA Plates",
    "title": "ELISA Plate 384-well Undetachable — Black, Medium binding, With Lid",
    "description": "384-well undetachable ELISA plate. Black, Medium binding, Flat bottom, 130µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60016M"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "130µL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "Medium"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "Medium binding surface",
      "Black plate for fluorescence/luminescence assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP00016H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 384-well Undetachable — Black, High binding, Without Lid",
    "description": "384-well undetachable ELISA plate. Black, High binding, Flat bottom, 130µL/well, Without Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP00016H"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "130µL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "Without Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Black plate for fluorescence/luminescence assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "EP60016H",
    "category": "ELISA Plates",
    "title": "ELISA Plate 384-well Undetachable — Black, High binding, With Lid",
    "description": "384-well undetachable ELISA plate. Black, High binding, Flat bottom, 130µL/well, With Lid.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "EP60016H"
      },
      {
        "label": "Wells",
        "value": "384"
      },
      {
        "label": "Volume/Well",
        "value": "130µL"
      },
      {
        "label": "Color",
        "value": "Black"
      },
      {
        "label": "Binding",
        "value": "High"
      },
      {
        "label": "Bottom",
        "value": "Flat bottom"
      },
      {
        "label": "Lid",
        "value": "With Lid"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "ELISA assay",
      "Immunoassay",
      "Fluorescence assay",
      "Absorbance assay"
    ],
    "features": [
      "SBS/ANSI footprint",
      "High binding surface",
      "Black plate for fluorescence/luminescence assays",
      "Lid version available for evaporation prevention"
    ]
  },
  {
    "id": "B-CTB15YE",
    "category": "Centrifuge Tubes",
    "title": "15mL Conical Centrifuge Tube (Bag)",
    "description": "Screw cap centrifuge tube. Volume: 15mL. Type: Conical. Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-CTB15YE"
      },
      {
        "label": "Volume",
        "value": "15mL"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Bag, 20 Bags/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "B-CTF15YE",
    "category": "Centrifuge Tubes",
    "title": "15mL Conical Centrifuge Tube (Rack)",
    "description": "Screw cap centrifuge tube. Volume: 15mL. Type: Conical. Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-CTF15YE"
      },
      {
        "label": "Volume",
        "value": "15mL"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 PCS/Rack, 10 Racks/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "B-CTB15YE-AM",
    "category": "Centrifuge Tubes",
    "title": "15mL Amber Conical Centrifuge Tube (Bag)",
    "description": "Screw cap centrifuge tube. Volume: 15mL Amber. Type: Conical. Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-CTB15YE-AM"
      },
      {
        "label": "Volume",
        "value": "15mL Amber"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Bag, 20 Bags/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "B-CTF15YE-AM",
    "category": "Centrifuge Tubes",
    "title": "15mL Amber Conical Centrifuge Tube (Rack)",
    "description": "Screw cap centrifuge tube. Volume: 15mL Amber. Type: Conical. Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-CTF15YE-AM"
      },
      {
        "label": "Volume",
        "value": "15mL Amber"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50 PCS/Rack, 10 Racks/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "CTB25BL",
    "category": "Centrifuge Tubes",
    "title": "25mL Conical Centrifuge Tube (Bag)",
    "description": "Screw cap centrifuge tube. Volume: 25mL. Type: Conical. Cap colour: Blue. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CTB25BL"
      },
      {
        "label": "Volume",
        "value": "25mL"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Blue"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Bag, 8 Bags/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "CTF25BL",
    "category": "Centrifuge Tubes",
    "title": "25mL Conical Centrifuge Tube (Rack)",
    "description": "Screw cap centrifuge tube. Volume: 25mL. Type: Conical. Cap colour: Blue. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CTF25BL"
      },
      {
        "label": "Volume",
        "value": "25mL"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Blue"
      },
      {
        "label": "Packaging",
        "value": "Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Rack, 8 Racks/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "B-CTB50YE",
    "category": "Centrifuge Tubes",
    "title": "50mL Conical Centrifuge Tube (Bag)",
    "description": "Screw cap centrifuge tube. Volume: 50mL. Type: Conical. Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-CTB50YE"
      },
      {
        "label": "Volume",
        "value": "50mL"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Bag, 20 Bags/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "B-CTF50YE",
    "category": "Centrifuge Tubes",
    "title": "50mL Conical Centrifuge Tube (Rack)",
    "description": "Screw cap centrifuge tube. Volume: 50mL. Type: Conical. Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-CTF50YE"
      },
      {
        "label": "Volume",
        "value": "50mL"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Rack, 20 Racks/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "B-CTB50YE-AM",
    "category": "Centrifuge Tubes",
    "title": "50mL Amber Conical Centrifuge Tube (Bag)",
    "description": "Screw cap centrifuge tube. Volume: 50mL Amber. Type: Conical. Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-CTB50YE-AM"
      },
      {
        "label": "Volume",
        "value": "50mL Amber"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Bag, 20 Bags/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "B-CTF50YE-AM",
    "category": "Centrifuge Tubes",
    "title": "50mL Amber Conical Centrifuge Tube (Rack)",
    "description": "Screw cap centrifuge tube. Volume: 50mL Amber. Type: Conical. Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-CTF50YE-AM"
      },
      {
        "label": "Volume",
        "value": "50mL Amber"
      },
      {
        "label": "Type",
        "value": "Conical"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Rack, 20 Racks/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "B-2SCTB50YE",
    "category": "Centrifuge Tubes",
    "title": "50mL Self-standing (eight-sided skirt) Centrifuge Tube (Bag)",
    "description": "Screw cap centrifuge tube. Volume: 50mL. Type: Self-standing (eight-sided skirt). Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-2SCTB50YE"
      },
      {
        "label": "Volume",
        "value": "50mL"
      },
      {
        "label": "Type",
        "value": "Self-standing (eight-sided skirt)"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Bag, 20 Bags/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "B-SCTB50YE",
    "category": "Centrifuge Tubes",
    "title": "50mL Self-standing (round skirt) Centrifuge Tube (Bag)",
    "description": "Screw cap centrifuge tube. Volume: 50mL. Type: Self-standing (round skirt). Cap colour: Yellow. Max centrifugal force 12,000xg.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "B-SCTB50YE"
      },
      {
        "label": "Volume",
        "value": "50mL"
      },
      {
        "label": "Type",
        "value": "Self-standing (round skirt)"
      },
      {
        "label": "Cap Color",
        "value": "Yellow"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25 PCS/Bag, 20 Bags/Case"
      },
      {
        "label": "Max Centrifugal Force",
        "value": "12,000xg"
      }
    ],
    "applications": [
      "Sample centrifugation",
      "Cell culture",
      "Sample storage",
      "Protein precipitation"
    ],
    "features": [
      "Maximum centrifugal force up to 12,000xg",
      "Clear graduations for accurate volume measurement",
      "Highly visible marking area for sample labelling",
      "DNase-free, RNase-free, Pyrogen-free"
    ]
  },
  {
    "id": "MCTB005",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 0.5mL — Common (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 0.5mL. Class: Common. Colour: Nature. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB005"
      },
      {
        "label": "Volume",
        "value": "0.5mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB005-R",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 0.5mL — Ultra Low Retention (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 0.5mL. Class: Ultra Low Retention. Colour: Nature. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB005-R"
      },
      {
        "label": "Volume",
        "value": "0.5mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB005X",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 0.5mL — Common (5-color)",
    "description": "Polypropylene micro centrifuge tube. Volume: 0.5mL. Class: Common. Colour: 5-color. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB005X"
      },
      {
        "label": "Volume",
        "value": "0.5mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Color",
        "value": "5-color"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "1000/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB015",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 1.5mL — Common (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 1.5mL. Class: Common. Colour: Nature. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB015"
      },
      {
        "label": "Volume",
        "value": "1.5mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB015-R",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 1.5mL — Ultra Low Retention (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 1.5mL. Class: Ultra Low Retention. Colour: Nature. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB015-R"
      },
      {
        "label": "Volume",
        "value": "1.5mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB015X",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 1.5mL — Common (5-color)",
    "description": "Polypropylene micro centrifuge tube. Volume: 1.5mL. Class: Common. Colour: 5-color. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB015X"
      },
      {
        "label": "Volume",
        "value": "1.5mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Color",
        "value": "5-color"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB215",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 1.5mL — Common (Hyundai Micro style, narrow cap) (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 1.5mL. Class: Common (Hyundai Micro style, narrow cap). Colour: Nature. Cap: Flap cap narrow. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB215"
      },
      {
        "label": "Volume",
        "value": "1.5mL"
      },
      {
        "label": "Class",
        "value": "Common (Hyundai Micro style, narrow cap)"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Flap cap narrow"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB020",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 2.0mL — Common (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 2.0mL. Class: Common. Colour: Nature. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB020"
      },
      {
        "label": "Volume",
        "value": "2.0mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB020-R",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 2.0mL — Ultra Low Retention (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 2.0mL. Class: Ultra Low Retention. Colour: Nature. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB020-R"
      },
      {
        "label": "Volume",
        "value": "2.0mL"
      },
      {
        "label": "Class",
        "value": "Ultra Low Retention"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB020X",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 2.0mL — Common (5-color)",
    "description": "Polypropylene micro centrifuge tube. Volume: 2.0mL. Class: Common. Colour: 5-color. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB020X"
      },
      {
        "label": "Volume",
        "value": "2.0mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Color",
        "value": "5-color"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB050",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 5.0mL — Common (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 5.0mL. Class: Common. Colour: Nature. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB050"
      },
      {
        "label": "Volume",
        "value": "5.0mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "200/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "MCTB050X",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 5.0mL — Common (4-color)",
    "description": "Polypropylene micro centrifuge tube. Volume: 5.0mL. Class: Common. Colour: 4-color. Cap: Flap cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MCTB050X"
      },
      {
        "label": "Volume",
        "value": "5.0mL"
      },
      {
        "label": "Class",
        "value": "Common"
      },
      {
        "label": "Color",
        "value": "4-color"
      },
      {
        "label": "Cap",
        "value": "Flap cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "200/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "LMTB015",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 1.5mL — Common (Safety Lock) (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 1.5mL. Class: Common (Safety Lock). Colour: Nature. Cap: Safety lock. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LMTB015"
      },
      {
        "label": "Volume",
        "value": "1.5mL"
      },
      {
        "label": "Class",
        "value": "Common (Safety Lock)"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Safety lock"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "LMTB020",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 2.0mL — Common (Safety Lock) (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 2.0mL. Class: Common (Safety Lock). Colour: Nature. Cap: Safety lock. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LMTB020"
      },
      {
        "label": "Volume",
        "value": "2.0mL"
      },
      {
        "label": "Class",
        "value": "Common (Safety Lock)"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Safety lock"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "LMTB050",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 5.0mL — Common (Safety Lock) (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 5.0mL. Class: Common (Safety Lock). Colour: Nature. Cap: Safety lock. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LMTB050"
      },
      {
        "label": "Volume",
        "value": "5.0mL"
      },
      {
        "label": "Class",
        "value": "Common (Safety Lock)"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Safety lock"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "300/Bag, 15 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "LMTB051",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 5.0mL — Common (Safety Lock, Eppendorf style) (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 5.0mL. Class: Common (Safety Lock, Eppendorf style). Colour: Nature. Cap: Safety lock. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LMTB051"
      },
      {
        "label": "Volume",
        "value": "5.0mL"
      },
      {
        "label": "Class",
        "value": "Common (Safety Lock, Eppendorf style)"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "Safety lock"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "200/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "NCMT015",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 1.5mL — Common (No cap, Axygen graduated) (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 1.5mL. Class: Common (No cap, Axygen graduated). Colour: Nature. Cap: No cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "NCMT015"
      },
      {
        "label": "Volume",
        "value": "1.5mL"
      },
      {
        "label": "Class",
        "value": "Common (No cap, Axygen graduated)"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "No cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "NCMT020",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 2.0mL — Common (No cap, graduated) (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 2.0mL. Class: Common (No cap, graduated). Colour: Nature. Cap: No cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "NCMT020"
      },
      {
        "label": "Volume",
        "value": "2.0mL"
      },
      {
        "label": "Class",
        "value": "Common (No cap, graduated)"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "No cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "NCMT220",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube 2.0mL — Common (No cap, Axygen style) (Nature)",
    "description": "Polypropylene micro centrifuge tube. Volume: 2.0mL. Class: Common (No cap, Axygen style). Colour: Nature. Cap: No cap. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "NCMT220"
      },
      {
        "label": "Volume",
        "value": "2.0mL"
      },
      {
        "label": "Class",
        "value": "Common (No cap, Axygen style)"
      },
      {
        "label": "Color",
        "value": "Nature"
      },
      {
        "label": "Cap",
        "value": "No cap"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "CL15",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube For 1.5mL tube — Cap Lock (Light blue)",
    "description": "Polypropylene micro centrifuge tube. Volume: For 1.5mL tube. Class: Cap Lock. Colour: Light blue. Cap: Cap lock accessory. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CL15"
      },
      {
        "label": "Volume",
        "value": "For 1.5mL tube"
      },
      {
        "label": "Class",
        "value": "Cap Lock"
      },
      {
        "label": "Color",
        "value": "Light blue"
      },
      {
        "label": "Cap",
        "value": "Cap lock accessory"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "25/Bag, 200 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "CL25",
    "category": "Micro Centrifuge Tubes",
    "title": "Micro Centrifuge Tube For 5.0mL tube — Cap Lock (Light blue)",
    "description": "Polypropylene micro centrifuge tube. Volume: For 5.0mL tube. Class: Cap Lock. Colour: Light blue. Cap: Cap lock accessory. Max 25,000xg. Autoclavable at 121°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CL25"
      },
      {
        "label": "Volume",
        "value": "For 5.0mL tube"
      },
      {
        "label": "Class",
        "value": "Cap Lock"
      },
      {
        "label": "Color",
        "value": "Light blue"
      },
      {
        "label": "Cap",
        "value": "Cap lock accessory"
      },
      {
        "label": "Max Speed",
        "value": "25,000xg"
      },
      {
        "label": "Packaging",
        "value": "25/Bag, 200 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Centrifugation",
      "DNA/RNA extraction",
      "PCR preparation",
      "Protein assays"
    ],
    "features": [
      "Max speed 25,000xg",
      "Frosted writing area on flat cap and tube",
      "Clear graduations for volume observation",
      "Autoclavable at 121°C",
      "DNase-free, RNase-free, Endotoxin-free"
    ]
  },
  {
    "id": "RMCT2",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — For 1.5/2.0mL tubes (Orange)",
    "description": "Laboratory tube rack for For 1.5/2.0mL tubes. Material: PP. Colour: Orange. 50 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RMCT2"
      },
      {
        "label": "For Tubes",
        "value": "For 1.5/2.0mL tubes"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Wells/Positions",
        "value": "50"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Orange colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RMCT15",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — For 5.0/15mL tubes (Orange)",
    "description": "Laboratory tube rack for For 5.0/15mL tubes. Material: PC. Colour: Orange. 50 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RMCT15"
      },
      {
        "label": "For Tubes",
        "value": "For 5.0/15mL tubes"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Wells/Positions",
        "value": "50"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PC material — durable",
      "Orange colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RTM0001",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — 4-way for 0.2/2.0/15/50mL (Green/Blue/Purple)",
    "description": "Laboratory tube rack for 4-way for 0.2/2.0/15/50mL. Material: PP. Colour: Green/Blue/Purple. 96/32/12/4 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RTM0001"
      },
      {
        "label": "For Tubes",
        "value": "4-way for 0.2/2.0/15/50mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Green/Blue/Purple"
      },
      {
        "label": "Wells/Positions",
        "value": "96/32/12/4"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Green/Blue/Purple colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00001",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — Double-sided 0.5/1.5/2.0mL (Orange)",
    "description": "Laboratory tube rack for Double-sided 0.5/1.5/2.0mL. Material: PP. Colour: Orange. 24/24 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00001"
      },
      {
        "label": "For Tubes",
        "value": "Double-sided 0.5/1.5/2.0mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Wells/Positions",
        "value": "24/24"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Orange colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00002",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — Double-sided 0.5/1.5/2.0mL (Blue)",
    "description": "Laboratory tube rack for Double-sided 0.5/1.5/2.0mL. Material: PP. Colour: Blue. 32/32 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00002"
      },
      {
        "label": "For Tubes",
        "value": "Double-sided 0.5/1.5/2.0mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Blue"
      },
      {
        "label": "Wells/Positions",
        "value": "32/32"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Blue colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00003",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — Double-sided 0.5/1.5/2.0mL (Orange)",
    "description": "Laboratory tube rack for Double-sided 0.5/1.5/2.0mL. Material: PP. Colour: Orange. 40/55 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00003"
      },
      {
        "label": "For Tubes",
        "value": "Double-sided 0.5/1.5/2.0mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Wells/Positions",
        "value": "40/55"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Orange colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00004",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — Double-sided 0.5/1.5/2.0mL (Orange)",
    "description": "Laboratory tube rack for Double-sided 0.5/1.5/2.0mL. Material: PP. Colour: Orange. 60/60 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00004"
      },
      {
        "label": "For Tubes",
        "value": "Double-sided 0.5/1.5/2.0mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Wells/Positions",
        "value": "60/60"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Orange colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00006",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — Double-sided 0.1/0.2/1.5/2.0mL (Orange)",
    "description": "Laboratory tube rack for Double-sided 0.1/0.2/1.5/2.0mL. Material: PP. Colour: Orange. 80/60 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00006"
      },
      {
        "label": "For Tubes",
        "value": "Double-sided 0.1/0.2/1.5/2.0mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Wells/Positions",
        "value": "80/60"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Orange colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00007",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — Double-sided 0.5/1.5/2.0mL (Blue)",
    "description": "Laboratory tube rack for Double-sided 0.5/1.5/2.0mL. Material: PP. Colour: Blue. 96/96 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00007"
      },
      {
        "label": "For Tubes",
        "value": "Double-sided 0.5/1.5/2.0mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Blue"
      },
      {
        "label": "Wells/Positions",
        "value": "96/96"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Blue colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00008",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — For 15mL tubes (Orange)",
    "description": "Laboratory tube rack for For 15mL tubes. Material: PP. Colour: Orange. 50 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00008"
      },
      {
        "label": "For Tubes",
        "value": "For 15mL tubes"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Wells/Positions",
        "value": "50"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Orange colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00010",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — For 5/15/25/50mL (Orange)",
    "description": "Laboratory tube rack for For 5/15/25/50mL. Material: HIPS. Colour: Orange. 50 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00010"
      },
      {
        "label": "For Tubes",
        "value": "For 5/15/25/50mL"
      },
      {
        "label": "Material",
        "value": "HIPS"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Wells/Positions",
        "value": "50"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "HIPS material — durable, smooth surface",
      "Orange colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00011",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — For 5/15/25/50mL (Orange)",
    "description": "Laboratory tube rack for For 5/15/25/50mL. Material: HIPS. Colour: Orange. 28 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00011"
      },
      {
        "label": "For Tubes",
        "value": "For 5/15/25/50mL"
      },
      {
        "label": "Material",
        "value": "HIPS"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Wells/Positions",
        "value": "28"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "HIPS material — durable, smooth surface",
      "Orange colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "RT00009",
    "category": "Racks for Tubes & Vials",
    "title": "Tube Rack — For 0.1/0.2mL PCR tubes (Yellow)",
    "description": "Laboratory tube rack for For 0.1/0.2mL PCR tubes. Material: PP. Colour: Yellow. 96 positions.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RT00009"
      },
      {
        "label": "For Tubes",
        "value": "For 0.1/0.2mL PCR tubes"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Color",
        "value": "Yellow"
      },
      {
        "label": "Wells/Positions",
        "value": "96"
      },
      {
        "label": "Packaging",
        "value": "200 PCS/Case"
      }
    ],
    "applications": [
      "Tube organisation",
      "Laboratory workflow",
      "Sample processing"
    ],
    "features": [
      "PP material — autoclavable, chemical resistant",
      "Yellow colour for easy identification",
      "Suitable for routine laboratory operations"
    ]
  },
  {
    "id": "PD00009",
    "category": "Petri Dishes",
    "title": "Petri Dish 90×15mm — 1 (standard) compartment(s)",
    "description": "Petri dish 90×15mm, 1 (standard) compartment(s). Original quality PS material. Flat bottom for bacterial culture.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PD00009"
      },
      {
        "label": "Size",
        "value": "90×15mm"
      },
      {
        "label": "Compartments",
        "value": "1 (standard)"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "20 PCS/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Bacterial culture",
      "Fungal culture",
      "Cell culture",
      "Microbiological testing"
    ],
    "features": [
      "Original quality polystyrene (PS)",
      "Flat bottom for uniform culture",
      "Available in 1–4 compartment formats"
    ]
  },
  {
    "id": "PD00059",
    "category": "Petri Dishes",
    "title": "Petri Dish 90×15mm — 1 (single-compartment) compartment(s)",
    "description": "Petri dish 90×15mm, 1 (single-compartment) compartment(s). Original quality PS material. Flat bottom for bacterial culture.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PD00059"
      },
      {
        "label": "Size",
        "value": "90×15mm"
      },
      {
        "label": "Compartments",
        "value": "1 (single-compartment)"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 50 Bags/Case"
      }
    ],
    "applications": [
      "Bacterial culture",
      "Fungal culture",
      "Cell culture",
      "Microbiological testing"
    ],
    "features": [
      "Original quality polystyrene (PS)",
      "Flat bottom for uniform culture",
      "Available in 1–4 compartment formats"
    ]
  },
  {
    "id": "PD00259",
    "category": "Petri Dishes",
    "title": "Petri Dish 90×15mm — 1 (single-compartment) compartment(s)",
    "description": "Petri dish 90×15mm, 1 (single-compartment) compartment(s). Original quality PS material. Flat bottom for bacterial culture.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PD00259"
      },
      {
        "label": "Size",
        "value": "90×15mm"
      },
      {
        "label": "Compartments",
        "value": "1 (single-compartment)"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "20 PCS/Bag, 25 Bags/Case"
      }
    ],
    "applications": [
      "Bacterial culture",
      "Fungal culture",
      "Cell culture",
      "Microbiological testing"
    ],
    "features": [
      "Original quality polystyrene (PS)",
      "Flat bottom for uniform culture",
      "Available in 1–4 compartment formats"
    ]
  },
  {
    "id": "PD20059",
    "category": "Petri Dishes",
    "title": "Petri Dish 90×15mm, 2-compartment — 2 compartment(s)",
    "description": "Petri dish 90×15mm, 2-compartment, 2 compartment(s). Original quality PS material. Flat bottom for bacterial culture.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PD20059"
      },
      {
        "label": "Size",
        "value": "90×15mm, 2-compartment"
      },
      {
        "label": "Compartments",
        "value": "2"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 50 Bags/Case"
      }
    ],
    "applications": [
      "Bacterial culture",
      "Fungal culture",
      "Cell culture",
      "Microbiological testing"
    ],
    "features": [
      "Original quality polystyrene (PS)",
      "Flat bottom for uniform culture",
      "Available in 1–4 compartment formats"
    ]
  },
  {
    "id": "PD20259",
    "category": "Petri Dishes",
    "title": "Petri Dish 90×15mm, 2-compartment — 2 compartment(s)",
    "description": "Petri dish 90×15mm, 2-compartment, 2 compartment(s). Original quality PS material. Flat bottom for bacterial culture.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PD20259"
      },
      {
        "label": "Size",
        "value": "90×15mm, 2-compartment"
      },
      {
        "label": "Compartments",
        "value": "2"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "20 PCS/Bag, 25 Bags/Case"
      }
    ],
    "applications": [
      "Bacterial culture",
      "Fungal culture",
      "Cell culture",
      "Microbiological testing"
    ],
    "features": [
      "Original quality polystyrene (PS)",
      "Flat bottom for uniform culture",
      "Available in 1–4 compartment formats"
    ]
  },
  {
    "id": "PD30059",
    "category": "Petri Dishes",
    "title": "Petri Dish 90×15mm, 3-compartment — 3 compartment(s)",
    "description": "Petri dish 90×15mm, 3-compartment, 3 compartment(s). Original quality PS material. Flat bottom for bacterial culture.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PD30059"
      },
      {
        "label": "Size",
        "value": "90×15mm, 3-compartment"
      },
      {
        "label": "Compartments",
        "value": "3"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 50 Bags/Case"
      }
    ],
    "applications": [
      "Bacterial culture",
      "Fungal culture",
      "Cell culture",
      "Microbiological testing"
    ],
    "features": [
      "Original quality polystyrene (PS)",
      "Flat bottom for uniform culture",
      "Available in 1–4 compartment formats"
    ]
  },
  {
    "id": "PD30259",
    "category": "Petri Dishes",
    "title": "Petri Dish 90×15mm, 3-compartment — 3 compartment(s)",
    "description": "Petri dish 90×15mm, 3-compartment, 3 compartment(s). Original quality PS material. Flat bottom for bacterial culture.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PD30259"
      },
      {
        "label": "Size",
        "value": "90×15mm, 3-compartment"
      },
      {
        "label": "Compartments",
        "value": "3"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "20 PCS/Bag, 25 Bags/Case"
      }
    ],
    "applications": [
      "Bacterial culture",
      "Fungal culture",
      "Cell culture",
      "Microbiological testing"
    ],
    "features": [
      "Original quality polystyrene (PS)",
      "Flat bottom for uniform culture",
      "Available in 1–4 compartment formats"
    ]
  },
  {
    "id": "PD40059",
    "category": "Petri Dishes",
    "title": "Petri Dish 90×15mm, 4-compartment — 4 compartment(s)",
    "description": "Petri dish 90×15mm, 4-compartment, 4 compartment(s). Original quality PS material. Flat bottom for bacterial culture.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PD40059"
      },
      {
        "label": "Size",
        "value": "90×15mm, 4-compartment"
      },
      {
        "label": "Compartments",
        "value": "4"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10 PCS/Bag, 50 Bags/Case"
      }
    ],
    "applications": [
      "Bacterial culture",
      "Fungal culture",
      "Cell culture",
      "Microbiological testing"
    ],
    "features": [
      "Original quality polystyrene (PS)",
      "Flat bottom for uniform culture",
      "Available in 1–4 compartment formats"
    ]
  },
  {
    "id": "PD40259",
    "category": "Petri Dishes",
    "title": "Petri Dish 90×15mm, 4-compartment — 4 compartment(s)",
    "description": "Petri dish 90×15mm, 4-compartment, 4 compartment(s). Original quality PS material. Flat bottom for bacterial culture.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PD40259"
      },
      {
        "label": "Size",
        "value": "90×15mm, 4-compartment"
      },
      {
        "label": "Compartments",
        "value": "4"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "20 PCS/Bag, 25 Bags/Case"
      }
    ],
    "applications": [
      "Bacterial culture",
      "Fungal culture",
      "Cell culture",
      "Microbiological testing"
    ],
    "features": [
      "Original quality polystyrene (PS)",
      "Flat bottom for uniform culture",
      "Available in 1–4 compartment formats"
    ]
  },
  {
    "id": "STBP05",
    "category": "Screw Cap Culture Tubes",
    "title": "Screw Cap Culture Tube 5mL — PP (Bag)",
    "description": "Screw cap culture tube 5mL, PP material, bag packaging. Patented cap design prevents liquid splashing. Supports aerobic and anaerobic cultures.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "STBP05"
      },
      {
        "label": "Volume",
        "value": "5mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Aerobic cell culture",
      "Anaerobic culture",
      "Sample storage",
      "Microbiology"
    ],
    "features": [
      "Patented screw cap prevents liquid splashing and ensures safe centrifugation",
      "White writing area and flat cap for labelling",
      "Clear graduations for precise liquid transfer",
      "Supports both aerobic and anaerobic cultures"
    ]
  },
  {
    "id": "STBS05",
    "category": "Screw Cap Culture Tubes",
    "title": "Screw Cap Culture Tube 5mL — PS (Bag)",
    "description": "Screw cap culture tube 5mL, PS material, bag packaging. Patented cap design prevents liquid splashing. Supports aerobic and anaerobic cultures.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "STBS05"
      },
      {
        "label": "Volume",
        "value": "5mL"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Aerobic cell culture",
      "Anaerobic culture",
      "Sample storage",
      "Microbiology"
    ],
    "features": [
      "Patented screw cap prevents liquid splashing and ensures safe centrifugation",
      "White writing area and flat cap for labelling",
      "Clear graduations for precise liquid transfer",
      "Supports both aerobic and anaerobic cultures"
    ]
  },
  {
    "id": "STFP05",
    "category": "Screw Cap Culture Tubes",
    "title": "Screw Cap Culture Tube 5mL — PP (Rack)",
    "description": "Screw cap culture tube 5mL, PP material, rack packaging. Patented cap design prevents liquid splashing. Supports aerobic and anaerobic cultures.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "STFP05"
      },
      {
        "label": "Volume",
        "value": "5mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50/Rack, 10 Racks/Case"
      }
    ],
    "applications": [
      "Aerobic cell culture",
      "Anaerobic culture",
      "Sample storage",
      "Microbiology"
    ],
    "features": [
      "Patented screw cap prevents liquid splashing and ensures safe centrifugation",
      "White writing area and flat cap for labelling",
      "Clear graduations for precise liquid transfer",
      "Supports both aerobic and anaerobic cultures"
    ]
  },
  {
    "id": "STFS05",
    "category": "Screw Cap Culture Tubes",
    "title": "Screw Cap Culture Tube 5mL — PS (Rack)",
    "description": "Screw cap culture tube 5mL, PS material, rack packaging. Patented cap design prevents liquid splashing. Supports aerobic and anaerobic cultures.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "STFS05"
      },
      {
        "label": "Volume",
        "value": "5mL"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50/Rack, 10 Racks/Case"
      }
    ],
    "applications": [
      "Aerobic cell culture",
      "Anaerobic culture",
      "Sample storage",
      "Microbiology"
    ],
    "features": [
      "Patented screw cap prevents liquid splashing and ensures safe centrifugation",
      "White writing area and flat cap for labelling",
      "Clear graduations for precise liquid transfer",
      "Supports both aerobic and anaerobic cultures"
    ]
  },
  {
    "id": "STBP12",
    "category": "Screw Cap Culture Tubes",
    "title": "Screw Cap Culture Tube 12mL — PP (Bag)",
    "description": "Screw cap culture tube 12mL, PP material, bag packaging. Patented cap design prevents liquid splashing. Supports aerobic and anaerobic cultures.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "STBP12"
      },
      {
        "label": "Volume",
        "value": "12mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Aerobic cell culture",
      "Anaerobic culture",
      "Sample storage",
      "Microbiology"
    ],
    "features": [
      "Patented screw cap prevents liquid splashing and ensures safe centrifugation",
      "White writing area and flat cap for labelling",
      "Clear graduations for precise liquid transfer",
      "Supports both aerobic and anaerobic cultures"
    ]
  },
  {
    "id": "STBS12",
    "category": "Screw Cap Culture Tubes",
    "title": "Screw Cap Culture Tube 12mL — PS (Bag)",
    "description": "Screw cap culture tube 12mL, PS material, bag packaging. Patented cap design prevents liquid splashing. Supports aerobic and anaerobic cultures.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "STBS12"
      },
      {
        "label": "Volume",
        "value": "12mL"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "25/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Aerobic cell culture",
      "Anaerobic culture",
      "Sample storage",
      "Microbiology"
    ],
    "features": [
      "Patented screw cap prevents liquid splashing and ensures safe centrifugation",
      "White writing area and flat cap for labelling",
      "Clear graduations for precise liquid transfer",
      "Supports both aerobic and anaerobic cultures"
    ]
  },
  {
    "id": "STFP12",
    "category": "Screw Cap Culture Tubes",
    "title": "Screw Cap Culture Tube 12mL — PP (Rack)",
    "description": "Screw cap culture tube 12mL, PP material, rack packaging. Patented cap design prevents liquid splashing. Supports aerobic and anaerobic cultures.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "STFP12"
      },
      {
        "label": "Volume",
        "value": "12mL"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50/Rack, 10 Racks/Case"
      }
    ],
    "applications": [
      "Aerobic cell culture",
      "Anaerobic culture",
      "Sample storage",
      "Microbiology"
    ],
    "features": [
      "Patented screw cap prevents liquid splashing and ensures safe centrifugation",
      "White writing area and flat cap for labelling",
      "Clear graduations for precise liquid transfer",
      "Supports both aerobic and anaerobic cultures"
    ]
  },
  {
    "id": "STFS12",
    "category": "Screw Cap Culture Tubes",
    "title": "Screw Cap Culture Tube 12mL — PS (Rack)",
    "description": "Screw cap culture tube 12mL, PS material, rack packaging. Patented cap design prevents liquid splashing. Supports aerobic and anaerobic cultures.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "STFS12"
      },
      {
        "label": "Volume",
        "value": "12mL"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "Rack"
      },
      {
        "label": "Quantity/Case",
        "value": "50/Rack, 10 Racks/Case"
      }
    ],
    "applications": [
      "Aerobic cell culture",
      "Anaerobic culture",
      "Sample storage",
      "Microbiology"
    ],
    "features": [
      "Patented screw cap prevents liquid splashing and ensures safe centrifugation",
      "White writing area and flat cap for labelling",
      "Clear graduations for precise liquid transfer",
      "Supports both aerobic and anaerobic cultures"
    ]
  },
  {
    "id": "GD00018",
    "category": "Cell Scrapers & Lifters",
    "title": "Cell Scraper 180mm",
    "description": "Cell scraper. Total length: 180mm. Blade length: 19mm. Material: PP handle + TPE blade. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "GD00018"
      },
      {
        "label": "Total Length",
        "value": "180mm"
      },
      {
        "label": "Blade Length",
        "value": "19mm"
      },
      {
        "label": "Material",
        "value": "PP handle + TPE blade"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "400 PCS/Case (100/Bag, 4 Bags)"
      }
    ],
    "applications": [
      "Cell harvesting",
      "Cell culture",
      "Adherent cell detachment"
    ],
    "features": [
      "TPE blade adjustable to fit any angle in petri dishes (scrapers)",
      "Wide blade increases efficiency",
      "DNase-free, RNase-free, No Human DNA, Endotoxin-free",
      "Individual packaging — sterile",
      "Customised packaging available"
    ]
  },
  {
    "id": "GD00025",
    "category": "Cell Scrapers & Lifters",
    "title": "Cell Scraper 250mm",
    "description": "Cell scraper. Total length: 250mm. Blade length: 19mm. Material: PP handle + TPE blade. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "GD00025"
      },
      {
        "label": "Total Length",
        "value": "250mm"
      },
      {
        "label": "Blade Length",
        "value": "19mm"
      },
      {
        "label": "Material",
        "value": "PP handle + TPE blade"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "200 PCS/Case (100/Bag, 2 Bags)"
      }
    ],
    "applications": [
      "Cell harvesting",
      "Cell culture",
      "Adherent cell detachment"
    ],
    "features": [
      "TPE blade adjustable to fit any angle in petri dishes (scrapers)",
      "Wide blade increases efficiency",
      "DNase-free, RNase-free, No Human DNA, Endotoxin-free",
      "Individual packaging — sterile",
      "Customised packaging available"
    ]
  },
  {
    "id": "GD00235",
    "category": "Cell Scrapers & Lifters",
    "title": "Cell Scraper 235mm",
    "description": "Cell scraper. Total length: 235mm. Blade length: 13mm. Material: PP handle + TPE blade. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "GD00235"
      },
      {
        "label": "Total Length",
        "value": "235mm"
      },
      {
        "label": "Blade Length",
        "value": "13mm"
      },
      {
        "label": "Material",
        "value": "PP handle + TPE blade"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "200 PCS/Case (100/Bag, 2 Bags)"
      }
    ],
    "applications": [
      "Cell harvesting",
      "Cell culture",
      "Adherent cell detachment"
    ],
    "features": [
      "TPE blade adjustable to fit any angle in petri dishes (scrapers)",
      "Wide blade increases efficiency",
      "DNase-free, RNase-free, No Human DNA, Endotoxin-free",
      "Individual packaging — sterile",
      "Customised packaging available"
    ]
  },
  {
    "id": "GD00030",
    "category": "Cell Scrapers & Lifters",
    "title": "Cell Scraper 300mm",
    "description": "Cell scraper. Total length: 300mm. Blade length: 20mm. Material: PP handle + TPE blade. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "GD00030"
      },
      {
        "label": "Total Length",
        "value": "300mm"
      },
      {
        "label": "Blade Length",
        "value": "20mm"
      },
      {
        "label": "Material",
        "value": "PP handle + TPE blade"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "200 PCS/Case (100/Bag, 2 Bags)"
      }
    ],
    "applications": [
      "Cell harvesting",
      "Cell culture",
      "Adherent cell detachment"
    ],
    "features": [
      "TPE blade adjustable to fit any angle in petri dishes (scrapers)",
      "Wide blade increases efficiency",
      "DNase-free, RNase-free, No Human DNA, Endotoxin-free",
      "Individual packaging — sterile",
      "Customised packaging available"
    ]
  },
  {
    "id": "CD00018",
    "category": "Cell Scrapers & Lifters",
    "title": "Cell Lifter 180mm — Single Blade",
    "description": "Cell lifter. Total length: 180mm. Blade length: 18.5mm. Material: PP. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CD00018"
      },
      {
        "label": "Total Length",
        "value": "180mm"
      },
      {
        "label": "Blade Length",
        "value": "18.5mm"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "400 PCS/Case (100/Bag, 4 Bags)"
      }
    ],
    "applications": [
      "Cell harvesting",
      "Cell culture",
      "Adherent cell detachment"
    ],
    "features": [
      "Clear straight PP blades avoid damage during cell lifting",
      "Wide blade increases efficiency",
      "DNase-free, RNase-free, No Human DNA, Endotoxin-free",
      "Individual packaging — sterile",
      "Customised packaging available"
    ]
  },
  {
    "id": "CD00215",
    "category": "Cell Scrapers & Lifters",
    "title": "Cell Lifter 215mm — Double Blade",
    "description": "Cell lifter. Total length: 215mm. Blade length: 23mm + 12mm. Material: PP. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CD00215"
      },
      {
        "label": "Total Length",
        "value": "215mm"
      },
      {
        "label": "Blade Length",
        "value": "23mm + 12mm"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "200 PCS/Case (100/Bag, 2 Bags)"
      }
    ],
    "applications": [
      "Cell harvesting",
      "Cell culture",
      "Adherent cell detachment"
    ],
    "features": [
      "Clear straight PP blades avoid damage during cell lifting",
      "Wide blade increases efficiency",
      "DNase-free, RNase-free, No Human DNA, Endotoxin-free",
      "Individual packaging — sterile",
      "Customised packaging available"
    ]
  },
  {
    "id": "TG00148",
    "category": "Cell Spreaders",
    "title": "Cell Spreader L-shape 148mm",
    "description": "L-shape cell spreader. Total length: 148mm. Spread width: 30mm. HIPS material. Individual packaging. Pre-sterilized.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TG00148"
      },
      {
        "label": "Total Length",
        "value": "148mm"
      },
      {
        "label": "Width for Spread",
        "value": "30mm"
      },
      {
        "label": "Shape",
        "value": "L-shape"
      },
      {
        "label": "Material",
        "value": "HIPS"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "2000 PCS/Case (100/Bag, 20 Bags)"
      }
    ],
    "applications": [
      "Bacterial plating",
      "Microbiology",
      "Cell spreading"
    ],
    "features": [
      "Extremely smooth surface",
      "Pre-sterilized, Individual packaging",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA",
      "Available in L and T shapes"
    ]
  },
  {
    "id": "TG00182",
    "category": "Cell Spreaders",
    "title": "Cell Spreader T-shape 182mm",
    "description": "T-shape cell spreader. Total length: 182mm. Spread width: 32mm. HIPS material. Individual packaging. Pre-sterilized.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "TG00182"
      },
      {
        "label": "Total Length",
        "value": "182mm"
      },
      {
        "label": "Width for Spread",
        "value": "32mm"
      },
      {
        "label": "Shape",
        "value": "T-shape"
      },
      {
        "label": "Material",
        "value": "HIPS"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "2000 PCS/Case (100/Bag, 20 Bags)"
      }
    ],
    "applications": [
      "Bacterial plating",
      "Microbiology",
      "Cell spreading"
    ],
    "features": [
      "Extremely smooth surface",
      "Pre-sterilized, Individual packaging",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA",
      "Available in L and T shapes"
    ]
  },
  {
    "id": "CZ00001",
    "category": "Inoculating Loops & Needles",
    "title": "Inoculating Needle 228mm (White)",
    "description": "Inoculating needle. Length: 228mm. Volume: Needle. Colour: White. HIPS material. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CZ00001"
      },
      {
        "label": "Total Length",
        "value": "228mm"
      },
      {
        "label": "Volume",
        "value": "Needle"
      },
      {
        "label": "Color",
        "value": "White"
      },
      {
        "label": "Material",
        "value": "HIPS"
      },
      {
        "label": "Packaging",
        "value": "Individual (10/Bag, 50 Bags/Case)"
      }
    ],
    "applications": [
      "Microbiology",
      "Bacterial inoculation",
      "Colony picking"
    ],
    "features": [
      "Special smooth surface protects cells during operation",
      "Soft handle fits different container shapes",
      "Pre-sterilized individual packaging",
      "Customised packaging available"
    ]
  },
  {
    "id": "LH20210",
    "category": "Inoculating Loops & Needles",
    "title": "Inoculating Loop 10µL 202mm (Yellow)",
    "description": "Inoculating loop. Length: 202mm. Volume: 10µL. Colour: Yellow. HIPS material. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LH20210"
      },
      {
        "label": "Total Length",
        "value": "202mm"
      },
      {
        "label": "Volume",
        "value": "10µL"
      },
      {
        "label": "Color",
        "value": "Yellow"
      },
      {
        "label": "Material",
        "value": "HIPS"
      },
      {
        "label": "Packaging",
        "value": "Individual (10/Bag, 50 Bags/Case)"
      }
    ],
    "applications": [
      "Microbiology",
      "Bacterial inoculation",
      "Colony picking"
    ],
    "features": [
      "Special smooth surface protects cells during operation",
      "Soft handle fits different container shapes",
      "Pre-sterilized individual packaging",
      "Customised packaging available"
    ]
  },
  {
    "id": "LH19901",
    "category": "Inoculating Loops & Needles",
    "title": "Inoculating Loop 1µL 199mm (Blue)",
    "description": "Inoculating loop. Length: 199mm. Volume: 1µL. Colour: Blue. HIPS material. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "LH19901"
      },
      {
        "label": "Total Length",
        "value": "199mm"
      },
      {
        "label": "Volume",
        "value": "1µL"
      },
      {
        "label": "Color",
        "value": "Blue"
      },
      {
        "label": "Material",
        "value": "HIPS"
      },
      {
        "label": "Packaging",
        "value": "Individual (10/Bag, 50 Bags/Case)"
      }
    ],
    "applications": [
      "Microbiology",
      "Bacterial inoculation",
      "Colony picking"
    ],
    "features": [
      "Special smooth surface protects cells during operation",
      "Soft handle fits different container shapes",
      "Pre-sterilized individual packaging",
      "Customised packaging available"
    ]
  },
  {
    "id": "YSPS01-1",
    "category": "Serological Pipettes",
    "title": "Serological Pipette 1mL (Yellow)",
    "description": "Serological pipette 1mL. Colour-coded Yellow. Minimum graduation 1/100mL. Optical-grade polystyrene. Accuracy ±2%. Cotton plugged. Individual wrapped.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "YSPS01-1"
      },
      {
        "label": "Volume",
        "value": "1mL"
      },
      {
        "label": "Min. Graduation",
        "value": "1/100mL"
      },
      {
        "label": "Color",
        "value": "Yellow"
      },
      {
        "label": "Accuracy",
        "value": "±2%"
      },
      {
        "label": "Packaging",
        "value": "300/Box, 6 Boxes/Case"
      }
    ],
    "applications": [
      "Cell culture",
      "Media addition",
      "Reagent dispensing",
      "Liquid transfer in life sciences"
    ],
    "features": [
      "Colour coded for easy size identification",
      "Cotton plugged for safety",
      "Individual wrapped packaging",
      "Optical-grade polystyrene (PS)",
      "Sterile, Non-Pyrogenic, DNase-free, RNase-free"
    ]
  },
  {
    "id": "YSPS02-1",
    "category": "Serological Pipettes",
    "title": "Serological Pipette 2mL (Green)",
    "description": "Serological pipette 2mL. Colour-coded Green. Minimum graduation 1/50mL. Optical-grade polystyrene. Accuracy ±2%. Cotton plugged. Individual wrapped.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "YSPS02-1"
      },
      {
        "label": "Volume",
        "value": "2mL"
      },
      {
        "label": "Min. Graduation",
        "value": "1/50mL"
      },
      {
        "label": "Color",
        "value": "Green"
      },
      {
        "label": "Accuracy",
        "value": "±2%"
      },
      {
        "label": "Packaging",
        "value": "300/Box, 6 Boxes/Case"
      }
    ],
    "applications": [
      "Cell culture",
      "Media addition",
      "Reagent dispensing",
      "Liquid transfer in life sciences"
    ],
    "features": [
      "Colour coded for easy size identification",
      "Cotton plugged for safety",
      "Individual wrapped packaging",
      "Optical-grade polystyrene (PS)",
      "Sterile, Non-Pyrogenic, DNase-free, RNase-free"
    ]
  },
  {
    "id": "YSPS05-1",
    "category": "Serological Pipettes",
    "title": "Serological Pipette 5mL (Blue)",
    "description": "Serological pipette 5mL. Colour-coded Blue. Minimum graduation 1/10mL. Optical-grade polystyrene. Accuracy ±2%. Cotton plugged. Individual wrapped.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "YSPS05-1"
      },
      {
        "label": "Volume",
        "value": "5mL"
      },
      {
        "label": "Min. Graduation",
        "value": "1/10mL"
      },
      {
        "label": "Color",
        "value": "Blue"
      },
      {
        "label": "Accuracy",
        "value": "±2%"
      },
      {
        "label": "Packaging",
        "value": "200/Box, 6 Boxes/Case"
      }
    ],
    "applications": [
      "Cell culture",
      "Media addition",
      "Reagent dispensing",
      "Liquid transfer in life sciences"
    ],
    "features": [
      "Colour coded for easy size identification",
      "Cotton plugged for safety",
      "Individual wrapped packaging",
      "Optical-grade polystyrene (PS)",
      "Sterile, Non-Pyrogenic, DNase-free, RNase-free"
    ]
  },
  {
    "id": "YSPS10-1",
    "category": "Serological Pipettes",
    "title": "Serological Pipette 10mL (Orange)",
    "description": "Serological pipette 10mL. Colour-coded Orange. Minimum graduation 1/10mL. Optical-grade polystyrene. Accuracy ±2%. Cotton plugged. Individual wrapped.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "YSPS10-1"
      },
      {
        "label": "Volume",
        "value": "10mL"
      },
      {
        "label": "Min. Graduation",
        "value": "1/10mL"
      },
      {
        "label": "Color",
        "value": "Orange"
      },
      {
        "label": "Accuracy",
        "value": "±2%"
      },
      {
        "label": "Packaging",
        "value": "200/Box, 6 Boxes/Case"
      }
    ],
    "applications": [
      "Cell culture",
      "Media addition",
      "Reagent dispensing",
      "Liquid transfer in life sciences"
    ],
    "features": [
      "Colour coded for easy size identification",
      "Cotton plugged for safety",
      "Individual wrapped packaging",
      "Optical-grade polystyrene (PS)",
      "Sterile, Non-Pyrogenic, DNase-free, RNase-free"
    ]
  },
  {
    "id": "YSPS25-1",
    "category": "Serological Pipettes",
    "title": "Serological Pipette 25mL (Red)",
    "description": "Serological pipette 25mL. Colour-coded Red. Minimum graduation 2/10mL. Optical-grade polystyrene. Accuracy ±2%. Cotton plugged. Individual wrapped.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "YSPS25-1"
      },
      {
        "label": "Volume",
        "value": "25mL"
      },
      {
        "label": "Min. Graduation",
        "value": "2/10mL"
      },
      {
        "label": "Color",
        "value": "Red"
      },
      {
        "label": "Accuracy",
        "value": "±2%"
      },
      {
        "label": "Packaging",
        "value": "100/Box, 6 Boxes/Case"
      }
    ],
    "applications": [
      "Cell culture",
      "Media addition",
      "Reagent dispensing",
      "Liquid transfer in life sciences"
    ],
    "features": [
      "Colour coded for easy size identification",
      "Cotton plugged for safety",
      "Individual wrapped packaging",
      "Optical-grade polystyrene (PS)",
      "Sterile, Non-Pyrogenic, DNase-free, RNase-free"
    ]
  },
  {
    "id": "YSPS50-1",
    "category": "Serological Pipettes",
    "title": "Serological Pipette 50mL (Purple)",
    "description": "Serological pipette 50mL. Colour-coded Purple. Minimum graduation 5/10mL. Optical-grade polystyrene. Accuracy ±2%. Cotton plugged. Individual wrapped.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "YSPS50-1"
      },
      {
        "label": "Volume",
        "value": "50mL"
      },
      {
        "label": "Min. Graduation",
        "value": "5/10mL"
      },
      {
        "label": "Color",
        "value": "Purple"
      },
      {
        "label": "Accuracy",
        "value": "±2%"
      },
      {
        "label": "Packaging",
        "value": "75/Box, 6 Boxes/Case"
      }
    ],
    "applications": [
      "Cell culture",
      "Media addition",
      "Reagent dispensing",
      "Liquid transfer in life sciences"
    ],
    "features": [
      "Colour coded for easy size identification",
      "Cotton plugged for safety",
      "Individual wrapped packaging",
      "Optical-grade polystyrene (PS)",
      "Sterile, Non-Pyrogenic, DNase-free, RNase-free"
    ]
  },
  {
    "id": "PT60001",
    "category": "Pasteur Pipettes",
    "title": "Pasteur Pipette 1mL 159mm (Individual)",
    "description": "LDPE Pasteur pipette. Volume: 1mL. Length: 159mm. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PT60001"
      },
      {
        "label": "Max Graduation",
        "value": "1mL"
      },
      {
        "label": "Length",
        "value": "159mm"
      },
      {
        "label": "Material",
        "value": "LDPE"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "2000/Case (500/Box, 4 Boxes)"
      }
    ],
    "applications": [
      "Sample transfer",
      "Liquid handling",
      "Chemistry",
      "Cell culture"
    ],
    "features": [
      "High quality LDPE",
      "Individual packaging available for sterile applications",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA"
    ]
  },
  {
    "id": "PT00001",
    "category": "Pasteur Pipettes",
    "title": "Pasteur Pipette 1mL 159mm (Bulk)",
    "description": "LDPE Pasteur pipette. Volume: 1mL. Length: 159mm. Bulk packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PT00001"
      },
      {
        "label": "Max Graduation",
        "value": "1mL"
      },
      {
        "label": "Length",
        "value": "159mm"
      },
      {
        "label": "Material",
        "value": "LDPE"
      },
      {
        "label": "Packaging",
        "value": "Bulk"
      },
      {
        "label": "Quantity/Case",
        "value": "5000/Case (500/Bag, 10 Bags)"
      }
    ],
    "applications": [
      "Sample transfer",
      "Liquid handling",
      "Chemistry",
      "Cell culture"
    ],
    "features": [
      "High quality LDPE",
      "Individual packaging available for sterile applications",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA"
    ]
  },
  {
    "id": "PT60003",
    "category": "Pasteur Pipettes",
    "title": "Pasteur Pipette 3mL 162mm (Individual)",
    "description": "LDPE Pasteur pipette. Volume: 3mL. Length: 162mm. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PT60003"
      },
      {
        "label": "Max Graduation",
        "value": "3mL"
      },
      {
        "label": "Length",
        "value": "162mm"
      },
      {
        "label": "Material",
        "value": "LDPE"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "2000/Case (500/Box, 4 Boxes)"
      }
    ],
    "applications": [
      "Sample transfer",
      "Liquid handling",
      "Chemistry",
      "Cell culture"
    ],
    "features": [
      "High quality LDPE",
      "Individual packaging available for sterile applications",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA"
    ]
  },
  {
    "id": "PT00003",
    "category": "Pasteur Pipettes",
    "title": "Pasteur Pipette 3mL 162mm (Bulk)",
    "description": "LDPE Pasteur pipette. Volume: 3mL. Length: 162mm. Bulk packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PT00003"
      },
      {
        "label": "Max Graduation",
        "value": "3mL"
      },
      {
        "label": "Length",
        "value": "162mm"
      },
      {
        "label": "Material",
        "value": "LDPE"
      },
      {
        "label": "Packaging",
        "value": "Bulk"
      },
      {
        "label": "Quantity/Case",
        "value": "5000/Case (500/Bag, 10 Bags)"
      }
    ],
    "applications": [
      "Sample transfer",
      "Liquid handling",
      "Chemistry",
      "Cell culture"
    ],
    "features": [
      "High quality LDPE",
      "Individual packaging available for sterile applications",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA"
    ]
  },
  {
    "id": "PT60033",
    "category": "Pasteur Pipettes",
    "title": "Pasteur Pipette 3mL 160mm (Individual)",
    "description": "LDPE Pasteur pipette. Volume: 3mL. Length: 160mm. Individual packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PT60033"
      },
      {
        "label": "Max Graduation",
        "value": "3mL"
      },
      {
        "label": "Length",
        "value": "160mm"
      },
      {
        "label": "Material",
        "value": "LDPE"
      },
      {
        "label": "Packaging",
        "value": "Individual"
      },
      {
        "label": "Quantity/Case",
        "value": "2000/Case (500/Box, 4 Boxes)"
      }
    ],
    "applications": [
      "Sample transfer",
      "Liquid handling",
      "Chemistry",
      "Cell culture"
    ],
    "features": [
      "High quality LDPE",
      "Individual packaging available for sterile applications",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA"
    ]
  },
  {
    "id": "PT00033",
    "category": "Pasteur Pipettes",
    "title": "Pasteur Pipette 3mL 160mm (Bulk)",
    "description": "LDPE Pasteur pipette. Volume: 3mL. Length: 160mm. Bulk packaging.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "PT00033"
      },
      {
        "label": "Max Graduation",
        "value": "3mL"
      },
      {
        "label": "Length",
        "value": "160mm"
      },
      {
        "label": "Material",
        "value": "LDPE"
      },
      {
        "label": "Packaging",
        "value": "Bulk"
      },
      {
        "label": "Quantity/Case",
        "value": "5000/Case (500/Bag, 10 Bags)"
      }
    ],
    "applications": [
      "Sample transfer",
      "Liquid handling",
      "Chemistry",
      "Cell culture"
    ],
    "features": [
      "High quality LDPE",
      "Individual packaging available for sterile applications",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA"
    ]
  },
  {
    "id": "WG60007",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 0.5mL — Separate cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 0.5mL. Cap type: Separate cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60007"
      },
      {
        "label": "Volume",
        "value": "0.5mL"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00007",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 0.5mL — Separate cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 0.5mL. Cap type: Separate cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00007"
      },
      {
        "label": "Volume",
        "value": "0.5mL"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60008",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 0.5mL self-standing — Separate cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 0.5mL self-standing. Cap type: Separate cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60008"
      },
      {
        "label": "Volume",
        "value": "0.5mL self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00008",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 0.5mL self-standing — Separate cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 0.5mL self-standing. Cap type: Separate cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00008"
      },
      {
        "label": "Volume",
        "value": "0.5mL self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60010",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 1.5mL self-standing — Separate cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 1.5mL self-standing. Cap type: Separate cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60010"
      },
      {
        "label": "Volume",
        "value": "1.5mL self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00010",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 1.5mL self-standing — Separate cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 1.5mL self-standing. Cap type: Separate cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00010"
      },
      {
        "label": "Volume",
        "value": "1.5mL self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60012",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 1.5mL self-standing — Separate cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 1.5mL self-standing. Cap type: Separate cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60012"
      },
      {
        "label": "Volume",
        "value": "1.5mL self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00012",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 1.5mL self-standing — Separate cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 1.5mL self-standing. Cap type: Separate cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00012"
      },
      {
        "label": "Volume",
        "value": "1.5mL self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60014",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 2.0mL — Separate cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 2.0mL. Cap type: Separate cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60014"
      },
      {
        "label": "Volume",
        "value": "2.0mL"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00014",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 2.0mL — Separate cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 2.0mL. Cap type: Separate cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00014"
      },
      {
        "label": "Volume",
        "value": "2.0mL"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60016",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 2.0mL self-standing — Separate cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 2.0mL self-standing. Cap type: Separate cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60016"
      },
      {
        "label": "Volume",
        "value": "2.0mL self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00016",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 2.0mL self-standing — Separate cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 2.0mL self-standing. Cap type: Separate cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00016"
      },
      {
        "label": "Volume",
        "value": "2.0mL self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60008-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 0.5mL High Cap — Separate, High Cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 0.5mL High Cap. Cap type: Separate, High Cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60008-T"
      },
      {
        "label": "Volume",
        "value": "0.5mL High Cap"
      },
      {
        "label": "Cap Type",
        "value": "Separate, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00008-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 0.5mL High Cap — Separate, High Cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 0.5mL High Cap. Cap type: Separate, High Cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00008-T"
      },
      {
        "label": "Volume",
        "value": "0.5mL High Cap"
      },
      {
        "label": "Cap Type",
        "value": "Separate, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60098-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 0.5mL High Cap Attached — Attached, High Cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 0.5mL High Cap Attached. Cap type: Attached, High Cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60098-T"
      },
      {
        "label": "Volume",
        "value": "0.5mL High Cap Attached"
      },
      {
        "label": "Cap Type",
        "value": "Attached, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00098-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 0.5mL High Cap Attached — Attached, High Cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 0.5mL High Cap Attached. Cap type: Attached, High Cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00098-T"
      },
      {
        "label": "Volume",
        "value": "0.5mL High Cap Attached"
      },
      {
        "label": "Cap Type",
        "value": "Attached, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60012-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 1.5mL High Cap — Separate, High Cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 1.5mL High Cap. Cap type: Separate, High Cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60012-T"
      },
      {
        "label": "Volume",
        "value": "1.5mL High Cap"
      },
      {
        "label": "Cap Type",
        "value": "Separate, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00012-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 1.5mL High Cap — Separate, High Cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 1.5mL High Cap. Cap type: Separate, High Cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00012-T"
      },
      {
        "label": "Volume",
        "value": "1.5mL High Cap"
      },
      {
        "label": "Cap Type",
        "value": "Separate, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60912-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 1.5mL High Cap Attached — Attached, High Cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 1.5mL High Cap Attached. Cap type: Attached, High Cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60912-T"
      },
      {
        "label": "Volume",
        "value": "1.5mL High Cap Attached"
      },
      {
        "label": "Cap Type",
        "value": "Attached, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00912-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 1.5mL High Cap Attached — Attached, High Cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 1.5mL High Cap Attached. Cap type: Attached, High Cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00912-T"
      },
      {
        "label": "Volume",
        "value": "1.5mL High Cap Attached"
      },
      {
        "label": "Cap Type",
        "value": "Attached, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60016-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 2.0mL High Cap — Separate, High Cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 2.0mL High Cap. Cap type: Separate, High Cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60016-T"
      },
      {
        "label": "Volume",
        "value": "2.0mL High Cap"
      },
      {
        "label": "Cap Type",
        "value": "Separate, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00016-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 2.0mL High Cap — Separate, High Cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 2.0mL High Cap. Cap type: Separate, High Cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00016-T"
      },
      {
        "label": "Volume",
        "value": "2.0mL High Cap"
      },
      {
        "label": "Cap Type",
        "value": "Separate, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60916-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 2.0mL High Cap Attached — Attached, High Cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 2.0mL High Cap Attached. Cap type: Attached, High Cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60916-T"
      },
      {
        "label": "Volume",
        "value": "2.0mL High Cap Attached"
      },
      {
        "label": "Cap Type",
        "value": "Attached, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG00916-T",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 2.0mL High Cap Attached — Attached, High Cap, Non-sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 2.0mL High Cap Attached. Cap type: Attached, High Cap. Sterility: Non-sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG00916-T"
      },
      {
        "label": "Volume",
        "value": "2.0mL High Cap Attached"
      },
      {
        "label": "Cap Type",
        "value": "Attached, High Cap"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "500/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60005",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 0.5mL Short Cap self-standing — Separate, Short Cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 0.5mL Short Cap self-standing. Cap type: Separate, Short Cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60005"
      },
      {
        "label": "Volume",
        "value": "0.5mL Short Cap self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate, Short Cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "WG60020",
    "category": "Screw Cap Micro Tubes",
    "title": "Screw Cap Micro Tube 2.0mL Short Cap self-standing — Separate, Short Cap, Sterile",
    "description": "Screw cap micro tube with O-ring integrated lid for leak-proof seal. Volume: 2.0mL Short Cap self-standing. Cap type: Separate, Short Cap. Sterility: Sterile. Multiple cap colours available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "WG60020"
      },
      {
        "label": "Volume",
        "value": "2.0mL Short Cap self-standing"
      },
      {
        "label": "Cap Type",
        "value": "Separate, Short Cap"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Sample storage",
      "Cryogenic storage",
      "Clinical diagnostics",
      "Biobanking"
    ],
    "features": [
      "O-ring integrated lid for positive leak-proof seal",
      "Available in multiple cap colours (Yellow, Blue, Pink, Purple, Amber — append colour code to cat. no.)",
      "RNase-free, DNase-free",
      "Amber variant available for light-sensitive samples"
    ]
  },
  {
    "id": "CT1010",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.0mL — External thread, Self-standing, conical bottom",
    "description": "Cryogenic vial with External thread. Volume: 1.0mL. Type: Self-standing, conical bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT1010"
      },
      {
        "label": "Volume",
        "value": "1.0mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, conical bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0019",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.8mL — External thread, Self-standing, round bottom",
    "description": "Cryogenic vial with External thread. Volume: 1.8mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0019"
      },
      {
        "label": "Volume",
        "value": "1.8mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0021",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.8mL — External thread, Round bottom",
    "description": "Cryogenic vial with External thread. Volume: 1.8mL. Type: Round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0021"
      },
      {
        "label": "Volume",
        "value": "1.8mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread"
      },
      {
        "label": "Tube Type",
        "value": "Round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0039",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 3.6mL — External thread, Self-standing, round bottom",
    "description": "Cryogenic vial with External thread. Volume: 3.6mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0039"
      },
      {
        "label": "Volume",
        "value": "3.6mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT6039",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 3.6mL — External thread, Round bottom",
    "description": "Cryogenic vial with External thread. Volume: 3.6mL. Type: Round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT6039"
      },
      {
        "label": "Volume",
        "value": "3.6mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread"
      },
      {
        "label": "Tube Type",
        "value": "Round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0051",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 4.5mL — External thread, Round bottom",
    "description": "Cryogenic vial with External thread. Volume: 4.5mL. Type: Round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0051"
      },
      {
        "label": "Volume",
        "value": "4.5mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread"
      },
      {
        "label": "Tube Type",
        "value": "Round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0052",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 4.5mL — External thread, Self-standing, round bottom",
    "description": "Cryogenic vial with External thread. Volume: 4.5mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0052"
      },
      {
        "label": "Volume",
        "value": "4.5mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0010",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.0mL — External thread, Self-standing, round bottom",
    "description": "Cryogenic vial with External thread-02. Volume: 1.0mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0010"
      },
      {
        "label": "Volume",
        "value": "1.0mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0018",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.8mL — External thread, Self-standing, conical bottom",
    "description": "Cryogenic vial with External thread-02. Volume: 1.8mL. Type: Self-standing, conical bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0018"
      },
      {
        "label": "Volume",
        "value": "1.8mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, conical bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0028",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 2.8mL — External thread, Self-standing, round bottom",
    "description": "Cryogenic vial with External thread-02. Volume: 2.8mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0028"
      },
      {
        "label": "Volume",
        "value": "2.8mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0036",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 3.6mL — External thread, Self-standing, round bottom",
    "description": "Cryogenic vial with External thread-02. Volume: 3.6mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0036"
      },
      {
        "label": "Volume",
        "value": "3.6mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0050",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 4.5mL — External thread, Self-standing, round bottom",
    "description": "Cryogenic vial with External thread-02. Volume: 4.5mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0050"
      },
      {
        "label": "Volume",
        "value": "4.5mL"
      },
      {
        "label": "Thread Type",
        "value": "External thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT1012",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.0mL — Internal thread, Self-standing, conical bottom",
    "description": "Cryogenic vial with Internal thread. Volume: 1.0mL. Type: Self-standing, conical bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT1012"
      },
      {
        "label": "Volume",
        "value": "1.0mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, conical bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0026",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.8mL — Internal thread, Round bottom",
    "description": "Cryogenic vial with Internal thread. Volume: 1.8mL. Type: Round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0026"
      },
      {
        "label": "Volume",
        "value": "1.8mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread"
      },
      {
        "label": "Tube Type",
        "value": "Round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0022",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.8mL — Internal thread, Round bottom",
    "description": "Cryogenic vial with Internal thread. Volume: 1.8mL. Type: Round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0022"
      },
      {
        "label": "Volume",
        "value": "1.8mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread"
      },
      {
        "label": "Tube Type",
        "value": "Round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0056",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 4.5mL — Internal thread, Round bottom",
    "description": "Cryogenic vial with Internal thread. Volume: 4.5mL. Type: Round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0056"
      },
      {
        "label": "Volume",
        "value": "4.5mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread"
      },
      {
        "label": "Tube Type",
        "value": "Round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0057",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 4.5mL — Internal thread, Self-standing, round bottom",
    "description": "Cryogenic vial with Internal thread. Volume: 4.5mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0057"
      },
      {
        "label": "Volume",
        "value": "4.5mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0012",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.0mL — Internal thread, Self-standing, round bottom",
    "description": "Cryogenic vial with Internal thread-02. Volume: 1.0mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0012"
      },
      {
        "label": "Volume",
        "value": "1.0mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0020",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 1.8mL — Internal thread, Self-standing, round bottom",
    "description": "Cryogenic vial with Internal thread-02. Volume: 1.8mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0020"
      },
      {
        "label": "Volume",
        "value": "1.8mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0030",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 2.8mL — Internal thread, Self-standing, round bottom",
    "description": "Cryogenic vial with Internal thread-02. Volume: 2.8mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0030"
      },
      {
        "label": "Volume",
        "value": "2.8mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0038",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 3.6mL — Internal thread, Self-standing, round bottom",
    "description": "Cryogenic vial with Internal thread-02. Volume: 3.6mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0038"
      },
      {
        "label": "Volume",
        "value": "3.6mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CT0055",
    "category": "Cryo Tubes",
    "title": "Cryo Tube 5.0mL — Internal thread, Self-standing, round bottom",
    "description": "Cryogenic vial with Internal thread-02. Volume: 5.0mL. Type: Self-standing, round bottom. Working temperature: -196°C to +121°C. Silicon seal-ring for leak-proof sealing.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CT0055"
      },
      {
        "label": "Volume",
        "value": "5.0mL"
      },
      {
        "label": "Thread Type",
        "value": "Internal thread-02"
      },
      {
        "label": "Tube Type",
        "value": "Self-standing, round bottom"
      },
      {
        "label": "Working Temp",
        "value": "-196°C to +121°C"
      },
      {
        "label": "Seal",
        "value": "Silicon O-ring"
      },
      {
        "label": "Packaging",
        "value": "50/Bag, 20 Bags/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage",
      "Cell line storage"
    ],
    "features": [
      "Working temperature from -196°C to +121°C",
      "Silicon seal-ring for positive leak-proof seal",
      "Available in self-standing and round bottom types",
      "DNase-free, RNase-free, Pyrogen-free",
      "Coloured cap-inserts available (add PU/YE/BL/etc. to cat. no.)"
    ]
  },
  {
    "id": "CSR2025",
    "category": "Cryo Boxes",
    "title": "Cryo Box 25-well — 1.5/2.0mL",
    "description": "Polycarbonate cryo storage box. 25 wells. For 1.5/2.0mL tubes. Dimensions: 76×76×53mm. Minimum hole diameter: 12.8mm. Working temperature down to -196°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CSR2025"
      },
      {
        "label": "Wells",
        "value": "25"
      },
      {
        "label": "For Tube Size",
        "value": "1.5/2.0mL"
      },
      {
        "label": "Dimensions",
        "value": "76×76×53mm"
      },
      {
        "label": "Min. Hole Diameter",
        "value": "12.8mm"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage"
    ],
    "features": [
      "Polycarbonate — working temperature to -196°C",
      "Individual box packaging",
      "Numbered grid for sample tracking",
      "Designed for 1.5/2.0mL tubes"
    ]
  },
  {
    "id": "CSR81",
    "category": "Cryo Boxes",
    "title": "Cryo Box 81-well — 1.5/2.0mL",
    "description": "Polycarbonate cryo storage box. 81 wells. For 1.5/2.0mL tubes. Dimensions: 133×133×51.7mm. Minimum hole diameter: 12.7mm. Working temperature down to -196°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CSR81"
      },
      {
        "label": "Wells",
        "value": "81"
      },
      {
        "label": "For Tube Size",
        "value": "1.5/2.0mL"
      },
      {
        "label": "Dimensions",
        "value": "133×133×51.7mm"
      },
      {
        "label": "Min. Hole Diameter",
        "value": "12.7mm"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage"
    ],
    "features": [
      "Polycarbonate — working temperature to -196°C",
      "Individual box packaging",
      "Numbered grid for sample tracking",
      "Designed for 1.5/2.0mL tubes"
    ]
  },
  {
    "id": "CSR0120",
    "category": "Cryo Boxes",
    "title": "Cryo Box 81-well — 1.5/1.8/2.0mL",
    "description": "Polycarbonate cryo storage box. 81 wells. For 1.5/1.8/2.0mL tubes. Dimensions: 132.4×132.4×52.8mm. Minimum hole diameter: 13.4mm. Working temperature down to -196°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CSR0120"
      },
      {
        "label": "Wells",
        "value": "81"
      },
      {
        "label": "For Tube Size",
        "value": "1.5/1.8/2.0mL"
      },
      {
        "label": "Dimensions",
        "value": "132.4×132.4×52.8mm"
      },
      {
        "label": "Min. Hole Diameter",
        "value": "13.4mm"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage"
    ],
    "features": [
      "Polycarbonate — working temperature to -196°C",
      "Individual box packaging",
      "Numbered grid for sample tracking",
      "Designed for 1.5/1.8/2.0mL tubes"
    ]
  },
  {
    "id": "CSR100",
    "category": "Cryo Boxes",
    "title": "Cryo Box 100-well — 1.5/2.0mL",
    "description": "Polycarbonate cryo storage box. 100 wells. For 1.5/2.0mL tubes. Dimensions: 133×133×52.3mm. Minimum hole diameter: 12.7mm. Working temperature down to -196°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CSR100"
      },
      {
        "label": "Wells",
        "value": "100"
      },
      {
        "label": "For Tube Size",
        "value": "1.5/2.0mL"
      },
      {
        "label": "Dimensions",
        "value": "133×133×52.3mm"
      },
      {
        "label": "Min. Hole Diameter",
        "value": "12.7mm"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage"
    ],
    "features": [
      "Polycarbonate — working temperature to -196°C",
      "Individual box packaging",
      "Numbered grid for sample tracking",
      "Designed for 1.5/2.0mL tubes"
    ]
  },
  {
    "id": "CSR0220",
    "category": "Cryo Boxes",
    "title": "Cryo Box 100-well — 1.5/1.8/2.0mL",
    "description": "Polycarbonate cryo storage box. 100 wells. For 1.5/1.8/2.0mL tubes. Dimensions: 132.4×132.4×52.8mm. Minimum hole diameter: 13mm. Working temperature down to -196°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CSR0220"
      },
      {
        "label": "Wells",
        "value": "100"
      },
      {
        "label": "For Tube Size",
        "value": "1.5/1.8/2.0mL"
      },
      {
        "label": "Dimensions",
        "value": "132.4×132.4×52.8mm"
      },
      {
        "label": "Min. Hole Diameter",
        "value": "13mm"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage"
    ],
    "features": [
      "Polycarbonate — working temperature to -196°C",
      "Individual box packaging",
      "Numbered grid for sample tracking",
      "Designed for 1.5/1.8/2.0mL tubes"
    ]
  },
  {
    "id": "CSR1030",
    "category": "Cryo Boxes",
    "title": "Cryo Box 81-well — 3.0mL",
    "description": "Polycarbonate cryo storage box. 81 wells. For 3.0mL tubes. Dimensions: 133×133×66.5mm. Minimum hole diameter: 12.7mm. Working temperature down to -196°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CSR1030"
      },
      {
        "label": "Wells",
        "value": "81"
      },
      {
        "label": "For Tube Size",
        "value": "3.0mL"
      },
      {
        "label": "Dimensions",
        "value": "133×133×66.5mm"
      },
      {
        "label": "Min. Hole Diameter",
        "value": "12.7mm"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage"
    ],
    "features": [
      "Polycarbonate — working temperature to -196°C",
      "Individual box packaging",
      "Numbered grid for sample tracking",
      "Designed for 3.0mL tubes"
    ]
  },
  {
    "id": "CSR1040",
    "category": "Cryo Boxes",
    "title": "Cryo Box 81-well — 4.0mL",
    "description": "Polycarbonate cryo storage box. 81 wells. For 4.0mL tubes. Dimensions: 133×133×78mm. Minimum hole diameter: 12.7mm. Working temperature down to -196°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CSR1040"
      },
      {
        "label": "Wells",
        "value": "81"
      },
      {
        "label": "For Tube Size",
        "value": "4.0mL"
      },
      {
        "label": "Dimensions",
        "value": "133×133×78mm"
      },
      {
        "label": "Min. Hole Diameter",
        "value": "12.7mm"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage"
    ],
    "features": [
      "Polycarbonate — working temperature to -196°C",
      "Individual box packaging",
      "Numbered grid for sample tracking",
      "Designed for 4.0mL tubes"
    ]
  },
  {
    "id": "CSR8150",
    "category": "Cryo Boxes",
    "title": "Cryo Box 25-well — 5.0mL microcentrifuge tube (MCTB050 only)",
    "description": "Polycarbonate cryo storage box. 25 wells. For 5.0mL microcentrifuge tube (MCTB050 only) tubes. Dimensions: 132×132×70mm. Minimum hole diameter: 17mm. Working temperature down to -196°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CSR8150"
      },
      {
        "label": "Wells",
        "value": "25"
      },
      {
        "label": "For Tube Size",
        "value": "5.0mL microcentrifuge tube (MCTB050 only)"
      },
      {
        "label": "Dimensions",
        "value": "132×132×70mm"
      },
      {
        "label": "Min. Hole Diameter",
        "value": "17mm"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage"
    ],
    "features": [
      "Polycarbonate — working temperature to -196°C",
      "Individual box packaging",
      "Numbered grid for sample tracking",
      "Designed for 5.0mL microcentrifuge tube (MCTB050 only) tubes"
    ]
  },
  {
    "id": "CSR1050",
    "category": "Cryo Boxes",
    "title": "Cryo Box 81-well — 5.0mL",
    "description": "Polycarbonate cryo storage box. 81 wells. For 5.0mL tubes. Dimensions: 133×133×95mm. Minimum hole diameter: 12.7mm. Working temperature down to -196°C.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CSR1050"
      },
      {
        "label": "Wells",
        "value": "81"
      },
      {
        "label": "For Tube Size",
        "value": "5.0mL"
      },
      {
        "label": "Dimensions",
        "value": "133×133×95mm"
      },
      {
        "label": "Min. Hole Diameter",
        "value": "12.7mm"
      },
      {
        "label": "Material",
        "value": "PC"
      },
      {
        "label": "Packaging",
        "value": "50 PCS/Case"
      }
    ],
    "applications": [
      "Cryopreservation",
      "Biobanking",
      "Long-term sample storage"
    ],
    "features": [
      "Polycarbonate — working temperature to -196°C",
      "Individual box packaging",
      "Numbered grid for sample tracking",
      "Designed for 5.0mL tubes"
    ]
  },
  {
    "id": "RC00025",
    "category": "Reagent Reservoirs",
    "title": "Disposable Reagent Reservoir 25mL — Single channel",
    "description": "Disposable reagent reservoir, 25mL, Single channel. PS material. Individually packaged.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC00025"
      },
      {
        "label": "Volume",
        "value": "25mL"
      },
      {
        "label": "Channels",
        "value": "Single channel"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Multi-channel pipetting",
      "Reagent dispensing",
      "ELISA preparation"
    ],
    "features": [
      "Individually packaged for cleanliness",
      "Compatible with multi-channel pipettes and workstations"
    ]
  },
  {
    "id": "RC08005",
    "category": "Reagent Reservoirs",
    "title": "Disposable Reagent Reservoir ~7mL — 8-channel",
    "description": "Disposable reagent reservoir, ~7mL, 8-channel. PS material. Individually packaged.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC08005"
      },
      {
        "label": "Volume",
        "value": "~7mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "1/Bag, 100 Bags/Case"
      }
    ],
    "applications": [
      "Multi-channel pipetting",
      "Reagent dispensing",
      "ELISA preparation"
    ],
    "features": [
      "Individually packaged for cleanliness",
      "Compatible with multi-channel pipettes and workstations"
    ]
  },
  {
    "id": "RC12005",
    "category": "Reagent Reservoirs",
    "title": "Disposable Reagent Reservoir ~5mL — 12-channel",
    "description": "Disposable reagent reservoir, ~5mL, 12-channel. PS material. Individually packaged.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC12005"
      },
      {
        "label": "Volume",
        "value": "~5mL"
      },
      {
        "label": "Channels",
        "value": "12-channel"
      },
      {
        "label": "Material",
        "value": "PS"
      },
      {
        "label": "Packaging",
        "value": "1/Bag, 100 Bags/Case"
      }
    ],
    "applications": [
      "Multi-channel pipetting",
      "Reagent dispensing",
      "ELISA preparation"
    ],
    "features": [
      "Individually packaged for cleanliness",
      "Compatible with multi-channel pipettes and workstations"
    ]
  },
  {
    "id": "RC90001",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 100mL — Single, Low profile",
    "description": "Automation-compatible reagent reservoir. 100mL, Single, Low profile, flat bottom, Axygen style, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90001"
      },
      {
        "label": "Volume",
        "value": "100mL"
      },
      {
        "label": "Channels",
        "value": "Single"
      },
      {
        "label": "Type",
        "value": "Low profile, flat bottom, Axygen style, Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "1/Bag, 108 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90002",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 60mL — Single, Medium profile",
    "description": "Automation-compatible reagent reservoir. 60mL, Single, Medium profile, Hamilton 53646-01 compatible. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90002"
      },
      {
        "label": "Volume",
        "value": "60mL"
      },
      {
        "label": "Channels",
        "value": "Single"
      },
      {
        "label": "Type",
        "value": "Medium profile, Hamilton 53646-01 compatible"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "1/Bag, 28 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90003",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 60mL — Single, Black",
    "description": "Automation-compatible reagent reservoir. 60mL, Single, Black, Medium profile, Hamilton 56694-02 compatible. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90003"
      },
      {
        "label": "Volume",
        "value": "60mL"
      },
      {
        "label": "Channels",
        "value": "Single"
      },
      {
        "label": "Type",
        "value": "Black, Medium profile, Hamilton 56694-02 compatible"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "1/Bag, 28 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90004",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 60mL — Single, Medium profile",
    "description": "Automation-compatible reagent reservoir. 60mL, Single, Medium profile, Axygen, low retention. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90004"
      },
      {
        "label": "Volume",
        "value": "60mL"
      },
      {
        "label": "Channels",
        "value": "Single"
      },
      {
        "label": "Type",
        "value": "Medium profile, Axygen, low retention"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "1/Bag, 28 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90005",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 60mL — Single, Black",
    "description": "Automation-compatible reagent reservoir. 60mL, Single, Black, low retention. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90005"
      },
      {
        "label": "Volume",
        "value": "60mL"
      },
      {
        "label": "Channels",
        "value": "Single"
      },
      {
        "label": "Type",
        "value": "Black, low retention"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "1/Bag, 28 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90014",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 100mL — Single, High profile",
    "description": "Automation-compatible reagent reservoir. 100mL, Single, High profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90014"
      },
      {
        "label": "Volume",
        "value": "100mL"
      },
      {
        "label": "Channels",
        "value": "Single"
      },
      {
        "label": "Type",
        "value": "High profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90034",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 100mL — Single, High profile",
    "description": "Automation-compatible reagent reservoir. 100mL, Single, High profile, conical, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90034"
      },
      {
        "label": "Volume",
        "value": "100mL"
      },
      {
        "label": "Channels",
        "value": "Single"
      },
      {
        "label": "Type",
        "value": "High profile, conical, Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90021",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 190mL — Single, Medium profile",
    "description": "Automation-compatible reagent reservoir. 190mL, Single, Medium profile, flat bottom. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90021"
      },
      {
        "label": "Volume",
        "value": "190mL"
      },
      {
        "label": "Channels",
        "value": "Single"
      },
      {
        "label": "Type",
        "value": "Medium profile, flat bottom"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90041",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 190mL — Single, Medium profile",
    "description": "Automation-compatible reagent reservoir. 190mL, Single, Medium profile, flat bottom, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90041"
      },
      {
        "label": "Volume",
        "value": "190mL"
      },
      {
        "label": "Channels",
        "value": "Single"
      },
      {
        "label": "Type",
        "value": "Medium profile, flat bottom, Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90022",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 47mL — 4-channel, High profile",
    "description": "Automation-compatible reagent reservoir. 47mL, 4-channel, High profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90022"
      },
      {
        "label": "Volume",
        "value": "47mL"
      },
      {
        "label": "Channels",
        "value": "4-channel"
      },
      {
        "label": "Type",
        "value": "High profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90042",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 47mL — 4-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 47mL, 4-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90042"
      },
      {
        "label": "Volume",
        "value": "47mL"
      },
      {
        "label": "Channels",
        "value": "4-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90013",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 75mL — 8-channel, Low profile",
    "description": "Automation-compatible reagent reservoir. 75mL, 8-channel, Low profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90013"
      },
      {
        "label": "Volume",
        "value": "75mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "Low profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90033",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 75mL — 8-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 75mL, 8-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90033"
      },
      {
        "label": "Volume",
        "value": "75mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90017",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 12mL — 8-channel, Low profile",
    "description": "Automation-compatible reagent reservoir. 12mL, 8-channel, Low profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90017"
      },
      {
        "label": "Volume",
        "value": "12mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "Low profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90037",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 12mL — 8-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 12mL, 8-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90037"
      },
      {
        "label": "Volume",
        "value": "12mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90023",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 22mL — 8-channel, Medium profile",
    "description": "Automation-compatible reagent reservoir. 22mL, 8-channel, Medium profile, conical. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90023"
      },
      {
        "label": "Volume",
        "value": "22mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "Medium profile, conical"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90043",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 22mL — 8-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 22mL, 8-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90043"
      },
      {
        "label": "Volume",
        "value": "22mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90012",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 32mL — 8-channel, High profile",
    "description": "Automation-compatible reagent reservoir. 32mL, 8-channel, High profile, conical. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90012"
      },
      {
        "label": "Volume",
        "value": "32mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "High profile, conical"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90032",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 32mL — 8-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 32mL, 8-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90032"
      },
      {
        "label": "Volume",
        "value": "32mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90006",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 290mL — 8-channel, High profile",
    "description": "Automation-compatible reagent reservoir. 290mL, 8-channel, High profile, no partitions. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90006"
      },
      {
        "label": "Volume",
        "value": "290mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "High profile, no partitions"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90027",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 290mL — 8-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 290mL, 8-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90027"
      },
      {
        "label": "Volume",
        "value": "290mL"
      },
      {
        "label": "Channels",
        "value": "8-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90018",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 8mL — 12-channel, Low profile",
    "description": "Automation-compatible reagent reservoir. 8mL, 12-channel, Low profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90018"
      },
      {
        "label": "Volume",
        "value": "8mL"
      },
      {
        "label": "Channels",
        "value": "12-channel"
      },
      {
        "label": "Type",
        "value": "Low profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90038",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 8mL — 12-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 8mL, 12-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90038"
      },
      {
        "label": "Volume",
        "value": "8mL"
      },
      {
        "label": "Channels",
        "value": "12-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90024",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 15mL — 12-channel, Low profile",
    "description": "Automation-compatible reagent reservoir. 15mL, 12-channel, Low profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90024"
      },
      {
        "label": "Volume",
        "value": "15mL"
      },
      {
        "label": "Channels",
        "value": "12-channel"
      },
      {
        "label": "Type",
        "value": "Low profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90044",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 15mL — 12-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 15mL, 12-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90044"
      },
      {
        "label": "Volume",
        "value": "15mL"
      },
      {
        "label": "Channels",
        "value": "12-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90007",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 22mL — 12-channel, High profile",
    "description": "Automation-compatible reagent reservoir. 22mL, 12-channel, High profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90007"
      },
      {
        "label": "Volume",
        "value": "22mL"
      },
      {
        "label": "Channels",
        "value": "12-channel"
      },
      {
        "label": "Type",
        "value": "High profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90028",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 22mL — 12-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 22mL, 12-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90028"
      },
      {
        "label": "Volume",
        "value": "22mL"
      },
      {
        "label": "Channels",
        "value": "12-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90009",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 290mL — 12-channel, High profile",
    "description": "Automation-compatible reagent reservoir. 290mL, 12-channel, High profile, no partitions. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90009"
      },
      {
        "label": "Volume",
        "value": "290mL"
      },
      {
        "label": "Channels",
        "value": "12-channel"
      },
      {
        "label": "Type",
        "value": "High profile, no partitions"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90029",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 290mL — 12-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 290mL, 12-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90029"
      },
      {
        "label": "Volume",
        "value": "290mL"
      },
      {
        "label": "Channels",
        "value": "12-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90019",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 5mL — 16-channel, Low profile",
    "description": "Automation-compatible reagent reservoir. 5mL, 16-channel, Low profile, conical. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90019"
      },
      {
        "label": "Volume",
        "value": "5mL"
      },
      {
        "label": "Channels",
        "value": "16-channel"
      },
      {
        "label": "Type",
        "value": "Low profile, conical"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90039",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 5mL — 16-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 5mL, 16-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90039"
      },
      {
        "label": "Volume",
        "value": "5mL"
      },
      {
        "label": "Channels",
        "value": "16-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90020",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 3mL — 24-channel, Low profile",
    "description": "Automation-compatible reagent reservoir. 3mL, 24-channel, Low profile, conical. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90020"
      },
      {
        "label": "Volume",
        "value": "3mL"
      },
      {
        "label": "Channels",
        "value": "24-channel"
      },
      {
        "label": "Type",
        "value": "Low profile, conical"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90040",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 3mL — 24-channel, Sterile",
    "description": "Automation-compatible reagent reservoir. 3mL, 24-channel, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90040"
      },
      {
        "label": "Volume",
        "value": "3mL"
      },
      {
        "label": "Channels",
        "value": "24-channel"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90015",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 100mL — 96-well, Low profile",
    "description": "Automation-compatible reagent reservoir. 100mL, 96-well, Low profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90015"
      },
      {
        "label": "Volume",
        "value": "100mL"
      },
      {
        "label": "Channels",
        "value": "96-well"
      },
      {
        "label": "Type",
        "value": "Low profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90035",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 100mL — 96-well, Sterile",
    "description": "Automation-compatible reagent reservoir. 100mL, 96-well, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90035"
      },
      {
        "label": "Volume",
        "value": "100mL"
      },
      {
        "label": "Channels",
        "value": "96-well"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90025",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 195mL — 96-well, Medium profile",
    "description": "Automation-compatible reagent reservoir. 195mL, 96-well, Medium profile, conical. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90025"
      },
      {
        "label": "Volume",
        "value": "195mL"
      },
      {
        "label": "Channels",
        "value": "96-well"
      },
      {
        "label": "Type",
        "value": "Medium profile, conical"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90045",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 195mL — 96-well, Sterile",
    "description": "Automation-compatible reagent reservoir. 195mL, 96-well, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90045"
      },
      {
        "label": "Volume",
        "value": "195mL"
      },
      {
        "label": "Channels",
        "value": "96-well"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90010",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 290mL — 96-well, High profile",
    "description": "Automation-compatible reagent reservoir. 290mL, 96-well, High profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90010"
      },
      {
        "label": "Volume",
        "value": "290mL"
      },
      {
        "label": "Channels",
        "value": "96-well"
      },
      {
        "label": "Type",
        "value": "High profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90030",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 290mL — 96-well, Sterile",
    "description": "Automation-compatible reagent reservoir. 290mL, 96-well, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90030"
      },
      {
        "label": "Volume",
        "value": "290mL"
      },
      {
        "label": "Channels",
        "value": "96-well"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90016",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 100mL — 384-well, Low profile",
    "description": "Automation-compatible reagent reservoir. 100mL, 384-well, Low profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90016"
      },
      {
        "label": "Volume",
        "value": "100mL"
      },
      {
        "label": "Channels",
        "value": "384-well"
      },
      {
        "label": "Type",
        "value": "Low profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90036",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 100mL — 384-well, Sterile",
    "description": "Automation-compatible reagent reservoir. 100mL, 384-well, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90036"
      },
      {
        "label": "Volume",
        "value": "100mL"
      },
      {
        "label": "Channels",
        "value": "384-well"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "10/Bag, 5 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90026",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 185mL — 384-well, Medium profile",
    "description": "Automation-compatible reagent reservoir. 185mL, 384-well, Medium profile, conical. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90026"
      },
      {
        "label": "Volume",
        "value": "185mL"
      },
      {
        "label": "Channels",
        "value": "384-well"
      },
      {
        "label": "Type",
        "value": "Medium profile, conical"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90046",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 185mL — 384-well, Sterile",
    "description": "Automation-compatible reagent reservoir. 185mL, 384-well, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90046"
      },
      {
        "label": "Volume",
        "value": "185mL"
      },
      {
        "label": "Channels",
        "value": "384-well"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90011",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 290mL — 384-well, High profile",
    "description": "Automation-compatible reagent reservoir. 290mL, 384-well, High profile, conical, Axygen. PP material. Non-sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90011"
      },
      {
        "label": "Volume",
        "value": "290mL"
      },
      {
        "label": "Channels",
        "value": "384-well"
      },
      {
        "label": "Type",
        "value": "High profile, conical, Axygen"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Non-sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Non-sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "RC90031",
    "category": "Reagent Reservoirs",
    "title": "Automation Reservoir 290mL — 384-well, Sterile",
    "description": "Automation-compatible reagent reservoir. 290mL, 384-well, Sterile. PP material. Sterile.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "RC90031"
      },
      {
        "label": "Volume",
        "value": "290mL"
      },
      {
        "label": "Channels",
        "value": "384-well"
      },
      {
        "label": "Type",
        "value": "Sterile"
      },
      {
        "label": "Material",
        "value": "PP"
      },
      {
        "label": "Sterility",
        "value": "Sterile"
      },
      {
        "label": "Packaging",
        "value": "5/Bag, 10 Bags/Case"
      }
    ],
    "applications": [
      "Automated liquid handling",
      "Multi-channel pipetting",
      "High-throughput dispensing",
      "ELISA plate preparation"
    ],
    "features": [
      "Works with multi-channel pipettes and liquid handling workstations",
      "Individually packaged for cleanliness and easy use",
      "Sterility: Sterile",
      "PP material for chemical compatibility"
    ]
  },
  {
    "id": "CS40004",
    "category": "Spin Columns",
    "title": "Spin Column — 4 Levels",
    "description": "Spin column with 4-level silicon filter. Includes collection tubes. Produced in class 100,000 clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CS40004"
      },
      {
        "label": "Filter",
        "value": "Silicon"
      },
      {
        "label": "Levels",
        "value": "4"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case (100/Bag)"
      }
    ],
    "applications": [
      "DNA purification",
      "RNA extraction",
      "Protein purification",
      "Sample clean-up"
    ],
    "features": [
      "Produced in class 100,000 clean room",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA",
      "Catalog number includes spin columns and collection tubes together",
      "Silicon filter membrane"
    ]
  },
  {
    "id": "CS60006",
    "category": "Spin Columns",
    "title": "Spin Column — 6 Levels",
    "description": "Spin column with 6-level silicon filter. Includes collection tubes. Produced in class 100,000 clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CS60006"
      },
      {
        "label": "Filter",
        "value": "Silicon"
      },
      {
        "label": "Levels",
        "value": "6"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case (100/Bag)"
      }
    ],
    "applications": [
      "DNA purification",
      "RNA extraction",
      "Protein purification",
      "Sample clean-up"
    ],
    "features": [
      "Produced in class 100,000 clean room",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA",
      "Catalog number includes spin columns and collection tubes together",
      "Silicon filter membrane"
    ]
  },
  {
    "id": "CS80008",
    "category": "Spin Columns",
    "title": "Spin Column — 8 Levels",
    "description": "Spin column with 8-level silicon filter. Includes collection tubes. Produced in class 100,000 clean room.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "CS80008"
      },
      {
        "label": "Filter",
        "value": "Silicon"
      },
      {
        "label": "Levels",
        "value": "8"
      },
      {
        "label": "Packaging",
        "value": "100 PCS/Bag"
      },
      {
        "label": "Quantity/Case",
        "value": "10 Bags/Case (100/Bag)"
      }
    ],
    "applications": [
      "DNA purification",
      "RNA extraction",
      "Protein purification",
      "Sample clean-up"
    ],
    "features": [
      "Produced in class 100,000 clean room",
      "DNase-free, RNase-free, Endotoxin-free, No Human DNA",
      "Catalog number includes spin columns and collection tubes together",
      "Silicon filter membrane"
    ]
  },
  {
    "id": "GSC-10K",
    "category": "Laboratory Equipment",
    "title": "Mini Microcentrifuge (GSC-10K)",
    "description": "Portable mini microcentrifuge with adjustable speed up to 10,000 rpm. Composite rotor for 6×0.5/1.5/2.0mL and 2×8×0.2mL PCR strip tubes.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "GSC-10K"
      },
      {
        "label": "Max Speed",
        "value": "10,000 rpm"
      },
      {
        "label": "Rotor",
        "value": "6×0.5/1.5/2.0mL + 2×8×0.2mL PCR strip"
      },
      {
        "label": "Structure",
        "value": "Portable"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "Quick spin-down",
      "PCR preparation",
      "General centrifugation",
      "DNA/RNA pelleting"
    ],
    "features": [
      "Adjustable speed up to 10,000 rpm",
      "Humanised preset timing: 3s, 10s, 30s",
      "Electromagnetic switch — close lid to start, open to stop",
      "Safety buffer when lid opens over 6,000 rpm",
      "Compact and lightweight",
      "Composite rotor for multiple tube formats"
    ]
  },
  {
    "id": "GMB-1520",
    "category": "Laboratory Equipment",
    "title": "Dual Block Dry Bath Incubator (GMB-1520)",
    "description": "Digital dual-block dry bath incubator with broad temperature range up to 150°C and patented anti-scald design. Accepts 0.2/1.5/2.0/5.0mL tubes.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "GMB-1520"
      },
      {
        "label": "Temperature Range",
        "value": "Up to 150°C"
      },
      {
        "label": "Capacity",
        "value": "0.2/1.5/2.0/5.0mL tubes"
      },
      {
        "label": "Structure",
        "value": "Desktop"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "Enzyme reactions",
      "Hybridization",
      "Sample denaturation",
      "Protein digestion",
      "DNA extraction"
    ],
    "features": [
      "Patented anti-scald design — panel and body stay below 50°C even when block reaches 150°C",
      "Heats to target within 15 minutes",
      "Digital touchable keyboard and full screen",
      "3-step programmable preset programs",
      "Dual block accepts multiple tube sizes"
    ]
  },
  {
    "id": "C-MP2",
    "category": "Laboratory Equipment",
    "title": "Microplate Centrifuge (C-MP2)",
    "description": "Instantaneous microplate centrifuge designed for PCR plates. Dual-position vertical rotor for 96-well, 384-well, skirted and non-skirted plates. Max 3,000 rpm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "C-MP2"
      },
      {
        "label": "Max Speed",
        "value": "3,000 rpm"
      },
      {
        "label": "Capacity",
        "value": "2 PCR plates"
      },
      {
        "label": "Structure",
        "value": "Desktop"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "PCR plate spin-down",
      "Microplate centrifugation",
      "Liquid collection to bottom of wells"
    ],
    "features": [
      "Accepts skirted, non-skirted and all standard PCR plates",
      "Hot key 'Short' for quick convenient spinning",
      "LED touchable screen",
      "Adjustable speed"
    ]
  },
  {
    "id": "MI-42D",
    "category": "Laboratory Equipment",
    "title": "Mini Vortex Mixer (MI-42D)",
    "description": "Portable mini vortex mixer for oscillating and blending of samples up to 50mL centrifuge tube. Push tube to start. Maximum speed 4,500 rpm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MI-42D"
      },
      {
        "label": "Max Speed",
        "value": "4,500 rpm"
      },
      {
        "label": "Capacity",
        "value": "Max 50mL tube"
      },
      {
        "label": "Structure",
        "value": "Portable"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "Sample mixing",
      "Reagent blending",
      "Vortexing in field or clinical setting"
    ],
    "features": [
      "Push tube into attachment to start — stops when tube is lifted",
      "Small size, compact and lightweight",
      "Pulse mode (inching) and continuous mode",
      "Adjustable speed",
      "Supports car cigarette lighter power supply"
    ]
  },
  {
    "id": "MI-45",
    "category": "Laboratory Equipment",
    "title": "Mini Vortex Mixer (MI-45)",
    "description": "Portable mini vortex mixer. Maximum speed 4,500 rpm. Accepts up to 50mL centrifuge tube. Pulse and continuous modes.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MI-45"
      },
      {
        "label": "Max Speed",
        "value": "4,500 rpm"
      },
      {
        "label": "Capacity",
        "value": "Max 50mL tube"
      },
      {
        "label": "Structure",
        "value": "Portable"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "Sample mixing",
      "Reagent blending"
    ],
    "features": [
      "Compact and lightweight",
      "Pulse and continuous mode",
      "Adjustable speed up to 4,500 rpm"
    ]
  },
  {
    "id": "MM-5015",
    "category": "Laboratory Equipment",
    "title": "Multi-tube Vortex Mixer (MM-5015)",
    "description": "Desktop multi-tube vortex mixer mixing up to 50 samples simultaneously. Speed range 500–2,500 rpm. Built-in timing. Multiple foam racks available.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MM-5015"
      },
      {
        "label": "Speed Range",
        "value": "500–2,500 rpm"
      },
      {
        "label": "Max Samples",
        "value": "50 simultaneously"
      },
      {
        "label": "Structure",
        "value": "Desktop"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "Biotechnology sample preparation",
      "Microbiology",
      "Medical analysis",
      "Batch vortexing"
    ],
    "features": [
      "Mixes up to 50 samples simultaneously",
      "Built-in timing function (00:00–99:59h)",
      "Pulse and continuous modes",
      "Adjustable speed 500–2,500 rpm",
      "Interchangeable foam tube racks and pads"
    ]
  },
  {
    "id": "MM-V5016",
    "category": "Laboratory Equipment",
    "title": "Vertical Rotating Mixer (MM-V5016)",
    "description": "Desktop vertical rotating mixer with 360° circulation rotation. Color LCD full-touch screen. Accepts 15mL and 50mL tube frames. Up to 5 sequential programs.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "MM-V5016"
      },
      {
        "label": "Rotation",
        "value": "360° vertical circulation"
      },
      {
        "label": "Capacity",
        "value": "15mL and 50mL tubes"
      },
      {
        "label": "Structure",
        "value": "Desktop"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "Blood mixing",
      "Bead-based assays",
      "Immunoprecipitation",
      "Latex diagnosis",
      "Preventing blood clots"
    ],
    "features": [
      "360° vertical circulation rotation for gentle mixing",
      "Color LCD full-touch operation",
      "Up to 5 sequential programs",
      "Adjustable speed",
      "Multiple tube holder frames available (16×50mL, 16×15mL etc.)"
    ]
  },
  {
    "id": "DC-MO1",
    "category": "Laboratory Equipment",
    "title": "Mobile Thermostatic Box (DC-MO1)",
    "description": "Portable mobile thermostatic box (MOBOX) with optional lithium-ion battery. Temperature control range 0–70°C with ±0.1°C stability. Multiple function modes.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "DC-MO1"
      },
      {
        "label": "Temperature Range",
        "value": "0–70°C"
      },
      {
        "label": "Stability",
        "value": "±0.1°C"
      },
      {
        "label": "Accuracy",
        "value": "±0.3°C"
      },
      {
        "label": "Structure",
        "value": "Portable"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "On-site sample incubation",
      "Sample transfer with temperature control",
      "Cell dissection",
      "Constant temperature reaction",
      "Ice box replacement"
    ],
    "features": [
      "Temperature control stability ±0.1°C",
      "Optional lithium-ion battery — 4–5h at 25°C",
      "Supports on-board/car power supply",
      "Modular free-combination design",
      "Functions as ice box, incubation platform, dissection table, and heating reactor"
    ]
  },
  {
    "id": "UV-C108",
    "category": "Laboratory Equipment",
    "title": "Blu-ray Gel Cutting Apparatus (UV-C108)",
    "description": "Lightweight LED blue light gel cutting apparatus. Replacement for traditional UV transmission instruments. Adjustable brightness. Max gel size 100×150mm.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "UV-C108"
      },
      {
        "label": "Max Gel Size",
        "value": "100×150mm"
      },
      {
        "label": "Light Source",
        "value": "LED blue light"
      },
      {
        "label": "Structure",
        "value": "Desktop"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "Gel imaging",
      "Nucleic acid band excision",
      "Agarose gel electrophoresis",
      "DNA fragment recovery"
    ],
    "features": [
      "LED blue light — protects DNA from UV damage",
      "Adjustable brightness knob",
      "Optical grade shortwave cut-off filter for clean gel background",
      "Wear-resistant scratch-resistant bottom plate",
      "Compact and lightweight design"
    ]
  },
  {
    "id": "M20",
    "category": "Laboratory Equipment",
    "title": "Liquid Handling Workstation — M20 (0.5–20µL)",
    "description": "High-throughput manual liquid handling workstation for 96-well and 384-well plates. Volume range 0.5–20µL. Completes 96-well plate pipetting in under 6 seconds.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "M20"
      },
      {
        "label": "Volume Range",
        "value": "0.5–20µL"
      },
      {
        "label": "Structure",
        "value": "Desktop"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "Template copying",
      "96-well to 96-well transfer",
      "96-well to 384-well transfer",
      "Orifice cleaning",
      "Dilution",
      "ELISA/EIA"
    ],
    "features": [
      "96-well plate pipetting in less than 6 seconds",
      "4 steps for 384-well plate in 2 passes within 1 minute",
      "No programming, no plug-in, no training required",
      "Eliminates well-to-well difference",
      "Improves reproducibility plate-to-plate",
      "Never skips or repeats pipetting"
    ]
  },
  {
    "id": "M200",
    "category": "Laboratory Equipment",
    "title": "Liquid Handling Workstation — M200 (5–200µL)",
    "description": "High-throughput manual liquid handling workstation for 96-well and 384-well plates. Volume range 5–200µL.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "M200"
      },
      {
        "label": "Volume Range",
        "value": "5–200µL"
      },
      {
        "label": "Structure",
        "value": "Desktop"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "Template copying",
      "96-well plate transfer",
      "384-well plate pipetting",
      "Dilution",
      "ELISA/EIA"
    ],
    "features": [
      "Ultra-fast pipetting without programming or training",
      "Eliminates pipetting errors",
      "Improves reproducibility"
    ]
  },
  {
    "id": "HS-001",
    "category": "Laboratory Equipment",
    "title": "Semi Automated Plate Heat Sealer (HS-001)",
    "description": "Semi-automated plate heat sealer for PCR plates, deep-well plates, ELISA plates and cell culture plates. Max temperature 200°C. 4.3-inch colour touchscreen.",
    "specs": [
      {
        "label": "Cat. No.",
        "value": "HS-001"
      },
      {
        "label": "Max Temperature",
        "value": "200°C"
      },
      {
        "label": "Screen",
        "value": "4.3-inch colour touchscreen"
      },
      {
        "label": "Heating Time",
        "value": "<5 minutes to 200°C"
      },
      {
        "label": "Temperature Control",
        "value": "±1°C"
      },
      {
        "label": "Structure",
        "value": "Desktop"
      },
      {
        "label": "MOQ",
        "value": "1 PC"
      }
    ],
    "applications": [
      "PCR plate sealing",
      "Deep-well plate sealing",
      "ELISA plate sealing",
      "Cell culture plate sealing"
    ],
    "features": [
      "Anti-scald safety — body surface stays below 50°C when sealing at 200°C",
      "Reaches 200°C in under 5 minutes with ±1°C precision",
      "4.3-inch touchscreen with programmable settings",
      "Automatic sealing counter tracks total seals",
      "Adjustable pressure and temperature for various plates and films",
      "Smart energy saving — auto standby and deep sleep modes"
    ]
  }
];

interface ProductCatalogProps {
  initialTab?: string;
  showSeries?: string[];
}

export default function ProductCatalog({ initialTab = 'pcr-plates', showSeries }: ProductCatalogProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // Group products by category
  const categories = PRODUCT_CATEGORIES.reduce((acc, product) => {
    const categoryKey = product.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (!acc[categoryKey]) {
      acc[categoryKey] = {
        id: categoryKey,
        title: product.category,
        description: `Products in ${product.category} category`,
        color: '#4f46e5', // Default color
        products: []
      };
    }
    acc[categoryKey].products.push(product);
    return acc;
  }, {} as Record<string, { id: string; title: string; description: string; color: string; products: Product[] }>);

  const categoriesToShow = showSeries && showSeries.length > 0 
    ? Object.values(categories).filter(cat => showSeries.includes(cat.id))
    : Object.values(categories).filter(cat => !['molecular', 'immunoassay', 'sealing'].includes(cat.id));
  
  const activeCategory = categoriesToShow.find(cat => cat.id === activeTab);

  const handleRequestQuote = (product: Product) => {
    setSelectedProduct(product);
    setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    setSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Quote request for:', selectedProduct?.title);
      console.log('Form data:', formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleCloseModal();
      }, 2000);
    } catch (error) {
      console.error('Error submitting quote request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '60px 40px', background: '#f8f9fc' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: '12px' }}>
          Complete Product Catalog
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '48px', maxWidth: '800px', margin: '0 auto' }}>
          Browse our comprehensive range of laboratory consumables. Click "Request Quote" on any product to get started.
        </p>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'nowrap', justifyContent: 'center', overflowX: 'auto', paddingBottom: '8px', position: 'sticky', top: '50px', background: '#f8f9fc', zIndex: 100, paddingTop: '8px' }}>
          {categoriesToShow.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: activeTab === category.id ? category.color : '#fff',
                color: activeTab === category.id ? '#fff' : '#333',
                boxShadow: activeTab === category.id ? `0 4px 12px rgba(102, 126, 234, 0.4)` : '0 1px 3px rgba(0,0,0,0.1)',
                border: activeTab === category.id ? 'none' : '1px solid #e0e0e0',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Category Header */}
        {activeCategory && (
          <div style={{
            background: `linear-gradient(135deg, ${activeCategory.color} 0%, ${activeCategory.color}dd 100%)`,
            color: 'white',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <h2 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700 }}>
              {activeCategory.title}
            </h2>
            <p style={{ opacity: 0.95, margin: 0, fontSize: '14px' }}>
              {activeCategory.description}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {activeCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {activeCategory.products.map((product, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{ width: '100%', height: '180px', background: '#fafafa', border: '1px solid #e0e0e0', borderRadius: '8px', marginBottom: '12px', overflow: 'hidden' }}>
                  <img
                    src="/uploads/1773556851579-genfollower.jpg"
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  margin: '0 0 8px 0'
                }}>
                  {cleanText(product.title)}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  margin: '0 0 16px 0',
                  fontWeight: 500
                }}>
                  {product.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 16px 0'
                }}>
                  {product.features.map((detail, detailIdx) => (
                    <li
                      key={detailIdx}
                      style={{
                        fontSize: '13px',
                        color: '#555',
                        margin: '6px 0',
                        paddingLeft: '16px',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: activeCategory.color
                      }}>
                        •
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleRequestQuote(product)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: activeCategory.color,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    marginTop: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Request Quote
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Request Quote Modal */}
        {selectedProduct && (
          <>
            {/* Overlay */}
            <div
              onClick={handleCloseModal}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
                backdropFilter: 'blur(4px)'
              }}
            />

            {/* Modal */}
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                maxWidth: '500px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
                padding: '32px'
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>

              {success ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>
                    Quote Request Received!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    We'll contact you soon with a quote for {cleanText(selectedProduct.title)}
                  </p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px 0' }}>
                    Request a Quote
                  </h2>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>
                    Product: <strong>{cleanText(selectedProduct.title)}</strong>
                  </p>
                  <p style={{ fontSize: '13px', color: '#999', margin: '0 0 24px 0' }}>
                    Fill in your details and we'll send you a quote
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        placeholder="John Doe"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        placeholder="john@example.com"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        required
                        placeholder="Your Company"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+91 XXXXX XXXXX"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell us about your requirements..."
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        style={{
                          flex: 1,
                          padding: '10px 20px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '13px',
                          background: '#fff',
                          cursor: 'pointer',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          flex: 1,
                          padding: '10px 24px',
                          background: loading ? '#ccc' : '#2D2B7F',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: loading ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) e.currentTarget.style.background = '#1e1c5e';
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) e.currentTarget.style.background = '#2D2B7F';
                        }}
                      >
                        {loading ? 'Sending...' : 'Request Quote'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
