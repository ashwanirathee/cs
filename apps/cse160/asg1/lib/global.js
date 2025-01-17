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
const size_change = document.getElementById('shape_size');
const clear_canvas_button = document.getElementById('clear_canvas');
const red_update = document.getElementById('red_val');
const green_update = document.getElementById('green_val');
const blue_update = document.getElementById('blue_val');
let scene;
let renderer;