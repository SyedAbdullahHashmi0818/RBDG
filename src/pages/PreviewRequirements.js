import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import RequirementsTable from "../components/TableComponents/Table";
import "../cssFiles/uploadbyPrompt.css";

import trashIcon from "../images/trash.png";

const PreviewRequirements = () => {
  const [modulesList, setModulesList] = useState([
    {
      index: "1",
      moduleName: "Module 1",
      requirements: ["req1", "req2"],
    },
    {
      index: "2",
      moduleName: "Module 2",
      requirements: ["req1", "req2", "req3"],
    },
    {
      index: "3",
      moduleName: "Module 3",
      requirements: ["req1"],
    },
  ]);

  let navigate = useNavigate();
  const goBack = () => {
    navigate("/UploadByPrompt");
  };

  function getListElements() {
    console.log(modulesList);
  }

  function addModule() {
    console.log(...modulesList);
    setModulesList([
      ...modulesList,
      {
        index: `${modulesList.length + 1}`,
        moduleName: "",
        requirements: [""],
      },
    ]);
  }

  function deleteModule(index, modulesList) {
    if (modulesList.length === 1) {
      setModulesList([
        {
          index: "1",
          moduleName: "",
          requirements: [""],
        },
      ]);
      return;
    }

    const updatedList = modulesList.filter(
      (item) => item.index !== index.toString()
    );
    console.log(updatedList);
    const adjustedList = updatedList.map((item, i) => {
      return { ...item, index: (i + 1).toString() };
    });
    setModulesList(adjustedList);
  }

  function deleteAllModules() {
    setModulesList([
      {
        index: "1",
        moduleName: "",
        requirements: [""],
      },
    ]);
  }

  return (
    <div className="uploadBg">
      <Navbar />
      <div className="controlBar">
        <div className="backButton" onClick={goBack}>
          <p>&lt;</p>
        </div>
        <div className="title">
          <div id="innerBar"></div>
          <div id="innerContent">
            <p>Preview Your Requirements</p>
            <div className="delBox">
              <img
                id="trash"
                src={trashIcon}
                alt="img"
                onClick={deleteAllModules}
              ></img>
            </div>
          </div>
        </div>
        <div className="submitButton" onClick={getListElements}>
          <p>Done</p>
        </div>
      </div>
      <div className="formSection">
        <div>
          {modulesList.map((item, i) => (
            <ul key={i}>
              <li>
                <RequirementsTable
                  requirements={item.requirements}
                  modulesList={modulesList}
                  index={item.index}
                  setModulesList={setModulesList}
                  moduleName={item.moduleName}
                  deleteModule={deleteModule}
                />
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className="addButton" onClick={addModule}>
        <p>+</p>
      </div>
    </div>
  );
};

export default PreviewRequirements;
