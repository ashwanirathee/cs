class WebGLRenderer {
  constructor() {
  }

  // draw every shape that's supposed to be on the canvas
  render(scene) {
    console.log("ADASDAD")
    // check the time at the start of this function
    var startTime = performance.now();

    var globalRotMat = new Matrix4().rotate(g_globalAngle,0,1,0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
 
    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // // draw the shapes
    // var len = scene.shapesList.length;
    // for (var i = 0; i < len; i++) {
    //   scene.shapesList[i].render(a_Position, a_Size, u_FragColor);
    // }
    gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);

    drawTriangle3D([-1.0,0.0,0.0, -0.5,-1.0,0.0, 0.0,0.0,0.0])

    // draw a cube
    var body = new Cube();
    body.color = [1.0, 0.0, 0.0,1.0];
    body.matrix.translate(-.25,-.5,0.0)
    body.matrix.scale(0.5,1,.5)
    body.render();

    var leftArm = new Cube();
    leftArm.color = [1, 1, 0, 1];
    leftArm.matrix.translate(0.7,0,0.0)
    leftArm.matrix.rotate(45,0,0,1)
    leftArm.matrix.scale(0.25,0.7,.5)
    leftArm.render();

    var rightArm = new Cube();
    rightArm.color = [0, 1, 0, 1];
    rightArm.matrix.translate(-0.7,0,0.0)
    rightArm.matrix.rotate(45,0,0,1)
    rightArm.matrix.scale(0.25,0.7,.5)
    rightArm.render();

    // time taken to draw
    var duration = performance.now() - startTime;
    console.log(duration)
    // console.log("numdot:", len, ",ms:",Math.floor(duration), ",fps:",Math.floor(10000/duration)/10,"numdot")
    // document.getElementById('perf').innerHTML = "NumDot: " + len + ", Time Taken in rendering: " + Math.floor(duration) + ", fps: " + Math.floor(10000 / duration) / 10 + " numdot";

  }
}
