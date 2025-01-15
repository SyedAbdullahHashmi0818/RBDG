import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { getGlobalState, setGlobalState } from "../components/globalState";
import { HexColorPicker } from "react-colorful";

import "@xyflow/react/dist/style.css";
import Popup from "reactjs-popup";

import loadingWheel from "../gifs/Loading (1).gif";
import DownloadButton from "../components/downloadButtonImage";
import TextUpdaterNode from "./TextUpdaterNode";
import ModuleUpdaterNode from "./ModuleUpdaterNode";
import "../cssFiles/dummyPage.css";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  moduleUpdater: ModuleUpdaterNode,
};

const defaultEdgeOptions = {
  animated: true,
  style: {
    strokeWidth: 4,
    stroke: "#d47d2c",
  },
  type: "smoothstep",
};

function FlowActivity() {
  //this
  const [color, setColor] = useState("#aabbcc");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorOccured, setErrorOccured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activityOutput, setActivityOutput] = useState([]);
  const serverResponse = {
    activity_decision: [
      {
        ActivityName: "Instructor creates account",
        ActivityID: "A1",
        DecisionName: "Instructor created account?",
        DecisionID: "D1",
        "No Case": "Instructor fails to create account",
        noCaseID: "N1",
      },
      { ActivityName: "User creates Instructor account", ActivityID: "A2" },
      { ActivityName: "Instructor confirms account", ActivityID: "A3" },
      { ActivityName: "Maintain Instructor account", ActivityID: "A4" },
      {
        ActivityName: "Student creates account",
        ActivityID: "A5",
        DecisionName: "Student created account?",
        DecisionID: "D2",
        "No Case": "Student fails to create account",
        noCaseID: "N2",
      },
      { ActivityName: "User enters Student account", ActivityID: "A6" },
      {
        ActivityName: "Student confirms account",
        ActivityID: "A7",
        DecisionName: "Is account confirmed?",
        DecisionID: "D3",
        "Yes Case": "Student confirms account through email",
        yesCaseID: "Y1",
        "No Case": "Student fails to confirm account",
        noCaseID: "N3",
      },
      {
        ActivityName: "System keeps record of Student account",
        ActivityID: "A8",
        DecisionName: "Student account recorded?",
        DecisionID: "D4",
        "No Case": "Student account not recorded",
        noCaseID: "N4",
      },
      { ActivityName: "System provides feedback message", ActivityID: "A9" },
    ],
    diagram_names: "ACT",
  };

  const location = useLocation();
  const { id } = location.state || {};

  const navigate = useNavigate();
  const goBack = () => {
    setGlobalState("isModuleSelected", false);
    navigate("/diagramSelection");
  };

  const [nodes, setNodes] = useState([]);
  const [edgesState, setEdges] = useState([]);
  const [viewport, setViewport] = useState({ x: 400, y: 150, zoom: 0.5 });
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [edgesStyle, setEdgesStyle] = useState({});

  const addNode = useCallback(() => {
    setNodes((nds) => {
      const newNode = {
        id: uuidv4(),
        type: "textUpdater",
        position: { x: 0, y: 0 },
        data: { label: "Hey I'm a Node" },
      };
      return [...nds, newNode];
    });
  }, []);

  const deleteNode = useCallback(() => {
    if (selectedNodeId) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNodeId && edge.target !== selectedNodeId
        )
      );
      setSelectedNodeId(null);
    } else {
      alert("Please select a node to delete");
    }
  }, [selectedNodeId]);

  const deleteEdge = useCallback(() => {
    if (selectedEdgeId) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdgeId));
      setEdgesStyle((prevStyle) => {
        const newStyle = { ...prevStyle };
        delete newStyle[selectedEdgeId];
        return newStyle;
      });
      setSelectedEdgeId(null);
    } else {
      alert("Please select an edge to delete");
    }
  }, [selectedEdgeId]);

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

  const onViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  //added this code for color change
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    if (node.data.color) {
      setColor(node.data.color);
    } else {
      setColor("#transparent");
    }
  }, []);

  const updateNodeColor = useCallback(
    (newColor) => {
      if (selectedNodeId) {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === selectedNodeId) {
              // Update the node's data with the selected color
              if (node.type === "moduleUpdater") {
                return {
                  ...node,
                  style: {
                    ...node.style,
                    backgroundColor: newColor,
                  },
                };
              } else {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    color: newColor,
                  },
                };
              }
            }
            return node;
          })
        );
      }
    },
    [selectedNodeId]
  );

  useEffect(() => {
    updateNodeColor(color);
  }, [color, updateNodeColor]);
  //code for color change ends here

  const onEdgeClick = useCallback(
    (event, edge) => {
      if (selectedEdgeId === edge.id) {
        setSelectedEdgeId(null);
        setEdgesStyle((prevStyle) => {
          const newStyle = { ...prevStyle };
          delete newStyle[edge.id];
          return newStyle;
        });
      } else {
        setSelectedEdgeId(edge.id);
        setEdgesStyle((prevStyle) => ({
          ...prevStyle,
          [edge.id]: { strokeWidth: 3, stroke: "#ff6347" },
        }));
      }
    },
    [selectedEdgeId]
  );

  useEffect(() => {
    setViewport((prev) => ({ ...prev, zoom: 0.75 })); // Set initial zoom to 75%

    // Create the data to send in the body
    const requestBody = {
      moduleName: getGlobalState("selectedModule"),
    };

    // Send POST request to Django API with a JSON body
    setLoading(true);
    console.log(requestBody);
    fetch(`http://localhost:8000/load_dummyActivity/${id}`, {
      method: "POST", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Inform the server that you're sending JSON data
      },
      body: JSON.stringify(requestBody), // Convert the data to a JSON string
    })
      .then((response) => response.json())
      .then((data) => {
        const { activity_decision, requirements, diagram_names } = data;
        console.log("data received: ", data);
        console.log(
          `Received from the server ${activity_decision}, ${requirements}, ${diagram_names}`
        );
        setActivityOutput(activity_decision);
      })
      .catch((error) => {
        console.error("Error:", error);
        setActivityOutput(serverResponse.activity_decision);
        // setErrorOccured(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]); // Add dependencies if needed

  // useEffect(() => {
  //   setViewport((prev) => ({ ...prev, zoom: 0.75 })); // Set initial zoom to 75%
  //   // Send request to Django API to load the dummy page
  //   fetch(`http://localhost:8000/load_dummyActivity/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const { activity_decision, requirements, diagram_names } = data;
  //       console.log("data received: ", data);
  //       console.log(
  //         `Received from the server ${activity_decision}, ${requirements}, ${diagram_names}`
  //       );
  //       setActivityOutput(activity_decision);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       setActivityOutput(serverResponse.activity_decision);
  //     });
  // }, []);

  useEffect(() => {
    const { functionNodes, functionEgdes } = generateActivityDiagram();
    setNodes(functionNodes);
    setEdges(functionEgdes);
    console.log(nodes);
    // setNodes(generateNodes(serverResponse.activity_decision));
    // setEdges(generateEdges(serverResponse.activity_decision));
  }, [activityOutput]);

  const edgeStyles = (edgeId) => edgesStyle[edgeId] || {};

  function generateActivityDiagram() {
    var hasYesCase = true;
    var backId = 0;
    var functionNodes = [
      {
        id: "1",
        type: "input",
        data: { label: "Start" },
        style: {
          border: "2px solid #072643",
          backgroundColor: "rgba(255, 255, 255, 0.81)",
          width: "100px",
          height: "50px",
          borderRadius: "8px",
          color: "#072643",
          padding: "10px", // Add some padding to avoid edge collisions
          fontSize: "16px", // Increase font size
          fontWeight: "bold", // Increase font weight
        },
        position: { x: 293, y: 100 },
      },
    ];
    var functionEgdes = [];
    var idTracker = 1;
    var edgeTracker = 1;

    for (var i = 0; i < activityOutput.length; i++) {
      idTracker = idTracker + 1;
      if (hasYesCase)
        functionNodes.push({
          id: idTracker.toString(),
          type: "moduleUpdater",
          data: { label: activityOutput[i].ActivityName },
          position: { x: 437, y: 25 + idTracker * 100 },
          style: {
            border: "2px solid #003a6f",
            backgroundColor: "rgba(118, 155, 211, 0.48)",
            width: "325px",
            height: "50px",
            borderRadius: "8px",
            color: "#072643",
            display: "flex",
            alignItems: "center", // Stack components vertically within the layer
            padding: "10px", // Add some padding to avoid edge collisions
            fontSize: "16px", // Increase font size
            fontWeight: "bold", // Increase font weight
          },
        });
      else {
        functionNodes.push({
          id: idTracker.toString(),
          type: "moduleUpdater",
          data: {
            label: `Yes Case: ${activityOutput[i].ActivityName}`,
          },
          position: { x: 400, y: 25 + idTracker * 100 },
          style: {
            border: "2px solid #80c772",
            backgroundColor: "rgba(182, 255, 173, 0.53)",
            width: "400px",
            height: "50px",
            borderRadius: "8px",
            color: "#072643",
            display: "flex",
            alignItems: "center", // Stack components vertically within the layer
            padding: "10px", // Add some padding to avoid edge collisions
            fontSize: "16px", // Increase font size
            fontWeight: "bold", // Increase font weight
          },
        });
        hasYesCase = true;
      }
      edgeTracker = edgeTracker + 1;
      backId = idTracker - 1;
      functionEgdes.push({
        id: (edgeTracker + 100).toString(),
        source: backId.toString(),
        target: idTracker.toString(),
        style: {
          strokeWidth: 2, // Set the stroke width to 4px
          stroke: "#f28e30", // Set the edge color to Tomato Red
        },
      });

      if ("DecisionName" in activityOutput[i]) {
        idTracker = idTracker + 1;
        functionNodes.push({
          id: idTracker.toString(),
          type: "moduleUpdater",
          data: {
            label: `Decision: ${activityOutput[i].DecisionName}`,
          },
          position: { x: 165, y: 25 + idTracker * 100 },
          style: {
            border: "2px solid #ba820c",
            backgroundColor: "rgba(255, 255, 255, 0.66)",
            width: "400px",
            height: "50px",
            borderRadius: "8px",
            color: "#ba820c",
            display: "flex",
            alignItems: "center", // Stack components vertically within the layer
            padding: "10px", // Add some padding to avoid edge collisions
            fontSize: "16px", // Increase font size
            fontWeight: "bold", // Increase font weight
          },
        });
        edgeTracker = edgeTracker + 1;
        backId = idTracker - 1;
        functionEgdes.push({
          id: (edgeTracker + 100).toString(),
          source: backId.toString(),
          target: idTracker.toString(),
          style: {
            strokeWidth: 2, // Set the stroke width to 4px
            stroke: "#f28e30", // Set the edge color to Tomato Red
          },
        });
        if ("No Case" in activityOutput[i]) {
          var idTracker2 = idTracker + 1;
          functionNodes.push({
            id: (idTracker + 90).toString(),
            type: "moduleUpdater",
            data: {
              label: `No Case: ${activityOutput[i]["No Case"]}`,
            },
            position: { x: -100, y: 25 + idTracker2 * 100 },
            style: {
              border: "2px solid #ff4545",
              backgroundColor: "rgba(255, 113, 113, 0.66)",
              width: "400px",
              height: "50px",
              borderRadius: "8px",
              color: "#ba820c",
              display: "flex",
              alignItems: "center", // Stack components vertically within the layer
              padding: "10px", // Add some padding to avoid edge collisions
              fontSize: "16px", // Increase font size
              fontWeight: "bold", // Increase font weight
            },
          });
          edgeTracker = edgeTracker + 1;
          functionEgdes.push({
            id: (edgeTracker + 100).toString(),
            source: (backId + 1).toString(),
            target: (idTracker + 90).toString(),
            style: {
              strokeWidth: 2, // Set the stroke width to 4px
              stroke: "#f28e30", // Set the edge color to Tomato Red
            },
          });

          idTracker2 = idTracker2 + 1;
          functionNodes.push({
            id: (idTracker2 + 90).toString(),
            type: "moduleUpdater",
            data: {
              label: "Terminate",
            },
            position: { x: 0, y: 25 + idTracker2 * 100 },
            style: {
              border: "2px solid #ff4545",
              backgroundColor: "rgba(255, 255, 255, 0.66)",
              width: "200px",
              height: "50px",
              borderRadius: "8px",
              color: "#ba820c",
              display: "flex",
              alignItems: "center", // Stack components vertically within the layer
              padding: "10px", // Add some padding to avoid edge collisions
              fontSize: "16px", // Increase font size
              fontWeight: "bold", // Increase font weight
            },
          });
          edgeTracker = edgeTracker + 1;
          functionEgdes.push({
            id: (edgeTracker + 100).toString(),
            source: (idTracker + 90).toString(),
            target: (idTracker2 + 90).toString(),
            style: {
              strokeWidth: 2, // Set the stroke width to 4px
              stroke: "#f28e30", // Set the edge color to Tomato Red
            },
          });
        }

        if ("Yes Case" in activityOutput[i]) {
          hasYesCase = true;
          idTracker = idTracker + 1;
          functionNodes.push({
            id: idTracker.toString(),
            type: "moduleUpdater",
            data: {
              label: `Yes Case: ${activityOutput[i]["Yes Case"]}`,
            },
            position: { x: 375, y: 25 + idTracker * 100 },
            style: {
              border: "2px solid #80c772",
              backgroundColor: "rgba(182, 255, 173, 0.53)",
              width: "450px",
              height: "50px",
              borderRadius: "8px",
              color: "#ba820c",
              display: "flex",
              alignItems: "center", // Stack components vertically within the layer
              padding: "10px", // Add some padding to avoid edge collisions
              fontSize: "16px", // Increase font size
              fontWeight: "bold", // Increase font weight
            },
          });
          edgeTracker = edgeTracker + 1;
          backId = idTracker - 1;
          functionEgdes.push({
            id: (edgeTracker + 100).toString(),
            source: backId.toString(),
            target: idTracker.toString(),
            style: {
              strokeWidth: 2, // Set the stroke width to 4px
              stroke: "#f28e30", // Set the edge color to Tomato Red
            },
          });
        } else {
          hasYesCase = false;
        }
      }
    }
    idTracker = idTracker + 1;
    functionNodes.push({
      id: idTracker.toString(),
      type: "ouput",
      data: { label: "End" },
      style: {
        border: "2px solid #072643",
        backgroundColor: "rgba(255, 255, 255, 0.81)",
        width: "100px",
        height: "50px",
        borderRadius: "8px",
        color: "#072643",
        padding: "10px", // Add some padding to avoid edge collisions
        fontSize: "16px", // Increase font size
        fontWeight: "bold", // Increase font weight
      },
      position: { x: 293, y: 25 + idTracker * 110 },
    });
    edgeTracker = edgeTracker + 1;
    backId = idTracker - 1;
    functionEgdes.push({
      id: (edgeTracker + 100).toString(),
      source: backId.toString(),
      target: idTracker.toString(),
      style: {
        strokeWidth: 2,
        stroke: "#f28e30",
      },
    });

    return { functionNodes, functionEgdes };
  }

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edgesState.map((edge) => ({
          ...edge,
          style: { ...edge.style, ...edgeStyles(edge.id) },
        }))}
        onEdgesChange={onEdgesChange}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        viewport={viewport}
        onViewportChange={onViewportChange}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        defaultEdgeOptions={defaultEdgeOptions}
        minZoom={0.001}
      >
        <Background />
        <Controls />
        <div id="dummyNavigation">
          <div className="backButton" onClick={goBack}>
            <p>&lt;</p>
          </div>
          <div className="title">
            <div id="innerBar"></div>
            <div id="innerContent2">
              <DownloadButton
                mermaidCode={JSON.stringify(activityOutput)}
                jsonCode={JSON.stringify(activityOutput)}
                shouldShow={true}
              />
              <div>
                <div
                  style={{
                    background: color,
                    height: "20px",
                    width: "20px",
                    borderRadius: "50px",
                    border: "2px solid #d1d0d0",
                    marginBottom: "5px",
                  }}
                  onClick={() => setIsDisabled(!isDisabled)}
                ></div>
                <button id="addNodeButton" onClick={addNode}>
                  Add Node
                </button>
                <button id="deleteNodeButton" onClick={deleteNode}>
                  Delete Node
                </button>
                <button id="deleteEdgeButton" onClick={deleteEdge}>
                  Delete Edge
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              opacity: isDisabled ? 0 : 1, // To visually show that it's disabled
              pointerEvents: isDisabled ? "none" : "auto", // To prevent interaction
              position: "absolute",
              left: "800px",
            }}
          >
            <HexColorPicker color={color} onChange={setColor} />
          </div>
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
        <Popup
          open={errorOccured}
          modal
          nested
          closeOnDocumentClick={false} // Prevent closing by clicking outside
          overlayStyle={{
            background: "rgba(143, 143, 143, 0.84)", // Dark background
          }}
        >
          <div className="popup-content-errorOccured" onClick={goBack}>
            <div>
              <p>
                <b>Error:</b> Could not create diagram
              </p>
              <p>Check your internet connection</p>
              <div id="errorOccuredButton">CLOSE</div>
            </div>
          </div>
        </Popup>
      </ReactFlow>
    </div>
  );
}

export default FlowActivity;
