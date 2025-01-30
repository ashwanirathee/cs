class Cube {
    constructor() {
      this.type = "cube";
      this.color = [1.0,1.0,1.0,1.0];
      this.matrix = new Matrix4();
    }
  
    render() {
      drawCube(this.matrix, this.color);
    }
  }
  
function drawCube(matrix, rgba){
    gl.uniformMatrix4fv(u_ModelMatrix, false, matrix.elements);
    // this bottom
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    drawTriangle3D([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0]);
    drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0]);

    // this behind
    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
    drawTriangle3D([0.0,1.0,0.0, 0.0,1.0,1.0, 1.0,1.0,1.0]);
    drawTriangle3D([0.0,1.0,0.0, 1.0,1.0,1.0, 1.0,1.0,0.0]);

    // this left up
    gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);
    drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,1.0, 0.0,1.0,1.0]);
    drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,1.0, 0.0,1.0,0.0]);

    // this front
    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
    drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,1.0]);
    drawTriangle3D([0.0,0.0,0.0, 1.0,0.0,1.0, 1.0,0.0,0.0]);

    // this right up
    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
    drawTriangle3D([1.0,0.0,0.0, 1.0,0.0,1.0, 1.0,1.0,1.0]);
    drawTriangle3D([1.0,0.0,0.0, 1.0,1.0,1.0, 1.0,1.0,0.0]);

    gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.9, rgba[2]*.9, rgba[3]);
    drawTriangle3D([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0]);
    drawTriangle3D([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0]);
}