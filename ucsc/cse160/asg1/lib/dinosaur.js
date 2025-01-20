class Dinosaur {
  constructor(vertices, color, size) {
    this.shape = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    var output = this.shape[0].map((_, colIndex) => this.shape.map((row) => row[colIndex]));
    let reversedArray2D = output.map((row) => row.reverse());
    this.shape = reversedArray2D;
    this.vertices = vertices;
    this.color = color;
    this.size = size;
    this.rows = 15;
    this.cols = 15;
  }

  render() {
    gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
    gl.uniform1f(a_Size, this.size);
    var d = this.size / 70.0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.shape[i][j] == 1) {
          drawTriangle([this.vertices[0] + i / 15, this.vertices[1] + j / 15, this.vertices[0] + (d + i / 15), this.vertices[1] + j / 15, this.vertices[0] + i / 15, this.vertices[1] + (d + j / 15)]);
          drawTriangle([this.vertices[0] + d + i / 15, this.vertices[1] + d + j / 15, this.vertices[0] + d + i / 15, this.vertices[1] + j / 15, this.vertices[0] + i / 15, this.vertices[1] + d + j / 15]);
        }
      }
    }
  }
}
