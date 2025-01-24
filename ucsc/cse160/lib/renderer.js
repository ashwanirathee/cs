class WebGLRenderer {
  constructor() {}

  // draw every shape that's supposed to be on the canvas
  render(scene) {
    // check the time at the start of this function
    var startTime = performance.now();

    var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // // draw the shapes
    // var len = scene.shapesList.length;
    // for (var i = 0; i < len; i++) {
    //   scene.shapesList[i].render(a_Position, a_Size, u_FragColor);
    // }
    // gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);

    // draw a cube
    var body = new Cube();
    body.color = [1.0, 1.0, 1.0, 1.0];
    body.matrix.translate(g_yellowAngle/100, 0.10, 0.0);
    var bodyCoordinatesMat =  new Matrix4(body.matrix);
    body.matrix.scale(0.9, 0.45, 0.25);
    body.render();


    // var leftArm = new Cube();
    // leftArm.color = [1, 1, 0, 1];
    // leftArm.matrix.setTranslate(-0.1, -0.1, 0.0);
    // leftArm.matrix.rotate(-g_yellowAngle, 0, 0, 1);
    // var yellowCoordinatesMat = new Matrix4(leftArm.matrix);
    // leftArm.matrix.scale(0.25, 0.7, 0.5);
    // leftArm.matrix.translate(-0.5, 0, 0);
    // leftArm.render();

    // var rightArm = new Cube();
    // rightArm.color = [1, 0, 1, 1];
    // rightArm.matrix = yellowCoordinatesMat;
    // rightArm.matrix.translate(0, 0.65, 0);
    // rightArm.matrix.rotate(g_magentaAngle, 0, 0, 1);
    // rightArm.matrix.scale(0.3, 0.3, 0.3);
    // rightArm.matrix.translate(-0.5, 0, -0.001);
    // // rightArm.matrix.rotate(-30,1,0,0)
    // // rightArm.matrix.scale(.2,.4,.2)
    // rightArm.render();

    var face = new Cube();
    face.color = [0,0,1,1];
    face.matrix = new Matrix4(bodyCoordinatesMat);
    face.matrix.translate(0, 0.65, 0);
    face.matrix.rotate(g_yellowAngle, 0, 0, 1);
    face.matrix.scale(-0.6, 0.3, 0.3);
    face.render();

    var left_front_leg = new Cube();
    left_front_leg.color = [1,0,0,1];
    left_front_leg.matrix = new Matrix4(bodyCoordinatesMat);
    left_front_leg.matrix.translate(0.0, -0.05, 0.1);
    left_front_leg.matrix.rotate(g_magentaAngle, 0, 0, 1);
    var left_front_left_coordinates = new Matrix4(left_front_leg.matrix);
    left_front_leg.matrix.scale(0.1, -0.5, -0.1);
    left_front_leg.render();

    var left_front_leg_part2 = new Cube();
    left_front_leg_part2.color = [1,1,0,1];
    left_front_leg_part2.matrix = new Matrix4(left_front_left_coordinates);
    left_front_leg_part2.matrix.translate(0.0, -0.50, 0.0);
    left_front_leg_part2.matrix.rotate(-g_magentaAngle, 0, 0, 1);
    var left_front_leg_part2_coordinates = new Matrix4(left_front_leg_part2.matrix);
    left_front_leg_part2.matrix.scale(0.1, -0.5, -0.1);
    left_front_leg_part2.render();

    var left_front_leg_part3 = new Cube();
    left_front_leg_part3.color = [1,1,0,1];
    left_front_leg_part3.matrix = new Matrix4(left_front_leg_part2_coordinates);
    left_front_leg_part3.matrix.translate(0.0, -0.50, 0.1);
    left_front_leg_part3.matrix.rotate(-45, 0, 0, 1);
    left_front_leg_part3.matrix.scale(0.1, -0.1, -0.1);
    left_front_leg_part3.render();


    // right front leg
    var right_front_leg = new Cube();
    right_front_leg.color = [1,0,0,1];
    right_front_leg.matrix = new Matrix4(bodyCoordinatesMat);
    right_front_leg.matrix.translate(0.0, -0.05, 0.40);
    right_front_leg.matrix.rotate(g_magentaAngle-10, 0, 0, 1);
    var right_front_left_coordinates = new Matrix4(right_front_leg.matrix);
    right_front_leg.matrix.scale(0.1, -0.5, 0.1);
    right_front_leg.render();

    var right_front_leg_part2 = new Cube();
    right_front_leg_part2.color = [1,1,0,1];
    right_front_leg_part2.matrix = new Matrix4(right_front_left_coordinates);
    right_front_leg_part2.matrix.translate(0.0, -0.50, 0.1);
    right_front_leg_part2.matrix.rotate(-g_magentaAngle-10, 0, 0, 1);
    right_front_leg_part2.matrix.scale(0.1, -0.5, -0.1);
    right_front_leg_part2.render();


    // left back leg
    var left_back_leg = new Cube();
    left_back_leg.color = [0,1,0,1];
    left_back_leg.matrix = new Matrix4(bodyCoordinatesMat);
    left_back_leg.matrix.translate(0.8, -0.05, 0.1);
    left_back_leg.matrix.rotate(g_magentaAngle, 0, 0, 1);
    var left_back_leg_coordinates = new Matrix4(left_back_leg.matrix);
    left_back_leg.matrix.scale(0.1, -0.5, -0.1);
    left_back_leg.render();

    var left_back_leg_part2 = new Cube();
    left_back_leg_part2.color = [1,1,0,1];
    left_back_leg_part2.matrix = new Matrix4(left_back_leg_coordinates);
    left_back_leg_part2.matrix.translate(0.0, -0.50, 0.1);
    left_back_leg_part2.matrix.rotate(-g_magentaAngle, 0, 0, 1);
    left_back_leg_part2.matrix.scale(0.1, -0.5, -0.1);
    left_back_leg_part2.render();

    // right back leg
    var right_back_leg = new Cube();
    right_back_leg.color = [0,1,0,1];
    right_back_leg.matrix = new Matrix4(bodyCoordinatesMat);
    right_back_leg.matrix.translate(0.8, -0.05, 0.40);
    right_back_leg.matrix.rotate(-g_magentaAngle, 0, 0, 1);
    var right_back_leg_coordinates = new Matrix4(right_back_leg.matrix);
    right_back_leg.matrix.scale(0.1, -0.5, 0.1);
    right_back_leg.render();

    var left_back_leg_part2 = new Cube();
    left_back_leg_part2.color = [1,1,0,1];
    left_back_leg_part2.matrix = new Matrix4(right_back_leg_coordinates);
    left_back_leg_part2.matrix.translate(0.0, -0.50, 0.1);
    left_back_leg_part2.matrix.rotate(g_magentaAngle, 0, 0, 1);
    left_back_leg_part2.matrix.scale(0.1, -0.5, -0.1);
    left_back_leg_part2.render();

    // time taken to draw
    var duration = performance.now() - startTime;
    // console.log(duration)
    // console.log("numdot:", len, ",ms:",Math.floor(duration), ",fps:",Math.floor(10000/duration)/10,"numdot")
    // document.getElementById('perf').innerHTML = "NumDot: " + len + ", Time Taken in rendering: " + Math.floor(duration) + ", fps: " + Math.floor(10000 / duration) / 10 + " numdot";
  }
}
