import React from "react";
import logo from "../assets/logoSonFondo.png";

const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-between px-6 p-4 bg-gray-700 rounded-xl items-center ">
        <img src={logo} alt="img" className=" h-10" />
        <div>
          <a
            href="/login"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-[80vh] m-auto flex-col">
        <p className="text-2xl text-white">Welcome to my task management project</p>
        <img src={logo} alt="img" className="h-64" />
      </div>
    </div>
  );
};

export default LandingPage;
