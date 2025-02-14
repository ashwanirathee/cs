// Vertex shader program
var VSHADER_SOURCE = `
precision mediump float;
attribute vec4 a_Position;
attribute vec2 a_UV;
varying vec2 v_UV;

uniform mat4 u_ModelMatrix;
uniform mat4 u_GlobalRotateMatrix;

void main(){
  gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  v_UV = a_UV;
}`;

// Fragment shader program
var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
varying vec2 v_UV;
uniform sampler2D u_Sampler0;
void main() {
  gl_FragColor = u_FragColor;
  gl_FragColor = vec4(v_UV,1.0,1.0);
  gl_FragColor = texture2D(u_Sampler0, v_UV);
}
`;
