import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import { useState, useCallback } from "react";

import "@xyflow/react/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode";
import nodesPrime from "./nodes"; // Import nodes
import edgesPrime from "./edges"; // Import edges

const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const [nodes, setNodes] = useState(nodesPrime);
  const [edges, setEdges] = useState(edgesPrime);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodesDraggable={true} // Allows nodes to be draggable
        nodesConnectable={true} // Allows nodes to connect to each other
        elementsSelectable={true} // Allows nodes and edges to be selectable
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
