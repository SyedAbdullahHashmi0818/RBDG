import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Navbar from "../components/navbar";
import trashIcon from "../images/trash.png";

import "../cssFiles/uploadByFile.css";
import option2blue from "../images/Module Name (2).png";
import help from "../images/help2.png";
import helpImg from "../images/infoBox1.png";

const UploadByFile = () => {
  const [colA, setColA] = useState("");
  const [colB, setColB] = useState("");
  const [myFile, setMyFile] = useState([]);

  let navigate = useNavigate();
  const goBack = () => {
    navigate("/UploadRequirements");
  };

  useEffect(() => {
    if (colA !== "")
      document.getElementsByTagName("em")[0].style.visibility = "hidden";
    if (colB !== "")
      document.getElementsByTagName("em")[1].style.visibility = "hidden";
  }, [colA, colB]);

  const onDrop = useCallback((acceptedFiles) => {
    const acceptedText = document.getElementById("acceptText");
    if (acceptedText) {
      console.log("got here");
      acceptedText.style.visibility = "visible";
    }
    console.log(acceptedFiles[0]);
    setMyFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "text/csv": [".csv"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "application/vnd.ms-excel": [".xls"],
      },
    });

  useEffect(() => {
    if (fileRejections.length > 0) {
      alert("Please Upload the Supported Formats .xls .xlss .csv");
    }
  }, [fileRejections]);

  useEffect(() => {
    if (myFile) {
      console.log(myFile);
    }
  }, [myFile]);

  useEffect(() => {
    const outerBox = document.getElementsByClassName("fileBox")[0];
    const innerBox = document.getElementsByClassName("innerFileBox")[0];
    const dragText = document.getElementById("sp1");
    if (innerBox) {
      if (isDragActive) {
        innerBox.style.border = "2px dashed var(--color-midBlue)";
        outerBox.style.transform = "scale(1.025)";
        dragText.style.color = "var(--color-orange)";
      } else {
        innerBox.style.border = "2px dashed var(--color-gray)";
        outerBox.style.transform = "scale(1)";
        dragText.style.color = "var(--color-midBlue)";
      }
    }
  }, [isDragActive]);

  const handleKeyDown = (e) => {
    const regex = /^[a-zA-Z]$/;
    if (!regex.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  };

  //Sending the file + ColA + ColB to the backend
  const submit = () => {
    var completeFlag = true;

    if (myFile.length === 0) {
      alert("Please Upload file");
      completeFlag = false;
    }

    if (colA === "") {
      document.getElementsByTagName("em")[0].style.visibility = "visible";
      completeFlag = false;
    }

    if (colB === "") {
      document.getElementsByTagName("em")[1].style.visibility = "visible";
      completeFlag = false;
    }

    if (completeFlag) {
      console.log("send the object to the backend here");
    }
  };

  const delItems = () => {
    setColA("");
    setColB("");
    setMyFile([]);
  };

  return (
    <div className="uploadBg1">
      <Navbar />
      <div className="controlBar1">
        <div className="backButton1" onClick={goBack}>
          <p>&lt;</p>
        </div>
        <div className="title1">
          <div id="innerBar1"></div>
          <div id="innerContent1">
            <p>Upload Your File</p>
            <div className="delBox1" onClick={delItems}>
              <img id="trash1" alt="Img" src={trashIcon}></img>
            </div>
          </div>
        </div>
        <div className="submitButton1" onClick={submit}>
          <p>submit</p>
        </div>
      </div>
      <div className="fileBox">
        <div className="innerFileBox" {...getRootProps()}>
          <img src={option2blue} alt="Img" className="fileIMG" />

          <div className="dropText">
            <p className="normalText">
              <b className="specialText" id="sp1">
                Drag and Drop
              </b>{" "}
              files here or{" "}
              <b className="specialText" id="sp2">
                Click
              </b>{" "}
              to browse
            </p>
          </div>
          <input {...getInputProps()} />
          <p id="acceptText">{myFile[0]?.name}</p>
          <p id="supportText">Supported Formats .xls .xlss .csv</p>
        </div>
      </div>
      <div className="columnBox">
        <div className="inlineLabelsHelp">
          <p id="columnBoxHeading">Enter Column Labels</p>
          <img src={help} alt="Img" id="info" />
          <div id="helpBox">
            <img src={helpImg} alt="Img" id="helpImg" />
          </div>
        </div>

        <ul>
          <li>
            <div className="parentBullet">
              <div className="bullet"></div>
              <p>Module Column Label </p>
            </div>
            <p>
              <b>
                <em> (this is required)</em>
              </b>
            </p>
            <input
              id="colA"
              placeholder="A"
              onKeyDown={handleKeyDown}
              className="columnInput"
              value={colA}
              onChange={(event) => {
                setColA(event.target.value);
              }}
            ></input>
          </li>
          <li>
            <div className="parentBullet">
              <div className="bullet"></div>
              <p>Requirements Column Label</p>
            </div>
            <p>
              <b>
                <em> (this is required)</em>
              </b>
            </p>
            <input
              id="colB"
              placeholder="B"
              onKeyDown={handleKeyDown}
              className="columnInput"
              value={colB}
              onChange={(event) => {
                setColB(event.target.value);
              }}
            ></input>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UploadByFile;
