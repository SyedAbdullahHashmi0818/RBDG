import React from "react";
import "../cssFiles/uploadbyPrompt.css";
import trashIcon from "../images/trash.png";

const FormElement = (props) => {
  const { index, moduleName, requirements, deleteFunction, list, setList } =
    props;

  const handleRequirementChange = (event) => {
    const updatedList = list.map((item) =>
      item.index === index
        ? { ...item, requirements: event.target.value }
        : item
    );
    setList(updatedList);
  };

  const handleModuleChange = (event) => {
    const updatedList = list.map((item) =>
      item.index === index ? { ...item, moduleName: event.target.value } : item
    );
    setList(updatedList);
  };

  return (
    <div className="formElement">
      <div className="elementControlBar">
        <div className="moduleInfo">
          <div className="idDiv">
            <p className="formElementId">{index}</p>
          </div>
          <div>
            <input
              className="formElementName"
              value={moduleName}
              type="text"
              placeholder="Enter your module name here"
              onChange={handleModuleChange}
            />
          </div>
        </div>
        <div
          className="delBoxInner"
          onClick={() => deleteFunction(index, list)}
        >
          <img id="trash" src={trashIcon}></img>
        </div>
      </div>
      <textarea
        type="text"
        placeholder="Enter your requirements here"
        className="promptBox"
        value={requirements}
        onChange={handleRequirementChange}
      />
    </div>
  );
};

export default FormElement;
