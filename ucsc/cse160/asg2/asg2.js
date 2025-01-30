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
function updateValue(id, key, outputId) {
  let value = document.getElementById(id).value;
  angles[key] = parseInt(value);
  document.getElementById(outputId).textContent = value;
  // console.log(angles); // Log the updated values for debugging
}
let angles = {
  body: 0,
  neck: -45,
  face: 90,
  tail: 20,
  leg_front_left: 0,
  leg_front_right: 0,
  leg_rear_left: 0,
  leg_rear_right: 0
};



const audio = new Audio('minecraft.mp3'); // Replace with your sound file path
audio.loop = true; // Enable looping

const audio1 = new Audio('thud.mp3'); // Replace with your sound file path
audio1.loop = true; // Enable looping

var g_magentaAnimationStartTime = 0;
var g_magentaseconds = 0;
function updateAnimationAngles() {
  if(g_yellowAnimation){
    angles['body'] = 2*Math.sin(g_seconds)
    angles['neck'] = -45 + (5 * Math.sin(g_seconds))
    angles['face'] = 90 + Math.sin(g_seconds)
    speed = 10
    angles['tail'] = 45 + 15 * Math.sin(speed / 5 * g_seconds)
    angles['leg_front_left'] = 15 * Math.sin(speed*g_seconds);
    angles['leg_front_right'] = -15 * Math.sin(speed*g_seconds);
    angles['leg_rear_left'] = 15 * Math.sin(speed*g_seconds);
    angles['leg_rear_right'] = -15 * Math.sin(speed*g_seconds);
  }

  if(g_magentaAnimation){
    console.log(g_seconds)
    if(g_magentaseconds == 0){
      g_magentaAnimationStartTime = g_seconds;
      g_magentaseconds = g_magentaseconds + 0.001;
    } else {
      angles['tail'] = 45 + 15 * Math.sin(5* g_magentaseconds)
      angles['body'] = 15 + 10 * Math.sin(5*g_magentaseconds)
      var angle = 45 + 45 * Math.sin(10*g_magentaseconds);
      console.log(angle)
      angles['leg_rear_left'] = angle;
      angles['leg_rear_right'] = angle;
      angles['leg_front_right'] = -(10 + 10 * Math.sin(10*g_magentaseconds))
      angles['leg_front_left'] = -(10 + 10 * Math.sin(10*g_magentaseconds))
      if(angle > 80) 
      {
        g_magentaAnimation = false
        g_magentaseconds = 0
        audio1.pause();
        audio1.currentTime = 0; // Reset the audio
        angles['body'] = 0
        angles['leg_rear_left'] = 0
        angles['leg_rear_right'] = 0
        angles['leg_front_right'] = 0
        angles['leg_front_left'] = 0
      }
      g_magentaseconds = g_magentaseconds + 0.001;
      
    }
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
    // renderAllShapes();
  });

  angleSlideZ_component.addEventListener("mousemove", () => {
    console.log("zslide")
    g_globalAngleZ = angleSlideZ_component.value;
    
    // console.log(g_globalAngle);
    // renderAllShapes();
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
    console.log("Yellow Animation on!")
    audio.play();
    g_yellowAnimation = true;
  });
  g_YellowAnimationOff_component.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0; // Reset the audio
    g_yellowAnimation = false;
  });
  g_MagentaAnimationOn_component.addEventListener("click", () => {
    audio1.play();
    g_magentaAnimation = true;
  });
  g_MagentaAnimationOff_component.addEventListener("click", () => {
    audio1.pause();
    audio1.currentTime = 0; // Reset the audio
    g_magentaAnimation = false;
  });

  canvas.addEventListener("click", (event) => {
    if (event.shiftKey) {
        console.log("Shift + Click detected at:", event.clientX, event.clientY);
        g_magentaAnimation = true
        audio1.play();
        drawMarker(event.clientX, event.clientY);
    }
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
