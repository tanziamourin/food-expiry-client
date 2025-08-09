import React, { useEffect } from "react";
import NearlyExpiry from "../components/NearlyExpiry";

import HeroBannerLottie from "./HeroBannerLottie";
import AwarenessSection from "../components/AwarenessSection";
import WasteStatsDashboard from "../components/WasteStatsDashboard";
import Tips from "../components/Tips";

const Home = () => {
  useEffect(() => {
    document.title = "Home | FoodTrack";
  }, []);

  return (
    <div>
      <HeroBannerLottie></HeroBannerLottie>
      <NearlyExpiry></NearlyExpiry>
      <AwarenessSection></AwarenessSection>
      <Tips></Tips>
      <WasteStatsDashboard></WasteStatsDashboard>
    </div>
  );
};

export default Home;
