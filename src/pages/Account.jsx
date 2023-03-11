import React from "react";
import SavedShows from "../components/SavedShows";

function Account() {
  return (
    <div className="w-full text-white">
      <img
        className="w-full h-[480px] object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/a43711df-c428-4f88-8bb3-b2ac5f20608f/20381feb-65a6-4351-be55-57df47e98e91/TR-tr-20230227-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt="/"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
      <div className="absolute top-[20%] p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold">My List</h1>
      </div>
      <SavedShows />
    </div>
  );
}

export default Account;
