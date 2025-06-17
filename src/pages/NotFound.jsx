import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import notFoundAnimation from "../assets//notfound.json";

const NotFound = () => {
  useEffect(() => {
    document.title = "NotFound | FoodTrack";
  }, []);

  return (
    <section className="flex items-center h-screen sm:p-16 bg-base text-base">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto space-y-8 text-center sm:max-w-md">
        <div className="w-full max-w-md">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>
        <p className="text-3xl font-semibold">
          Looks like our services are currently offline
        </p>
        <Link
          to="/"
          className="mt-auto bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-500 hover:to-green-500 text-white font-semibold rounded-md px-4 py-2 transition"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
