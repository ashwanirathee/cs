class Cube {
    constructor(vertices, color, size) {
      this.type = "cube";
      this.color = [1.0,1.0,1.0,1.0];
      this.matrix = new Matrix4();
    }
  
    render() {
      var rgba = this.color;
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

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
  }
  