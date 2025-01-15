// import { React, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import UploadRequirements from "./pages/UploadRequirements";
// import PreviewRequirements from "./pages/PreviewRequirements";
// import Flow from "./pages/DummyPage";
// import UploadByPrompt from "./pages/UploadByPrompt";
// import UploadByFile from "./pages/UploadByFile";
// import DiagramSelection from "./pages/DiagramSelection";
// import "./cssFiles/rootTheme.css";

// import MainLogo from "./components/MainLogo";
// import landingImage from "./images/landingPage1.png";
// import arrowIcon from "./images/arrowIconD.png";
// import arrowIcon1 from "./images/arrowIcon.png";
// import gitcat from "./images/gitcat.png";
// import timeOver from "./gifs/7.gif";
// import confusedRobot from "./gifs/8.gif";
// import importantPiece from "./gifs/9.gif";
// import fileUpload from "./gifs/fileUpload.gif";
// import mlMagic from "./gifs/mlMagic.gif";
// import previewMellow from "./gifs/previewMellow.gif";
// import demoVid from "./videos/cropped.mp4";
// import "./cssFiles/landingPage.css";

// const App = () => {
//   useEffect(() => {
//     document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//       anchor.addEventListener("click", function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute("href")).scrollIntoView({
//           behavior: "smooth",
//         });
//       });
//     });
//   });

//   return (
//     <Router>
//       {/* <nav>
//         <ul>
//           <li>
//             <Link to="/">LandingPage</Link>
//           </li>
//           <li>
//             <Link to="/UploadRequirements">Upload</Link>
//           </li>
//           <li>
//             <Link to="/PreviewRequirements">Preview</Link>
//           </li>
//           <li>
//             <Link to="/DummyPage">dummyPage</Link>
//           </li>
//         </ul>
//       </nav> */}
//       <Routes>
//         <Route path="/" element={<AppContent />} />
//         <Route path="/uploadRequirements" element={<UploadRequirements />} />
//         <Route path="/previewRequirements" element={<PreviewRequirements />} />
//         <Route path="/dummyPage" element={<Flow />} />
//         <Route path="/uploadByPrompt" element={<UploadByPrompt />} />
//         <Route path="/uploadByFile" element={<UploadByFile />} />
//         <Route path="/diagramSelection" element={<DiagramSelection />} />
//       </Routes>
//     </Router>
//   );
// };

// const AppContent = () => {
//   return (
//     <div className="uploadBg">
//       <nav className="navbarHome">
//         <div>
//           <MainLogo />
//           <a href="#definitionText">What it is</a>
//           <a href="#solutionBox">How it works</a>
//           <a href="#benefitBox">Benefits</a>
//         </div>
//         <div>
//           <a href="#bottomBox">More Info</a>
//           <img src={gitcat} alt="img" />
//         </div>
//       </nav>
//       <div className="overflowDiv">
//         <div id="landingPageBox">
//           <div id="whatitis">
//             <div id="textBox">
//               <p>Convert Software Requirements</p>
//               <div>
//                 <p>into </p>
//                 <p> Software Diagrams</p>
//               </div>
//               <p>With Requirement Based Diagram Generator</p>
//             </div>
//             <div className="getStartedButton">
//               <p>Get Started</p>
//               <img src={arrowIcon} alt="img" />
//             </div>
//             <img src={landingImage} alt="img" id="landingImage" />
//           </div>
//           <div className="contentBox">
//             <p id="definitionText">
//               "A Web-Based Application that takes in Functional Requirements and
//               converts them into <strong>Software Diagrams</strong> by using{" "}
//               <strong>NLP</strong> and <strong>ML</strong> greatly assisting in
//               the design process"
//             </p>
//             <div id="definition">
//               <p>Problems Faced During Development</p>
//               <div className="problemBox">
//                 <div>
//                   <img src={timeOver} alt="timeOver" />
//                   <p className="problemText">
//                     Understanding context of the whole systems takes time
//                   </p>
//                 </div>
//                 <div>
//                   <img src={confusedRobot} alt="confused robot" />
//                   <p className="problemText">
//                     Ambiguity in Functional Requirements
//                   </p>
//                 </div>
//                 <div>
//                   <img src={importantPiece} alt="importantPiece" />
//                   <p className="problemText">
//                     The Project is based upon the System Design
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div id="solutionBox">
//               <p>Our Solution</p>
//               <div id="vidBox">
//                 <video autoPlay loop muted>
//                   <source src={demoVid} type="video/mp4" />
//                 </video>
//               </div>
//               <div className="solutionSteps">
//                 <div id="step1">
//                   <img src={fileUpload} alt="file upload" />
//                   <p>Upload requirements through File or Prompt</p>
//                 </div>
//                 <div id="step2">
//                   <img src={previewMellow} alt="preview mellow" />
//                   <p>Preview and edit processed requirements</p>
//                 </div>
//                 <div id="step3">
//                   <img src={mlMagic} alt="ml magic" />
//                   <p>Select the diagram type to be generated</p>
//                 </div>
//               </div>
//             </div>
//             <div id="benefitBox">
//               <p>Benefits</p>
//               <div id="innerBenefitBox">
//                 <div id="b1">
//                   <p className="benefitHeading">
//                     Streamlined Development Process
//                   </p>
//                   <ul>
//                     <li>
//                       <p>
//                         Automates the generation of system architectures based
//                         on functional requirements.
//                       </p>
//                     </li>
//                     <li>
//                       <p>Reduces manual errors in designing complex systems.</p>
//                     </li>
//                     <li>
//                       <p>
//                         Saves time by generating consistent, standardized
//                         diagrams.
//                       </p>
//                     </li>
//                   </ul>
//                 </div>
//                 <div id="b2">
//                   <p className="benefitHeading">
//                     Improved Understanding and Communication
//                   </p>
//                   <ul>
//                     <li>
//                       <p>
//                         Helps visualize system workflows and architecture
//                         clearly.
//                       </p>
//                     </li>
//                     <li>
//                       <p>
//                         Facilitates better communication among team members and
//                         stakeholders.
//                       </p>
//                     </li>
//                     <li>
//                       <p>
//                         Enhances understanding of system design by providing
//                         structured diagrams.
//                       </p>
//                     </li>
//                   </ul>
//                 </div>
//                 <div id="b3">
//                   <p className="benefitHeading">
//                     Increased Efficiency, Maintainability and Scalability
//                   </p>
//                   <ul>
//                     <li>
//                       <p>
//                         Quickly adapts to changing requirements without
//                         redesigning diagrams from scratch.
//                       </p>
//                     </li>
//                     <li>
//                       <p>
//                         Scales easily with complex projects by generating
//                         multiple diagrams in one go.
//                       </p>
//                     </li>
//                     <li>
//                       <p>
//                         Supports rapid prototyping and iteration in software
//                         development.
//                       </p>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="getStartedButton1">
//               <p>Get Started</p>
//               <img src={arrowIcon1} alt="img" />
//             </div>
//           </div>
//           <div id="bottomBox"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
