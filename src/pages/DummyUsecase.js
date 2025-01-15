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
import { setGlobalState } from "../components/globalState";
import { HexColorPicker } from "react-colorful";

import "@xyflow/react/dist/style.css";
import Popup from "reactjs-popup";

import loadingWheel from "../gifs/Loading (1).gif";
import DownloadButton from "../components/downloadButtonImage";
import TextUpdaterNode from "./TextUpdaterNode";
import ModuleUpdaterNode from "./ModuleUpdaterNode";
import UseTextUpdaterNode from "./UseTextUpdaterNode";
import UseTextUpdaterNodeLeft from "./UseTextUpdaterNodeLeft";
import "../cssFiles/dummyPage.css";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  moduleUpdater: ModuleUpdaterNode,
  useTextUpdaterNode: UseTextUpdaterNode,
  useTextUpdaterNodeLeft: UseTextUpdaterNodeLeft,
};

const defaultEdgeOptions = {
  animated: true,
  style: {
    strokeWidth: 3,
    stroke: "#d47d2c",
  },
  type: "smoothstep",
};

function FlowUsecase() {
  const [color, setColor] = useState("#aabbcc");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorOccured, setErrorOccured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usecaseOutput, setUsecaseOutput] = useState([]);
  const serverResponse = [
    { "use case name": "Open Game from Installed Folder", actor: "User2" },
    { "use case name": "Open Game Main Screen", actor: "User2" },
    { "use case name": "Select Option from Main Menu", actor: "User2" },
    { "use case name": "Select Game Options", actor: "User2" },
    {
      "use case name": "Display User Options for Increasing and Decline Sound",
      actor: "User",
    },
    {
      "use case name": "Adjust Sound according to user's needs",
      actor: "User",
    },
    { "use case name": "Select Credit Options", actor: "User" },
    { "use case name": "Display Credits Details", actor: "User" },
    { "use case name": "Select Exit Options", actor: "User" },
    { "use case name": "Display Refirmation Dialog Box", actor: "User" },
    {
      "use case name":
        "exit game if user proceeds with Yes/OK in confirmation Dialogue Box",
      actor: "User",
    },
    { "use case name": "Attach Kinect Sensor to System", actor: "User" },
    {
      "use case name": "Move football in direction of leg movement",
      actor: "User",
    },
    { "use case name": "Click Play/Position button", actor: "User" },
    { "use case name": "Resume Game", actor: "User1" },
    { "use case name": "Change Sound", actor: "User1" },
    { "use case name": "Choose Next Level", actor: "User1" },
    { "use case name": "Select Play Again", actor: "User1" },
  ];

  const location = useLocation();
  const { id } = location.state || {};

  let navigate = useNavigate();
  const goBack = () => {
    setGlobalState("isModuleSelected", false);

    navigate("/diagramSelection");
  };

  const [usecaseArray, setUsecaseArray] = useState([]); // Store use case array from API
  const [nodes, setNodes] = useState([]);
  const [edgesState, setEdges] = useState([]);
  const [viewport, setViewport] = useState({ x: 400, y: 150, zoom: 0.5 });
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [edgesStyle, setEdgesStyle] = useState({}); // To track edge styles

  const addNode = useCallback(() => {
    setNodes((nds) => {
      const newNode = {
        id: uuidv4(),
        type: "textUpdater",
        position: { x: 0, y: 0 },
        data: { label: "New Node" },
      };
      console.log("Adding node:", newNode);
      return [...nds, newNode];
    });
  }, []);

  const deleteNode = useCallback(() => {
    if (selectedNodeId) {
      setNodes((nds) => {
        const updatedNodes = nds.filter((node) => node.id !== selectedNodeId);
        setEdges((eds) => {
          return eds.filter(
            (edgesState) =>
              edgesState.source !== selectedNodeId &&
              edgesState.target !== selectedNodeId
          );
        });
        return updatedNodes;
      });
      setSelectedNodeId(null);
    } else {
      alert("Please select a node to delete");
    }
  }, [selectedNodeId]);

  // useEffect(() => {
  //   if (usecaseArray.length) {
  //     setNodes(generateNodes()); // Generate nodes dynamically
  //     setEdges(generateEdges()); // Generate edges dynamically
  //   }
  // }, [usecaseArray]);

  const deleteEdge = useCallback(() => {
    if (selectedEdgeId) {
      setEdges((eds) =>
        eds.filter((edgesState) => edgesState.id !== selectedEdgeId)
      );
      setSelectedEdgeId(null);
      setEdgesStyle((prevStyle) => {
        const newStyle = { ...prevStyle };
        delete newStyle[selectedEdgeId];
        return newStyle;
      });
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
              return {
                ...node,
                data: {
                  ...node.data,
                  color: newColor,
                },
              };
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
    (event, edgesState) => {
      if (selectedEdgeId === edgesState.id) {
        setSelectedEdgeId(null);
        setEdgesStyle((prevStyle) => {
          const newStyle = { ...prevStyle };
          delete newStyle[edgesState.id];
          return newStyle;
        });
      } else {
        setSelectedEdgeId(edgesState.id);
        setEdgesStyle((prevStyle) => ({
          ...prevStyle,
          [edgesState.id]: { strokeWidth: 3, stroke: "#ff6347" },
        }));
      }
    },
    [selectedEdgeId]
  );

  useEffect(() => {
    setLoading(true);
    setViewport((prev) => ({ ...prev, zoom: 0.75 }));
    fetch(`http://localhost:8000/load_dummyUsecase/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.usecase_array)) {
          setUsecaseOutput(data.usecase_array);
          console.log("Data received:", data);
        } else {
          setUsecaseOutput(serverResponse);
          console.error("Invalid use case data format:", data);
        }
      })
      .catch((error) => {
        setUsecaseOutput(serverResponse);
        // setErrorOccured(true);
        console.error("Hey im in use case OH NO Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const edgeStyles = (edgeId) => {
    return edgesStyle[edgeId] || {};
  };

  function generateUseCaseDiagram() {
    var refined_response = [];
    for (var i = 0; i < usecaseOutput.length; i++) {
      const actorName = usecaseOutput[i].actor;
      const useCase = usecaseOutput[i]["use case name"];

      if (refined_response.length <= 0) {
        refined_response.push({
          actor: actorName,
          useCases: [useCase],
        });
      } else {
        var actorAlreadyExists = false;
        for (var j = 0; j < refined_response.length; j++) {
          if (actorName === refined_response[j].actor) {
            refined_response[j].useCases.push(useCase);
            actorAlreadyExists = true;
            break;
          }
        }
        if (!actorAlreadyExists)
          refined_response.push({
            actor: actorName,
            useCases: [useCase],
          });
      }
    }
    var functionNodes = [];
    var functionEgdes = [];
    var edgeTracker = 1;
    var idTracker = 1;
    var idTrackerLetfSide = usecaseOutput.length + 1;
    var edgeTrackerLeft = idTrackerLetfSide;

    for (var i = 0; i < refined_response.length; i++) {
      if (i % 2 == 0) {
        functionNodes.push({
          id: idTracker.toString(),
          type: "useTextUpdaterNode",
          data: { label: refined_response[i].actor },
          position: {
            x: 0,
            y:
              25 +
              idTracker * 100 +
              (refined_response[i].useCases.length / 2) * 115,
          },
          style: {
            width: "325px",
            height: "50px",
            borderRadius: "8px",
            color: "#072643",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "bold",
          },
        });
        for (var x = 0; x < refined_response[i].useCases.length; x++) {
          functionEgdes.push({
            id: edgeTracker.toString(),
            source: idTracker.toString(),
            target: (idTracker + (x + 1)).toString(),
            style: {
              strokeWidth: 2, // Set the stroke width to 4px
              stroke: "#f28e30", // Set the edge color to Tomato Red
            },
          });
          edgeTracker++;
        }
        idTracker++;
        for (var j = 0; j < refined_response[i].useCases.length; j++) {
          functionNodes.push({
            id: idTracker.toString(),
            type: "useTextUpdaterNode",
            data: { label: refined_response[i].useCases[j] },
            position: { x: 450, y: 25 + idTracker * 100 },
            style: {
              width: "325px",
              height: "50px",
              borderRadius: "8px",
              color: "#072643",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            },
          });
          idTracker++;
          edgeTracker = idTracker;
        }
      } else {
        functionNodes.push({
          id: idTrackerLetfSide.toString(),
          type: "useTextUpdaterNodeLeft",
          data: { label: refined_response[i].actor },
          position: {
            x: 1400,
            y:
              25 +
              (idTrackerLetfSide - usecaseOutput.length) * 100 +
              (refined_response[i].useCases.length / 2) * 115,
          },
          style: {
            width: "325px",
            height: "50px",
            borderRadius: "8px",
            color: "#072643",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "bold",
          },
        });
        for (var x = 0; x < refined_response[i].useCases.length; x++) {
          functionEgdes.push({
            id: edgeTrackerLeft.toString(),
            source: idTrackerLetfSide.toString(),
            target: (idTrackerLetfSide + (x + 1)).toString(),
            style: {
              strokeWidth: 2, // Set the stroke width to 4px
              stroke: "#f28e30", // Set the edge color to Tomato Red
            },
          });
          edgeTrackerLeft++;
        }
        idTrackerLetfSide++;
        for (var k = 0; k < refined_response[i].useCases.length; k++) {
          functionNodes.push({
            id: idTrackerLetfSide.toString(),
            type: "useTextUpdaterNodeLeft",
            data: { label: refined_response[i].useCases[k] },
            position: {
              x: 950,
              y: 25 + (idTrackerLetfSide - usecaseOutput.length) * 100,
            },
            style: {
              width: "325px",
              height: "50px",
              borderRadius: "8px",
              color: "#072643",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            },
          });
          idTrackerLetfSide++;
          edgeTrackerLeft = idTrackerLetfSide;
        }
      }
    }
    functionNodes.unshift({
      id: idTracker.toString(),
      type: "moduleUpdater",
      data: "",
      position: {
        x: 415,
        y: 175,
      },
      style: {
        border: "2px solid #ba820c",
        // backgroundColor: "rgba(255, 255, 255, 0.66)",
        width: refined_response.length > 1 ? "900px" : "395px",
        height:
          idTracker > idTrackerLetfSide - usecaseOutput.length
            ? idTracker * 100 - 150
            : (idTrackerLetfSide - usecaseOutput.length) * 100 - 150,
        borderRadius: "8px",
        color: "#072643",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "bold",
      },
    });
    console.log(refined_response);
    return { functionNodes, functionEgdes };
  }

  useEffect(() => {
    const { functionNodes, functionEgdes } = generateUseCaseDiagram();
    console.log("what is this" + functionNodes);
    setNodes(functionNodes);
    setEdges(functionEgdes);
  }, [usecaseOutput]);

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edgesState.map((edgesState) => ({
          ...edgesState,
          style: { ...edgesState.style, ...edgeStyles(edgesState.id) },
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
                mermaidCode={JSON.stringify(usecaseOutput)}
                jsonCode={JSON.stringify(usecaseOutput)}
                shouldShow={false}
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
        </div>
      </ReactFlow>
    </div>
  );
}

export default FlowUsecase;

// useEffect(() => {
//       setViewport((prev) => ({ ...prev, zoom: 0.75 })); // Set initial zoom to 75%
//       // Send request to Django API to load the dummy page
//       fetch(`http://localhost:8000/load_dummyUsecase/${id}`)
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("data received: ", data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }, []);
