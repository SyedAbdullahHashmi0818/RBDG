import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGlobalState } from "./globalState";

import "../cssFiles/diagramCard.css";

const DiagramCard = ({ diagramName, defaultImg, hoveredImg, data }) => {
  let navigate = useNavigate();

  const [source, setSource] = useState(defaultImg);
  const id = Array.isArray(data) && data.length > 0 ? data[0]?.project : null;
  console.log("ID: ", id);

  const handleHover = () => {
    setSource(hoveredImg);
  };

  const handleHoverOver = () => {
    setSource(defaultImg);
  };

  // OLD ONCLICK CODE
  // const sendSelection = () => {
  //   console.log(diagramName);
  // };

  // JAVERIA'S HUGE UNOPTIMIZED CODE
  function manageData() {
    if (
      !getGlobalState("isModuleSelected") &&
      (diagramName === "ACT" || diagramName === "USC")
    ) {
      console.log("No Module Selected");
      alert("Please Select a Module from the Drop Down list");
      return;
    }
    console.log(getGlobalState("selectedModule"));

    // adding these lines here
    console.log(diagramName);

    // Send DELETE request to delete existing module instances
    fetch(`http://localhost:8000/modules/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Response at modules delete react page: ", response);
        // console.log("Response at modules delete react page: ",data)
        if (!response.ok) {
          throw new Error("Failed to delete existing modules.");
        }
        return response.json();
      })
      .then(() => {
        console.log("Existing modules deleted successfully.");

        // Send POST request to create new module instances
        return fetch(`http://localhost:8000/modules/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Send updated modules
        });
      })
      .then((response) => {
        console.log("React page post called!", JSON.stringify(data));
        if (!response.ok) {
          throw new Error("Failed to delete existing modules.");
        }
        return response.json();
      })
      .then(() => {
        const diagramTypeData = {
          name: diagramName,
          project: id,
        };

        fetch(`http://localhost:8000/diagramtype/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(diagramTypeData), // Correctly stringify the data
        })
          .then((response) => {
            console.log("Response at diagram create react page: ", response);
            if (!response.ok) {
              throw new Error("Failed to create diagram type.");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Diagram Type created successfully:", data);
          })
          .catch((error) => {
            console.error("Error while creating diagram type:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // alert("An error occurred while saving modules.");
      });
    if (diagramName === "ACT") {
      navigate("/dummyActivity", { id });
    } else if (diagramName === "USC") {
      navigate("/dummyUsecase", { id });
    } else navigate("/dummyPage", { id });
  }
  // JAVERIA'S HUGE UNOPTIMIZED CODE ENDS HERE

  return (
    <div
      className="card"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOver}
      onClick={manageData}
    >
      <img src={source} alt="img" />
    </div>
  );
};

export default DiagramCard;
