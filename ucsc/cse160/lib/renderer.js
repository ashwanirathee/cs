class WebGLRenderer {
  constructor() {}

  // draw every shape that's supposed to be on the canvas
  render(scene) {
    // check the time at the start of this function
    var startTime = performance.now();

    var globalRotMat = new Matrix4().rotate(g_globalAngleX, g_globalAngleY, g_globalAngleZ, 0);
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

    var floor = new Cube();
    floor.color = [0.647, 0.165, 0.165, 1.0];
    floor.matrix.translate(-1, -1, 0.0);
    floor.matrix.scale(2, 0.45, 1);
    floor.render();

    // draw a cube
    var body = new Cube();
    body.color = [1.0, 1.0, 1.0, 1.0];
    body.matrix.translate(-0.2, 0.10, 0.0);
    var bodyCoordinatesMat =  new Matrix4(body.matrix);
    body.matrix.rotate(g_yellowAngle/10, g_yellowAngle/10, 0, 1);
    body.matrix.scale(0.9, 0.45, 0.25);
    body.render();

    // draw a cube
    var neck = new Cube();
    neck.color = [0,0,1,1];
    neck.matrix = new Matrix4(bodyCoordinatesMat);
    neck.matrix.translate(0, 0.37, 0);
    neck.matrix.rotate(-45, 0, 0, 1);
    neck.matrix.scale(-0.3, 0.05, 0.25);
    neck.render();




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
    face.matrix.translate(-0.20, 0.60, 0);
    face.matrix.rotate(g_yellowAngle, 0, 0, 1);
    var face_cordinates =  new Matrix4(face.matrix);
    face.matrix.scale(-0.4, 0.2, 0.25);
    face.render();

    var mouth = new Cube();
    mouth.color = [0,0,1,1];
    mouth.matrix = new Matrix4(bodyCoordinatesMat);
    mouth.matrix.translate(-0.20, 0.58, 0);
    mouth.matrix.rotate(g_yellowAngle+15, 0, 0, 1);
    mouth.matrix.scale(-0.4, 0.03, 0.24);
    mouth.render();

    var tongue = new Cube();
    tongue.color = [1,0,0,1];
    tongue.matrix = new Matrix4(bodyCoordinatesMat);
    tongue.matrix.translate(-0.21, 0.59, 0.01);
    tongue.matrix.rotate(g_yellowAngle+13, 0, 0, 1);
    tongue.matrix.scale(-0.3, 0.01, 0.22);
    tongue.render();

    var eye1 = new Cube();
    eye1.color = [1,1,1,1];
    eye1.matrix = new Matrix4(face_cordinates);
    eye1.matrix.translate(-0.1, 0.1, -0.01);
    eye1.matrix.rotate(g_yellowAngle, 0, 0, 1);
    eye1.matrix.scale(0.04,0.04, 0.01);
    eye1.render();

    var eye2 = new Cube();
    eye2.color = [1,1,1,1];
    eye2.matrix = new Matrix4(face_cordinates);
    eye2.matrix.translate(-0.1, 0.1, 0.25);
    eye2.matrix.rotate(g_yellowAngle, 0, 0, 1);
    eye2.matrix.scale(0.04,0.04, 0.01);
    eye2.render();

    var left_front_leg = new Cube();
    left_front_leg.color = [1,0,0,1];
    left_front_leg.matrix = new Matrix4(bodyCoordinatesMat);
    left_front_leg.matrix.translate(0.0, 0.1, 0.1);
    left_front_leg.matrix.rotate(left_front_main_angle, 0, 0, 1);
    var left_front_left_coordinates = new Matrix4(left_front_leg.matrix);
    left_front_leg.matrix.scale(0.1, -0.3, -0.1);
    left_front_leg.render();

    var left_front_leg_part2 = new Cube();
    left_front_leg_part2.color = [1,1,0,1];
    left_front_leg_part2.matrix = new Matrix4(left_front_left_coordinates);
    left_front_leg_part2.matrix.translate(0.0, -0.3, 0.0);
    left_front_leg_part2.matrix.rotate(60, 0, 0, 1);
    var left_front_leg_part2_coordinates = new Matrix4(left_front_leg_part2.matrix);
    left_front_leg_part2.matrix.scale(0.1, -0.3, -0.1);
    left_front_leg_part2.render();

    var left_front_leg_part3 = new Cube();
    left_front_leg_part3.color = [1, 1, 1,1];
    left_front_leg_part3.matrix = new Matrix4(left_front_leg_part2_coordinates);
    left_front_leg_part3.matrix.translate(0.0, -0.3, 0.0);
    var left_front_leg_part3_coordinates = new Matrix4(left_front_leg_part3.matrix);
    left_front_leg_part3.matrix.rotate(-180, 0, 0, 1);
    left_front_leg_part3.matrix.scale(0.30, -0.02, -0.1);
    left_front_leg_part3.render();

    var left_front_leg_part4 = new Cube();
    left_front_leg_part4.color = [1, 1, 1,1];
    left_front_leg_part4.matrix = new Matrix4(left_front_leg_part3_coordinates);
    left_front_leg_part4.matrix.translate(-0.1, -0.0, 0.0);
    left_front_leg_part4.matrix.rotate(-left_front_part1_angle, 0, 0, 1);
    left_front_leg_part4.matrix.scale(-0.15, -0.02, -0.1);
    left_front_leg_part4.render();


    // right front leg
    var right_front_leg = new Cube();
    right_front_leg.color = [1,0,0,1];
    right_front_leg.matrix = new Matrix4(bodyCoordinatesMat);
    right_front_leg.matrix.translate(0.0, -0.05, 0.15);
    right_front_leg.matrix.rotate(g_magentaAngle, 0, 0, 1);
    var right_front_left_coordinates = new Matrix4(right_front_leg.matrix);
    right_front_leg.matrix.scale(0.1, -0.3, 0.1);
    right_front_leg.render();

    var right_front_leg_part2 = new Cube();
    right_front_leg_part2.color = [1,1,0,1];
    right_front_leg_part2.matrix = new Matrix4(right_front_left_coordinates);
    right_front_leg_part2.matrix.translate(0.0, -0.3, 0.1);
    right_front_leg_part2.matrix.rotate(Math.max(0,10-g_magentaAngle), 0, 0, 1);
    var right_front_leg_part2_coordinates = new Matrix4(right_front_leg_part2.matrix);
    right_front_leg_part2.matrix.scale(0.1, -0.3, -0.1);
    right_front_leg_part2.render();

    var right_front_leg_part3 = new Cube();
    right_front_leg_part3.color = [1, 1, 1,1];
    right_front_leg_part3.matrix = new Matrix4(right_front_leg_part2_coordinates);
    right_front_leg_part3.matrix.translate(0.0, -0.3, 0.0);
    right_front_leg_part3.matrix.rotate(-180, 0, 0, 1);
    right_front_leg_part3.matrix.scale(0.15, -0.02, -0.1);
    right_front_leg_part3.render();


    // left back leg
    var left_back_leg = new Cube();
    left_back_leg.color = [0,1,0,1];
    left_back_leg.matrix = new Matrix4(bodyCoordinatesMat);
    left_back_leg.matrix.translate(0.8, -0.05, 0.1);
    left_back_leg.matrix.rotate(g_yellowAngle, 0, 0, 1);
    var left_back_leg_coordinates = new Matrix4(left_back_leg.matrix);
    left_back_leg.matrix.scale(0.1,-0.3, -0.1);
    left_back_leg.render();

    var left_back_leg_part2 = new Cube();
    left_back_leg_part2.color = [1,1,0,1];
    left_back_leg_part2.matrix = new Matrix4(left_back_leg_coordinates);
    left_back_leg_part2.matrix.translate(0.0, -0.3, 0.0);
    left_back_leg_part2.matrix.rotate(Math.max(0,10-g_yellowAngle), 0, 0, 1);
    var left_back_leg_part2_coordinates = new Matrix4(left_back_leg_part2.matrix);
    left_back_leg_part2.matrix.scale(0.1, -0.3, -0.1);
    left_back_leg_part2.render();

    var left_back_leg_part3 = new Cube();
    left_back_leg_part3.color = [1, 1, 1,1];
    left_back_leg_part3.matrix = new Matrix4(left_back_leg_part2_coordinates);
    left_back_leg_part3.matrix.translate(0.0, -0.3, 0.0);
    left_back_leg_part3.matrix.rotate(-180, 0, 0, 1);
    left_back_leg_part3.matrix.scale(0.15, -0.02, -0.1);
    left_back_leg_part3.render();

    // right back leg
    var right_back_leg = new Cube();
    right_back_leg.color = [0,1,0,1];
    right_back_leg.matrix = new Matrix4(bodyCoordinatesMat);
    right_back_leg.matrix.translate(0.8, -0.05, 0.15);
    right_back_leg.matrix.rotate(g_magentaAngle, 0, 0, 1);
    var right_back_leg_coordinates = new Matrix4(right_back_leg.matrix);
    right_back_leg.matrix.scale(0.1, -0.3, 0.1);
    right_back_leg.render();

    var left_back_leg_part2 = new Cube();
    left_back_leg_part2.color = [1,1,0,1];
    left_back_leg_part2.matrix = new Matrix4(right_back_leg_coordinates);
    left_back_leg_part2.matrix.translate(0.0, -0.3, 0.1);
    left_back_leg_part2.matrix.rotate(Math.max(0,10-g_magentaAngle), 0, 0, 1);
    var left_back_leg_part2_coordinates = new Matrix4(left_back_leg_part2.matrix);
    left_back_leg_part2.matrix.scale(0.1, -0.3, -0.1);
    left_back_leg_part2.render();

    var left_back_leg_part3 = new Cube();
    left_back_leg_part3.color = [1, 1, 1,1];
    left_back_leg_part3.matrix = new Matrix4(left_back_leg_part2_coordinates);
    left_back_leg_part3.matrix.translate(0.0, -0.3, 0.0);
    left_back_leg_part3.matrix.rotate(-180, 0, 0, 1);
    left_back_leg_part3.matrix.scale(0.15, -0.02, -0.1);
    left_back_leg_part3.render();

    var tail = new Cube();
    tail.color = [1,0,0,1];
    tail.matrix = new Matrix4(bodyCoordinatesMat);
    tail.matrix.translate(0.9, 0.43, 0.15);
    tail.matrix.rotate(Math.max(0,30+g_magentaAngle), 0, 0, 1);
    var tail_coordinates = new Matrix4(tail.matrix);
    tail.matrix.scale(0.04, -0.3, 0.1);

    tail.render();

    var tail_part2 = new Cube();
    tail_part2.color = [1,0,0,1];
    tail_part2.matrix = new Matrix4(tail_coordinates);
    tail_part2.matrix.translate(0.0, -0.3, 0.0);
    tail_part2.matrix.rotate(Math.min(5,30-g_magentaAngle), 0, 0, 1);
    tail_part2.matrix.scale(-0.03, -0.15, 0.1);
    tail_part2.render();

    // time taken to draw
    var duration = performance.now() - startTime;
    var len = 10
    // console.log(duration)
    // console.log("numdot:", len, ",ms:",Math.floor(duration), ",fps:",Math.floor(10000/duration)/10,"numdot")
    document.getElementById('perf').innerHTML = "NumDot: " + len + ", Time Taken in rendering: " + Math.floor(duration) + ", fps: " + Math.floor(10000 / duration) / 10 + " numdot";
  }
}
