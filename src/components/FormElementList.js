import React from "react";
import FormElement from "./FromElement";
import "../cssFiles/uploadbyPrompt.css";

const FormElementList = (props) => {
  return (
    <div>
      <ul id="inputList">
        {props.listItems.map((item, index) => (
          <li key={index}>
            <FormElement
              index={item.index}
              moduleName={item.moduleName}
              requirements={item.requirements}
              deleteFunction={props.deleteFunction}
              list={props.list}
              setList={props.setList}
            ></FormElement>
          </li>
        ))}
        {/* <li>
          <FormElement
            index={1}
            moduleName={"Type Your Module Here"}
            requirements={"Type your requirements here"}
          ></FormElement>
        </li>
        <li>
          <FormElement
            index={2}
            moduleName={"Type Your Module Here"}
            requirements={"Type your requirements here"}
          ></FormElement>
        </li> */}
      </ul>
    </div>
  );
};

export default FormElementList;
