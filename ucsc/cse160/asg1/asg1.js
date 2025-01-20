function addEventListeners() {
  canvas.onmousedown = click; // func to call on mouse press
  canvas.onmousemove = click;

  clear_canvas_button.addEventListener("click", clearCanvas);
  size_change.addEventListener("change", handleSizeChangeEvent);
  segment_count.addEventListener("change", () => {
    segment_count_val = segment_count.value;
  });
  red_update.addEventListener("change", () => {
    red_val = red_update.value / 10;
  });
  green_update.addEventListener("change", () => {
    green_val = green_update.value / 10;
  });
  blue_update.addEventListener("change", () => {
    blue_val = blue_update.value / 10;
  });

  square_choice.addEventListener("click", () => {
    shape = 0;
    console.log("sq selected");
  });
  triangle_choice.addEventListener("click", () => {
    shape = 1;
    console.log("tr selected");
  });
  circle_choice.addEventListener("click", () => {
    shape = 2;
    console.log("ci selected");
  });
  dinosaur_choice.addEventListener("click", () => {
    shape = 3;
    console.log("dinosaur selected");
  });

  setup_game_button.addEventListener("click", () => {
    shape = 4;
    console.log("setup_game selected");
  });

  document.addEventListener('keydown', function(event) {
    var oX;
    var oY;
    switch(event.key) {
      case 'w':
        console.log('W key pressed');
        // Add your logic for W key here
        oX = 0;
        oY = 1;
        if(shape == 10){
          scene.shapesList[0].player = [scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY]
          renderAllShapes();
        }
        break;
      case 'a':
        console.log('A key pressed');
        oX = -1;
        oY = 0;
        if(shape == 10){
          scene.shapesList[0].player = [scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY]
          renderAllShapes();
        }
        break;
      case 's':
        console.log('S key pressed');
        oX = 0;
        oY = -1;
        if(shape == 10){
          scene.shapesList[0].player = [scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY]
          renderAllShapes();
        }
        break;
      case 'd':
        console.log('D key pressed');
        oX = 1;
        oY = 0;
        if(shape == 10){
          scene.shapesList[0].player = [scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY]
          renderAllShapes();
        }
        break;
      default:
        // Handle other keys if needed
        break;
    }
  });
}

function init() {
  scene = new SceneGraph();
  renderer = new WebGLRenderer();
}

function main() {
  setupWebGL();
  connectVariablesToGLSL();
  init();
  addEventListeners();
  clearCanvas();
}
