import ToolsHero from "../components/ai-tools/ToolsHero";
import CommandCenter from "../components/ai-tools/CommandCenter";
import Consultant from "../components/ai-tools/Consultant";
import Categories from "../components/ai-tools/Categories";
import ToolsGrid from "../components/ai-tools/ToolsGrid";
import DocumentTools from "../components/ai-tools/DocumentTools";
import DemoJourney from "../components/ai-tools/DemoJourney";
import JourneySteps from "../components/ai-tools/JourneySteps";
import ToolFinder from "../components/ai-tools/ToolFinder";
import WhyAi from "../components/ai-tools/WhyAi";
import HowAi from "../components/ai-tools/HowAi";
import AiFaq from "../components/ai-tools/AiFaq";
import FinalCta from "../components/ai-tools/FinalCta";

/**
 * GlobleEdu.ai — AI Tools showcase page.
 * Public page: the full experience is visible without login.
 * Actual chat usage is gated behind login inside the Command Center.
 */
export default function Chat() {
  return (
    <main className="relative overflow-x-clip">
      <ToolsHero />
      <CommandCenter />
      <Consultant />
      <Categories />
      <ToolsGrid />
      <DocumentTools />
      <DemoJourney />
      <JourneySteps />
      <ToolFinder />
      <WhyAi />
      <HowAi />
      <AiFaq />
      <FinalCta />
    </main>
  );
}
