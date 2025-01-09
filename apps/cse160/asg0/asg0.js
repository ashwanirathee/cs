// DrawTriangle.js (c) 2012 matsuda  

// Retrieve <canvas> element
var canvas = document.getElementById('example');  
if (!canvas) { 
  console.log('Failed to retrieve the <canvas> element');
} 

// Get the rendering context for 2DCG
var ctx = canvas.getContext('2d');
const v1_x = document.getElementById('v1_x_input');
const v1_y = document.getElementById('v1_y_input');
const v2_x = document.getElementById('v2_x_input');
const v2_y = document.getElementById('v2_y_input');
const scalar_input = document.getElementById('scalar_input');
const operation_type = document.getElementById('operation');

const offset_x = canvas.width/2
const offset_y = canvas.height/2
const scaling_factor = 20
const y_switch = -1;
var x = 0;
var y = 0;

// takes vector and string color  
function drawVector(v, color){
  x = v.elements[0]*scaling_factor;
  y = y_switch*(v.elements[1]*scaling_factor);

  // draw a line from 0,0 to x,y in v
  ctx.beginPath();
  ctx.moveTo(offset_x, offset_y);
  ctx.lineTo(offset_x + x, offset_y + y);
  ctx.strokeStyle = color;
  ctx.stroke();
  console.log(`Expected result with v1 = (${v.elements[0]},${v.elements[1]})`);
}

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the entire canvas
}

function clearInput() {
  v1_x.value = '';
  v1_y.value = '';
  v2_x.value = '';
  v2_y.value = '';
  scalar_input.value = '';
}

function angleBetween(v1, v2){
  let cos_alpha = Vector3.dot(v1,v2)/v1.magnitude()*v2.magnitude();
  let alpha = Math.acos(cos_alpha) * (180/Math.PI);
  return alpha;
}

function areaTriangle(v1, v2){
  // ||v1xv2|| equals to area of 
  // the parallelogram that vector span
  var vec1 = Vector3.cross(v1,v2); 
  let area = vec1.magnitude()/2;
  return area;
}

function handleDrawEvent(){
  var vec1 = new Vector3([v1_x.value,v1_y.value,0]);
  var vec2 = new Vector3([v2_x.value,v2_y.value,0]);
  clearCanvas();
  clearInput();
  drawVector(vec1, "red");
  drawVector(vec2, "blue");
}

function handleDrawOperationEvent(){
  console.log("Handle Draw Operation Event!");
  // don't go forward if v1 and v2 don't have values!

  var vec1 = new Vector3([v1_x.value,v1_y.value,0]);
  var vec2 = new Vector3([v2_x.value,v2_y.value,0]);

  // drawVector(vec1.add)
  if(operation_type.value == "add"){
    clearCanvas();
    clearInput();
    console.log("Add Operation")
    drawVector(vec1, "red");
    drawVector(vec2, "blue");
    drawVector(vec1.add(vec2),"green");
  } else if(operation_type.value == "sub"){
    clearCanvas();
    clearInput();
    console.log("Sub Operation")
    drawVector(vec1, "red");
    drawVector(vec2, "blue");
    drawVector(vec1.sub(vec2),"green");
  } else if(operation_type.value == "div"){
    clearCanvas();
    clearInput();
    console.log("Div Operation")
    drawVector(vec1, "red");
    drawVector(vec2, "blue");
    drawVector(vec1.div(scalar_input.value),"green");
    drawVector(vec2.div(scalar_input.value),"green");
  } else if(operation_type.value == "mult"){
    clearCanvas();
    clearInput();
    console.log("Mult Operation")
    drawVector(vec1, "red");
    drawVector(vec2, "blue");
    drawVector(vec1.mul(scalar_input.value),"green");
    drawVector(vec2.mul(scalar_input.value),"green");
  } else if(operation_type.value == "mag"){
    console.log("Mag Operation")
    console.log(`Magnitude v1: ${vec1.magnitude()}`)
    console.log(`Magnitude v1: ${vec2.magnitude()}`)
  } else if(operation_type.value == "norm"){
    console.log("Norm Operation")
    clearCanvas();
    clearInput();
    drawVector(vec1, "red");
    drawVector(vec2, "blue");
    drawVector(vec1.normalize(),"green");
    drawVector(vec2.normalize(),"green");
  } else if(operation_type.value == "angle"){
    console.log("Angle Between Operation")
    clearCanvas();
    clearInput();
    drawVector(vec1, "red");
    drawVector(vec2, "blue");
    console.log(`Angle: ${angleBetween(vec1, vec2)}`)
  } else if(operation_type.value == "area"){
    clearCanvas();
    clearInput();
    drawVector(vec1, "red");
    drawVector(vec2, "blue");
    console.log(`Area of the triangle: ${areaTriangle(vec1, vec2)}`)
  }
}

function main() {  
  var vec1 = new Vector3([2.25,2.25,0]);
  drawVector(vec1, "red")

  const normal_draw = document.getElementById('drawButton');
  const operation_draw = document.getElementById('drawOperationButton');
  normal_draw.addEventListener('click', handleDrawEvent);
  operation_draw.addEventListener('click', handleDrawOperationEvent);
}

main();