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
    globalRotMat.rotate(g_globalAngleY, 1, 0, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let t = Math.sin(0.1 * g_seconds * Math.PI); 
    let currentColor = lerpColor(this.dayColor, this.nightColor, (t + 1) / 2);
    gl.clearColor(...currentColor, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // return;
    var floor = new Cube();
    floor.color = [0.6, 0.4, 0.2, 1.0];
    floor.matrix.translate(-0.5, -1.35, -0.4);
    var floorCoords = new Matrix4(floor.matrix);
    floor.matrix.scale(1.2, 0.4, 1.2);
    floor.render();

    var top_floor = new Cube();
    top_floor.color = [0.3, 0.6, 0.2, 1.0];
    top_floor.matrix = new Matrix4(floorCoords);
    top_floor.matrix.translate(0, 0.405, 0);
    top_floor.matrix.scale(1.2, 0.05, 1.2);
    top_floor.render();

    var pink_cube = new Cube();
    pink_cube.color = [0.3, 0.5, 0.2, 1.0];
    pink_cube.matrix = new Matrix4(floorCoords);
    pink_cube.matrix.translate(0, 0.456, 0);
    pink_cube.matrix.scale(0.05, 0.3, 0.05);
    pink_cube.render();

    var pink_cube1 = new Cube();
    pink_cube1.color = [0.941, 0.753, 0.275, 1.0];
    pink_cube1.matrix = new Matrix4(floorCoords);
    pink_cube1.matrix.translate(0, 0.9, 0);
    pink_cube1.matrix.scale(0.05, 0.05, 0.05);
    pink_cube1.render();
    var pink_cube2 = new Cube();
    pink_cube2.color = [0.741, 0.11, 0.365, 1.0];
    pink_cube2.matrix = new Matrix4(floorCoords);
    pink_cube2.matrix.translate(0.1, 0.9, 0);
    pink_cube2.matrix.scale(0.05, 0.05, 0.05);
    pink_cube2.render();
    var pink_cube3 = new Cube();
    pink_cube3.color = [0.741, 0.11, 0.365, 1.0];
    pink_cube3.matrix = new Matrix4(floorCoords);
    pink_cube3.matrix.translate(-0.1, 0.9, 0);
    pink_cube3.matrix.scale(0.05, 0.05, 0.05);
    pink_cube3.render();
    var pink_cube4 = new Cube();
    pink_cube4.color = [0.741, 0.11, 0.365, 1.0];
    pink_cube4.matrix = new Matrix4(floorCoords);
    pink_cube4.matrix.translate(0, 1.0, 0);
    pink_cube4.matrix.scale(0.05, 0.05, 0.05);
    pink_cube4.render();
    var pink_cube5 = new Cube();
    pink_cube5.color = [0.741, 0.11, 0.365, 1.0];
    pink_cube5.matrix = new Matrix4(floorCoords);
    pink_cube5.matrix.translate(0, 0.8, 0);
    pink_cube5.matrix.scale(0.05, 0.05, 0.05);
    pink_cube5.render();


    var pink_cube = new Cube();
    pink_cube.color = [0.302, 0.451, 0.243, 1.0];
    pink_cube.matrix = new Matrix4(floorCoords);
    pink_cube.matrix.translate(-0.05, 0.6, 0);
    pink_cube.matrix.scale(0.05, 0.05, 0.05);
    pink_cube.render();

    var pink_cube = new Cube();
    pink_cube.color = [0.302, 0.451, 0.243, 1.0];
    pink_cube.matrix = new Matrix4(floorCoords);
    pink_cube.matrix.translate(0.05, 0.5, 0);
    pink_cube.matrix.scale(0.05, 0.05, 0.05);
    pink_cube.render();
    
    // draw a cube
    var body = new Cube();
    body.color = [0.988, 0.722, 0.373, 1.0];
    body.matrix.translate(-0.25, -0.35, 0);
    body.matrix.rotate(angles["body"], 0, 0, 1);
    // body.matrix.rotate(body_angle, 0, 0, 1); // can add jitter in body movement with 1st two
    var bodyCoordinatesMat = new Matrix4(body.matrix);
    body.matrix.scale(0.8, 0.4, 0.4);
    body.render();

    var cylinder = new Cylinder();
    cylinder.color = [0.6, 0.4, 0.2, 1.0];
    cylinder.matrix = new Matrix4(bodyCoordinatesMat);
    cylinder.matrix.translate(0.5, 0.59, 0 );
    cylinder.matrix.scale(1,1,1);
    cylinder.render();

    var strap1 = new Cube();
    strap1.color = [0.35, 0.231, 0.122, 1.0];
    strap1.matrix = new Matrix4(bodyCoordinatesMat);
    strap1.matrix.translate(0.47,0.0,-0.05);
    strap1.matrix.scale(0.05, 0.6, 0.05);
    strap1.render();

    var strap2 = new Cube();
    strap2.color = [0.35, 0.231, 0.122, 1.0];
    strap2.matrix = new Matrix4(bodyCoordinatesMat);
    strap2.matrix.translate(0.47,0.0,0.41);
    strap2.matrix.scale(0.05, 0.6, 0.05);
    strap2.render();

    // main neck
    var neck = new Cube();
    neck.color = [0.988, 0.722, 0.373, 1.0];
    neck.matrix = new Matrix4(bodyCoordinatesMat);
    neck.matrix.translate(0.12, 0.2, 0.1);
    // neck.matrix.rotate(-50, 0, 0, 1);/
    neck.matrix.rotate(angles["neck"], 0, 0, 1);
    var neckCoordinatesMat = new Matrix4(neck.matrix);
    neck.matrix.scale(-0.5, 0.2, 0.2);
    neck.render();

    var neck_part2 = new Cube();
    neck_part2.color = [0.35, 0.231, 0.122, 1.0];
    neck_part2.matrix = new Matrix4(neckCoordinatesMat);
    neck_part2.matrix.translate(-0.5, 0.05, 0.05);
    neck_part2.matrix.rotate(0, 0, 0, 1);
    neck_part2.matrix.scale(0.7, 0.2, 0.1);
    neck_part2.render();

    var face = new Cube();
    face.color = [0.988, 0.722, 0.373, 1.0];
    face.matrix = new Matrix4(neckCoordinatesMat);
    face.matrix.translate(-0.35, 0.2, 0.01);
    face.matrix.rotate(angles["face"], 0, 0, 1);
    var faceCoordinatesMat = new Matrix4(face.matrix);
    face.matrix.scale(-0.4, 0.18, 0.18);
    face.render();

    var eye1 = new Cube();
    eye1.color = [0.726, 0.42, 0.216, 1];
    eye1.matrix = new Matrix4(faceCoordinatesMat);
    eye1.matrix.translate(-0.05, 0.08, -0.02);
    eye1.matrix.rotate(0, 0, 0, 1);
    eye1.matrix.scale(-0.04, 0.04, 0.01);
    eye1.render();

    var eye2 = new Cube();
    eye2.color = [0.726, 0.42, 0.216, 1];
    eye2.matrix = new Matrix4(faceCoordinatesMat);
    eye2.matrix.translate(-0.05, 0.08, 0.19);
    eye2.matrix.rotate(0, 0, 0, 1);
    eye2.matrix.scale(-0.04, 0.04, 0.01);
    eye2.render();

    var ear1 = new Cube();
    ear1.color = [0.361, 0.231, 0.122, 1];
    ear1.matrix = new Matrix4(faceCoordinatesMat);
    ear1.matrix.translate(0, 0.18, -0.01);
    ear1.matrix.rotate(0, 0, 0, 1);
    ear1.matrix.scale(-0.05, 0.06, 0.07);
    ear1.render();

    var ear2 = new Cube();
    ear2.color = [0.361, 0.231, 0.122, 1];
    ear2.matrix = new Matrix4(faceCoordinatesMat);
    ear2.matrix.translate(0, 0.18, 0.12);
    ear2.matrix.rotate(0, 0, 0, 1);
    ear2.matrix.scale(-0.05, 0.06, 0.07);
    ear2.render();

    var nose_part1 = new Cube();
    nose_part1.color = [0.726, 0.42, 0.216, 1];
    nose_part1.matrix = new Matrix4(faceCoordinatesMat);
    nose_part1.matrix.translate(-0.31, 0.09, 0.09);
    nose_part1.matrix.rotate(0, 0, 0, 1);
    nose_part1.matrix.scale(-0.1, 0.1, 0.01);
    nose_part1.render();

    var nose_part2 = new Cube();
    nose_part2.color = [0.726, 0.42, 0.216, 1];
    nose_part2.matrix = new Matrix4(faceCoordinatesMat);
    nose_part2.matrix.translate(-0.32, 0.09, -0.01);
    nose_part2.matrix.rotate(0, 0, 0, 1);
    nose_part2.matrix.scale(-0.1, 0.01, 0.2);
    nose_part2.render();

    // leg front left
    var left_front_connector = new Cube();
    left_front_connector.color = [0.361, 0.231, 0.122, 1];
    left_front_connector.matrix = new Matrix4(bodyCoordinatesMat);
    left_front_connector.matrix.translate(0.01, 0.1, 0.17);
    left_front_connector.matrix.rotate(0, 0, 0, 1);
    left_front_connector.matrix.scale(0.16, -0.16, -0.16);
    left_front_connector.render();

    var left_front_leg = new Cube();
    left_front_leg.color = [0.361, 0.231, 0.122, 1];
    left_front_leg.matrix = new Matrix4(bodyCoordinatesMat);
    left_front_leg.matrix.translate(0.0, 0, 0.16);
    left_front_leg.matrix.rotate(angles["leg_front_left"], 0, 0, 1);
    var left_front_legCoordinatesMat = new Matrix4(left_front_leg.matrix);
    left_front_leg.matrix.scale(0.15, -0.4, -0.15);
    left_front_leg.render();

    var left_front_leg_hoof = new Cube();
    left_front_leg_hoof.color = [0.1, 0.4, 0.4, 1];
    left_front_leg_hoof.matrix = new Matrix4(left_front_legCoordinatesMat);
    left_front_leg_hoof.matrix.translate(0.0, -0.4, 0.0);
    left_front_leg_hoof.matrix.rotate(0, 0, 0, 1);
    left_front_leg_hoof.matrix.scale(0.15, -0.15, -0.15);
    left_front_leg_hoof.render();

    // right front leg
    var right_front_connector = new Cube();
    right_front_connector.color = [0.361, 0.231, 0.122, 1];
    right_front_connector.matrix = new Matrix4(bodyCoordinatesMat);
    right_front_connector.matrix.translate(0.01, 0.1, 0.39);
    right_front_connector.matrix.rotate(0, 0, 0, 1);
    right_front_connector.matrix.scale(0.16, -0.16, -0.16);
    right_front_connector.render();

    var right_front_leg = new Cube();
    right_front_leg.color = [0.361, 0.231, 0.122, 1];
    right_front_leg.matrix = new Matrix4(bodyCoordinatesMat);
    right_front_leg.matrix.translate(0.0, 0, 0.39);
    right_front_leg.matrix.rotate(angles["leg_front_right"], 0, 0, 1);
    var right_front_legCoordinatesMat = new Matrix4(right_front_leg.matrix);
    right_front_leg.matrix.scale(0.15, -0.4, -0.15);
    right_front_leg.render();

    var right_front_leg_hoof = new Cube();
    right_front_leg_hoof.color = [0.1, 0.4, 0.4, 1];
    right_front_leg_hoof.matrix = new Matrix4(right_front_legCoordinatesMat);
    right_front_leg_hoof.matrix.translate(0.0, -0.4, 0.0);
    right_front_leg_hoof.matrix.rotate(0, 0, 0, 1);
    right_front_leg_hoof.matrix.scale(0.15, -0.15, -0.15);
    right_front_leg_hoof.render();

    // leg rear left
    var left_rear_connector = new Cube();
    left_rear_connector.color = [0.361, 0.231, 0.122, 1];
    left_rear_connector.matrix = new Matrix4(bodyCoordinatesMat);
    left_rear_connector.matrix.translate(0.63, 0.1, 0.17);
    left_rear_connector.matrix.rotate(0, 0, 0, 1);
    left_rear_connector.matrix.scale(0.16, -0.16, -0.16);
    left_rear_connector.render();

    var left_rear_leg = new Cube();
    left_rear_leg.color = [0.361, 0.231, 0.122, 1];
    left_rear_leg.matrix = new Matrix4(bodyCoordinatesMat);
    left_rear_leg.matrix.translate(0.64, 0, 0.16);
    left_rear_leg.matrix.rotate(angles["leg_rear_left"], 0, 0, 1);
    var left_rear_legCoordinatesMat = new Matrix4(left_rear_leg.matrix);
    left_rear_leg.matrix.scale(0.15, -0.4, -0.15);
    left_rear_leg.render();

    var left_rear_leg_hoof = new Cube();
    left_rear_leg_hoof.color = [0.1, 0.4, 0.4, 1];
    left_rear_leg_hoof.matrix = new Matrix4(left_rear_legCoordinatesMat);
    left_rear_leg_hoof.matrix.translate(0.0, -0.4, 0);
    left_rear_leg_hoof.matrix.rotate(0, 0, 0, 1);
    left_rear_leg_hoof.matrix.scale(0.15, -0.15, -0.15);
    left_rear_leg_hoof.render();

    // right front leg
    var right_rear_connector = new Cube();
    right_rear_connector.color = [0.361, 0.231, 0.122, 1];
    right_rear_connector.matrix = new Matrix4(bodyCoordinatesMat);
    right_rear_connector.matrix.translate(0.63, 0.1, 0.39);
    right_rear_connector.matrix.rotate(0, 0, 0, 1);
    right_rear_connector.matrix.scale(0.16, -0.16, -0.16);
    right_rear_connector.render();

    var right_rear_leg = new Cube();
    right_rear_leg.color = [0.361, 0.231, 0.122, 1];
    right_rear_leg.matrix = new Matrix4(bodyCoordinatesMat);
    right_rear_leg.matrix.translate(0.64, 0, 0.39);
    right_rear_leg.matrix.rotate(angles["leg_rear_right"], 0, 0, 1);
    var right_rear_legCoordinatesMat = new Matrix4(right_rear_leg.matrix);
    right_rear_leg.matrix.scale(0.15, -0.4, -0.15);
    right_rear_leg.render();

    var right_rear_leg_hoof = new Cube();
    right_rear_leg_hoof.color = [0.1, 0.4, 0.4, 1];
    right_rear_leg_hoof.matrix = new Matrix4(right_rear_legCoordinatesMat);
    right_rear_leg_hoof.matrix.translate(0, -0.4, 0);
    right_rear_leg_hoof.matrix.rotate(0, 0, 0, 1);
    right_rear_leg_hoof.matrix.scale(0.15, -0.15, -0.15);
    right_rear_leg_hoof.render();

    var tail = new Cube();
    tail.color = [0.361, 0.231, 0.122, 1];
    tail.matrix = new Matrix4(bodyCoordinatesMat);
    tail.matrix.translate(0.8, 0.35, 0.15);
    tail.matrix.rotate(angles["tail"], 0, 0, 1);
    var tail_coordinates = new Matrix4(tail.matrix);
    tail.matrix.scale(-0.04, 0.3, 0.1);
    tail.render();

    var tail_part2 = new Cube();
    tail_part2.color = [0.361, 0.231, 0.122, 1];
    tail_part2.matrix = new Matrix4(tail_coordinates);
    tail_part2.matrix.translate(0.0, 0.3, 0.0);
    tail_part2.matrix.rotate(angles["tail_part2"], 0, 0, 1);
    var tail2_coordinates = new Matrix4(tail_part2.matrix);
    tail_part2.matrix.scale(0.03, -0.15, 0.1);
    tail_part2.render();

    var tail_part3 = new Cube();
    tail_part3.color = [0.988, 0.722, 0.373, 1];
    tail_part3.matrix = new Matrix4(tail2_coordinates);
    tail_part3.matrix.translate(0.0, -0.15, 0.0);
    tail_part3.matrix.rotate(angles["tail_part3"], 0, 0, 1);
    tail_part3.matrix.scale(0.1, 0.05, 0.1);
    tail_part3.render();

    // time taken to draw
    var duration = performance.now() - startTime;
    document.getElementById("perf").innerHTML = "Time Taken in rendering: " + duration.toFixed(3)  + " ms, fps: " + (1000 / duration).toFixed(2)+ "";
  }
}

// Lerp function to linearly interpolate between two colors
function lerpColor(color1, color2, t) {
  return color1.map((v, i) => v + t * (color2[i] - v));
}
