import AiHero from "../components/ai-tools/AiHero";
import Why from "../components/home/Why";
import Journey from "../components/home/Journey";
import AiDemo from "../components/home/AiDemo";
import Countries from "../components/home/Countries";
import Universities from "../components/home/Universities";
import Scholarships from "../components/home/Scholarships";
import Features from "../components/home/Features";
import DashboardPreview from "../components/home/DashboardPreview";
import Testimonials from "../components/home/Testimonials";
import Pricing from "../components/home/Pricing";
import Faq from "../components/home/Faq";
import FinalCta from "../components/home/FinalCta";

/**
 * GlobleEdu.ai — flagship AI-powered study-abroad landing page.
 * Composed of section components. The global Navbar & Footer (App.tsx)
 * wrap this page, so no footer is rendered here.
 */
export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <AiHero mode="home" />
      <Why />
      <Journey />
      <AiDemo />
      <Countries />
      <Universities />
      <Scholarships />
      <Features />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
    </main>
  );
}
