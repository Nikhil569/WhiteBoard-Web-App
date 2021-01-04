import Konva from "konva";

const grid = (layer) => {
  //console.log(layer.width());
  let data = `<svg width="${layer.width()}" height="${layer.height()}" xmlns="http://www.w3.org/2000/svg"> \
<defs> \
<pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"> \
<path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5" /> \
</pattern> \
<pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"> \
<rect width="80" height="80" fill="url(#smallGrid)" /> \
<path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" /> \
</pattern> \
</defs> \
<rect width="100%" height="100%" fill="url(#grid)" /> \
</svg>`;

  let DOMURL = window.URL || window.webkitURL || window;

  let svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  let url = DOMURL.createObjectURL(svg);

  //console.log(gridRef);
  Konva.Image.fromURL(url, (gridNode) => {
    //console.log(gridNode.setAttrs);
    gridNode.setAttrs({
      x: layer.x(),
      y: layer.y(),
      id: "grid",
    });
    layer.add(gridNode);
    layer.batchDraw();
    gridNode.hide();
    DOMURL.revokeObjectURL(url);
    //console.log(gridRef);
    //gridRef = gridNode;
    //console.log(gridNode.visible());

    const gridBtn = document.getElementById("grid-handler");

    gridBtn.onclick = () => {
      if (!gridNode.visible()) {
        gridNode.show();
        layer.batchDraw();
        //console.log(gridNode.visible());
      } else {
        gridNode.hide();
        layer.batchDraw();
      }
    };

    //console.log(layer);
    //return gridNode;
  });
  //console.log(gridRef);
};

export default grid;
