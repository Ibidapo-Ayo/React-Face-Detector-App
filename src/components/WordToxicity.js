import React, { useState } from "react";

function WordToxicity() {
  const [text, setText] = useState("");
  const [showData, setshowData] = useState([]);
  const handleText = e => {
    setText(e.target.value);
  };
  const CheckWordToxicity = () => {
    if (text.value === "") {
      alert("No text found");
    } else {
      const PAT = "21f5ac27365c4518bbec2b1af47b326a";
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = "ibidapoayomide";
      const APP_ID = "word-toxicity-api";
      // Change these to whatever model and raw text you want to use
      const MODEL_ID = "moderation-multilingual-text-classification";
      const MODEL_VERSION_ID = "79c2248564b0465bb96265e0c239352b";
      const RAW_TEXT = `${text}`;

      ///////////////////////////////////////////////////////////////////////////////////
      // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
      ///////////////////////////////////////////////////////////////////////////////////

      const raw = JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID
        },
        inputs: [
          {
            data: {
              text: {
                raw: RAW_TEXT
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

      // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
      // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
      // this will default to the latest version_id

      fetch(
        "https://api.clarifai.com/v2/models/" +
          MODEL_ID +
          "/versions/" +
          MODEL_VERSION_ID +
          "/outputs",
        requestOptions
      )
        .then(response => response.json())
        .then(result => WordToxicityPercentage(result))
        .catch(error => console.log("error", error));
    }
  };

  const WordToxicityPercentage = percentage => {
    setshowData(percentage.outputs[0].data.concepts);
    console.log(percentage.outputs[0].data.concepts);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-6 md:flex-row">
        <div className="md:w-1/2 flex flex-col space-y-3 -mt-10">
          <div>
            <input
              type="text"
              value={text}
              onChange={handleText}
              placeholder="Enter the url of the image file"
              className="border p-3 md:w-[500px] w-100"
            />
            <button
              className="bg-blue p-3 text-white"
              onClick={CheckWordToxicity}
            >
              Check
            </button>
          </div>
        </div>

        <div className="w-1/5">
          <div className="shadow-2xl flex flex-col w-full h-[400px] bg-white">
            {showData.map(data => (
              <div>
                <p>{data.name}</p>
                <div className="w-full h-5 ">
                  <div
                    className={`w-[${Math.round(data.value * 100)}] h-5 bg-blue`}
                  >
                  <p className="text-white">{Math.round(data.value * 100)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordToxicity;
