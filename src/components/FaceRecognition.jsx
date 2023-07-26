import React from "react";

function FaceRecognition({ ImageUrl, box }) {
  return (
    <div className="bounding">
      <img id="inputimage" src={ImageUrl} alt="" className="w-[320px] h-auto" />
      <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
  );
}

export default FaceRecognition;
