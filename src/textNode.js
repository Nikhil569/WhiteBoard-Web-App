import Konva from "konva";
import * as uuid from "uuid";

export const addTextNode = (stage, layer) => {
  const id = uuid.v1();
  const textNode = new Konva.Text({
    text: "Type Here",
    x: 50,
    y: 80,
    fontSize: 20,
    draggable: true,
    width: 200,
    id,
  });

  layer.add(textNode);

  let tr = new Konva.Transformer({
    node: textNode,
    enabledAnchors: ["middle-left", "middle-right"],
    // set minimum width of text
    boundBoxFunc: function (oldBox, newBox) {
      newBox.width = Math.max(30, newBox.width);
      return newBox;
    },
  });

  //layer.add(tr);

  //console.log(this);
  stage.on("click", function (e) {
    /// console.log(e);
    //console.log(this.clickStartShape);
    if (!this.clickStartShape) {
      return;
    }
    if (e.target._id === this.clickStartShape._id) {
      layer.add(tr);
      //console.log(this.clickStartShape);
      //console.log(e.target.id());
      if (e.target.id() !== "grid") tr.nodes([e.target]);
      else tr.nodes([]);
      layer.draw();
    } else {
      tr.nodes([]);
      layer.draw();
    }
  });

  textNode.on("mouseenter", () => {
    stage.container().style.cursor = "move";
  });

  textNode.on("mouseleave", () => {
    stage.container().style.cursor = "default";
  });

  //console.log(textNode);

  textNode.on("dblclick", function (e) {
    textNode.hide();
    tr.hide();

    let textarea = document.createElement("textarea");

    textarea.value = textNode.text();
    textarea.style.border = "3px dashed black";
    textarea.style.position = "absolute";
    textarea.style.top = textNode.absolutePosition().y + "px";
    textarea.style.left = textNode.absolutePosition().x + "px";
    textarea.style.width = textNode.width() + "px";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    //textarea.style.outline = "1px solid black";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    document.body.appendChild(textarea);
    //console.log(textarea.style);
    textarea.focus();

    function removeTextarea() {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener("click", handleOutsideClick);
      textNode.show();
      tr.show();
      tr.forceUpdate();
      layer.draw();
    }

    textarea.addEventListener("keydown", function (e) {
      if (e.keyCode === 27) {
        textNode.text(textarea.value);
        removeTextarea();
      }
      //console.log(e);
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        textNode.text(textarea.value);
        removeTextarea();
      }
    }

    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  });

  layer.draw();
};
