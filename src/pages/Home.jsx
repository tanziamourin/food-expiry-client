import React from 'react';
import NearlyExpiry from '../components/NearlyExpiry';

import HeroBannerLottie from './HeroBannerLottie';

const Home = () => {
    return (
        <div>
            {/* <Banner></Banner> */}
            <HeroBannerLottie></HeroBannerLottie>
            <NearlyExpiry></NearlyExpiry>
        </div>
    );
};

export default Home;