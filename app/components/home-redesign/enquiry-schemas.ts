// Enquiry form schemas for Sri Saradi Scientific Home Redesign
export interface FormFieldSchema {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface EnquiryCategorySchema {
  title: string;
  help: string;
  fields: FormFieldSchema[];
  branches?: Record<string, FormFieldSchema[]>;
}

export const enquirySchemas: Record<string, EnquiryCategorySchema> = {
  "product": {
    "title": "Describe the application",
    "help": "If you are unsure of the category, describe the scientific work and what you need the product to do.",
    "fields": [
      {
        "key": "application",
        "label": "Experiment or process *",
        "type": "textarea",
        "placeholder": "",
        "required": true
      },
      {
        "key": "challenge",
        "label": "Current procurement or product challenge",
        "type": "text",
        "placeholder": "Availability, specification, documentation or sourcing",
        "required": false
      }
    ]
  },
  "molecular": {
    "title": "Molecular biology requirement",
    "help": "Choose the product family. We’ll ask about the sample, target and method rather than treating every biological product as the same purchase.",
    "fields": [
      {
        "key": "family",
        "label": "Product family *",
        "type": "select",
        "options": [
          "Kit",
          "Reagent",
          "Antibody"
        ],
        "required": true
      },
      {
        "key": "application",
        "label": "Application / method *",
        "type": "text",
        "placeholder": "e.g. RT-qPCR, nucleic acid extraction, Western blot",
        "required": true
      },
      {
        "key": "sample",
        "label": "Sample type / biological material",
        "type": "text",
        "placeholder": "e.g. tissue, serum, cultured cells",
        "required": false
      }
    ],
    "branches": {
      "Kit": [
        {
          "key": "readout",
          "label": "Target / intended readout",
          "type": "text",
          "placeholder": "What are you extracting, detecting or quantifying?",
          "required": false
        },
        {
          "key": "throughput",
          "label": "Reaction count / sample input",
          "type": "text",
          "placeholder": "Number of samples, reaction volume or input amount",
          "required": false
        },
        {
          "key": "equipment",
          "label": "Instrument / existing workflow",
          "type": "text",
          "placeholder": "Model or protocol if relevant",
          "required": false
        }
      ],
      "Reagent": [
        {
          "key": "identity",
          "label": "Reagent name / function / CAS (if known)",
          "type": "text",
          "placeholder": "Name or the step it needs to support",
          "required": false
        },
        {
          "key": "grade",
          "label": "Grade, concentration or purity needed",
          "type": "text",
          "placeholder": "Describe any critical specification",
          "required": false
        },
        {
          "key": "compatibility",
          "label": "Protocol / compatibility constraints",
          "type": "text",
          "placeholder": "Buffer, chemistry, storage or downstream conditions",
          "required": false
        }
      ],
      "Antibody": [
        {
          "key": "target",
          "label": "Target antigen / protein",
          "type": "text",
          "placeholder": "Target, clone or catalogue reference if known",
          "required": false
        },
        {
          "key": "species",
          "label": "Sample species / required reactivity",
          "type": "text",
          "placeholder": "e.g. human, mouse",
          "required": false
        },
        {
          "key": "antibodyFormat",
          "label": "Host, clonality / conjugate preference",
          "type": "text",
          "placeholder": "e.g. rabbit monoclonal; HRP; unconjugated",
          "required": false
        },
        {
          "key": "assay",
          "label": "Assay and controls",
          "type": "text",
          "placeholder": "e.g. WB, IHC, IF, flow cytometry; positive / negative controls",
          "required": false
        }
      ]
    }
  },
  "filter": {
    "title": "Filtration requirement",
    "help": "Laboratory sample preparation and process filtration need different operating details. Unknown values can be discussed with us.",
    "fields": [
      {
        "key": "family",
        "label": "Filtration setting *",
        "type": "select",
        "options": [
          "Laboratory filtration",
          "Process filtration"
        ],
        "required": true
      },
      {
        "key": "application",
        "label": "Method / process and filtration purpose *",
        "type": "text",
        "placeholder": "What needs to be removed or retained?",
        "required": true
      },
      {
        "key": "fluid",
        "label": "Sample / fluid composition",
        "type": "text",
        "placeholder": "Solvent, pH, chemical composition or biological fluid",
        "required": false
      },
      {
        "key": "membrane",
        "label": "Current membrane / retention specification",
        "type": "text",
        "placeholder": "Material, pore size, rating or current product if known",
        "required": false
      }
    ],
    "branches": {
      "Laboratory filtration": [
        {
          "key": "volume",
          "label": "Sample volume / analyte",
          "type": "text",
          "placeholder": "Volume per sample and analyte of interest",
          "required": false
        },
        {
          "key": "format",
          "label": "Diameter / format / device",
          "type": "text",
          "placeholder": "Syringe filter, membrane disc or other format",
          "required": false
        },
        {
          "key": "downstream",
          "label": "Downstream method / key concern",
          "type": "text",
          "placeholder": "e.g. HPLC; recovery, adsorption or extractables",
          "required": false
        }
      ],
      "Process filtration": [
        {
          "key": "operating",
          "label": "Flow, temperature and pressure",
          "type": "textarea",
          "placeholder": "Include values with units if known",
          "required": false
        },
        {
          "key": "housing",
          "label": "Housing, dimensions, connections & seals",
          "type": "textarea",
          "placeholder": "Current cartridge, equipment or drawing reference",
          "required": false
        },
        {
          "key": "cleaning",
          "label": "Cleaning / sterilisation conditions",
          "type": "text",
          "placeholder": "Where applicable",
          "required": false
        },
        {
          "key": "criteria",
          "label": "Acceptance criteria / current issue",
          "type": "textarea",
          "placeholder": "Throughput, pressure drop, life, quality or compatibility",
          "required": false
        }
      ]
    }
  },
  "plasticware": {
    "title": "Specialist biological plasticware",
    "help": "Tell us the experiment first. Product-specific compatibility and quality properties are checked against the exact consumable.",
    "fields": [
      {
        "key": "family",
        "label": "Consumable family *",
        "type": "select",
        "options": [
          "Pipette tips / molecular biology",
          "Cell culture consumables",
          "Specialist biological format"
        ],
        "required": true
      },
      {
        "key": "application",
        "label": "Biological experiment / workflow *",
        "type": "text",
        "placeholder": "e.g. low-volume PCR setup or adherent cell culture",
        "required": true
      },
      {
        "key": "quality",
        "label": "Critical quality specifications",
        "type": "textarea",
        "placeholder": "e.g. DNase/RNase status, sterility, low retention or low binding",
        "required": false
      }
    ],
    "branches": {
      "Pipette tips / molecular biology": [
        {
          "key": "instrument",
          "label": "Pipette / instrument make and model",
          "type": "text",
          "placeholder": "Manual or automated instrument",
          "required": false
        },
        {
          "key": "volume",
          "label": "Volume / format",
          "type": "text",
          "placeholder": "Working volume, tubes, plates or tips",
          "required": false
        },
        {
          "key": "tiptype",
          "label": "Tip / barrier / packaging needs",
          "type": "text",
          "placeholder": "Filter, non-filter, rack, refill or other requirement",
          "required": false
        }
      ],
      "Cell culture consumables": [
        {
          "key": "celltype",
          "label": "Cell type and culture approach",
          "type": "text",
          "placeholder": "Adherent / suspension; cell type",
          "required": false
        },
        {
          "key": "vessel",
          "label": "Vessel format / size",
          "type": "text",
          "placeholder": "Flask, dish, plate, insert or specialist vessel",
          "required": false
        },
        {
          "key": "surface",
          "label": "Surface treatment / culture requirements",
          "type": "text",
          "placeholder": "Treated, coated or other requirement",
          "required": false
        }
      ],
      "Specialist biological format": [
        {
          "key": "format",
          "label": "Required format / dimensions",
          "type": "text",
          "placeholder": "Describe the specialised item",
          "required": false
        },
        {
          "key": "compatibility",
          "label": "Instrument / sample compatibility",
          "type": "text",
          "placeholder": "Model, material or workflow constraints",
          "required": false
        },
        {
          "key": "reference",
          "label": "Drawing or reference file name",
          "type": "text",
          "placeholder": "Please send the file through the agreed email channel",
          "required": false
        }
      ]
    }
  },
  "service": {
    "title": "Custom scientific project",
    "help": "Start with non-confidential scope. Request an NDA before sharing confidential sequences, structures or samples.",
    "fields": [
      {
        "key": "serviceType",
        "label": "Service type *",
        "type": "select",
        "options": [
          "Peptide synthesis",
          "Oligonucleotides / primers",
          "Labeling / conjugation",
          "Protein / antibody expression",
          "Bioinformatics",
          "Other project"
        ],
        "required": true
      },
      {
        "key": "application",
        "label": "Intended use / project objective *",
        "type": "textarea",
        "placeholder": "What material or analysis does your project need?",
        "required": true
      },
      {
        "key": "scale",
        "label": "Scale, purity, format & QC",
        "type": "textarea",
        "placeholder": "Quantity, preparation and desired quality package",
        "required": false
      },
      {
        "key": "inputs",
        "label": "Available starting material / input data",
        "type": "textarea",
        "placeholder": "Describe without sharing confidential sequences or structures",
        "required": false
      }
    ]
  },
  "discovery": {
    "title": "Discovery / Omni-Search brief",
    "help": "Describe the research decision the evidence review should support.",
    "fields": [
      {
        "key": "application",
        "label": "Research objective *",
        "type": "textarea",
        "placeholder": "Molecule prioritisation, indications or other decision",
        "required": true
      },
      {
        "key": "portfolio",
        "label": "Portfolio / molecule context",
        "type": "textarea",
        "placeholder": "Non-confidential description",
        "required": false
      },
      {
        "key": "evidence",
        "label": "Available evidence / desired outputs",
        "type": "textarea",
        "placeholder": "Datasets, existing analyses or preferred scope",
        "required": false
      }
    ]
  },
  "dealer": {
    "title": "Dealer collaboration",
    "help": "We can discuss the customer application, portfolio needs and the responsibilities for the collaboration.",
    "fields": [
      {
        "key": "market",
        "label": "Markets / territories served *",
        "type": "text",
        "placeholder": "Countries, industries and customer types",
        "required": true
      },
      {
        "key": "portfolio",
        "label": "Product categories of interest",
        "type": "text",
        "placeholder": "Reagents, kits, antibodies, filtration or biological plasticware",
        "required": false
      },
      {
        "key": "application",
        "label": "Current customer requirement",
        "type": "textarea",
        "placeholder": "Share a non-confidential enquiry if available",
        "required": false
      },
      {
        "key": "support",
        "label": "Support & communication expectations",
        "type": "textarea",
        "placeholder": "Sourcing, technical questions, documents, quotations or customer contact",
        "required": false
      }
    ]
  },
  "documentation": {
    "title": "Product documentation request",
    "help": "The catalogue number identifies the product. A batch number helps us request a relevant COA.",
    "fields": [
      {
        "key": "product",
        "label": "Manufacturer & product identity *",
        "type": "text",
        "placeholder": "Product name / catalogue number",
        "required": true
      },
      {
        "key": "batch",
        "label": "Batch / lot number (if known)",
        "type": "text",
        "placeholder": "Useful for the relevant COA",
        "required": false
      },
      {
        "key": "application",
        "label": "Intended method / application",
        "type": "text",
        "placeholder": "Useful when requesting product citations",
        "required": false
      },
      {
        "key": "questions",
        "label": "Specific document / technical questions",
        "type": "textarea",
        "placeholder": "What evidence or clarification do you need?",
        "required": false
      }
    ]
  }
};
