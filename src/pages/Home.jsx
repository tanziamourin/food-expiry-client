import React, { useEffect } from "react";
import NearlyExpiry from "../components/NearlyExpiry";

import HeroBannerLottie from "./HeroBannerLottie";
import AwarenessSection from "../components/AwarenessSection";
import WasteStatsDashboard from "../components/WasteStatsDashboard";

const Home = () => {
  useEffect(() => {
    document.title = "Home | FoodTrack";
  }, []);

  return (
    <div>
      <HeroBannerLottie></HeroBannerLottie>
      <NearlyExpiry></NearlyExpiry>
      <AwarenessSection></AwarenessSection>
      <WasteStatsDashboard></WasteStatsDashboard>
    </div>
  );
};

export default Home;
