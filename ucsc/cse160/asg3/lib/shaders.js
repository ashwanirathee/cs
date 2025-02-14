// Vertex shader program
var VSHADER_SOURCE = `
precision mediump float;
attribute vec4 a_Position;
attribute vec2 a_UV;
varying vec2 v_UV;

uniform mat4 u_ModelMatrix;
uniform mat4 u_GlobalRotateMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjectionMatrix;

void main(){
  gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  v_UV = a_UV;
}`;

// Fragment shader program
var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
varying vec2 v_UV;
uniform sampler2D u_Sampler0;
uniform sampler2D u_Sampler1;
uniform sampler2D u_Sampler2;
uniform int u_whichTexture;
void main() {
  if(u_whichTexture == -2){
    gl_FragColor = u_FragColor;
  } else if(u_whichTexture == -1){
    gl_FragColor = vec4(v_UV,1.0,1.0);
  } else if(u_whichTexture == 0){
    gl_FragColor = texture2D(u_Sampler0, v_UV);
  } else if(u_whichTexture == 1){
    gl_FragColor = texture2D(u_Sampler1, v_UV);
  } else if(u_whichTexture == 2){
    gl_FragColor = texture2D(u_Sampler2, v_UV);
  } else {
    gl_FragColor = vec4(1,.2,.2,1);
  }
}
`;
