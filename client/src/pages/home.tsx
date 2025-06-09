import Header from "@/components/header";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import DeclarationSection from "@/components/declaration-section";
import PoliciesSection from "@/components/policies-section";
import SecuritySection from "@/components/security-section";
import ComplianceDashboard from "@/components/compliance-dashboard";
import AiDeclaration from "@/components/ai-declaration";
import LegalSection from "@/components/legal-section";
import EcoCopyrightSection from "@/components/eco-copyright-section";
import ContactSection from "@/components/contact-section";
import FinalMessage from "@/components/final-message";
import Footer from "@/components/footer";
import { ReplitBanAlert } from "@/components/replit-ban-alert";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />
      <ReplitBanAlert />
      <HeroSection />
      <DeclarationSection />
      <PoliciesSection />
      <SecuritySection />
      <ComplianceDashboard />
      <AiDeclaration />
      <LegalSection />
      <EcoCopyrightSection />
      <ContactSection />
      <FinalMessage />
      <Footer />
    </div>
  );
}