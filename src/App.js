import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UploadRequirements from "./pages/UploadRequirements";
import PreviewRequirements from "./pages/PreviewRequirements";
import Flow from "./pages/DummyPage";
import UploadByPrompt from "./pages/UploadByPrompt";
import UploadByFile from "./pages/UploadByFile";
import DiagramSelection from "./pages/DiagramSelection";
import "./cssFiles/rootTheme.css";

const App = () => {
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
        <Route path="/uploadByPrompt" element={<UploadByPrompt />} />
        <Route path="/uploadByFile" element={<UploadByFile />} />
        <Route path="/diagramSelection" element={<DiagramSelection />} />
      </Routes>
    </Router>
  );
};

const AppContent = () => {
  return <h1>Welcome to the Landing Page in App.js!</h1>;
};

export default App;
