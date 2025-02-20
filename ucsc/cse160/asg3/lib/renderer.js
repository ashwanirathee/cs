class WebGLRenderer {
  constructor() {
    this.dayColor = [0.53, 0.81, 0.92]; // Day Sky color
    this.nightColor = [0.2, 0.2, 0.2];   // Night Sky color
    this.rows = 32;
    this.cols = 32;
    this.g_map = null;
    // Array to hold cube instances
    this.cubeInstances = [];
  }

  drawMap() {
    // Generate the maze if needed
    if (this.g_map == null) {
      this.g_map = this.generateMaze(this.rows, this.cols);
      // Also, build the cubes once:
      this.buildCubeInstances();
    }
    // Now simply render each pre-created cube:
    for (let i = 0; i < this.cubeInstances.length; i++) {
      this.cubeInstances[i].render();
    }
  }

  buildCubeInstances() {
    // Clear any existing instances.
    this.cubeInstances = [];

    // Loop over the grid and create cubes only once.
    for (let x = 0; x <= this.rows; x++) {
      for (let y = 0; y <= this.cols; y++) {
        if (this.g_map[x][y] > 0) {
          for (let h = 1; h <= this.g_map[x][y]; h++) {
            let type;
            if (x === 0 || y === 0) {
              type = 3;
            } else if (h <= 1) {
              type = 3;
            } else {
              type = 2;
            }
            let cube = new Cube(2, type);
            cube.color = [1.0, 1.0, 1.0, 1.0];
            // Position cube relative to maze center:
            cube.matrix.translate(x - this.rows / 2, h - 1, y - this.cols / 2);
            this.cubeInstances.push(cube);
          }
        }
        if (this.g_map[x][y] == -1) {
          // For special cells (e.g., pillars)
          let cube = new Cube(2, 4);
          cube.matrix.setTranslate(x - this.rows / 2, 1, y - this.cols / 2);
          cube.color = [1.0, 0.0, 0.0, 1.0];
          cube.matrix.scale(1, 10, 1);
          this.cubeInstances.push(cube);
        }
      }
    }
  }

  generateMaze(width, height) {
    // ... your maze generation code ...
    const maze = [
      [3, 4, 4, 4, 2, 3, 2, 3, 2, 3, 3, 2, 2, 4, 3, 4, 3, 4, 3, 3, 2, 4, 4, 3, 2, 2, 3, 2, 4, 4, 3, 2, 4],
      [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4],
      [3, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3],
      [4, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [3, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 4],
      [3, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2],
      [3, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 2],
      [2, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3],
      [2, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 2],
      [4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 4],
      [2, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 4],
      [2, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 3],
      [2, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 4],
      [3, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 3],
      [4, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3],
      [2, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4],
      [4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2],
      [2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3],
      [4, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 3],
      [2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 4],
      [2, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 4],
      [3, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2],
      [2, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4],
      [4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4],
      [2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 3],
      [4, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 2],
      [3, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 2],
      [2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4],
      [2, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 4],
      [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 2],
      [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 4, 4, 2, 2, 2, 2, 4, 2, 2, 3, 2, 3, 3, 4, 2, 4, 2, 3, 3, 4, 4, 2, 3, 3, 3, 2, 4, 2, 2, 4, 2, 3]
    ];
    
    // Set start and end points or modify values as needed.
    maze[1][1] = 0;
    maze[height - 2][width - 2] = 0;
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        if (maze[x][y] > 0) {
          maze[x][y] += Math.floor(Math.random() * 3) + 1;
        }
      }
    }
    maze[31][2] = -1;
    return maze;
  }

  render(scene) {
    var startTime = performance.now();
    // Clear canvas and set sky color based on time, etc.
    var globalRotMat = new Matrix4().rotate(g_globalAngleX, 0, 1, 0);
    globalRotMat.rotate(g_globalAngleY, 1, 0, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let t = Math.sin(0.1 * g_seconds * Math.PI); 
    let currentColor = lerpColor(this.dayColor, this.nightColor, (t + 1) / 2);
    gl.clearColor(...currentColor, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render static objects like floor and sky...
    let floor = new Cube(-2, 2);
    floor.color = [0.49, 0.788, 0.29, 1.0];
    floor.matrix.translate(0, -0.5, 0);
    floor.matrix.scale(32, 0.01, 32);
    floor.render();

    let sky = new Cube(-2, 1);
    sky.color = [0.235, 0.639, 1, 1.0];
    sky.matrix.scale(100, 100, 100);
    sky.render();

    // Draw the maze cubes from the cached instances.
    this.drawMap();

    // Optionally, measure and display performance.
    var duration = performance.now() - startTime;
    document.getElementById("perf").innerHTML =
      "Time Taken in rendering: " + duration.toFixed(3) + " ms, fps: " + (1000 / duration).toFixed(2);
  }
}

// Lerp function to linearly interpolate between two colors
function lerpColor(color1, color2, t) {
  return color1.map((v, i) => v + t * (color2[i] - v));
}
