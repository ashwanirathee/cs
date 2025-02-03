class Cube {
    constructor() {
      this.type = "cube";
      this.color = [1.0,1.0,1.0,1.0];
      this.matrix = new Matrix4();
      this.buffer = null;
      this.vertices = null;
    }
    
    generateVertices(){
      let v = [0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0,
        0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0, //bottom
        0.0,1.0,0.0, 0.0,1.0,1.0, 1.0,1.0,1.0,
        0.0,1.0,0.0, 1.0,1.0,1.0, 1.0,1.0,0.0, // behind
        0.0,0.0,0.0, 0.0,0.0,1.0, 0.0,1.0,1.0,
        0.0,0.0,0.0, 0.0,1.0,1.0, 0.0,1.0,0.0, // left up
        0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,1.0,
        0.0,0.0,0.0, 1.0,0.0,1.0, 1.0,0.0,0.0, // front
        1.0,0.0,0.0, 1.0,0.0,1.0, 1.0,1.0,1.0,
        1.0,0.0,0.0, 1.0,1.0,1.0, 1.0,1.0,0.0, // this right
        0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0,
        0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0
      ];
  
      this.vertices = new Float32Array(v);
    }

    drawCube(M, color) {
      gl.uniformMatrix4fv(u_ModelMatrix, false, M.elements);
      gl.uniform4f(u_FragColor, ...color);
    
      if (this.vertices === null) {
        this.generateVertices();
      }
    
      if (this.buffer === null) {
        // Create a buffer object
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
          console.log("Failed to create the buffer object");
          return -1;
        }
      }
    
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
      gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(a_Position);
      gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    render() {
      this.drawCube(this.matrix, this.color)
    }
  }

