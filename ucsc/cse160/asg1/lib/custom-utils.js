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
  gl = getWebGLContext(canvas,  { preserveDrawingBuffer: true});
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }
  // console.log(gl);
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
  // // Get the storage location of a_Position
  a_Size = gl.getUniformLocation(gl.program, "a_Size");
  if (a_Size < 0) {
    console.log("Failed to get the storage location of a_Size");
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }
}

function handleSizeChangeEvent() {
  size_val = shape_size.value;
}

function click(ev) {
  if (ev.buttons != 1) return;
  let [x, y] = convertCoordinatesEventToGL(ev);

  var Point1 = new Point([x, y], [red_val, green_val, blue_val, 1.0], size_val);
  scene.shapesList.push(Point1);
  renderAllShapes();
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
