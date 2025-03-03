// Vertex shader program
var VSHADER_SOURCE = `
    precision mediump float;

    uniform mat4 u_ModelMatrix;
    uniform mat4 u_NormalMatrix;
    uniform mat4 u_GlobalRotateMatrix;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;

    uniform vec3 a_CameraPos;
    varying vec3 u_CameraPos;

    attribute vec4 a_Position;
    attribute vec2 a_UV;
    attribute vec3 a_Normal;

    varying vec4 v_VertPos;
    varying vec2 v_UV;
    varying vec3 v_Normal;

    void main(){
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
      v_UV = a_UV;
      v_Normal = (u_NormalMatrix * vec4(a_Normal,1.0)).xyz;
      v_Normal = a_Normal;
      v_VertPos = u_ModelMatrix * a_Position;
      u_CameraPos = a_CameraPos;
    }
`;

// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;

    uniform int u_lightStatus; // 0 for off, 1 for on
    uniform vec3 u_lightPos;

    uniform int u_light2Status; // 0 for off, 1 for on
    uniform vec3 u_light2Pos;

    varying vec3 u_CameraPos;

    uniform vec4 u_FragColor;  // frag color, default is 0.5,0.5,0.5,1.0 

    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;
    uniform sampler2D u_Sampler2;

    uniform int u_whichTexture;
    varying vec3 v_Normal;
    varying vec4 v_VertPos;
    varying vec2 v_UV;

    void main() {

      if (u_whichTexture == -4){
        vec3 norm = normalize(v_Normal);
        gl_FragColor = vec4(norm, 1.0);
      } else if(u_whichTexture == -3){
        gl_FragColor = vec4((v_Normal+1.0)/2.0,1.0);
      } else if(u_whichTexture == -2){
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

      vec3 lightVector = u_lightPos - vec3(v_VertPos);
      float r = length(lightVector);
      vec3 L = normalize(lightVector);
      vec3 N = normalize(v_Normal);
      float nDotL = max(dot(N,L),0.0);
      vec3 R = reflect(-L,N);
      vec3 E = normalize(u_CameraPos-vec3(v_VertPos));
      float specular = pow(max(dot(E,R),0.0), 5.0)*0.8;

      vec3 diffuse = vec3(1.0,1.0,0.9) * vec3(gl_FragColor) * nDotL * 0.7;
      vec3 ambient = vec3(gl_FragColor) * 0.5;
      if(u_lightStatus == 1){
        if(u_whichTexture == 0){
          gl_FragColor = vec4(diffuse + ambient + specular, 1.0);
          //gl_FragColor = vec4(diffuse + ambient, 1.0);
        } else {
          gl_FragColor = vec4(diffuse + ambient + specular, 1.0);
          // gl_FragColor = vec4(diffuse + ambient, 1.0);
        }
      }

      vec3 lightDir = vec3(0.0, -1.0, 0.0);
      vec3 spotDir = vec3(0.0, 1.0, 0.0);
      float theta = dot(lightDir, normalize(-spotDir));
      vec3 light2Vector = u_light2Pos - vec3(v_VertPos);
      
      float r1 = length(light2Vector);
      vec3 L2 = normalize(light2Vector);
      vec3 N2 = normalize(v_Normal);
      float nDotL2 = max(dot(N2,L2),0.0);
      vec3 R2 = reflect(-L2,N2);
      vec3 E2 = normalize(u_CameraPos-vec3(v_VertPos));
      float specular2 = pow(max(dot(E2,R2),0.0), 5.0)*0.8;
      vec3 diffuse2 = vec3(1.0,1.0,0.9) * vec3(gl_FragColor) * nDotL2 * 0.7;
      vec3 ambient2 = vec3(gl_FragColor) * 0.5;
      if(u_light2Status == 1){
        if(theta > 0.01) 
        {       
            gl_FragColor = vec4(diffuse2 + ambient2 + specular2, 1.0);
        } else {
          gl_FragColor = vec4(ambient2, 1.0);
        }
      }
    }
    
`;