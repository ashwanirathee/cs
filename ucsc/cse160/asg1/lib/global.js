// global variables
let canvas;
let gl;
let a_Position;
let a_Size;
var size_val = 5.0;
let red_val = 0.5;
let green_val = 0.5;
let blue_val = 0.5;
let segment_count_val = 10;
let u_FragColor;
const shape_size = document.getElementById("shape_size");
const size_change = document.getElementById("shape_size");
const clear_canvas_button = document.getElementById("clear_canvas");
const red_update = document.getElementById("red_val");
const green_update = document.getElementById("green_val");
const blue_update = document.getElementById("blue_val");

const square_choice = document.getElementById("square_choice");
const triangle_choice = document.getElementById("triangles_choice");
const circle_choice = document.getElementById("circles_choice");
const dinosaur_choice = document.getElementById("dinosaur");
const segment_count = document.getElementById("circle_segment_count");
var shape = 0;
const setup_game_button = document.getElementById('setup_game')
let scene;
let renderer;
var vertexBuffer;
