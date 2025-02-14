class WebGLRenderer {
  constructor() {
    this.dayColor = [0.53, 0.81, 0.92]; // Day Sky color (Sky Blue)
    this.nightColor = [0.2, 0.2, 0.2]; // Night Sky color (Dark Blue)
  }

  // draw every shape that's supposed to be on the canvas
  render(scene) {
    // check the time at the start of this function
    var startTime = performance.now();

    var globalRotMat = new Matrix4().rotate(g_globalAngleX, 0, 1, 0);
    globalRotMat.rotate(0, 1, 0, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let t = Math.sin(0.1 * g_seconds * Math.PI); 
    let currentColor = lerpColor(this.dayColor, this.nightColor, (t + 1) / 2);
    gl.clearColor(...currentColor, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw a cube
    var body = new Cube();
    // body.color = [0.988, 0.722, 0.373, 1.0];
    // body.matrix.translate(-0.5, -0.35, 0);
    // body.matrix.rotate(angles["body"], 0, 0, 1);
    body.matrix.scale(1, 1, 1);
    body.render();

    // time taken to draw
    var duration = performance.now() - startTime;
    document.getElementById("perf").innerHTML = "Time Taken in rendering: " + duration.toFixed(3)  + " ms, fps: " + (1000 / duration).toFixed(2)+ "";
  }
}

// Lerp function to linearly interpolate between two colors
function lerpColor(color1, color2, t) {
  return color1.map((v, i) => v + t * (color2[i] - v));
}
