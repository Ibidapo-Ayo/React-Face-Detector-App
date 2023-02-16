import React, {useState} from "react";

function Detector() {
  const [input, setInput] = useState('')
  const [showUrl, setshowUrl] = useState('')
  const handleInput = (e) =>{
    setInput(e.target.value)
  }
  const ShowUrl = (e) =>{
    setshowUrl(input)
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-6 md:flex-row">
      <div className="w-1/2 flex flex-col space-y-3 -mt-10">
        <p className="text text-white text-left font-[300]">
          Enter image url to detect face
        </p>
        <form onSubmit={ShowUrl} action="#">
          <input
            type="url" value={input} onChange={handleInput}
            placeholder="Enter the url of the image file"
            className="border p-3 w-[500px]"
          />
          <button className="bg-blue p-3 text-white" type='submit'>Detect Face</button>
        </form>
        
      </div>

      <div className="w-1/5">
        <div className="shadow-2xl w-[400px] h-[400px] bg-white">
        <p>{showUrl}</p>
        </div>
      </div>
    </div>
  );
}

export default Detector;
