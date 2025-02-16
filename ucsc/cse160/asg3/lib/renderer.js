class WebGLRenderer {
  constructor() {
    this.dayColor = [0.53, 0.81, 0.92]; // Day Sky color (Sky Blue)
    this.nightColor = [0.2, 0.2, 0.2]; // Night Sky color (Dark Blue)
    this.rows = 2;
    this.cols = 2;
    this.g_map = null;
  }

  drawMap(){
    if(this.g_map == null){
      this.g_map = this.generateMaze(this.rows, this.cols);
      // console.log(this.g_map)
    }
    var x;
    var y;
    // console.log(this.g_map)
    for(x=0;x<=this.rows;x++){
      for(y=0;y<=this.cols;y++){
        if(this.g_map[x][y] > 0){

          for(var h = 1; h<=this.g_map[x][y];h++){
            // console.log(this.g_map[x][y])
            var body = new Cube(2,3);
            body.color = [1.0,1.0,1.0,1.0];
            body.matrix.translate(x-this.rows/2,h-1,y-this.cols/2);
            body.render();
          }

        }
      }
    }
  }


  generateMaze(width, height) {
    // console.log("generate")
    // Ensure odd dimensions for proper walls
    width = Math.floor(width / 2) * 2 + 1;
    height = Math.floor(height / 2) * 2 + 1;

    const maze = Array.from({ length: height }, () => Array(width).fill(1)); // 1 represents walls
    const stack = [[1, 1]];
    maze[1][1] = 0; // 0 represents a path

    const directions = [
      [0, 2],
      [2, 0],
      [0, -2],
      [-2, 0],
    ]; // Move in grid

    while (stack.length > 0) {
      const [x, y] = stack[stack.length - 1];
      const neighbors = [];

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx > 0 && nx < height - 1 && ny > 0 && ny < width - 1 && maze[nx][ny] === 1) {
          neighbors.push([nx, ny]);
        }
      }

      if (neighbors.length > 0) {
        const [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
        maze[(x + nx) / 2][(y + ny) / 2] = 0; // Remove the wall
        maze[nx][ny] = 0; // Mark as part of the maze
        stack.push([nx, ny]);
      } else {
        stack.pop();
      }
    }
    // console.log("hi:",maze);

    // Define starting and ending points
    maze[1][1] = 0; // Start point at the top-left corner
    maze[height - 2][width - 2] = 0; // End point at the bottom-right corner
    // console.log(height, width);
    for(var x=0;x<height;x++){
      for(var y=0;y<width;y++){
        // console.log("ehre:", x,y)
        if(x === 0 || y === 0 || x === height-1 || y === width-1){
          maze[x][y] += Math.floor(Math.random() * 3) + 1;;
          // console.log(maze[x][y])
        }
      }
    }
    return maze;
  }
  
  render(scene) {
    // check the time at the start of this function
    var startTime = performance.now();
    // camera.update();
    // camera.updateProjectionMatrix ();

    var globalRotMat = new Matrix4().rotate(g_globalAngleX, 0, 1, 0);
    globalRotMat.rotate(g_globalAngleY, 1, 0, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let t = Math.sin(0.1 * g_seconds * Math.PI); 
    let currentColor = lerpColor(this.dayColor, this.nightColor, (t + 1) / 2);
    gl.clearColor(...currentColor, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // var floor = new Cube(-2,2);
    // floor.color = [0.05,0.8,0.05,1.0];
    // // floor.textureNum = 0;
    // floor.matrix.translate(0,-0.5,0.0);
    // floor.matrix.scale(32, 0.01, 32);
    // // floor.matrix.translate(-0.5,0,-0.5);
    // floor.render();
    

    // var sky = new Cube(-2,1);
    // sky.color = [0.0,0.0,1.0,1.0];
    // // sky.textureNum = -2;
    // sky.matrix.scale(100, 100, 100);
    // sky.render();

    // draw a cube
    var body = new Cube(2,3);
    body.matrix.setTranslate(0,0,0);
    body.color = [1.0,0.0,0.0,1.0];
    body.matrix.scale(1, 1, 1);
    body.render();

    // this.drawMap();
    // time taken to draw
    var duration = performance.now() - startTime;
    document.getElementById("perf").innerHTML = "Time Taken in rendering: " + duration.toFixed(3)  + " ms, fps: " + (1000 / duration).toFixed(2)+ "";
  }
}

// Lerp function to linearly interpolate between two colors
function lerpColor(color1, color2, t) {
  return color1.map((v, i) => v + t * (color2[i] - v));
}
