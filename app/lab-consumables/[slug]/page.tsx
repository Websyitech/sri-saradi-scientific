'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Hero from '@/app/components/Hero';
import USPBar from '@/app/components/USPBar';
import SampleKitModal from '@/app/components/SampleKitModal';
import ProductCatalog from '@/app/components/ProductCatalog';

interface AssociatedProduct {
  id: string;
  productTitle: string;
  categoryId?: string;
  image?: string;
  description?: string;
  details?: string[];
  isCustom?: boolean;
}

interface KitProduct {
  id: string;
  title: string;
  slug: string | null;
  heroTitle?: string | null;
  description: string | null;
  image: string | null;
  href: string | null;
  sortOrder: number;
  isActive: boolean;
  associatedProducts?: AssociatedProduct[] | string;
}

interface ProductData {
  id: string;
  category: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
  applications: string[];
  features: string[];
}

const LIQUID_HANDLING_PRODUCTS: ProductData[] = [
  {
    id: 'syringe-filters',
    category: 'Laboratory Filtration',
    title: 'Syringe Filters',
    description: 'High-precision syringe filters for HPLC, UHPLC, and sample preparation with color-coded identification system.',
    specs: [
      { label: 'Membrane Types', value: 'PVDF, RC, CA, GF, PTFE, Nylon, PES' },
      { label: 'Pore Sizes', value: '0.22µm, 0.45µm' },
      { label: 'Diameters', value: '4mm, 13mm, 17mm, 25mm, 30mm' },
      { label: 'Housing', value: 'Medical grade polypropylene' }
    ],
    applications: ['HPLC Analysis', 'UV Spectrometry', 'Protein Analysis', 'Biological Samples'],
    features: ['HPLC certified materials', 'Color coding for easy identification', 'Maximum operating temperature: 100°C', 'Compatible with low sample volumes']
  },
  {
    id: 'sterile-syringe-filters',
    category: 'Laboratory Filtration - Sterile',
    title: 'Sterile Syringe Filters',
    description: 'Individually packaged sterile syringe filters with LRV7 bacterial retention for critical applications.',
    specs: [
      { label: 'Membrane Types', value: 'PES, PVDF, CA (33mm diameter)' },
      { label: 'Pore Sizes', value: '0.22µm, 0.45µm' },
      { label: 'Sterilization', value: 'Gamma Radiation' },
      { label: 'Bacterial Challenge', value: 'LRV7 (B. diminuta)' }
    ],
    applications: ['Tissue Culture Media', 'Biological Fluids', 'Buffer Sterilization', 'Serum Filtration'],
    features: ['Reliable sterile filtration (LRV7)', 'No pyrogen contamination', 'Effective filtration area: 4.9 cm²', 'Lowest protein adsorption', 'Hold-up volume less than 120µL']
  },
  {
    id: 'gridded-membrane-filters',
    category: 'Laboratory Filtration',
    title: 'Gridded Membrane Filters',
    description: 'MCE gridded membranes for microbial analysis with superior bacterial recovery rates.',
    specs: [
      { label: 'Membrane', value: 'Mixed Cellulose Ester (MCE)' },
      { label: 'Pore Sizes', value: '0.22µm, 0.45µm' },
      { label: 'Diameters', value: '47mm, 50mm' },
      { label: 'Package', value: 'Sterile, individually wrapped' }
    ],
    applications: ['Microbial Testing', 'Water Analysis', 'E.coli Detection', 'Beverage Testing'],
    features: ['Excellent wettability (1-2 seconds)', '96% E.coli recovery rate', 'Fast filtration times', 'Passes bacterial challenge tests']
  },
  {
    id: 'venting-filters',
    category: 'Laboratory Filtration',
    title: 'Venting Filters',
    description: 'PTFE hydrophobic venting filters for gas sterilization and bioreactor applications.',
    specs: [
      { label: 'Membrane', value: 'Hydrophobic PTFE' },
      { label: 'Diameter', value: '50mm' },
      { label: 'Pore Sizes', value: '0.22µm, 0.45µm' },
      { label: 'Options', value: 'Sterile / Non-sterile' }
    ],
    applications: ['Gas Venting', 'Air Sterilization', 'Bioreactors', 'Fermentation'],
    features: ['Hydrophobic PTFE membrane', 'Chemical resistant', 'Autoclavable', 'Reliable sterile air filtration']
  },
  {
    id: 'ultra-centrifugal-filters',
    category: 'Laboratory Filtration - Centrifugal',
    title: 'Ultra Centrifugal Filters',
    description: 'Molecular weight cut-off centrifugal filters for protein concentration and purification.',
    specs: [
      { label: 'MWCO Options', value: '3K, 5K, 10K, 30K, 50K, 100KD' },
      { label: 'Max Volume', value: '12mL (fixed-angle), 16mL (swing)' },
      { label: 'Centrifuge Force', value: '2500-5000g (safe: 3500g)' },
      { label: 'Retention Rate', value: '85-95% (protein dependent)' }
    ],
    applications: ['Protein Concentration', 'Desalting', 'Buffer Exchange', 'Molecular Purification'],
    features: ['High retention efficiency (85-95%)', 'Pre-rinse before use recommended', 'Reusable up to 12 times', 'Compatible with fixed-angle and swing rotors']
  },
  {
    id: 'capflux-pp',
    category: 'Process Filtration - Capsule',
    title: 'CapFlux Absolute PP Capsule',
    description: 'Disposable polypropylene capsule filters with multi-layer graded structure for high flow rates.',
    specs: [
      { label: 'Filter Media', value: 'Absolute Polypropylene' },
      { label: 'Pore Sizes', value: '0.1-5.0µm' },
      { label: 'Lengths', value: '1.25", 2.5", 3", 5", 8", 10", 20"' },
      { label: 'Sterilization', value: 'Autoclave/Gamma' }
    ],
    applications: ['Fine Chemical', 'Food & Beverage', 'Pharmaceutical', 'Water Treatment'],
    features: ['Absolute filtration efficiency', 'Greater particle holding capacity', 'Low differential pressure drop', 'Equivalent to Kleenpak/OptiCap']
  },
  {
    id: 'capflux-pes',
    category: 'Process Filtration - Capsule',
    title: 'CapFlux Sterile PES Capsule',
    description: 'Sterile grade PES capsule filters with 100% integrity testing for bacteria and virus removal.',
    specs: [
      { label: 'Filter Media', value: 'Sterile Grade PES' },
      { label: 'Pore Sizes', value: '0.1-5.0µm' },
      { label: 'Bacterial Challenge', value: 'LRV7 (B. diminuta, S. marcescens)' },
      { label: 'Max Temp', value: '80°C' }
    ],
    applications: ['BioPharma', 'Fermentation', 'Semiconductor', 'Sterile Filtration'],
    features: ['100% integrity tested', 'Removes bacteria, viruses, mycoplasma', 'Autoclave/Gamma sterilizable', 'High flow, low pressure drop']
  },
  {
    id: 'capflux-ptfe',
    category: 'Process Filtration - Capsule',
    title: 'CapFlux Hydrophobic PTFE',
    description: 'Hydrophobic PTFE capsule filters for gas venting and aggressive chemical applications.',
    specs: [
      { label: 'Filter Media', value: 'Hydrophobic PTFE' },
      { label: 'Chemical Compatibility', value: 'Wide range (PTFE)' },
      { label: 'Bacterial Challenge', value: 'LRV7' },
      { label: 'Features', value: 'Super hydrophobic' }
    ],
    applications: ['Gas Venting', 'Air Sterilization', 'Chemical Processing', 'Semiconductor'],
    features: ['Super hydrophobicity', 'High flow rate', 'Excellent sterile performance', 'Wide chemical compatibility']
  },
  {
    id: 'capflux-pvdf',
    category: 'Process Filtration - Capsule',
    title: 'CapFlux Hydrophilic PVDF',
    description: 'PVDF capsule filters with lowest protein binding for biopharmaceutical applications.',
    specs: [
      { label: 'Filter Media', value: 'Hydrophilic PVDF' },
      { label: 'Protein Binding', value: 'Lowest available' },
      { label: 'Bacterial Challenge', value: 'LRV7' },
      { label: 'Efficiency', value: 'Absolute ratio' }
    ],
    applications: ['BioPharma', 'Plasma', 'Culture Media', 'Protein Solutions'],
    features: ['Lowest protein bonding and absorption', '100% integrity tested', 'Absolute filtration efficiency', 'Enhanced biosafety design']
  },
  {
    id: 'capflux-nylon',
    category: 'Process Filtration - Capsule',
    title: 'CapFlux Nylon66 Capsule',
    description: 'Nylon66 and charged nylon capsules for aqueous solvents and endotoxin removal.',
    specs: [
      { label: 'Filter Media', value: 'Nylon66 / Charged Nylon' },
      { label: 'Pore Sizes', value: '0.1-5.0µm' },
      { label: 'Bacterial Challenge', value: 'LRV7' },
      { label: 'Special Feature', value: 'Positive charge option' }
    ],
    applications: ['Amine Filtration', 'Petrochemical', 'Endotoxin Removal', 'High Temp Water'],
    features: ['Wide chemical compatibility', 'Positively charged option available', '100% integrity testing', 'Online steam sterilization capable']
  },
  {
    id: 'steriflux-pp',
    category: 'Process Filtration - Cartridge',
    title: 'SteriFlux PP Pleated',
    description: '100% polypropylene pleated cartridge filters with excellent cost-performance ratio.',
    specs: [
      { label: 'Filter Media', value: '100% Polypropylene' },
      { label: 'Pore Sizes', value: '0.1-10µm' },
      { label: 'Lengths', value: '5", 10", 20", 30", 40", 50"' },
      { label: 'Efficiency', value: '99.98%' }
    ],
    applications: ['Water Treatment', 'Food & Beverage', 'Chemical', 'Pre-filtration'],
    features: ['Excellent chemical compatibility', 'Thermal welding (no adhesives)', 'Larger surface area', 'Low initial pressure drop']
  },
  {
    id: 'steriflux-pes',
    category: 'Process Filtration - Cartridge',
    title: 'SteriFlux PES Pleated',
    description: 'Asymmetric PES membrane pleated cartridges with superior bacteria and particle removal.',
    specs: [
      { label: 'Filter Media', value: 'Asymmetric PES' },
      { label: 'Bacterial Challenge', value: 'LRV7' },
      { label: 'Max Temp', value: '80°C' },
      { label: 'Sterilization', value: '20× Autoclave 125°C' }
    ],
    applications: ['Pharmaceutical', 'Fermentation', 'Semiconductor', 'Sterile Filtration'],
    features: ['100% integrity tested', 'Adhesive-free thermal welding', 'High flow, low pressure drop', 'Multiple sterilization cycles']
  },
  {
    id: 'steriflux-ptfe',
    category: 'Process Filtration - Cartridge',
    title: 'SteriFlux PTFE Pleated',
    description: 'Hydrophobic PTFE pleated cartridges for aggressive chemicals and organic solvents.',
    specs: [
      { label: 'Filter Media', value: 'Hydrophobic PTFE' },
      { label: 'Chemical Compatibility', value: 'Excellent (most chemicals)' },
      { label: 'Bacterial Challenge', value: 'LRV7' },
      { label: 'Autoclave Cycles', value: '150× at 125°C' }
    ],
    applications: ['Fine Chemical', 'Organic Solvents', 'Gas Processing', 'Semiconductor'],
    features: ['Wide chemical compatibility', 'Wide porosity range', 'Low extractible rate', '100% integrity tested']
  },
  {
    id: 'steriflux-gf',
    category: 'Process Filtration - Cartridge',
    title: 'SteriFlux Glass Fiber',
    description: 'Glass fiber media cartridge filters with thermal bonding for extended service life.',
    specs: [
      { label: 'Filter Media', value: 'Glass Fiber' },
      { label: 'Pore Sizes', value: '0.1-10µm' },
      { label: 'Construction', value: 'Thermal bonding (no adhesives)' },
      { label: 'OD Options', value: '69mm, 83mm, 114mm' }
    ],
    applications: ['Food & Beverage', 'Water Treatment', 'Pharmaceutical', 'Pre-filtration'],
    features: ['Deep filtration construction', 'Longer service life', 'No adhesives or surfactants', 'Excellent chemical compatibility']
  },
  {
    id: 'supflux-hf',
    category: 'Process Filtration - High Flow',
    title: 'SupFlux High Flow Series',
    description: 'Large 6" diameter high flow cartridges for reduced change-outs and maintenance.',
    specs: [
      { label: 'Diameter', value: '152mm (6")' },
      { label: 'Lengths', value: '20", 40", 60"' },
      { label: 'Filter Media', value: 'PP Pleated, Glass Fiber' },
      { label: 'Pore Sizes', value: '1-40µm' }
    ],
    applications: ['Desalination', 'Power Plants', 'Petrochemical', 'Large Volume Processing'],
    features: ['Fewer cartridges needed', 'Lower maintenance costs', 'High surface area', 'Extended lifespan']
  },
  {
    id: 'aquaflux-melt',
    category: 'Process Filtration - Sediment',
    title: 'AquaFlux Melt Blown',
    description: '100% polypropylene melt blown filters with three nano fiber layers for absolute efficiency.',
    specs: [
      { label: 'Material', value: '100% Polypropylene' },
      { label: 'Pore Sizes', value: '1-150µm' },
      { label: 'Lengths', value: '5", 10", 20", 30", 40", 50", 60", 70"' },
      { label: 'Certifications', value: 'NSF, FDA' }
    ],
    applications: ['Water Treatment', 'Desalination', 'Petrochemical', 'Pre-filtration'],
    features: ['3 nano fiber layers', 'High dirt holding capacity', 'NSF and FDA certified', '100% PP material']
  },
  {
    id: 'aquaflux-string',
    category: 'Process Filtration - Sediment',
    title: 'AquaFlux String Wound',
    description: 'Maximum wound string filters with 30% more material for superior dirt-holding capacity.',
    specs: [
      { label: 'Material', value: 'PP, Cotton, Glass Fiber' },
      { label: 'Pore Sizes', value: '1-150µm' },
      { label: 'Core Options', value: 'PP, SS304, SS316L' },
      { label: 'Special Feature', value: '30% more material' }
    ],
    applications: ['Water Treatment', 'Desalination', 'Industrial', 'Heavy Particle Load'],
    features: ['Max wound process (30% more material)', 'Wide chemical compatibility', 'Special connector options', 'High temperature capability (80-120°C)']
  },
  {
    id: 'aquaflux-multilayer',
    category: 'Process Filtration - Specialty',
    title: 'AquaFlux Multi-Layer PP',
    description: 'Multi-layer depth media filters with graded pore structure for extended lifespan.',
    specs: [
      { label: 'Construction', value: '5+ layers depth media + PP membrane' },
      { label: 'Pore Sizes', value: '0.1-10µm' },
      { label: 'Efficiency', value: '98% absolute' },
      { label: 'Max Temp', value: '120°C' }
    ],
    applications: ['Fine Chemical', 'Paints & Coatings', 'Petrochemical', 'High Temp Water'],
    features: ['Graded pore size structure', 'Larger dirt-holding capacity', 'Longer service life', '100% PP material']
  },
  {
    id: 'steriflux-sanitary',
    category: 'Filter Housing - Sanitary',
    title: 'SteelFlux Sanitary Housing',
    description: 'Stainless steel sanitary filter housings with quick connection design for pharmaceutical applications.',
    specs: [
      { label: 'Material', value: 'SS304, SS316L' },
      { label: 'Connection', value: 'Tri-Clamp, Flange' },
      { label: 'Polishing', value: 'Mirror or Sandy surface' },
      { label: 'Adaptor', value: '222, 226, DOE' }
    ],
    applications: ['BioPharma', 'Food & Beverage', 'Sterile Processing', 'Clean Rooms'],
    features: ['Quick connection design', 'Easy to clean and change out', 'Operating pressure: 6 bar', 'Temperature: up to 120°C']
  },
  {
    id: 'steriflux-security',
    category: 'Filter Housing - Security',
    title: 'SteelFlux Security Housing',
    description: 'Multi-round security filter housings available in SS, glass steel, and carbon steel materials.',
    specs: [
      { label: 'Material Options', value: 'SS304/316L, Glass Steel, Carbon Steel' },
      { label: 'Rounds', value: '1, 3, 5, 7, 9, 12 rounds' },
      { label: 'Lengths', value: '10", 20", 30", 40"' },
      { label: 'Adaptors', value: '222, 226, DOE' }
    ],
    applications: ['Water Treatment', 'Industrial', 'Food & Beverage', 'Chemical'],
    features: ['Multiple material options', '1-12 cartridge capacity', 'Mirror or sandy surface polishing', 'Flange or quick connection']
  },
  {
    id: 'steriflux-highflow',
    category: 'Filter Housing - High Flow',
    title: 'SteelFlux High Flow Housing',
    description: 'High flow filter housings for 6" diameter cartridges with quick connection design.',
    specs: [
      { label: 'Material', value: 'SS304, SS316L, Glass Steel' },
      { label: 'Cartridge Lengths', value: '20", 40", 60"' },
      { label: 'Design Pressure', value: '10 bar' },
      { label: 'Working Temp', value: '25°C (design: 120°C)' }
    ],
    applications: ['Desalination', 'Power Plants', 'High Volume Processing', 'Industrial Water'],
    features: ['Quick connection or flange', 'Reduced number of housings needed', 'Lower installation costs', 'FRP option available']
  },
  {
    id: 'steriflux-bagfilter',
    category: 'Filter Housing - Bag Filter',
    title: 'SteelFlux Bag Filter Housing',
    description: 'Standard bag filter housings for size 1-4 bag filters with reliable sealing design.',
    specs: [
      { label: 'Material', value: 'SS304, SS316L' },
      { label: 'Bag Sizes', value: '01, 02, 03, 04' },
      { label: 'Connection', value: 'Quick Connect, Flange' },
      { label: 'Operating Pressure', value: '6 bar' }
    ],
    applications: ['Food & Beverage', 'Chemical', 'Water Treatment', 'Industrial'],
    features: ['Most reliable sealing design', 'Easy to clean and change out', 'Mirror or sandy surface', 'Temperature: up to 120°C']
  },
  {
    id: 'steriflux-lenticular',
    category: 'Filter Housing - Lenticular',
    title: 'SteelFlux Lenticular Housing',
    description: 'Sanitary lenticular filter housings for depth filtration and modular closed systems.',
    specs: [
      { label: 'Material', value: 'SS304, SS316L' },
      { label: 'Filter Types', value: '8", 12", 16" diameter' },
      { label: 'Stacks', value: '1-4 stacks' },
      { label: 'Max Temp', value: '100°C' }
    ],
    applications: ['Pharmaceutical', 'Food & Beverage', 'Chemical', 'Depth Filtration'],
    features: ['Sanitary operation', 'Minimal product loss', 'Modular closed system', 'Medium volume flows']
  }
];

function getUSPItems(slug: string | string[] | undefined) {
  const slugStr = Array.isArray(slug) ? slug[0] : slug || '';

  const uspConfig: Record<string, Array<{ icon: string; text: string }>> = {
    'liquid-handling': [
      { icon: '💧', text: 'Universal Compatibility' },
      { icon: '🔬', text: 'Precision & Accuracy' },
      { icon: '✔️', text: 'Sterile & Pyrogen-Free' },
      { icon: '🏆', text: 'ISO 13485 Certified' },
      { icon: '⚙️', text: 'Automated Platform Compatible' }
    ],
    'pcr-consumables': [
      { icon: '🧬', text: 'High Thermal Stability' },
      { icon: '✔️', text: 'DNase/RNase Free' },
      { icon: '🔒', text: 'Contamination Prevention' },
      { icon: '📊', text: 'Optimal qPCR Performance' },
      { icon: '🏥', text: 'Clinical Grade Materials' }
    ],
    'filtration': [
      { icon: '🔍', text: 'High Filtration Efficiency' },
      { icon: '✔️', text: 'Sterile & Endotoxin-Free' },
      { icon: '💨', text: 'Low Pressure Drop' },
      { icon: '🌍', text: 'Wide Chemical Compatibility' },
      { icon: '♻️', text: 'Sustainable Manufacturing' }
    ]
  };

  return uspConfig[slugStr] || [
    { icon: '✔️', text: 'DNase / RNase Free' },
    { icon: '✔️', text: 'Pyrogen & Endotoxin Free' },
    { icon: '✔️', text: 'Sterile Packaging' },
    { icon: '✔️', text: 'ISO 13485 Certified Facility' },
    { icon: '✔️', text: 'Compatible with Major Automation Platforms' }
  ];
}

export default function KitProductDetail() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const [product, setProduct] = useState<KitProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('Laboratory Filtration');

  const getMainCategory = (category: string) => {
    if (category.includes('Laboratory')) return 'Laboratory Filtration';
    if (category.includes('Process')) return 'Process Filtration';
    if (category.includes('Filter Housing')) return 'Filter Housing';
    return category;
  };

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/kit-products?slug=${encodeURIComponent(slug.toLowerCase())}`);
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.associatedProducts === 'string') {
            try {
              data.associatedProducts = JSON.parse(data.associatedProducts);
            } catch (e) {
              data.associatedProducts = [];
            }
          }
          setProduct(data || null);
        } else {
          setProduct(null);
        }
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      <Hero 
        title="Lab Solutions" 
        heading={product?.heroTitle || product?.title}
        description={product?.description || undefined}
        image={product?.image || undefined}
        showPartnerPill={true}
        showActions={true}
        buttons={[
          { 
            label: "Download Catalog", 
            href: "#download", 
            variant: "outline" as const 
          },
          { 
            label: "Get a Sample Kit", 
            onClick: () => setShowSampleModal(true), 
            variant: "primary" as const 
          }
        ]}
      />

      <SampleKitModal isOpen={showSampleModal} onClose={() => setShowSampleModal(false)} />

      <USPBar items={getUSPItems(slug)} />

      {slug === 'genfollower-products' && <ProductCatalog />}

      {slug === 'pcr-consumables' && (
        <ProductCatalog initialTab="molecular" showSeries={['molecular', 'immunoassay', 'sealing']} />
      )}

      {slug === 'orient-filtr-products' && (
        <section style={{ padding: '60px 40px', background: '#fff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: '12px' }}>Complete Liquid Handling & Filtration Solutions</h2>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '48px', maxWidth: '800px', margin: '0 auto' }}>Comprehensive range of laboratory and process filtration products for all your liquid handling applications.</p>
            
            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {Array.from(new Set(LIQUID_HANDLING_PRODUCTS.map(p => getMainCategory(p.category)))).map((mainCategory) => (
                <button
                  key={mainCategory}
                  onClick={() => setSelectedMainCategory(mainCategory)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    background: selectedMainCategory === mainCategory ? '#667eea' : '#fff',
                    color: selectedMainCategory === mainCategory ? '#fff' : '#333',
                    border: selectedMainCategory === mainCategory ? 'none' : '1px solid #e0e0e0',
                    boxShadow: selectedMainCategory === mainCategory ? '0 4px 12px rgba(102, 126, 234, 0.4)' : '0 1px 3px rgba(0,0,0,0.1)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {mainCategory}
                </button>
              ))}
            </div>
            
            {/* Products Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
              {LIQUID_HANDLING_PRODUCTS
                .filter(p => getMainCategory(p.category) === selectedMainCategory)
                .map((product) => (
                <div key={product.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
                  {/* Product Image */}
                  <div style={{ width: '100%', height: '180px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #e0e0e0' }}>
                    <div style={{ textAlign: 'center', color: '#999' }}>
                      <div style={{ fontSize: '48px', marginBottom: '8px' }}>🖼️</div>
                      <div style={{ fontSize: '12px', color: '#aaa' }}>Product Image</div>
                    </div>
                  </div>
                  
                  <div style={{ padding: '24px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px 0' }}>{product.title}</h3>
                    </div>
                  
                  <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px', flex: 1 }}>{product.description}</p>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {product.specs.map((spec, idx) => (
                        <div key={idx} style={{ fontSize: '12px', color: '#555' }}>
                          <span style={{ fontWeight: 600, color: '#333' }}>{spec.label}:</span> {spec.value}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Applications:</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {product.applications.map((app, idx) => (
                        <span key={idx} style={{ fontSize: '11px', background: '#f0f0f0', color: '#555', padding: '3px 10px', borderRadius: '14px' }}>{app}</span>
                      ))}
                    </div>
                  </div>
                  
                  <ul style={{ fontSize: '12px', color: '#555', marginBottom: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Associated Products */}
      {Array.isArray(product.associatedProducts) && product.associatedProducts.length > 0 && (
        <section style={{ padding: '60px 40px', background: '#f8f9fc' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: '12px' }}>
              Product Range
            </h2>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '48px', maxWidth: '800px', margin: '0 auto' }}>
              Explore the complete range of products available in this series.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {(Array.isArray(product.associatedProducts) ? product.associatedProducts : []).map((prod, idx) => (
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
                  {prod.image && (
                    <div style={{ width: '100%', height: '180px', background: '#fafafa', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src={prod.image} alt={prod.productTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px 0' }}>
                    {prod.productTitle}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0', fontWeight: 500 }}>
                    {prod.description}
                  </p>
                  {prod.details && prod.details.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                      {prod.details.map((detail, detailIdx) => (
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
                          <span style={{ position: 'absolute', left: 0, color: '#667eea' }}>•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                  {prod.isCustom && (
                    <span style={{ fontSize: '10px', color: '#667eea', fontWeight: 600, marginBottom: '12px' }}>Custom Product</span>
                  )}
                  <button
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: '#2D2B7F',
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
          </div>
        </section>
      )}
    </main>
  );
}
