import HeroSection from "@/components/HeroSection";
import DownloadSection from "@/components/DownloadSection";
import MobileAppSection from "@/components/MobileAppSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import PageTransition from "@/components/PageTransition";

interface IndexProps {
  isInitialVisit?: boolean;
}

const Index = ({ isInitialVisit = false }: IndexProps) => {
  return (
    <PageTransition>
      <HeroSection isInitialVisit={isInitialVisit} />
      <DownloadSection />
      <MobileAppSection />
      <SocialMediaSection />
    </PageTransition>
  );
};

export default Index;
