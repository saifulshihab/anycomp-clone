import { AppDataSource } from "../config/data-source";
import { Specialist, SpecialistVerificationStatus } from "../entity/specialist";
import { calculatePlatformFee } from "../utils/platform-fee";
import { createSpecialistUniqueSlug } from "../utils/specialist";

const specialistSeedData = [
  {
    title: "Professional Company Incorporation Services",
    description:
      "Expert company secretary with 10+ years of experience in company incorporation, compliance, and corporate secretarial services. Specializing in Sdn Bhd registration, annual returns filing, and corporate governance. Fast turnaround time with personalized service. Licensed and verified company secretary ready to help you start your business journey.",
    base_price: 1500,
    average_rating: 4.8,
    total_number_of_ratings: 127,
    duration_days: 5,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Fast-Track Company Registration - 3 Days",
    description:
      "Get your company registered in just 3 business days! Our experienced team handles all paperwork, SSM submissions, and compliance requirements. Perfect for entrepreneurs who need quick company setup. Includes company name search, registration, and initial documentation. Trusted by 200+ startups and businesses.",
    base_price: 2100,
    average_rating: 4.9,
    total_number_of_ratings: 89,
    duration_days: 3,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Complete Company Secretarial Package",
    description:
      "Comprehensive company secretarial services including incorporation, annual returns, board meeting minutes, share transfers, and ongoing compliance support. Ideal for established businesses requiring full secretarial management. Includes digital document management and e-signature capabilities. Monthly retainer available for ongoing services.",
    base_price: 3500,
    average_rating: 4.7,
    total_number_of_ratings: 203,
    duration_days: 7,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Budget-Friendly Company Setup",
    description:
      "Affordable company incorporation service without compromising on quality. Perfect for small businesses and startups on a tight budget. Includes basic incorporation, company name registration, and essential documentation. Experienced team ensures smooth registration process. Great value for money!",
    base_price: 800,
    average_rating: 4.5,
    total_number_of_ratings: 156,
    duration_days: 7,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Premium Corporate Secretarial Services",
    description:
      "Premium-tier company secretarial services for high-growth companies and enterprises. Includes priority processing, dedicated account manager, comprehensive compliance monitoring, and strategic corporate advice. Perfect for companies requiring white-glove service and expert guidance on corporate matters.",
    base_price: 6500,
    average_rating: 4.9,
    total_number_of_ratings: 45,
    duration_days: 10,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Sdn Bhd Registration with Bank Account Setup",
    description:
      "Complete company registration package including Sdn Bhd incorporation and assistance with corporate bank account opening. We guide you through the entire process from company registration to bank account setup. Includes all necessary documentation and liaison with banks. Streamlined process saves you time and hassle.",
    base_price: 2800,
    average_rating: 4.6,
    total_number_of_ratings: 98,
    duration_days: 8,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Company Name Change & Restructuring Services",
    description:
      "Expert assistance with company name changes, restructuring, and corporate amendments. Handles all SSM requirements, documentation, and compliance matters. Ideal for companies undergoing rebranding or structural changes. Fast and efficient service with minimal disruption to your business operations.",
    base_price: 1200,
    average_rating: 4.4,
    total_number_of_ratings: 67,
    duration_days: 5,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Annual Returns & Compliance Filing",
    description:
      "Professional annual returns filing and ongoing compliance management for existing companies. Ensures timely submission of all required documents to SSM. Includes preparation of annual returns, financial statements filing, and compliance monitoring. Prevents penalties and keeps your company in good standing.",
    base_price: 950,
    average_rating: 4.7,
    total_number_of_ratings: 134,
    duration_days: 3,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Foreign Company Registration Services",
    description:
      "Specialized services for foreign companies looking to establish presence in Malaysia. Handles complex registration requirements, work permits coordination, and cross-border compliance matters. Experienced in international corporate structures and regulatory requirements. Bilingual support available.",
    base_price: 4800,
    average_rating: 4.8,
    total_number_of_ratings: 32,
    duration_days: 14,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Startup Company Incorporation Package",
    description:
      "Tailored company incorporation package designed specifically for startups and tech companies. Includes company registration, share structure setup, founder agreements, and initial compliance guidance. Bonus: Free consultation on corporate structure and equity distribution. Perfect for first-time entrepreneurs.",
    base_price: 1800,
    average_rating: 4.6,
    total_number_of_ratings: 112,
    duration_days: 6,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Express Company Registration - 24 Hours",
    description:
      "Ultra-fast company registration service with 24-hour turnaround (subject to SSM approval). Premium express service for urgent business needs. Includes priority processing, dedicated support, and expedited documentation. Additional fees may apply for rush processing. Ideal for time-sensitive business opportunities.",
    base_price: 3200,
    average_rating: 4.9,
    total_number_of_ratings: 28,
    duration_days: 1,
    verification_status: SpecialistVerificationStatus.APPROVED,
    is_verified: true,
    is_draft: false
  },
  {
    title: "Company Secretarial Services - Under Review",
    description:
      "New company secretarial service provider currently undergoing verification. Experienced team ready to assist with company incorporation and compliance matters. Service will be available upon approval. Competitive pricing and quality service guaranteed.",
    base_price: 1400,
    average_rating: 0,
    total_number_of_ratings: 0,
    duration_days: 7,
    verification_status: SpecialistVerificationStatus.UNDER_REVIEW,
    is_verified: false,
    is_draft: false
  }
];

const SpecialistRepository = AppDataSource.getRepository(Specialist);

export async function seedSpecialistData() {
  try {
    const existingSpecialists = await SpecialistRepository.find();
    if (!existingSpecialists.length) {
      // Data not available, seed data
      console.log("Seeding specialist data....");
      for (const specialistData of specialistSeedData) {
        // Create unique slug
        const slug = await createSpecialistUniqueSlug(specialistData.title);

        // Calculate platform fee
        const feeCalculation = await calculatePlatformFee(
          specialistData.base_price
        );

        const platform_fee = feeCalculation
          ? feeCalculation.applicable_fee_amount
          : 0;
        const final_price = specialistData.base_price + platform_fee;

        // Create specialist
        const specialist = SpecialistRepository.create({
          ...specialistData,
          slug,
          platform_fee,
          final_price
        });

        await SpecialistRepository.save(specialist);
      }
      console.log("Specialist data seeded successfully.");
    }
  } catch (err) {
    console.error("Failed to seed specialist data", err);
  }
}
