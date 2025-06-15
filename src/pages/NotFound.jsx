import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import Lottie from "lottie-react"; 
// import animationData from "../assets/Animation/Animation.json"; 

const NotFound = () => {
  useEffect(() => {
    document.title = "NotFound | JobTrack";
  }, []);

  return (
    <section className="flex items-center h-screen sm:p-16 bg-base text-base">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto space-y-8 text-center sm:max-w-md">
        <div className="w-full max-w-md">
          {/* <Lottie animationData={animationData} loop={true} /> */}
        </div>
        <p className="text-3xl font-semibold">
          Looks like our services are currently offline
        </p>
        <Link
          to="/"
          className="px-8 py-3 font-semibold rounded btn background text-white"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
