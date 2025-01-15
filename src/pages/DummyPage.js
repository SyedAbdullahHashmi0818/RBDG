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
import { components, layers, edges } from "../components/Data";
import { HexColorPicker } from "react-colorful";

import "@xyflow/react/dist/style.css";
import Popup from "reactjs-popup";

import loadingWheel from "../gifs/Loading (1).gif";
import DownloadButton from "../components/downloadButtonImage";
import TextUpdaterNode from "./TextUpdaterNode";
import ModuleUpdaterNode from "./ModuleUpdaterNode";
import ArchiTextUpdaterNode from "./ArchiTextUpdaterNode";
// import nodesPrime from "./nodes"; // Import nodes
// import edgesPrime from "./edges"; // Import edges
import "../cssFiles/dummyPage.css";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  moduleUpdater: ModuleUpdaterNode,
  archiTextUpdaterNode: ArchiTextUpdaterNode,
};

const defaultEdgeOptions = {
  animated: true,
  style: {
    strokeWidth: 3,
    stroke: "#d47d2c",
  },
  type: "smoothstep",
};

function Flow() {
  const location = useLocation();
  // const { id } = location.id || {};
  const { id } = location.state || {};

  let navigate = useNavigate();
  const goBack = () => {
    navigate("/diagramSelection");
  };

  //this
  const [color, setColor] = useState("#aabbcc");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorOccured, setErrorOccured] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uniqueComponents, setUniqueComponents] = useState([]); // Store unique components from API
  const [classificationDictionary, setClassificationDictionary] = useState({}); // Store classification layers from API
  const [relationships, setRelationships] = useState([]);

  const [nodes, setNodes] = useState(generateNodes());
  const [edgesState, setEdges] = useState(generateEdges());
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
        data: { label: "Hey I'm a Node" },
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

  useEffect(() => {
    if (
      uniqueComponents.length &&
      classificationDictionary &&
      relationships.length
    ) {
      setNodes(generateNodes()); // Generate nodes dynamically
      setEdges(generateEdges()); // Generate edges dynamically
    }
  }, [uniqueComponents, classificationDictionary, relationships]);

  // Delete edge function
  const deleteEdge = useCallback(() => {
    if (selectedEdgeId) {
      setEdges((eds) =>
        eds.filter((edgesState) => edgesState.id !== selectedEdgeId)
      ); // Remove selected edge
      setSelectedEdgeId(null); // Reset edge selection
      setEdgesStyle((prevStyle) => {
        const newStyle = { ...prevStyle };
        delete newStyle[selectedEdgeId]; // Remove style for the deleted edge
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

  // Handle edge click to select an edge, or deselect it if it's already selected
  const onEdgeClick = useCallback(
    (event, edgesState) => {
      // Toggle selection
      if (selectedEdgeId === edgesState.id) {
        setSelectedEdgeId(null); // Deselect if already selected
        setEdgesStyle((prevStyle) => {
          const newStyle = { ...prevStyle };
          delete newStyle[edgesState.id]; // Remove style for deselected edge
          return newStyle;
        });
      } else {
        setSelectedEdgeId(edgesState.id);
        setEdgesStyle((prevStyle) => ({
          ...prevStyle,
          [edgesState.id]: { strokeWidth: 2, stroke: "#ff6347" }, // Increase stroke width and change color
        }));
      }
    },
    [selectedEdgeId]
  );

  // Automatically zoom out when the page loads
  useEffect(() => {
    setLoading(true);
    setViewport((prev) => ({ ...prev, zoom: 0.75 })); // Set initial zoom to 75%
    // Send request to Django API to load the dummy page
    fetch(`http://localhost:8000/load_dummy_page/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { unique_components, classification_dictionary, relationships } =
          data;
        setUniqueComponents(unique_components); // Set the unique components from API data
        setClassificationDictionary(classification_dictionary); // Set the classification dictionary from API data
        setRelationships(relationships);
        console.log("data received: ", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // setErrorOccured(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Function to apply custom edge styles
  const edgeStyles = (edgeId) => {
    return edgesStyle[edgeId] || {}; // Apply custom styles if the edge is selected
  };

  function generateNodes() {
    const nodesArray = [];
    const processedLayers = new Set(); // Track processed layers
    let currentLayerPosition = { x: 0, y: 50 }; // Starting position for the first layer

    Object.keys(classificationDictionary).forEach((layerName) => {
      // Skip duplicate layer names
      if (processedLayers.has(layerName)) {
        console.warn(`Duplicate layer name ignored: ${layerName}`);
        return;
      }

      processedLayers.add(layerName);

      // Retrieve components for this layer
      const componentsInLayer = classificationDictionary[layerName];
      const processedComponents = new Set(); // Track components within the layer

      // Create the layer node
      nodesArray.push({
        id: layerName,
        type: "moduleUpdater",
        data: { label: layerName.replace(/_/g, " ") },
        position: { x: currentLayerPosition.x, y: currentLayerPosition.y },
        style: {
          border: "none",
          backgroundColor: "rgba(118, 155, 211, 0.48)",
          width: 300,
          height: componentsInLayer.length * 100 + 125, // Adjust height based on number of components
          borderRadius: "8px",
          color: "#072643",
          overflow: "hidden",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });

      // Add component nodes inside the layer
      componentsInLayer.forEach((component, compIndex) => {
        // Skip duplicate components within the same layer
        if (processedComponents.has(component)) {
          console.warn(
            `Duplicate component in layer '${layerName}' ignored: ${component}`
          );
          return;
        }

        processedComponents.add(component);

        nodesArray.push({
          id: `${layerName}-${component}`, // Ensure unique ID by including layer name
          type: "archiTextUpdaterNode",
          data: { label: component },
          position: { x: 20, y: 100 + compIndex * 100 },
          parentId: layerName,
          style: {
            zIndex: 1,
            position: "absolute",
          },
        });
      });

      // Update position for the next layer
      currentLayerPosition.x += 400; // Adjust spacing between layers
    });

    return nodesArray;
  }

  function generateEdges() {
    return relationships
      .map((edge, index) => {
        const [source, target] = edge;

        // Generate unique IDs for the source and target
        const isSourceLayer = classificationDictionary.hasOwnProperty(source);
        const isTargetLayer = classificationDictionary.hasOwnProperty(target);

        const sourceId = isSourceLayer
          ? source
          : `${getLayerForComponent(source)}-${source}`;
        const targetId = isTargetLayer
          ? target
          : `${getLayerForComponent(target)}-${target}`;

        // Ensure sourceId and targetId exist before creating an edge
        if (sourceId && targetId) {
          return {
            id: `e-${index}`,
            source: sourceId,
            target: targetId,
            animated: true,
            style: {
              strokeWidth: 3,
              stroke: "#f4aa64",
            },
          };
        }

        return null; // Skip invalid edges
      })
      .filter((edge) => edge !== null); // Remove null edges
  }

  // Helper function to find the layer for a given component
  function getLayerForComponent(componentName) {
    for (const layerName in classificationDictionary) {
      if (classificationDictionary[layerName].includes(componentName)) {
        return layerName;
      }
    }
    console.warn(`Component '${componentName}' does not belong to any layer.`);
    return null; // Return null if the component is not found in any layer
  }

  // // Function to generate edges dynamically
  // function generateEdges() {
  //   return relationships
  //     .map((edge, index) => {
  //       const [source, target] = edge;

  //       // Check if the source and target are layer or component nodes
  //       const isSourceLayer = classificationDictionary.hasOwnProperty(source);
  //       const isTargetLayer = classificationDictionary.hasOwnProperty(target);
  //       const isSourceComponent = uniqueComponents.includes(source);
  //       const isTargetComponent = uniqueComponents.includes(target);

  //       // Only create the edge if the relationship is valid
  //       if (
  //         (isSourceLayer && isTargetLayer) || // Layer to Layer
  //         (isSourceComponent && isTargetComponent) || // Component to Component
  //         (isSourceLayer && isTargetComponent) || // Layer to Component
  //         (isSourceComponent && isTargetLayer) // Component to Layer
  //       ) {
  //         return {
  //           id: `e-${index}`,
  //           source: source,
  //           target: target,
  //           animated: true,
  //           style: {
  //             strokeWidth: 3,
  //             stroke: "#f4aa64",
  //           },
  //         };
  //       }
  //       return null; // Skip invalid edges
  //     })
  //     .filter((edge) => edge !== null); // Remove null edges (invalid connections)
  // }

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edgesState.map((edgesState) => ({
          ...edgesState,
          style: { ...edgesState.style, ...edgeStyles(edgesState.id) }, // Apply custom styles to edges
        }))}
        onEdgesChange={onEdgesChange}
        nodesDraggable={true} // Allows nodes to be draggable
        nodesConnectable={true} // Allows nodes to connect to each other
        elementsSelectable={true} // Allows nodes and edges to be selectable
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        viewport={viewport} // Controlled viewport
        onViewportChange={onViewportChange} // Handle changes
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick} // Handle edge click to select or deselect
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
                mermaidCode={
                  JSON.stringify(uniqueComponents) +
                  JSON.stringify(classificationDictionary) +
                  JSON.stringify(relationships)
                }
                jsonCode={
                  JSON.stringify(uniqueComponents) +
                  JSON.stringify(classificationDictionary) +
                  JSON.stringify(relationships)
                }
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
        </div>
      </ReactFlow>
    </div>
  );
}

export default Flow;
