import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

import "../cssFiles/textUpdaterStyle.css";

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="input-container">
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="text-input nodrag"
          defaultValue={data.label}
        />
      </div>
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      /> */}
      <Handle
        type="source"
        position={Position.Top}
        id="a"
        className="custom-handle"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="custom-handle"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
