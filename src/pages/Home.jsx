import React, { useEffect } from "react";

import HeroBannerLottie from "./HeroBannerLottie";

import WasteStatsDashboard from "../components/WasteStatsDashboard";
import Tips from "../components/Tips";
import NearlyExpiryPage from "../components/NearlyExpiryPage";
import WhyTrackFood from "../components/WhyTrackFood";

const Home = () => {
  useEffect(() => {
    document.title = "Home | FoodTrack";
  }, []);

  return (
    <div>
      <HeroBannerLottie></HeroBannerLottie>

      <NearlyExpiryPage></NearlyExpiryPage>

      <WhyTrackFood></WhyTrackFood>
      <Tips></Tips>
      <WasteStatsDashboard></WasteStatsDashboard>
    </div>
  );
};

export default Home;
