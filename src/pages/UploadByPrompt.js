import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "../cssFiles/uploadbyPrompt.css";
import FormElementList from "../components/FormElementList";

import trashIcon from "../images/trash.png";

const UploadByPrompt = () => {
  const [modulesList, setModulesList] = useState([
    {
      index: "1",
      moduleName: "",
      requirements: "",
    },
  ]);

  let navigate = useNavigate();
  const goBack = () => {
    navigate("/UploadRequirements");
  };

  function getListElements() {
    var list = document.getElementById("inputList").getElementsByTagName("li");
    var inputListArray = [];

    for (var i = 0; i < list.length; i++) {
      inputListArray.push({
        index: list[i].getElementsByClassName("formElementId")[0].textContent,
        moduleName: list[i].getElementsByClassName("formElementName")[0].value,
        requirements:
          list[i].getElementsByClassName("promptBox")[0].textContent,
      });
    }

    console.log(inputListArray);
  }

  function addModule() {
    setModulesList([
      ...modulesList,
      {
        index: `${modulesList.length + 1}`,
        moduleName: "",
        requirements: "",
      },
    ]);
  }

  function deleteModule(index, modulesList) {
    // console.log("this was called");
    // console.log(index);
    // console.log(modulesList);
    if (modulesList.length === 1) {
      setModulesList([
        {
          index: "1",
          moduleName: "",
          requirements: "",
        },
      ]);
      return;
    }

    const updatedList = modulesList.filter(
      (item) => item.index !== index.toString()
    );
    console.log(updatedList);
    const adjustedList = updatedList.map((item, i) => {
      return { ...item, index: (i + 1).toString() }; // Adjust index to be sequential
    });
    setModulesList(adjustedList);
  }

  function deleteAllModules() {
    setModulesList([
      {
        index: "1",
        moduleName: "",
        requirements: "",
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
            <p>Add Your Project's Requirements</p>
            <div className="delBox">
              <img
                id="trash"
                src={trashIcon}
                alt="Img"
                onClick={deleteAllModules}
              ></img>
            </div>
          </div>
        </div>
        <div className="submitButton" onClick={getListElements}>
          <p>submit</p>
        </div>
      </div>
      <div className="formSection">
        <FormElementList
          listItems={modulesList}
          deleteFunction={deleteModule}
          list={modulesList}
          setList={setModulesList}
        />
      </div>
      <div className="addButton" onClick={addModule}>
        <p>+</p>
      </div>
    </div>
  );
};

export default UploadByPrompt;
