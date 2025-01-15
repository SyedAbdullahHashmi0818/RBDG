import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setGlobalState, getGlobalState } from "../components/globalState";
import Popup from "reactjs-popup";

import Navbar from "../components/navbar";
import "../cssFiles/uploadbyPrompt.css";
import FormElementList from "../components/FormElementList";
import trashIcon from "../images/trash.png";
import loadingWheel from "../gifs/Loading (1).gif";

const UploadByPrompt = () => {
  // added this line here
  const [modulesList, setModulesList] = useState(
    getGlobalState("concatenated_requirements")
  );
  const [loading, setLoading] = useState(false);
  // added line ends here
  // OLD USE STATE FUN
  // const [modulesList, setModulesList] = useState([
  //   {
  //     index: "1",
  //     moduleName: "",
  //     requirements: "",
  //   },
  // ]);

  let navigate = useNavigate();
  const goBack = () => {
    //this
    setGlobalState("concatenated_requirements", modulesList);
    navigate("/UploadRequirements");
  };

  //added this function here
  function checkForMissingValuesInPrompt() {
    var hasMissingValues = false;
    modulesList.forEach((item) => {
      if (item["moduleName"] === "") {
        alert("Missing Module Name in Module " + item["index"]);
        hasMissingValues = true;
      }
      if (item["requirements"] === "") {
        alert("Missing Requirements Name in Module " + item["index"]);
        hasMissingValues = true;
      }
    });
    return hasMissingValues;
  }
  // OLD FUNCTION
  // function getListElements() {
  //   var list = document.getElementById("inputList").getElementsByTagName("li");
  //   var inputListArray = [];

  //   for (var i = 0; i < list.length; i++) {
  //     inputListArray.push({
  //       index: list[i].getElementsByClassName("formElementId")[0].textContent,
  //       moduleName: list[i].getElementsByClassName("formElementName")[0].value,
  //       requirements:
  //         list[i].getElementsByClassName("promptBox")[0].textContent,
  //     });
  //   }

  //   console.log(inputListArray);
  // }

  // JAVERIA CODE
  function getListElements() {
    if (checkForMissingValuesInPrompt()) {
      console.log("this gets returned");
      return;
    }
    //this
    setGlobalState("concatenated_requirements", modulesList);
    const list = document
      .getElementById("inputList")
      .getElementsByTagName("li");
    var inputArray = [];
    for (let i = 0; i < list.length; i++) {
      const moduleName =
        list[i].getElementsByClassName("formElementName")[0].value;
      const requirementsText =
        list[i].getElementsByClassName("promptBox")[0].textContent;
      const moduleObject = {
        module: moduleName,
        requirements: requirementsText,
      };
      inputArray.push(moduleObject);
    }
    console.log("Sending to server:", inputArray);
    //this
    setLoading(true);
    fetch("http://localhost:8000/requirements/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputArray),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/previewRequirements", { state: data["project_id"] });
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    //above
  }
  // JAVERIA CODE ENDS HERE

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
      <Popup
        open={loading}
        modal
        nested
        closeOnDocumentClick={false} // Prevent closing by clicking outside
        overlayStyle={{
          background: "rgba(255, 255, 255, 0.84)", // Dark background
        }}
      >
        <div className="popup-content-uploadByPrompt">
          <img src={loadingWheel} alt="Loading..." />
          <p>Now Loading</p>
        </div>
      </Popup>
    </div>
  );
};

export default UploadByPrompt;
