const angleSlideX_component = document.getElementById("angleSlideX");
const angleSlideY_component = document.getElementById("angleSlideY");
const animationTimelessOn_Component = document.getElementById("animationTimelessOn");
const animationTimelessOff_Component = document.getElementById("animationTimelessOff");
const animationPokeOn_Component = document.getElementById("animationPokeOn");
const animationPokeOff_Component = document.getElementById("animationPokeOff");

let g_globalAngleX = 5;
let g_globalAngleY = 5;

let animationTimeless = false;
let animationPoke = false;

function updateValue(id, key, outputId) {
  let value = document.getElementById(id).value;
  angles[key] = parseInt(value);
  document.getElementById(outputId).textContent = value;
}

let angles = {
  body: 0,
  neck: -45,
  face: 90,
  tail: -160,
  tail_part2: 180,
  tail_part3: 270,
  leg_front_left: 0,
  leg_front_right: 0,
  leg_rear_left: 0,
  leg_rear_right: 0,
};

const audio = new Audio("minecraft.mp3"); // Replace with your sound file path
audio.loop = true; // Enable looping

const audio1 = new Audio("thud.mp3"); // Replace with your sound file path
audio1.loop = true; // Enable looping

var animationPokeStartTime = 0;
var animationPokeseconds = 0;
var g_startTime = performance.now() / 1000.0;
var g_seconds = performance.now() / 1000.0 - g_startTime;

function updateAnimationAngles() {
  if (animationTimeless) {
    console.log("Timeless Sequence Triggered");
    angles["body"] = 2 * Math.sin(g_seconds);
    angles["neck"] = -45 + 5 * Math.sin(g_seconds);
    angles["face"] = 90 + Math.sin(g_seconds);
    speed = 10;
    angles["tail"] = -160 + 5 * Math.sin((speed / 5) * g_seconds);
    angles["tail_part2"] = 165 + 15 * Math.sin((speed / 5) * g_seconds);
    angles["tail_part3"] = 265 + 15 * Math.sin((speed / 5) * g_seconds);
    angles["leg_front_left"] = 15 * Math.sin(speed * g_seconds);
    angles["leg_front_right"] = -15 * Math.sin(speed * g_seconds);
    angles["leg_rear_left"] = 15 * Math.sin(speed * g_seconds);
    angles["leg_rear_right"] = -15 * Math.sin(speed * g_seconds);
  }

  if (animationPoke) {
    console.log("Poke Sequence Triggered");
    // console.log(g_seconds)
    if (animationPokeseconds == 0) {
      animationPokeStartTime = g_seconds;
      animationPokeseconds = animationPokeseconds + 0.001;
    } else {
      angles["tail"] = 45 + 15 * Math.sin(5 * animationPokeseconds);
      angles["body"] = 15 + 10 * Math.sin(5 * animationPokeseconds);
      var angle = 45 + 45 * Math.sin(10 * animationPokeseconds);
      // console.log(angle)
      angles["leg_rear_left"] = angle;
      angles["leg_rear_right"] = angle;
      angles["leg_front_right"] = -(10 + 10 * Math.sin(10 * animationPokeseconds));
      angles["leg_front_left"] = -(10 + 10 * Math.sin(10 * animationPokeseconds));
      angles["tail"] = -70 - 15 * Math.sin((10 / 5) * g_seconds);
      angles["tail_part2"] = 165 + 15 * Math.sin((10 / 5) * g_seconds);
      angles["tail_part3"] = 265 + 15 * Math.sin((10 / 5) * g_seconds);
      animationPokeseconds = animationPokeseconds + 0.001;
      if (angle > 80) {
        animationPoke = false;
        animationPokeseconds = 0;
        audio1.pause();
        audio1.currentTime = 0; // Reset the audio
        angles["body"] = 0;
        angles["leg_rear_left"] = 0;
        angles["leg_rear_right"] = 0;
        angles["leg_front_right"] = 0;
        angles["leg_front_left"] = 0;
        angles["tail"] = -170;
      }
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

function initTextures() {
  var image = new Image();  // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  image.onload = function(){ sendTextureToTEXTURE0(image); };
  // Tell the browser to load an image
  image.src = './lib/uvCoords.png';

  var image1 = new Image();  // Create the image object
  if (!image1) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  image1.onload = function(){ sendTextureToTEXTURE1(image1); };
  // Tell the browser to load an image
  image1.src = './lib/dice.png';

  var image2 = new Image();  // Create the image object
  if (!image2) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  image2.onload = function(){ sendTextureToTEXTURE2(image2); };
  // Tell the browser to load an image
  image2.src = './lib/texture.png';

  // add more textures
  return true;
}

function sendTextureToTEXTURE0(image) {
  texture0 = gl.createTexture();   // Create a texture object
  if (!texture0) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // gl.pixelStorei(gl.UNPACK_FLIP_X_WEBGL, 0);;
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture0);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler0, 0);
  
  // gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
// 
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
}

function sendTextureToTEXTURE1(image) {
  texture1 = gl.createTexture();   // Create a texture object
  if (!texture1) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // gl.pixelStorei(gl.UNPACK_FLIP_X_WEBGL, 0);;
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE1);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture1);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler1, 1);
  
  // gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
// 
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
}


function sendTextureToTEXTURE2(image) {
  texture2 = gl.createTexture();   // Create a texture object
  if (!texture2) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // gl.pixelStorei(gl.UNPACK_FLIP_X_WEBGL, 0);;
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE2);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture2);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler2, 2);
  
  // gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
// 
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
}

function addEventListeners(){
  // adds the event listeners for various events
  // addEventListeners();
  angleSlideX_component.addEventListener("mousemove", () => {
    g_globalAngleX = angleSlideX_component.value;
    renderAllShapes();
  });

  angleSlideY_component.addEventListener("mousemove", () => {
    // console.log("Angle Slide being changed")
    g_globalAngleY = angleSlideY_component.value;
    renderAllShapes();
  });

  canvas.onmousemove = click;
  canvas.addEventListener("mouseup", onMouseUp);

  document.addEventListener('keydown', function(event) {
    var oX;
    var oY;
    switch(event.key) {
      case 'w':
        console.log('W key pressed');
        g_eye[2] -=0.1
        break;
      case 'a':
        console.log('A key pressed');
        g_eye[0] -=0.1
        break;
      case 's':
        console.log('S key pressed');
        g_eye[2] +=0.1
        break;
      case 'd':
        console.log('D key pressed');
        g_eye[0] +=0.1
        break;
      default:
        // Handle other keys if needed
        break;
    }})
}

function main() {
  // setup webgl in general
  setupWebGL();

  // connects the variables and setup the GLSL shader
  connectVariablesToGLSL();

  // setup the scene graph and the renderer
  init();
  initTextures();
  addEventListeners();


  g_eye =[0,0,3];
  g_at = [0,0,-100];
  g_up = [0,1,0];
  asp_ratio = canvas.width/canvas.height;
  field_angle = 60;
  // clearCanvas();
  gl.clearColor(0.0,0.0,0.0,1.0);
  requestAnimationFrame(tick);
}

function tick() {
  g_seconds = performance.now() / 1000 - g_startTime;
  updateAnimationAngles();
  renderAllShapes(); // this is same as renderScene();
  requestAnimationFrame(tick);
}
