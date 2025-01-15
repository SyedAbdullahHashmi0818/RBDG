import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getGlobalState, setGlobalState } from "../components/globalState";

import Navbar from "../components/navbar";
import DiagramCard from "../components/DiagramCard";

import "../cssFiles/diagramSelection.css";

import {
  SOA1,
  SOA2,
  ACT1,
  ACT2,
  BRK1,
  BRK2,
  CLS1,
  CLS2,
  LAY1,
  LAY2,
  MIS1,
  MIS2,
  MLT1,
  MLT2,
  MVC1,
  MVC2,
  USC1,
  USC2,
} from "../components/DiagramImgPaths.js";

const DiagramSelection = () => {
  let navigate = useNavigate();
  const goBack = () => {
    //this
    navigate("/PreviewRequirements");
  };

  const [modulescleaned, setModulesCleaned] = useState(
    getGlobalState("cleaned_requirements")
  );

  const location = useLocation();
  const { updatedModules } = location.state || {};
  console.log("Data from preview page: ", updatedModules);

  const handleChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedText = selectedOption ? selectedOption.text : "";
    console.log("Selected Module:", selectedText);

    if (selectedText !== "---") {
      setGlobalState("isModuleSelected", true);
      setGlobalState("selectedModule", selectedText);
    }
  };

  return (
    <div className="uploadBg1">
      {console.log(getGlobalState("cleaned_requirements"))}
      <Navbar />
      <div className="controlBar1">
        <div className="backButton" onClick={goBack}>
          <p>&lt;</p>
        </div>
        <div className="title1">
          <div id="innerBar1"></div>
          <div id="innerContent1">
            <p>Select Diagram</p>
            <p id="slash2">|</p>
            <div id="requirementsMenu">
              <div>Requirements</div>
              {/* <div id="buttonTab">
                <button>Preview</button>
                <button>Submit New</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div id="selectionBox">
        <h3>Architecture Diagrams</h3>
        <div className="architectureBox">
          <DiagramCard diagramName="SOA" defaultImg={SOA1} hoveredImg={SOA2} />
          <DiagramCard diagramName="MVC" defaultImg={MVC1} hoveredImg={MVC2} />
          <DiagramCard diagramName="MLT" defaultImg={MLT1} hoveredImg={MLT2} />
          <DiagramCard diagramName="CLS" defaultImg={CLS1} hoveredImg={CLS2} />
          <DiagramCard diagramName="MIS" defaultImg={MIS1} hoveredImg={MIS2} />
          <DiagramCard diagramName="LAY" defaultImg={LAY1} hoveredImg={LAY2} />
          <DiagramCard diagramName="BRK" defaultImg={BRK1} hoveredImg={BRK2} />
        </div>
        <div className="moduleSelectionSelect">
          <h3>UML Diagrams</h3>
          <select defaultChecked="---" onChange={handleChange}>
            <option value="---" key="---">
              Select Module
            </option>
            {modulescleaned.map((item) => (
              <option value={item.moduleName} key={item.moduleName}>
                {item.moduleName}
              </option>
            ))}
          </select>
        </div>
        <div className="architectureBox">
          <DiagramCard diagramName="ACT" defaultImg={ACT1} hoveredImg={ACT2} />
          <DiagramCard diagramName="USC" defaultImg={USC1} hoveredImg={USC2} />
        </div>
        <br></br>
        <div></div>
      </div>
    </div>
  );
};

export default DiagramSelection;
