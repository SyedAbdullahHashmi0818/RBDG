import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getGlobalState, setGlobalState } from "../components/globalState";
import Popup from "reactjs-popup";

import Navbar from "../components/navbar";
import RequirementsTable from "../components/TableComponents/Table";
import "../cssFiles/uploadbyPrompt.css";

import loadingWheel from "../gifs/Loading (1).gif";
import trashIcon from "../images/trash.png";

const PreviewRequirements = () => {
  // added this line here
  const [loading, setLoading] = useState(false);
  const [modulesList, setModulesList] = useState(
    getGlobalState("cleaned_requirements")
  );
  // added line ends here

  // const [modulesList, setModulesList] = useState([
  //   {
  //     index: "1",
  //     moduleName: "Module 1",
  //     requirements: [
  //       "Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien. Lorem Ipsum har været standard fyldtekst siden 1500-tallet, hvor en ukendt trykker sammensatte en tilfældig spalte for at trykke en bog til sammenligning af forskellige skrifttyper. Lorem Ipsum har ikke alene overlevet fem århundreder, men har også vundet indpas i elektronisk typografi uden væsentlige ændringer. Sætningen blev gjordt kendt i 1960'erne med lanceringen af Letraset-ark, som indeholdt afsnit med Lorem Ipsum, og senere med layoutprogrammer som Aldus PageMaker, som også indeholdt en udgave af Lorem Ipsum.",
  //       "req2",
  //     ],
  //   },
  //   {
  //     index: "2",
  //     moduleName: "Module 2",
  //     requirements: ["req1", "req2", "req3"],
  //   },
  //   {
  //     index: "3",
  //     moduleName: "Module 3",
  //     requirements: ["req1"],
  //   },
  // ]);

  const location = useLocation();
  const id = location.state;

  let navigate = useNavigate();
  // OLD goBack Code
  // const goBack = () => {
  //   navigate("/UploadByPrompt");
  // };

  // NEW JAVERIA GOBACK CODE
  const goBack = () => {
    setLoading(true);
    fetch(`http://localhost:8000/requirements/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/UploadByPrompt");
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // JAVERIA GOBACK ENDS HERE

  //added this function here
  function checkForMissingValuesInPreview() {
    var hasMissingValues = false;
    modulesList.forEach((item) => {
      if (item["moduleName"] === "") {
        alert("Missing Module Name in Module " + item["index"]);
        hasMissingValues = true;
      }
      item["requirements"].forEach((requirement) => {
        if (requirement === "") {
          alert("Missing Module Name in Requirement " + item["index"]);
          hasMissingValues = true;
        }
      });
    });
    return hasMissingValues;
  }

  // JAVERIA USEEFFECT GOES HERE
  // Fetch data when the component loads
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/requirements/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Preview Page Request (GET) Success:", data);
        // Transform the data into the desired format for modulesList
        const transformedData = data.map((item, index) => ({
          index: `${index + 1}`, // Set the index starting from 1
          moduleName: item.name, // Use the 'name' field for moduleName
          requirements: item.requirements.split("\n").filter(Boolean), // Split requirements by '\n' and remove empty strings
        }));
        setModulesList(transformedData); // Update state with transformed data
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]); // Dependency on `id`
  // JAVERIA USEEFFECT ENDS HERE

  // OLD FUNCTION ON SUBMIT
  // function getListElements() {
  //   console.log(modulesList);
  // }

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

  // JAVERIA HANDLE SUBMIT
  function handleSubmit() {
    if (checkForMissingValuesInPreview()) {
      console.log("this gets returned");
      return;
    }
    // Transform modulesList to prepare data for sending to the backend
    setGlobalState("cleaned_requirements", modulesList);
    const updatedModules = modulesList.map((module) => ({
      project: id,
      name: module.moduleName,
      requirements: module.requirements.join("\n"), // Concatenate requirements with '\n'
    }));
    navigate("/diagramSelection", { state: { updatedModules } });
  }
  // JAVERIA HANDLE SUBMIT ENDS HERE

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
        <div className="submitButton" onClick={handleSubmit}>
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

export default PreviewRequirements;
