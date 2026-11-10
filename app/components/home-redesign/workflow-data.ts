// Workflow data for Sri Saradi Scientific Home Redesign
export interface WorkflowStep {
  title: string;
  subtitle: string;
  heading: string;
  description: string;
  outcome: string;
  icon: 'target' | 'document' | 'box' | 'network' | 'support' | 'time' | 'people';
  owner: string;
  input: string;
}

export interface WorkflowCategory {
  label: string;
  steps: WorkflowStep[];
}

export const workflows: Record<string, WorkflowCategory> = {
  "molecular": {
    "label": "Molecular biology",
    "steps": [
      {
        "title": "Define the experiment",
        "subtitle": "Method, target, sample and readout",
        "heading": "Start with the experiment.",
        "description": "We discuss the assay or method and the outcome you need to measure. Your application becomes a brief that both the manufacturer and procurement can work with.",
        "outcome": "An application brief with the product questions clearly stated.",
        "icon": "target",
        "owner": "Your scientists + Sri Saradi",
        "input": "Target, species, sample type, method, quantity and current challenge."
      },
      {
        "title": "Review product & evidence",
        "subtitle": "Technical discussion and supporting documents",
        "heading": "Bring product expertise into the decision.",
        "description": "We coordinate relevant options, datasheets, available product citations and the COA. For antibodies, discuss reactivity and the intended assay; for kits, discuss sample compatibility and the workflow. Your team reviews suitability.",
        "outcome": "A candidate product with evidence and open questions identified.",
        "icon": "document",
        "owner": "Sri Saradi + manufacturer; your team reviews",
        "input": "Application brief and your acceptance criteria."
      },
      {
        "title": "Make procurement clear",
        "subtitle": "Product, quantity, cost and delivery",
        "heading": "Turn the reviewed choice into a supply proposal.",
        "description": "We connect the selected catalogue number and pack size with a quotation, included costs, documents and delivery terms. Your technical and procurement teams work from the same specification.",
        "outcome": "A procurement-ready quotation linked to the scientific requirement.",
        "icon": "box",
        "owner": "Sri Saradi + your procurement team",
        "input": "Reviewed specification, quantity and destination."
      },
      {
        "title": "Coordinate global delivery",
        "subtitle": "Availability, handling, documents and route",
        "heading": "Connect the scientific product with the supply route.",
        "description": "We coordinate availability, product-specific handling requirements, documentation and shipping through an integrated logistics approach. Product orders accepted under our delivery offer have a 15-working-day commitment with the start date confirmed in the quote.",
        "outcome": "A confirmed order and delivery plan with one contact for follow-up.",
        "icon": "network",
        "owner": "Sri Saradi coordinates manufacturer and logistics",
        "input": "Accepted quotation and destination details."
      },
      {
        "title": "Support the next question",
        "subtitle": "Product questions after receipt",
        "heading": "Keep the scientific conversation connected.",
        "description": "Your team evaluates the product in its method. Bring product questions and observations to us; we coordinate manufacturer input and follow-up on the agreed order. Record the approved specification for future enquiries.",
        "outcome": "Technical follow-up and a clear reference for repeat procurement.",
        "icon": "support",
        "owner": "Your scientists + Sri Saradi + manufacturer",
        "input": "Receipt, evaluation observations and product questions."
      }
    ]
  },
  "plasticware": {
    "label": "Biological plasticware",
    "steps": [
      {
        "title": "Describe the biological work",
        "subtitle": "Experiment, instrument and format",
        "heading": "The experiment determines the consumable.",
        "description": "Tell us whether you need molecular biology tips and consumables, cell culture vessels or a specialist format. We clarify the sample, instrument and handling requirements before discussing products.",
        "outcome": "An application-specific plasticware brief.",
        "icon": "target",
        "owner": "Your scientists + Sri Saradi",
        "input": "Experiment, pipette or instrument, volume, format and critical requirements."
      },
      {
        "title": "Check the exact specification",
        "subtitle": "Compatibility and product-specific quality",
        "heading": "Review the properties that matter to your work.",
        "description": "We coordinate product information on fit, material, surface treatment, retention and relevant quality specifications. DNase/RNase status or sterility is checked for the selected SKU where required; your team assesses suitability.",
        "outcome": "A candidate SKU with the required properties checked against the brief.",
        "icon": "document",
        "owner": "Sri Saradi + manufacturer; your team reviews",
        "input": "Application brief and required quality or compatibility criteria."
      },
      {
        "title": "Align product and purchase",
        "subtitle": "SKU, pack size, quantity and destination",
        "heading": "Give procurement a precise requirement.",
        "description": "The quotation identifies the consumable, pack configuration, quantity, supporting information and delivery terms. Molecular biology and cell culture needs remain explicit in the commercial proposal.",
        "outcome": "A clear consumable specification and supply quotation.",
        "icon": "box",
        "owner": "Sri Saradi + your procurement team",
        "input": "Reviewed product, packs needed and destination."
      },
      {
        "title": "Coordinate supply",
        "subtitle": "Availability, packaging and shipping",
        "heading": "Move the selected consumable to your laboratory.",
        "description": "Our integrated logistics approach connects product availability, packaging requirements, documents and delivery. The quotation confirms the start date and conditions for the 15-working-day product delivery offer.",
        "outcome": "An agreed worldwide delivery plan for the selected products.",
        "icon": "network",
        "owner": "Sri Saradi coordinates manufacturer and logistics",
        "input": "Accepted order and delivery details."
      },
      {
        "title": "Follow up on use",
        "subtitle": "Fit, handling and repeat requirements",
        "heading": "Keep the approved consumable identifiable.",
        "description": "Your team checks fit and application performance. We take product-specific questions to the manufacturer and keep repeat enquiries linked to the exact approved specification.",
        "outcome": "A technical follow-up contact and a repeat-order reference.",
        "icon": "support",
        "owner": "Your scientists + Sri Saradi + manufacturer",
        "input": "Product observations, instrument fit and approved SKU."
      }
    ]
  },
  "lab": {
    "label": "Laboratory filtration",
    "steps": [
      {
        "title": "Describe sample & method",
        "subtitle": "Solvent, analyte, volume and downstream method",
        "heading": "Start with the sample you need to filter.",
        "description": "We discuss the sample composition and downstream method so the manufacturer can address membrane compatibility, retention, extractables and handling questions.",
        "outcome": "A sample-specific filtration brief.",
        "icon": "target",
        "owner": "Your scientists + Sri Saradi",
        "input": "Solvent composition, analyte, volume and analytical method."
      },
      {
        "title": "Review membrane & format",
        "subtitle": "Compatibility, pore size and method evaluation",
        "heading": "Connect the candidate filter with your method.",
        "description": "We coordinate manufacturer specifications for membrane, pore size, diameter and hold-up volume. Your team reviews the evidence and defines any sample-based evaluation before approving routine use.",
        "outcome": "Candidate specifications and the questions your method must resolve.",
        "icon": "document",
        "owner": "Sri Saradi + manufacturer; your team evaluates",
        "input": "Sample brief and your method-specific acceptance criteria."
      },
      {
        "title": "Agree the supply proposal",
        "subtitle": "Approved specification and complete quotation",
        "heading": "Keep the reviewed filter visible in the quote.",
        "description": "Confirm membrane, pore size, format, quantity and available documents. The proposal identifies the product and quoted delivery terms so procurement can place the intended order.",
        "outcome": "A quotation linked to the reviewed filter specification.",
        "icon": "box",
        "owner": "Sri Saradi + your procurement team",
        "input": "Approved product, quantity and destination."
      },
      {
        "title": "Coordinate delivery",
        "subtitle": "Availability and integrated logistics",
        "heading": "Follow the product through the supply steps.",
        "description": "Sri Saradi coordinates manufacturer availability, documents and the shipping route. The 15-working-day delivery offer is confirmed for the accepted product order, including its start date and any order-specific exceptions.",
        "outcome": "A confirmed product order and delivery plan.",
        "icon": "network",
        "owner": "Sri Saradi coordinates manufacturer and logistics",
        "input": "Accepted quotation and destination details."
      },
      {
        "title": "Support method follow-up",
        "subtitle": "Observations, questions and repeat supply",
        "heading": "Connect product questions with the manufacturer.",
        "description": "Share sample recovery, analytical or handling observations with us. We coordinate manufacturer responses and link future supply enquiries with your approved filter specification.",
        "outcome": "Technical follow-up tied to your sample and method.",
        "icon": "support",
        "owner": "Your scientists + Sri Saradi + manufacturer",
        "input": "Evaluation observations and approved specification."
      }
    ]
  },
  "process": {
    "label": "Process filtration",
    "steps": [
      {
        "title": "Define the process duty",
        "subtitle": "Fluid, operating conditions and equipment",
        "heading": "Your process knowledge starts the review.",
        "description": "We organise the fluid chemistry, temperature, flow, pressure, filtration stage and current issue into a brief for Orient Filtr. Housing and connection details stay with that brief.",
        "outcome": "A process-specific brief the manufacturer can assess.",
        "icon": "target",
        "owner": "Your technical team + Sri Saradi",
        "input": "Fluid, duty, flow, temperature, pressure, dimensions and seals."
      },
      {
        "title": "Review & evaluate the candidate",
        "subtitle": "Manufacturer data and your acceptance criteria",
        "heading": "Product expertise meets process knowledge.",
        "description": "We coordinate media, retention, dimensions, seals and housing compatibility. Your team defines and runs any needed trial or qualification before approval; we discuss manufacturer or sample support where available.",
        "outcome": "A candidate specification and your basis for approving it.",
        "icon": "document",
        "owner": "Manufacturer + Sri Saradi; your team evaluates",
        "input": "Process brief, housing details and acceptance criteria."
      },
      {
        "title": "Quote the approved specification",
        "subtitle": "Quantity, terms and repeat requirements",
        "heading": "Connect technical approval with the order.",
        "description": "After your team approves the specification, the quotation links the filter, quantity, available evidence and delivery terms. Procurement receives a product requirement grounded in the process review.",
        "outcome": "A supply proposal for the approved process filter.",
        "icon": "box",
        "owner": "Sri Saradi + your procurement team",
        "input": "Approved filter specification, quantity and destination."
      },
      {
        "title": "Coordinate global supply",
        "subtitle": "Availability, documents and shipping",
        "heading": "Make the supply route part of the plan.",
        "description": "We coordinate manufacturer sourcing and logistics for the agreed order. Our 15-working-day product offer is confirmed in the quotation with its start date and any order-specific exceptions.",
        "outcome": "An order plan connecting the approved filter with delivery.",
        "icon": "network",
        "owner": "Sri Saradi coordinates manufacturer and logistics",
        "input": "Accepted order and destination requirements."
      },
      {
        "title": "Follow up on the duty",
        "subtitle": "Your observations and manufacturer input",
        "heading": "Keep performance questions connected.",
        "description": "Your team monitors the filter under its process conditions. We coordinate product-specific questions and discuss repeat requirements using the approved specification. Performance conclusions remain grounded in your process data.",
        "outcome": "A contact for manufacturer follow-up and repeat procurement.",
        "icon": "support",
        "owner": "Your technical team + Sri Saradi + manufacturer",
        "input": "Process observations, product questions and repeat requirements."
      }
    ]
  }
};
