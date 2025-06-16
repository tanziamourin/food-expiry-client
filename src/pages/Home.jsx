import React from 'react';
import NearlyExpiry from '../components/NearlyExpiry';

import HeroBannerLottie from './HeroBannerLottie';
import AwarenessSection from '../components/AwarenessSection';


const Home = () => {
    return (
        <div>
            {/* <Banner></Banner> */}
            <HeroBannerLottie></HeroBannerLottie>
            <NearlyExpiry></NearlyExpiry>
            <AwarenessSection></AwarenessSection>
            
        </div>
    );
};

export default Home;