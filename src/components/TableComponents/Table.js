import { React } from "react";
import "../../cssFiles/table.css";
import trashIcon from "../../images/trash.png";

const RequirementsTable = (props) => {
  const {
    requirements,
    modulesList,
    index,
    setModulesList,
    moduleName,
    deleteModule,
  } = props;

  const updateRequirements = (event, i) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[i] = event.target.value;
    const updatedList = modulesList.map((item) =>
      item.index === index
        ? { ...item, requirements: updatedRequirements }
        : item
    );
    setModulesList(updatedList);
  };

  const updateModuleName = (event) => {
    const updatedList = modulesList.map((item) =>
      item.index === index ? { ...item, moduleName: event.target.value } : item
    );
    setModulesList(updatedList);
  };

  function addRequirement() {
    const updatedRequirements = [...requirements, ""];
    setModulesList(
      modulesList.map((item) =>
        item.index === index
          ? { ...item, requirements: updatedRequirements }
          : item
      )
    );
  }

  function deleteRequirement(i) {
    if (requirements.length === 1) {
      const updatedList = modulesList.map((item) =>
        item.index === index ? { ...item, requirements: [""] } : item
      );
      setModulesList(updatedList);
      return;
    }

    const dupArray = [...requirements];
    dupArray.splice(i, 1);
    const updatedList = modulesList.map((item, i) =>
      item.index === index ? { ...item, requirements: dupArray } : item
    );
    setModulesList(updatedList);
  }

  return (
    <div className="tabularReq">
      <div className="header">
        <p>{index}</p>
        <input
          type="text"
          value={moduleName}
          onChange={updateModuleName}
          placeholder="Module Name"
          className="moduleInput"
        />
      </div>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>S#</th>
              <th>Requirements</th>
              <th>
                <img
                  id="trashInner"
                  src={trashIcon}
                  onClick={() => deleteModule(index, modulesList)}
                ></img>
              </th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((requirementRow, i) => (
              <tr className="row" key={i}>
                <td className="serial"> {i + 1}</td>
                <td className="tdLine">
                  {/* <p
                    onInput={(event) => updateRequirements(event, i)}
                    contentEditable="true"
                  >
                    {requirementRow}
                  </p> */}
                  <input
                    type="text"
                    value={requirementRow}
                    onChange={(event) => updateRequirements(event, i)}
                    className="inputField"
                    placeholder="Type your requirement"
                  />
                </td>
                <td className="rowOptions">
                  <button>
                    <p id="dots">...</p>
                    <ul className="dropDown">
                      <li className="reqEdit">Reset</li>
                      <li
                        className="reqDelete"
                        onClick={() => deleteRequirement(i)}
                      >
                        Delete
                      </li>
                    </ul>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="addButton1" onClick={addRequirement}>
        <p>+</p>
      </div>
    </div>
  );
};

export default RequirementsTable;
