import React from "react";

function Navbar() {
  const VideoFilesComingSoon = () => {
    alert("Video Files is coming soon...");
  };
  return (
    <div className="w-full shadow flex flex-col md:flex-row py-3 px-20 items-center bg-white justify-end">
      <button
        className="bg-blue px-10 rounded-[20px] py-2 text-white text-[10px] md:text-[20px] cursor-not-allowed"
        onClick={VideoFilesComingSoon}
      >
        Check for Video Files
      </button>
    </div>
  );
}

export default Navbar;
