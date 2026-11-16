import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { hashPassword } from "@/app/lib/auth";

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.adminUser.findFirst();
    if (existingAdmin) {
      return NextResponse.json({ message: "Database already seeded" }, { status: 200 });
    }

    // 1. Create default admin user
    const hashedPassword = await hashPassword("admin123");
    await prisma.adminUser.create({
      data: {
        email: "admin@srisaradiscientific.com",
        password: hashedPassword,
        name: "Admin",
        role: "superadmin",
      },
    });

    // 2. Seed categories
    const categories = await Promise.all([
      prisma.category.create({ data: { name: "Microscopy", slug: "microscopy", sortOrder: 1 } }),
      prisma.category.create({ data: { name: "Cell Culture", slug: "cell-culture", sortOrder: 2 } }),
      prisma.category.create({ data: { name: "PCR & Genomics", slug: "pcr-genomics", sortOrder: 3 } }),
      prisma.category.create({ data: { name: "Immunology", slug: "immunology", sortOrder: 4 } }),
      prisma.category.create({ data: { name: "Liquid Handling", slug: "liquid-handling", sortOrder: 5 } }),
      prisma.category.create({ data: { name: "Biochemicals", slug: "biochemicals", sortOrder: 6 } }),
    ]);

    // 3. Seed hero slides
    await prisma.heroSlide.createMany({
      data: [
        {
          title: "Scientific & Laboratory Equipment",
          subtitle: "Your Trusted Partner in Science",
          description: "We supply high-quality laboratory instruments, chemicals, and glassware for research institutions, universities, and industries across India.",
          ctaText: "Explore Products",
          ctaLink: "/products",
          bgGradient: "linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 60%, #0d0d1a 100%)",
          accentColor: "#6C63FF",
          sortOrder: 1,
        },
        {
          title: "Solarbio Research Products",
          subtitle: "Premium Quality Reagents & Chemicals",
          description: "Authorized distributors of Solarbio life science products. Browse our extensive catalog of biochemicals, antibodies, and molecular biology reagents.",
          ctaText: "View Solarbio",
          ctaLink: "/products?brand=Solarbio",
          bgGradient: "linear-gradient(135deg, #1B5E20 0%, #0d3311 60%, #091f0b 100%)",
          accentColor: "#66BB6A",
          sortOrder: 2,
        },
        {
          title: "Applications & Solutions",
          subtitle: "Industry-Leading Support",
          description: "From pharmaceuticals to food testing, we provide complete laboratory solutions tailored to your specific research and quality control needs.",
          ctaText: "Our Applications",
          ctaLink: "/applications",
          bgGradient: "linear-gradient(135deg, #B71C1C 0%, #7f1313 60%, #4a0b0b 100%)",
          accentColor: "#EF5350",
          sortOrder: 3,
        },
      ],
    });

    // 4. Seed kit products
    await prisma.kitProduct.createMany({
      data: [
        {
          title: "Apoptosis & Cell Viability",
          description: "Complete workflows: Annexin V/PI Kits, TUNEL Assays, and mitochondrial membrane potential detection.",
          href: "/products/apoptosis-cell-viability",
          sortOrder: 1,
        },
        {
          title: "Eco-Friendly Lab Essentials",
          description: "Reduce plastic waste with GenFollower's E-Series Pipette Tip Refill System. Sterile and easy to load",
          href: "/products/eco-friendly-lab",
          sortOrder: 2,
        },
        {
          title: "Optical Precision",
          description: "From routine Education (EDU-LUX) to Research (BIO-VIEW). Scandinavian design with Plan Apochromatic objectives",
          href: "/products/optical-precision",
          sortOrder: 3,
        },
      ],
    });

    // 5. Seed products (Analytical Syringes category) with variants
    const syringeCategory = categories[4]; // Liquid Handling
    const productData = [
      { productNumber: "26274", name: "SGE Needles for luer lock syringes", description: "needle size 22 ga, needle L × O.D. 51 mm × 0.71 mm", manufacturer: "SGE", material: "stainless steel", variants: [{ sku: "26274", packSize: "2 ea", price: 6051.18 }] },
      { productNumber: "26273-U", name: "SGE Needles for luer lock syringes", description: "needle size 23 ga, needle L × O.D. 115 mm × 0.63 mm, point style, 2", manufacturer: "SGE", material: "stainless steel", variants: [{ sku: "26273-U", packSize: "1 ea", price: 5230.00 }] },
      { productNumber: "20734", name: "Hamilton® syringe, 700 series, fixed needle", description: "701N, volume 10 µL, needle size 26s ga (bevel tip), needle L 51 mm (2 in.)", manufacturer: "Hamilton", material: "glass", variants: [{ sku: "20734", packSize: "1 ea", price: 8450.00 }] },
      { productNumber: "21965-U", name: "SGE Gas Tight Syringes, Luer Lock", description: "5MDR-LL-GT, volume 5 mL, needle size (not included)", manufacturer: "SGE", material: "glass", variants: [{ sku: "21965-U", packSize: "1 ea", price: 12100.00 }] },
      { productNumber: "20997", name: "Hamilton® syringe, 1000 series GASTIGHT®, PTFE luer lock", description: "1001TLL, PTFE Luer lock, volume 1 mL, needle size (not included)", manufacturer: "Hamilton", material: "PTFE", variants: [{ sku: "20997", packSize: "1 ea", price: 15800.00 }] },
    ];

    for (const p of productData) {
      await prisma.product.create({
        data: {
          catalogNumber: p.productNumber,
          name: p.name,
          description: p.description,
          categoryId: syringeCategory.id,
          manufacturer: p.manufacturer,
          material: p.material,
          variants: {
            create: p.variants.map((v, i) => ({ ...v, sortOrder: i })),
          },
        },
      });
    }

    // 6. Seed featured products
    for (let i = 1; i <= 6; i++) {
      await prisma.product.create({
        data: {
          catalogNumber: `CRM-${i.toString().padStart(3, "0")}`,
          name: "Certified Reference Materials",
          isFeatured: true,
          sortOrder: i,
        },
      });
    }

    // 7. Seed Solarbio product categories (as sub-categories)
    const solarbioParent = await prisma.category.create({
      data: {
        name: "Solarbio Life Sciences",
        slug: "solarbio",
        description: "Authorized distributors of Solarbio Life Science products",
        icon: "FaAtom",
        color: "#E53935",
        sortOrder: 10,
      },
    });

    const solarbioSubCategories = [
      { name: "Analytical Standards", icon: "FaMicroscope", color: "#6D4C41", sortOrder: 1 },
      { name: "Antibodies", icon: "FaSyringe", color: "#7B1FA2", sortOrder: 2 },
      { name: "Biochemical Assay Kits", icon: "FaVials", color: "#1565C0", sortOrder: 3 },
      { name: "Biochemical Reagents", icon: "FaFlask", color: "#E53935", sortOrder: 4 },
      { name: "Cell Biology", icon: "FaAtom", color: "#E65100", sortOrder: 5 },
      { name: "Cell Culture Media", icon: "GiChemicalDrop", color: "#2E7D32", sortOrder: 6 },
      { name: "ELISA Kits", icon: "FaDna", color: "#00838F", sortOrder: 7 },
      { name: "Molecular Biology", icon: "GiMolecule", color: "#2E7D32", sortOrder: 8 },
      { name: "Peptides", icon: "FaFilter", color: "#4527A0", sortOrder: 9 },
      { name: "Proteins & Immunity", icon: "FaShieldAlt", color: "#AD1457", sortOrder: 10 },
    ];

    for (const sc of solarbioSubCategories) {
      const slug = sc.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
      const created = await prisma.category.create({
        data: {
          name: sc.name,
          slug: `solarbio-${slug}`,
          icon: sc.icon,
          color: sc.color,
          sortOrder: sc.sortOrder,
          parentId: solarbioParent.id,
        },
      });

      // Add sample featured products for first 3 categories
      if (sc.sortOrder <= 3) {
        await prisma.product.create({
          data: {
            catalogNumber: `SB${sc.sortOrder}01`,
            name: `${sc.name} Sample Product`,
            size: "100ml",
            section: `Explore ${sc.name}`,
            categoryId: created.id,
            brand: "Solarbio",
            productLine: "Solarbio Life Sciences",
          },
        });
      }
    }

    // 8. Seed application categories
    const appCategories = [
      { title: "Analytical Chemistry", items: ["Atomic Spectroscopy", "Chromatography", "Electrochemistry", "Mass Spectrometry", "Spectrophotometry", "Titration"] },
      { title: "Life Science", items: ["Cell Biology", "Genomics", "Proteomics", "Molecular Biology", "Immunology"] },
      { title: "Materials Science", items: ["Polymers", "Ceramics", "Nanomaterials"] },
      { title: "Environmental", items: ["Water Testing", "Soil Analysis", "Air Quality"] },
    ];

    for (let i = 0; i < appCategories.length; i++) {
      const cat = await prisma.applicationCategory.create({
        data: { title: appCategories[i].title, sortOrder: i + 1 },
      });
      for (let j = 0; j < appCategories[i].items.length; j++) {
        await prisma.applicationItem.create({
          data: { name: appCategories[i].items[j], categoryId: cat.id, sortOrder: j + 1 },
        });
      }
    }

    // 9. Seed job openings
    await prisma.jobOpening.createMany({
      data: [
        {
          title: "Technical Sales Executive",
          department: "Sales",
          location: "Hyderabad, Telangana",
          type: "Full-Time",
          description: "We are looking for an experienced Technical Sales Executive to join our sales team.",
          responsibilities: [
            "Identify and develop new business opportunities",
            "Build and maintain relationships with research institutions",
            "Provide technical consultations to clients",
            "Prepare and present quotations and proposals",
            "Achieve monthly and quarterly sales targets",
          ],
          requirements: [
            "Bachelor's degree in Chemistry, Biology, or related field",
            "2-4 years of experience in scientific equipment sales",
            "Strong communication and presentation skills",
            "Willingness to travel within Telangana & AP",
          ],
        },
        {
          title: "Laboratory Application Specialist",
          department: "Technical Support",
          location: "Hyderabad, Telangana",
          type: "Full-Time",
          description: "Join our technical support team as a Laboratory Application Specialist.",
          responsibilities: [
            "Conduct product demonstrations and training sessions",
            "Provide post-sales technical support",
            "Assist with instrument installation and calibration",
            "Develop application notes and documentation",
          ],
          requirements: [
            "M.Sc. in Analytical Chemistry or Biotechnology",
            "1-3 years of laboratory experience",
            "Hands-on experience with analytical instruments",
            "Excellent problem-solving skills",
          ],
        },
      ],
    });

    // 10. Seed site settings
    await prisma.siteSetting.createMany({
      data: [
        { key: "company_name", value: "Sri Saradi Scientific", type: "text" },
        { key: "email", value: "info@srisaradiscientific.com", type: "email" },
        { key: "phone", value: "+91 97424 43809", type: "phone" },
        { key: "address", value: "Hyderabad, Telangana, India", type: "text" },
        { key: "facebook_url", value: "https://facebook.com", type: "url" },
        { key: "linkedin_url", value: "https://linkedin.com", type: "url" },
        { key: "twitter_url", value: "https://twitter.com", type: "url" },
      ],
    });

    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
