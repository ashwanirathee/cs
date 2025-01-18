function addEventListeners(){
  // canvas.onmousedown = click; // func to call on mouse press
  canvas.onmousemove = click; 
  clear_canvas_button.addEventListener('click', clearCanvas);
  size_change.addEventListener('change', handleSizeChangeEvent);
  red_update.addEventListener('change', ()=>{red_val = red_update.value/10});
  green_update.addEventListener('change', ()=>{green_val = green_update.value/10});
  blue_update.addEventListener('change', ()=>{blue_val = blue_update.value/10});
}

function init(){
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
