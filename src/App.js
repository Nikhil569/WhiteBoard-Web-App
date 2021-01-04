import React, { useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import "./App.css";
import { addTextNode } from "./textNode";
import grid from "./grid.js";

function App() {
  const stageRef = useRef();
  const layerRef = useRef();

  const drawText = () => {
    addTextNode(stageRef.current.getStage(), layerRef.current);
  };

  /* useEffect(() => {
    grid(layerRef.current);
  }, [stageRef.current]); */

  useEffect(() => {
    const canvas = document.getElementsByTagName("canvas")[0];
    console.log(window);
    //canvas.id = "grid";
    //console.log(stageRef.current.size());
    canvas.style.backgroundColor = "white";
    grid(layerRef.current);
    //console.log(layerRef.current.canvas.width);
  }, []);

  return (
    <React.Fragment>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight * 0.8}
      >
        <Layer ref={layerRef}></Layer>
      </Stage>
      <div className="button-group">
        <button className="wave-effect wave-light btn" onClick={drawText}>
          <i className="material-icons left">text_fields</i>
          Text
        </button>

        <button id="grid-handler" className="wave-effect wave-light btn">
          <i className="material-icons left">grid_on</i>
          Grid
        </button>
      </div>
    </React.Fragment>
  );
}

export default App;
