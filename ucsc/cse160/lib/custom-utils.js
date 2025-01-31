function clearCanvas() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Specify the color for clearing <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>
  scene.shapesList = [];
  renderAllShapes();
}

function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById("webgl_canvas");
  // console.log("Trying to get rendering context")
  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }
  // console.log(gl);
  gl.enable(gl.DEPTH_TEST)
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to intialize shaders.");
    return;
  }
  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Position");
    return;
  }
  // // // Get the storage location of a_Position
  // a_Size = gl.getUniformLocation(gl.program, "a_Size");
  // if (a_Size < 0) {
  //   console.log("Failed to get the storage location of a_Size");
  //   return;
  // }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if(!u_ModelMatrix){
    console.log('Failed to get the storage location of u_ModelMatrix')
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if(!u_GlobalRotateMatrix){
    console.log('Failed to get the storage location of u_GlobalRotateMatrix')
    return;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function handleSizeChangeEvent() {
  size_val = shape_size.value;
}
// Function to reset the initial position when the mouse button is released
function onMouseUp(ev) {
  initialX = null;
  initialY = null;
}

// Variables to store the initial mouse position
let initialX = null;
let initialY = null;


function click(ev) {
  // if(isChecking == false) return;
  if (ev.buttons != 1) return;
  // Convert the event coordinates to WebGL coordinates
  let [x, y] = convertCoordinatesEventToGL(ev);

  // If this is the start of the drag, store the initial position
  if (initialX === null || initialY === null) {
    initialX = x;
    initialY = y;
  }

  // Calculate the difference between the current and initial positions
  let deltaX = x - initialX;
  let deltaY = y - initialY;

  if(Math.abs(deltaY) > Math.abs(deltaX)){

    g_globalAngleY += deltaY*50;
  } else {
    // Update the global angles based on the difference
    g_globalAngleX -= deltaX*50;
  }



  // Log the changes (optional)
  // console.log(`Delta X: ${deltaX}, Delta Y: ${deltaY}`);

  // Update the initial position to the current position for the next iteration
  initialX = x;
  initialY = y;


  renderAllShapes();
}

function convertCoordinates(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();
  x1 = (x - 30 - rect.left - canvas.width / 2) / (canvas.width / 2);
  y1 = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  x2 = (x + 30 - rect.left - canvas.width / 2) / (canvas.width / 2);
  y2 = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  x3 = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y3 = (canvas.height / 2 - (y - 30 - rect.top)) / (canvas.height / 2);
  return [x1, y1, x2, y2, x3, y3];
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();
  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  return [x, y];
}

function renderAllShapes() {
  renderer.render(scene); // i will add camera here later.
}
