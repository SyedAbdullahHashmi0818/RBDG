import { useCallback } from "react";
import { Handle, Position, NodeResizeControl } from "@xyflow/react";

import "../cssFiles/textUpdaterStyle.css";

function UseTextUpdaterNode({ data, isConnectable, selected }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const controlStyle = {
    background: "transparent",
    border: "none",
    position: "absolute",
    bottom: 5,
    right: 5,
  };

  return (
    <div
      className={`text-updater-node ${selected ? "node-selected" : ""}`}
      style={{
        position: "relative",
        minHeight: "50px",
        backgroundColor: data.color || "#fff",
      }}
    >
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl>
      <div className="input-container">
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="text-input nodrag"
          defaultValue={data.label}
        />
      </div>
      <Handle
        type="source"
        position={Position.Top}
        id="left-source"
        className="custom-handle"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="right-source"
        className="custom-handle"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="right-target"
        className="custom-handle"
        isConnectable={isConnectable}
      />
    </div>
  );
}
function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke="#b4b4b4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "absolute", right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

export default UseTextUpdaterNode;
