class WebGLRenderer {
  constructor() {
  }

  // draw every shape that's supposed to be on the canvas
  render(scene) {

    // check the time at the start of this function
    var startTime = performance.now();

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // draw the shapes
    var len = scene.shapesList.length;
    for (var i = 0; i < len; i++) {
      scene.shapesList[i].render(a_Position, a_Size, u_FragColor);
    }

    // time taken to draw
    var duration = performance.now() - startTime;
    // console.log("numdot:", len, ",ms:",Math.floor(duration), ",fps:",Math.floor(10000/duration)/10,"numdot")
    document.getElementById('perf').innerHTML = "NumDot: " + len + ", Time Taken in rendering: " + Math.floor(duration) + ", fps: " + Math.floor(10000 / duration) / 10 + " numdot";

  }
}
