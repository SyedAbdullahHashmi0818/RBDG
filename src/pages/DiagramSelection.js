import { React } from "react";
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
  return (
    <div className="uploadBg1">
      <Navbar />
      <div className="controlBar1">
        <div className="title1">
          <div id="innerBar1"></div>
          <div id="innerContent1">
            <p>Select Diagram</p>
            <p id="slash2">|</p>
            <div id="requirementsMenu">
              <div>Requirements</div>
              <div id="buttonTab">
                <button>Preview</button>
                <button>Submit New</button>
              </div>
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
        <h3>UML Diagrams</h3>
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
