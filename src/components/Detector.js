import React, { useState } from "react";
import FaceRecognition from "./FaceRecognition";

function Detector() {
  const [input, setInput] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [box, setBox] = useState({});

  // Regex to check for the Validity of the Url
  const checkForUrlValidity = /^(ftp|http|https):\/\/[^ "]+$/;

  const handleInput = e => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const PAT = "bcf79ede39984cd9824d70bf518beeb1";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "ibidapoayomide";
  const APP_ID = "face-detector-api";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
  const IMAGE_URL = `${ImageUrl}`;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT
    },
    body: raw
  };
  const calculateFace = data => {
    const imageFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: imageFace.left_col * width,
      topRow: imageFace.top_row * height,
      rightCol: width - imageFace.right_col * width,
      bottomRow: height - imageFace.bottom_row * height
    };
  };

  const displayFaceBox = box => {
    setBox(box);
  };
  const handleImageUrl = e => {
    if (input.trim() === "") {
      setError("Please enter a valid image url");
    } else {
      if (checkForUrlValidity.test(input)) {
        setError("");
        setImageUrl(input);
        fetch(
          "https://api.clarifai.com/v2/models/" +
            MODEL_ID +
            "/versions/" +
            MODEL_VERSION_ID +
            "/outputs",
          requestOptions
        )
          .then(response => response.json())
          .then(result => displayFaceBox(calculateFace(result)))
          .catch(error => console.log("error", error));
      } else {
        setError("Please enter a valid image url");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 md:flex-row md:space-x-5 px-10 md:px-20 w-full">
      <div className="w-100 md:w-1/2 flex flex-col space-y-3 -mt-10">
        <p className="text-center md:text-left font-[300]">
          Enter image url to detect face
        </p>
        <p className="text-center text-red font-size md:text-left font-[300]">
          Due to to voluminious request, kindly click the detect button twice to
          get accurate detection
        </p>

        <div className="w-100 flex flex-col items-center justify-center space-y-5">
          <input
            type="url"
            value={input}
            onChange={handleInput}
            placeholder="Enter the url of the image file"
            className="border p-3 w-full"
          />
          <button
            className="bg-blue p-3 text-white w-full"
            onClick={handleImageUrl}
          >
            Detect Face
          </button>
        </div>
        <p className="text-red error">{error}</p>
      </div>

      <div className="w-100 md:w-1/5">
        <div className="shadow-2xl flex flex-col items-center justify-center w-[400px] h-[400px] bg-white">
          <FaceRecognition box={box} ImageUrl={ImageUrl} />
        </div>
      </div>
    </div>
  );
}

export default Detector;
