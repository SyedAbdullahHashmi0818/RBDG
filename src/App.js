import { React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UploadRequirements from "./pages/UploadRequirements";
import PreviewRequirements from "./pages/PreviewRequirements";
import Flow from "./pages/DummyPage";
import FlowActivity from "./pages/DummyActivity";
import FlowUsecase from "./pages/DummyUsecase";
import UploadByPrompt from "./pages/UploadByPrompt";
import UploadByFile from "./pages/UploadByFile";
import DiagramSelection from "./pages/DiagramSelection";
import "./cssFiles/rootTheme.css";

import MainLogo from "./components/MainLogo";
import landingImage from "./images/landingPage1.png";
import arrowIcon from "./images/arrowIconD.png";
import arrowIcon1 from "./images/arrowIcon.png";
import gitcat from "./images/gitcat.png";
import timeOver from "./gifs/7.gif";
import confusedRobot from "./gifs/8.gif";
import importantPiece from "./gifs/9.gif";
import fileUpload from "./gifs/fileUpload.gif";
import mlMagic from "./gifs/mlMagic.gif";
import previewMellow from "./gifs/previewMellow.gif";
import demoVid from "./videos/cropped.mp4";
import colab from "./images/logos/colab.png";
import css from "./images/logos/css.png";
import html from "./images/logos/html.png";
import js from "./images/logos/js.png";
import react from "./images/logos/react.png";
import reactflow from "./images/logos/reactflow.png";
import vscode from "./images/logos/vscode.png";
import python from "./images/logos/python.png";
import numpy from "./images/logos/numpy.png";
import matplotlib from "./images/logos/matplotlib.png";
import pycharm from "./images/logos/pycharm.png";
import tensorflow from "./images/logos/tensorflow.png";
import pytorch from "./images/logos/pytorch.png";
import mermaid from "./images/logos/mermaid.png";
import pandas from "./images/logos/pandas.png";
import json from "./images/logos/json.png";

import "./cssFiles/landingPage.css";

const App = () => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });

    document.querySelectorAll("#logoImgBox img").forEach((img) => {
      const randomDelay = Math.random() * 2; // Random delay between 0 and 2 seconds
      img.style.animationDelay = `${randomDelay}s`;
    });
  });

  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">LandingPage</Link>
          </li>
          <li>
            <Link to="/UploadRequirements">Upload</Link>
          </li>
          <li>
            <Link to="/PreviewRequirements">Preview</Link>
          </li>
          <li>
            <Link to="/DummyPage">dummyPage</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/uploadRequirements" element={<UploadRequirements />} />
        <Route path="/previewRequirements" element={<PreviewRequirements />} />
        <Route path="/dummyPage" element={<Flow />} />
        <Route path="/dummyActivity" element={<FlowActivity />} />
        <Route path="/dummyUsecase" element={<FlowUsecase />} />
        <Route path="/uploadByPrompt" element={<UploadByPrompt />} />
        <Route path="/uploadByFile" element={<UploadByFile />} />
        <Route path="/diagramSelection" element={<DiagramSelection />} />
      </Routes>
    </Router>
  );
};

const AppContent = () => {
  let navigate = useNavigate();
  const goToFile = () => {
    navigate("/uploadRequirements");
  };

  return (
    <div className="uploadBg">
      <nav className="navbarHome">
        <div>
          <MainLogo />
          <a href="#definitionText">What it is</a>
          <a href="#solutionBox">How it works</a>
          <a href="#benefitBox">Benefits</a>
        </div>
        <div>
          <a href="#bottomBox">More Info</a>
          <a
            href="https://github.com/SyedAbdullahHashmi0818/RBDG"
            target="_blank"
            rel="noopener noreferrer"
            id="gitCatAnchor"
          >
            <img src={gitcat} alt="img" />
          </a>
        </div>
      </nav>
      <div className="overflowDiv">
        <div id="landingPageBox">
          <div id="whatitis">
            <div id="textBox">
              <p>Convert Software Requirements</p>
              <div>
                <p>into </p>
                <p> Software Diagrams</p>
              </div>
              <p>With Requirement Based Diagram Generator</p>
            </div>
            <div className="getStartedButton" onClick={goToFile}>
              <p>Get Started</p>
              <img src={arrowIcon} alt="img" />
            </div>
            <img src={landingImage} alt="img" id="landingImage" />
          </div>
          <div className="contentBox">
            <p id="definitionText">
              "A Web-Based Application that takes in Functional Requirements and
              converts them into <strong>Software Diagrams</strong> by using{" "}
              <strong>NLP</strong> and <strong>ML</strong> greatly assisting in
              the design process"
            </p>
            <div id="definition">
              <p>Problems Faced During Development</p>
              <div className="problemBox">
                <div>
                  <img src={timeOver} alt="timeOver" />
                  <p className="problemText">
                    Understanding context of the whole systems takes time
                  </p>
                </div>
                <div>
                  <img src={confusedRobot} alt="confused robot" />
                  <p className="problemText">
                    Ambiguity in Functional Requirements
                  </p>
                </div>
                <div>
                  <img src={importantPiece} alt="importantPiece" />
                  <p className="problemText">
                    The Project is based upon the System Design
                  </p>
                </div>
              </div>
            </div>
            <div id="solutionBox">
              <p>Our Solution</p>
              <div id="vidBox">
                <video autoPlay loop muted>
                  <source src={demoVid} type="video/mp4" />
                </video>
              </div>
              <div className="solutionSteps">
                <div id="step1">
                  <img src={fileUpload} alt="file upload" />
                  <p>Upload requirements through File or Prompt</p>
                </div>
                <div id="step2">
                  <img src={previewMellow} alt="preview mellow" />
                  <p>Preview and edit processed requirements</p>
                </div>
                <div id="step3">
                  <img src={mlMagic} alt="ml magic" />
                  <p>Select the diagram type to be generated</p>
                </div>
              </div>
            </div>
            <div id="benefitBox">
              <p>Benefits</p>
              <div id="innerBenefitBox">
                <div id="b1">
                  <p className="benefitHeading">
                    Streamlined Development Process
                  </p>
                  <ul>
                    <li>
                      <p className="innerBenefits">
                        Automates the generation of system architectures based
                        on functional requirements.
                      </p>
                    </li>
                    <li>
                      <p className="innerBenefits">
                        Reduces manual errors in designing complex systems.
                      </p>
                    </li>
                    <li>
                      <p className="innerBenefits">
                        Saves time by generating consistent, standardized
                        diagrams.
                      </p>
                    </li>
                  </ul>
                </div>
                <div id="b2">
                  <p className="benefitHeading">
                    Improved Understanding and Communication
                  </p>
                  <ul>
                    <li>
                      <p className="innerBenefits">
                        Helps visualize system workflows and architecture
                        clearly.
                      </p>
                    </li>
                    <li>
                      <p className="innerBenefits">
                        Facilitates better communication among team members and
                        stakeholders.
                      </p>
                    </li>
                    <li>
                      <p className="innerBenefits">
                        Enhances understanding of system design by providing
                        structured diagrams.
                      </p>
                    </li>
                  </ul>
                </div>
                <div id="b3">
                  <p className="benefitHeading">
                    Increased Efficiency, Maintainability and Scalability
                  </p>
                  <ul>
                    <li>
                      <p className="innerBenefits">
                        Quickly adapts to changing requirements without
                        redesigning diagrams from scratch.
                      </p>
                    </li>
                    <li>
                      <p className="innerBenefits">
                        Scales easily with complex projects by generating
                        multiple diagrams in one go.
                      </p>
                    </li>
                    <li>
                      <p className="innerBenefits">
                        Supports rapid prototyping and iteration in software
                        development.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="getStartedButton1" onClick={goToFile}>
              <p>Get Started</p>
              <img src={arrowIcon1} alt="img" />
            </div>
          </div>
          <div id="bottomBox">
            <div id="logoBox">
              <p>Possible Through</p>
              <div id="logoImgBox">
                <img src={html} alt="logo" />
                <img src={css} alt="logo" />
                <img src={js} alt="logo" />
                <img src={react} alt="logo" />
                <img src={reactflow} alt="logo" />
                <img src={mermaid} alt="logo" />
                <img src={vscode} alt="logo" />
                <img src={python} alt="logo" />
                <img src={numpy} alt="logo" />
                <img src={pandas} alt="logo" />
                <img src={tensorflow} alt="logo" />
                <img src={pytorch} alt="logo" />
                <img src={matplotlib} alt="logo" />
                <img src={pycharm} alt="logo" />
                <img src={colab} alt="logo" />
                <img src={json} alt="logo" />
              </div>
            </div>
            <div>
              <ul className="nameslist">
                <li>
                  <p>A Project By</p>
                </li>
                <li>
                  <p>Muhammad Nouman SP21-BSE-035</p>
                </li>
                <li>
                  <p>Javeria Shakoor SP21-BSE-048</p>
                </li>
                <li>
                  <p>Syed Abdullah Hashmi SP21-BSE-003</p>
                </li>
                {/* <li>
                  <a href="./resources/react-flow-app/src/resources/SP24SE02_ Requirements-Based Diagram Generator.pdf">
                    Project Report
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
