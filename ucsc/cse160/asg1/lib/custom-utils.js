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

var isChecking = true;
function click(ev) {
  if(isChecking == false) return;
  if (ev.buttons != 1) return;
  // console.log(scene);
  if (shape == 4) {
    clearCanvas();
    var game = new Game();
    scene.shapesList.push(game);
    shape = 10;
  } else if (shape < 4) {
    // to check if there is motion and mouse button is down

    let [x, y] = convertCoordinatesEventToGL(ev);
    var point;
    if (shape == 0) {
      point = new Point();
    } else if (shape == 1) {
      point = new Triangle();
    } else if (shape == 2) {
      point = new Circle();
    } else {
      var special_point = new Dinosaur();
      special_point.vertices = [x, y];
      special_point.color = [red_val, green_val, blue_val, 1.0];
      special_point.size = size_val;
      special_point.render();
      isChecking = false
      setTimeout(() => {
        isChecking = true
      }, 200);
      return;
    }
    if (shape != 3) {
      scene.shapesList.push(point);
      point.vertices = [x, y];
      point.color = [red_val, green_val, blue_val, 1.0];
      point.size = size_val;
      if (shape == 2) {
        point.segment_count = segment_count_val;
      }
    }
  }
  // console.log("Calling render");
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
