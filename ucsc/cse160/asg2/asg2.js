const angleSlide_component = document.getElementById("angleSlide");
const g_yellowAngle_component = document.getElementById("g_yellowAngle");
const g_magentaAngle_component = document.getElementById("g_magentaAngle");

const g_YellowAnimationOn_component = document.getElementById("animationYellowOnButton");
const g_YellowAnimationOff_component = document.getElementById("animationYellowOffButton");

const g_MagentaAnimationOn_component = document.getElementById("animationMagentaOnButton");
const g_MagentaAnimationOff_component = document.getElementById("animationMagentaOffButton");

let g_magentaAngle = 0;
let g_yellowAngle = 0;
let g_globalAngle = 0;

let g_yellowAnimation = false;
let g_magentaAnimation = false;

function updateAnimationAngles() {
  if (g_yellowAnimation) {
    g_yellowAngle = 45 * Math.sin(g_seconds);
  }

  if (g_magentaAnimation) {
    g_magentaAngle = 45 * Math.sin(g_seconds);
    console.log("asd:",g_magentaAngle)
  }
}
function init() {
  // scene graph which holds all the shapes
  scene = new SceneGraph();
  // render which has the function that actuall renders everything
  renderer = new WebGLRenderer();
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0 && value > 0;
}

function main() {
  // setup webgl in general
  setupWebGL();


 
	// connects the variables and setup the GLSL shader
	connectVariablesToGLSL();

  // setup the scene graph and the renderer
  init();

  // adds the event listeners for various events
  // addEventListeners();
  angleSlide_component.addEventListener("mousemove", () => {
    g_globalAngle = angleSlide_component.value;
    // console.log(g_globalAngle);
    renderAllShapes();
  });

  g_yellowAngle_component.addEventListener("mousemove", () => {
    g_yellowAngle = g_yellowAngle_component.value;
    // console.log(g_globalAngle);
    renderAllShapes();
  });

  g_magentaAngle_component.addEventListener("mousemove", () => {
    g_magentaAngle = g_magentaAngle_component.value;
    // console.log(g_globalAngle);
    renderAllShapes();
  });

  g_YellowAnimationOn_component.addEventListener("click", () => {
    g_yellowAnimation = true;
  });
  g_YellowAnimationOff_component.addEventListener("click", () => {
    g_yellowAnimation = false;
  });
  g_MagentaAnimationOn_component.addEventListener("click", () => {
    g_magentaAnimation = true;
  });
  g_MagentaAnimationOff_component.addEventListener("click", () => {
    g_magentaAnimation = false;
  });
  // clear
  clearCanvas();

  requestAnimationFrame(tick);
}

var g_startTime = performance.now() / 1000.0;
var g_seconds = performance.now() / 1000.0 - g_startTime;

function tick() {
  console.log(performance.now());
  g_seconds = performance.now() / 1000 - g_startTime;
  console.log(g_seconds);
  updateAnimationAngles();
  renderAllShapes();
  requestAnimationFrame(tick);
}
