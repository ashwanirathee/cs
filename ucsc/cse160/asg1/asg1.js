function withinRange(new_x, new_y){
  return new_x >= 0 && new_y >= 0 && new_x < 18 && new_y < 18
}

function addEventListeners() {
  // this handles general brush cases
  canvas.onmousemove = click;

  // most of these buttons are in global.js
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
    document.getElementById('brush_type').innerHTML = "Brush Type: Points/Square";
  });
  triangle_choice.addEventListener("click", () => {
    shape = 1;
    console.log("tr selected");
    document.getElementById('brush_type').innerHTML = "Brush Type: Triangle";
  });
  circle_choice.addEventListener("click", () => {
    shape = 2;
    console.log("ci selected");
    document.getElementById('brush_type').innerHTML = "Brush Type: Circle";
  });
  dinosaur_choice.addEventListener("click", () => {
    shape = 3;
    console.log("dinosaur selected");
    document.getElementById('brush_type').innerHTML = "Type: Dinosaur";
  });
  setup_game_button.addEventListener("click", () => {
    shape = 4;
    console.log("setup_game selected");
    document.getElementById('brush_type').innerHTML = "Type: Setup Game";
  });

  document.addEventListener('keydown', function(event) {
    var oX;
    var oY;
    switch(event.key) {
      case 'w':
        // console.log('W key pressed');
        // Add your logic for W key here
        oX = 0;
        oY = 1;
        if(shape == 10 && withinRange(scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY) && scene.shapesList[0].maze[scene.shapesList[0].player[0]+oX][scene.shapesList[0].player[1]+oY] != 1){
          scene.shapesList[0].player = [scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY]
          renderAllShapes();
        }
        break;
      case 'a':
        // console.log('A key pressed');
        oX = -1;
        oY = 0;
        if(shape == 10  && withinRange(scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY) && scene.shapesList[0].maze[scene.shapesList[0].player[0]+oX][scene.shapesList[0].player[1]+oY] != 1){
          scene.shapesList[0].player = [scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY]
          renderAllShapes();
        }
        break;
      case 's':
        // console.log('S key pressed');
        oX = 0;
        oY = -1;
        if(shape == 10 && withinRange(scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY) && scene.shapesList[0].maze[scene.shapesList[0].player[0]+oX][scene.shapesList[0].player[1]+oY] != 1){
          scene.shapesList[0].player = [scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY]
          renderAllShapes();
        }
        break;
      case 'd':
        // console.log('D key pressed');
        oX = 1;
        oY = 0;
        if(shape == 10 && withinRange(scene.shapesList[0].player[0]+oX, scene.shapesList[0].player[1]+oY) && scene.shapesList[0].maze[scene.shapesList[0].player[0]+oX][scene.shapesList[0].player[1]+oY] != 1){
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
  // scene graph which holds all the shapes
  scene = new SceneGraph();
  // render which has the function that actuall renders everything
  renderer = new WebGLRenderer();
}

function main() {
  // setup webgl in general
  setupWebGL();

  // connects the variables and setup the GLSL shader 
  connectVariablesToGLSL();

  // setup the scene graph and the renderer
  init();

  // adds the event listeners for various events
  addEventListeners();

  // clear
  clearCanvas();
}
