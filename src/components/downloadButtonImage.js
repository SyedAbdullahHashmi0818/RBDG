import React from "react";
import {
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import { toPng, toJpeg, toSvg } from "html-to-image";
import Popup from "reactjs-popup";

import "../cssFiles/dummyPage.css";
import mermaid from "../images/logos/mermaid.png";
import json from "../images/logos/json.png";

function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

function downloadImageJpeg(dataUrl) {
  const a = document.createElement("a");
  a.setAttribute("download", "reactflow.jpeg");
  a.setAttribute("href", dataUrl);
  a.click();
}

function downloadImageSVG(dataUrl) {
  const a = document.createElement("a");
  a.setAttribute("download", "reactflow.svg");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1920;
const imageHeight = 1080;

function DownloadButton(props) {
  const { mermaidCode, jsonCode, shouldShow } = props;

  const { getNodes } = useReactFlow();

  function copyMermaid() {
    navigator.clipboard
      .writeText(mermaidCode)
      .then(() => alert("Mermaid Code copied to clipboard!"))
      .catch((err) => console.error("Error copying text:", err));
  }

  function copyJson() {
    navigator.clipboard
      .writeText(jsonCode)
      .then(() => alert("JSON Code copied to clipboard!"))
      .catch((err) => console.error("Error copying text:", err));
  }

  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      1,
      2
    );

    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#ffffff",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  const onClickJpeg = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      1,
      2
    );

    toJpeg(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#ffffff",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImageJpeg);
  };

  const onClickSVG = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      1,
      2
    );

    toSvg(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#ffffff",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImageSVG);
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="download-btn" id="exportPageButton">
            Download Diagram
          </button>
        }
        modal
        nested
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.7)", // Dark background
        }}
      >
        {(close) => (
          <div className="popUp">
            <p>Please Choose Download File</p>
            <div id="downloadButton">
              <button onClick={onClick}>PNG</button>
              <button onClick={onClickJpeg}>JPEG</button>
              <button onClick={onClickSVG}>SVG</button>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#3a70a2",
                marginBottom: "none",
              }}
            >
              Note: For largers diagrams, SVG is recommended
              {/* <em>
                <b>Note:</b> For larger diagrams, SVG is recommended
              </em> */}
            </p>
            <p style={{ marginTop: "2px" }}>Or Copy Generated Code</p>
            <div
              id="downloadButton2"
              style={{ width: "220px", height: "190px" }}
            >
              <div>
                {shouldShow && (
                  <div>
                    <img
                      src={mermaid}
                      alt="mermaid"
                      style={{ width: "85px", height: "auto" }}
                      onClick={copyMermaid}
                    />
                    <p
                      style={{
                        marginTop: "0px",
                        fontSize: "18px",
                        marginBottom: "5px",
                      }}
                    >
                      Mermaid.js
                    </p>
                  </div>
                )}
              </div>
              <div>
                <img
                  src={json}
                  alt="json"
                  style={{ width: "75px", height: "auto" }}
                  onClick={copyJson}
                ></img>
                <p
                  style={{
                    marginBottom: "0px",
                    marginTop: "8px",
                    fontSize: "18px",
                    textAlign: "center",
                  }}
                >
                  JSON
                </p>
              </div>
            </div>
            <div>
              <button onClick={() => close()} id="closePopUp">
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default DownloadButton;
