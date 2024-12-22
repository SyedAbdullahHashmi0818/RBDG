import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../cssFiles/uploadPage.css";
import Navbar from "../components/navbar";
import option1blue from "../images/Module Name.png";
import option2blue from "../images/Module Name (2).png";

const UploadRequirements = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  let navigate = useNavigate();
  const goToFile = () => {
    navigate("/UploadByFile");
  };
  const goToPrompt = () => {
    navigate("/UploadByPrompt");
  };

  return (
    <div className="uploadBg">
      <Navbar />
      <div className="middleBox">
        <p id="mainText">Select Requirements Uploading Option</p>
        <div className="inlineElements">
          <div className="box" onClick={goToPrompt}>
            <p className="boxText">Type Requirements in Prompt Box</p>
            <img src={option1blue} alt="Img" className="boxImg" />
          </div>
          <p id="orText">OR</p>
          <div className="box" onClick={goToFile}>
            <p className="boxText">Upload Requirements from Excel File</p>
            <img src={option2blue} alt="Img" className="boxImg2" />
          </div>
        </div>
      </div>
      <div>
        <p onClick={togglePopup} id="helpText">
          Need Help?
        </p>

        {isOpen && (
          <div id="popUp" className={isOpen ? "show" : ""}>
            <div className="insidePopUp">
              <p>
                The first option allows you to enter your requirements in a
                prompt module wise meaning that each module will have its own
                prompt box.
              </p>
              <p id="barText">||||||||</p>
              <p>
                The second option allows you to upload your requirments directly
                from an excel file. However, the files requires to have a column
                for Module and Requirement both.
              </p>
            </div>
            <p onClick={togglePopup} id="closeButton">
              x
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadRequirements;
