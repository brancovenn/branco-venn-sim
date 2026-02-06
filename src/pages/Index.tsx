import HeroSection from "@/components/HeroSection";
import DownloadSection from "@/components/DownloadSection";
import MobileAppSection from "@/components/MobileAppSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <HeroSection />
      <DownloadSection />
      <MobileAppSection />
      <SocialMediaSection />
    </PageTransition>
  );
};

export default Index;
