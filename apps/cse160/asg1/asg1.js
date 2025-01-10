// Vertex shader program
var VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform float a_Size;
void main(){
  gl_Position = a_Position;
  gl_PointSize = a_Size;
}`;

// Fragment shader program
var FSHADER_SOURCE =
`
precision mediump float;
uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}
`;

// global variables
let canvas;
let gl;
let a_Position;
let a_Size;
var size_val = 5.0;
let red_val = 1.0;
let green_val = 1.0;
let blue_val = 1.0;
let u_FragColor;
const shape_size = document.getElementById('shape_size');

function clearCanvas(){
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Specify the color for clearing <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>
  g_points = [];  // The array for the position of a mouse press
  g_colors = [];  // The array to store the color of a point
  g_sizes = [];
}

function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl_canvas');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  console.log(gl)
}

function connectVariablesToGLSL(){
          // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }
  // // Get the storage location of a_Position
  a_Size = gl.getUniformLocation(gl.program, 'a_Size');
  if (a_Size < 0) {
    console.log('Failed to get the storage location of a_Size');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
}

function handleSizeChangeEvent(){
  size_val = shape_size.value;
}

function main() {  
  setupWebGL();
  connectVariablesToGLSL();

  canvas.onmousedown = click; // func to call on mouse press
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Specify the color for clearing <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>
  const size_change = document.getElementById('shape_size');
  size_change.addEventListener('change', handleSizeChangeEvent);
  const clear_canvas_button = document.getElementById('clear_canvas');
  clear_canvas_button.addEventListener('click', clearCanvas);
  const red_update = document.getElementById('red_val');
  red_update.addEventListener('change', ()=>{red_val = red_update.value/10});
  const green_update = document.getElementById('green_val');
  green_update.addEventListener('change', ()=>{green_val = green_update.value/10});
  const blue_update = document.getElementById('blue_val');
  blue_update.addEventListener('click', ()=>{blue_val = blue_update.value/10});
}

var g_points = [];  // The array for the position of a mouse press
var g_colors = [];  // The array to store the color of a point
var g_sizes = [];

function click(ev) {
  let [x,y] = convertCoordinatesEventToGL(ev);

  // Store the coordinates to g_points array
  g_points.push([x, y]);
  console.log(red_val, green_val, blue_val)
  g_colors.push([red_val, green_val, blue_val, 1.0]);  // White
  g_sizes.push(size_val);
  renderAllShapes();
}

function convertCoordinatesEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();
  console.log(`x before: ${x}`);
  console.log(`y before: ${y}`);

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  console.log(`x after: ${x}`);
  console.log(`y after: ${y}`);
  return([x,y]);
}

function renderAllShapes(){
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for(var i = 0; i < len; i++) {
    var xy = g_points[i];
    var rgba = g_colors[i];
    var size = g_sizes[i];

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    gl.uniform1f(a_Size, size);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}