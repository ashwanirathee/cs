const angleSlideX_component = document.getElementById("angleSlideX");
const angleSlideY_component = document.getElementById("angleSlideY");
const angleSlideZ_component = document.getElementById("angleSlideZ");

const g_yellowAngle_component = document.getElementById("g_yellowAngle");
const g_magentaAngle_component = document.getElementById("g_magentaAngle");

const g_YellowAnimationOn_component = document.getElementById("animationYellowOnButton");
const g_YellowAnimationOff_component = document.getElementById("animationYellowOffButton");

const g_MagentaAnimationOn_component = document.getElementById("animationMagentaOnButton");
const g_MagentaAnimationOff_component = document.getElementById("animationMagentaOffButton");

let g_magentaAngle = 0;
let g_yellowAngle = 0;
let g_globalAngleX = 0;
let g_globalAngleY = 0;
let g_globalAngleZ = 0;

let left_front_main_angle = 0;
let left_front_part1_angle = 0;
let left_front_part2_angle = 0;

let g_yellowAnimation = false;
let g_magentaAnimation = false;

function updateAnimationAngles() {
  if (g_yellowAnimation) {
    g_yellowAngle = 45 * Math.sin(3*(g_seconds+ Math.PI / 3));
  }

  if (g_magentaAnimation) {
    g_magentaAngle = 45 * Math.sin(3*g_seconds);
    // console.log("asd:",g_magentaAngle)
  }

  left_front_main_angle = 15 * (2*Math.sin(3*g_seconds)-1);
  left_front_part1_angle = 120 * Math.sin(g_seconds)
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
  angleSlideX_component.addEventListener("mousemove", () => {
    console.log("Xslide")
    g_globalAngleX = angleSlideX_component.value;
    
    // console.log(g_globalAngle);
    renderAllShapes();
  });

  angleSlideY_component.addEventListener("mousemove", () => {
    console.log("Yslide")
    g_globalAngleY = angleSlideY_component.value;
    
    // console.log(g_globalAngle);
    renderAllShapes();
  });

  angleSlideZ_component.addEventListener("mousemove", () => {
    console.log("zslide")
    g_globalAngleZ = angleSlideZ_component.value;
    
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
  // console.log(performance.now());
  g_seconds = performance.now() / 1000 - g_startTime;
  // console.log(g_seconds);
  updateAnimationAngles();
  renderAllShapes();
  requestAnimationFrame(tick);
}
