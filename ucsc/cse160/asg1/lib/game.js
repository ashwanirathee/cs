class Game {
  constructor() {
    this.player = [0, 0];
    this.maze = [
      [0, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    this.rows = 5;
    this.cols = 5;
  }
  render(a_Position, a_Size, u_FragColor) {
    // console.log("adasd");
    var n = 25;
    var vertexBuffer1 = gl.createBuffer();
    if (!vertexBuffer1) {
      console.log("Failed to create the buffer object");
      return -1;
    }
    gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
    gl.uniform1f(a_Size, 15);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1);
    let vertices = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.maze[i][j] == 1) vertices.push(i / 10, j / 10);
      }
    }
    // console.log(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.drawArrays(gl.POINTS, 0, vertices.length/2);
    // console.log(this.player)
    gl.disableVertexAttribArray(a_Position);
    gl.vertexAttrib3f(a_Position, this.player[0]/10, this.player[1]/10, 0.0);
    gl.uniform1f(a_Size, 15);
    gl.uniform4f(u_FragColor, 0.5, 0.5, 0.5, 0.5);
    gl.drawArrays(gl.POINTS, 0, 2);
  }
}
