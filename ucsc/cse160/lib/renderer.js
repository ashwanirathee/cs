class WebGLRenderer {
  constructor() {
    this.dayColor = [0.53, 0.81, 0.92]; // Day Sky color (Sky Blue)
    this.nightColor = [0.0, 0.0, 0.2]; // Night Sky color (Dark Blue)
  
  }


  // draw every shape that's supposed to be on the canvas
  render(scene) {
    // check the time at the start of this function
    var startTime = performance.now();

    var globalRotMat = new Matrix4().rotate(g_globalAngleX, 0, 1, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let t = Math.sin(0.1 * g_seconds * Math.PI); // Smooth oscillation between 0 and 1

    // Lerp between day and night colors
    let currentColor = lerpColor(this.dayColor , this.nightColor, (t + 1) / 2); // Map to [0, 1]

    // Clear canvas with the interpolated color
    gl.clearColor(...currentColor, 1.0);
    // gl.clearColor(0.53,0.81,0.92, 1.0); // Specify the color for clearing <canvas>
    // gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // // draw the shapes
    // var len = scene.shapesList.length;
    // for (var i = 0; i < len; i++) {
    //   scene.shapesList[i].render(a_Position, a_Size, u_FragColor);
    // }
    // gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);

    // var background = new Cube();
    // background.color = [0.53,0.81,0.92, 1.0];
    // background.matrix.translate(-1, -1, 0.8);
    // background.matrix.rotate(0, 0, 0, 1); 
    // var backgroundCoords = new Matrix4(background.matrix);
    // background.matrix.scale(2, 2, 0.1);
    // background.render();
    
    // var mountain = new Cube();
    // mountain.color = [0.01,0.81,0.01, 1.0];
    // mountain.matrix = new Matrix4(backgroundCoords);
    // mountain.matrix.translate(0.5, 0.4, -0.19);
    // mountain.matrix.rotate(-45, 0, 0, 1); 
    // mountain.matrix.scale(2, 2, 0.1);
    // mountain.render();

    // var mountain1 = new Cube();
    // mountain1.color = [0.01,0.7,0.01, 1.0];
    // mountain1.matrix = new Matrix4(backgroundCoords);
    // mountain1.matrix.translate(0.0, 0.4, -0.21);
    // mountain1.matrix.rotate(-45, 0, 0, 1); 
    // mountain1.matrix.scale(2, 2, 0.1);
    // mountain1.render();

    // var mountain2 = new Cube();
    // mountain2.color = [0.01,0.9,0.01, 1.0];
    // mountain2.matrix = new Matrix4(backgroundCoords);
    // mountain2.matrix.translate(-0.9, 0.4, -0.20);
    // mountain2.matrix.rotate(-45, 0, 0, 1); 
    // mountain2.matrix.scale(1.5, 2, 0.1);
    // mountain2.render();

    // var sun = new Cube();
    // sun.color = [0.9,0.9,0.01, 1.0];
    // sun.matrix = new Matrix4(backgroundCoords);
    // sun.matrix.translate(0.1, 1.8, -0.26);
    // sun.matrix.rotate(-45, 0, 0, 1); 
    // sun.matrix.scale(0.2, 0.2, 0.1);
    // sun.render();

    // var sun2 = new Cube();
    // sun2.color = [0.9,0.9,0.01, 1.0];
    // sun2.matrix = new Matrix4(backgroundCoords);
    // sun2.matrix.translate(0.35, 1.7, -0.26);
    // sun2.matrix.rotate(90, 0, 0, 1); 
    // sun2.matrix.scale(0.2, 0.2, 0.1);
    // sun2.render();

    var floor = new Cube();
    floor.color = [0.6,0.4,0.2, 1.0];
    floor.matrix.translate(-1, -1.35, -1);
    var floorCoords = new Matrix4(floor.matrix);
    floor.matrix.scale(2, 0.40, 2);
    floor.render();

    var top_floor = new Cube();
    top_floor.color = [0.3,0.6,0.2, 1.0];
    top_floor.matrix = new Matrix4(floorCoords);
    top_floor.matrix.translate(0, 0.40, 0);
    top_floor.matrix.scale(2, 0.05, 2);
    top_floor.render();

    // draw a cube
    var body = new Cube();
    body.color = [0.2, 0.2, 0.2, 1.0];
    body.matrix.translate(-0.25, -0.35, 0);
    body.matrix.rotate(angles["body"], 0, 0, 1); 
    // body.matrix.rotate(body_angle, 0, 0, 1); // can add jitter in body movement with 1st two
    var bodyCoordinatesMat = new Matrix4(body.matrix);
    body.matrix.scale(0.8, 0.4, 0.4);
    body.render();

    // main neck
    var neck = new Cube();
    neck.color = [0.2, 0.2, 0.2, 1.0];
    neck.matrix = new Matrix4(bodyCoordinatesMat);
    neck.matrix.translate(0.12, 0.20, 0.1);
    // neck.matrix.rotate(-50, 0, 0, 1);/
    neck.matrix.rotate(angles["neck"], 0, 0, 1);
    var neckCoordinatesMat = new Matrix4(neck.matrix);
    neck.matrix.scale(-0.5, 0.2, 0.2);
    neck.render();

    var neck_part2 = new Cube();
    neck_part2.color = [0.3, 0.3, 0.3, 1.0];
    neck_part2.matrix = new Matrix4(neckCoordinatesMat);
    neck_part2.matrix.translate(-0.50, 0.05, 0.05);
    neck_part2.matrix.rotate(0, 0, 0, 1);
    neck_part2.matrix.scale(0.7, 0.2, 0.1);
    neck_part2.render();

    var face = new Cube();
    face.color = [0.3, 0.3, 0.3, 1.0];
    face.matrix = new Matrix4(neckCoordinatesMat);
    face.matrix.translate(-0.35, 0.2, 0.01);
    face.matrix.rotate(angles["face"], 0, 0, 1);
    var faceCoordinatesMat = new Matrix4(face.matrix);
    face.matrix.scale(-0.4, 0.18, 0.18);
    face.render();

    var eye1 = new Cube();
    eye1.color = [1, 1, 1, 1];
    eye1.matrix = new Matrix4(faceCoordinatesMat);
    eye1.matrix.translate(-0.05, 0.08, -0.02);
    eye1.matrix.rotate(0, 0, 0, 1);
    eye1.matrix.scale(-0.04, 0.04, 0.01);
    eye1.render();

    var eye2 = new Cube();
    eye2.color = [1, 1, 1, 1];
    eye2.matrix = new Matrix4(faceCoordinatesMat);
    eye2.matrix.translate(-0.05, 0.08, 0.19);
    eye2.matrix.rotate(0, 0, 0, 1);
    eye2.matrix.scale(-0.04, 0.04, 0.01);
    eye2.render();

    // leg front left
    var left_front_connector = new Cube();
    left_front_connector.color = [1, 1, 1, 1];
    left_front_connector.matrix = new Matrix4(bodyCoordinatesMat);
    left_front_connector.matrix.translate(0.0, 0, 0.16);
    left_front_connector.matrix.rotate(0, 0, 0, 1);
    left_front_connector.matrix.scale(0.16, -0.16, -0.16);
    left_front_connector.render();

    var left_front_leg = new Cube();
    left_front_leg.color = [1, 1, 1, 1];
    left_front_leg.matrix = new Matrix4(bodyCoordinatesMat);
    left_front_leg.matrix.translate(0.0, 0, 0.16);
    left_front_leg.matrix.rotate(angles["leg_front_left"], 0, 0, 1);
    var left_front_legCoordinatesMat = new Matrix4(left_front_leg.matrix);
    left_front_leg.matrix.scale(0.15, -0.4, -0.15);
    left_front_leg.render();

    var left_front_leg_hoof = new Cube();
    left_front_leg_hoof.color = [0.1,0.4,0.4, 1];
    left_front_leg_hoof.matrix = new Matrix4(left_front_legCoordinatesMat);
    left_front_leg_hoof.matrix.translate(0.0, -0.4, 0.0);
    left_front_leg_hoof.matrix.rotate(0, 0, 0, 1);
    left_front_leg_hoof.matrix.scale(0.15, -0.15, -0.15);
    left_front_leg_hoof.render();

    // right front leg
    var right_front_connector = new Cube();
    right_front_connector.color = [1, 1, 1, 1];
    right_front_connector.matrix = new Matrix4(bodyCoordinatesMat);
    right_front_connector.matrix.translate(0.0, 0, 0.4);
    right_front_connector.matrix.rotate(0, 0, 0, 1);
    right_front_connector.matrix.scale(0.16, -0.16, -0.16);
    right_front_connector.render();

    var right_front_leg = new Cube();
    right_front_leg.color = [1, 1, 1, 1];
    right_front_leg.matrix = new Matrix4(bodyCoordinatesMat);
    right_front_leg.matrix.translate(0.0, 0, 0.39);
    right_front_leg.matrix.rotate(angles["leg_front_right"], 0, 0, 1);
    var right_front_legCoordinatesMat = new Matrix4(right_front_leg.matrix);
    right_front_leg.matrix.scale(0.15, -0.4, -0.15);
    right_front_leg.render();

    var right_front_leg_hoof = new Cube();
    right_front_leg_hoof.color = [0.1,0.4,0.4, 1];
    right_front_leg_hoof.matrix = new Matrix4(right_front_legCoordinatesMat);
    right_front_leg_hoof.matrix.translate(0.0, -0.4, 0.0);
    right_front_leg_hoof.matrix.rotate(0, 0, 0, 1);
    right_front_leg_hoof.matrix.scale(0.15, -0.15, -0.15);
    right_front_leg_hoof.render();

    // leg rear left
    var left_rear_connector = new Cube();
    left_rear_connector.color = [1, 1, 1, 1];
    left_rear_connector.matrix = new Matrix4(bodyCoordinatesMat);
    left_rear_connector.matrix.translate(0.64, 0, 0.16);
    left_rear_connector.matrix.rotate(0, 0, 0, 1);
    left_rear_connector.matrix.scale(0.16, -0.16, -0.16);
    left_rear_connector.render();

    var left_rear_leg = new Cube();
    left_rear_leg.color = [1, 1, 1, 1];
    left_rear_leg.matrix = new Matrix4(bodyCoordinatesMat);
    left_rear_leg.matrix.translate(0.64, 0, 0.16);
    left_rear_leg.matrix.rotate(angles["leg_rear_left"], 0, 0, 1);
    var left_rear_legCoordinatesMat = new Matrix4(left_rear_leg.matrix);
    left_rear_leg.matrix.scale(0.15, -0.4, -0.15);
    left_rear_leg.render();

    var left_rear_leg_hoof = new Cube();
    left_rear_leg_hoof.color = [0.1,0.4,0.4, 1];
    left_rear_leg_hoof.matrix = new Matrix4(left_rear_legCoordinatesMat);
    left_rear_leg_hoof.matrix.translate(0.0, -0.4, 0);
    left_rear_leg_hoof.matrix.rotate(0, 0, 0, 1);
    left_rear_leg_hoof.matrix.scale(0.15, -0.15, -0.15);
    left_rear_leg_hoof.render();

    // right front leg
    var right_rear_connector = new Cube();
    right_rear_connector.color = [1, 1, 1, 1];
    right_rear_connector.matrix = new Matrix4(bodyCoordinatesMat);
    right_rear_connector.matrix.translate(0.64, 0, 0.4);
    right_rear_connector.matrix.rotate(0, 0, 0, 1);
    right_rear_connector.matrix.scale(0.16, -0.16, -0.16);
    right_rear_connector.render();

    var right_rear_leg = new Cube();
    right_rear_leg.color = [1, 1, 1, 1];
    right_rear_leg.matrix = new Matrix4(bodyCoordinatesMat);
    right_rear_leg.matrix.translate(0.64, 0, 0.39);
    right_rear_leg.matrix.rotate(angles["leg_rear_right"], 0, 0, 1);
    var right_rear_legCoordinatesMat = new Matrix4(right_rear_leg.matrix);
    right_rear_leg.matrix.scale(0.15, -0.4, -0.15);
    right_rear_leg.render();

    var right_rear_leg_hoof = new Cube();
    right_rear_leg_hoof.color = [0.1,0.4,0.4, 1];
    right_rear_leg_hoof.matrix = new Matrix4(right_rear_legCoordinatesMat);
    right_rear_leg_hoof.matrix.translate(0, -0.4, 0);
    right_rear_leg_hoof.matrix.rotate(0, 0, 0, 1);
    right_rear_leg_hoof.matrix.scale(0.15, -0.15, -0.15);
    right_rear_leg_hoof.render();


    var tail = new Cube();
    tail.color = [1, 0, 0, 1];
    tail.matrix = new Matrix4(bodyCoordinatesMat);
    tail.matrix.translate(0.8, 0.35, 0.15);
    tail.matrix.rotate(angles['tail'], 0, 0, 1);
    var tail_coordinates = new Matrix4(tail.matrix);
    tail.matrix.scale(0.04, -0.3, 0.1);
    tail.render();

    var tail_part2 = new Cube();
    tail_part2.color = [1, 0, 0, 1];
    tail_part2.matrix = new Matrix4(tail_coordinates);
    tail_part2.matrix.translate(0.0, -0.3, 0.0);
    tail_part2.matrix.rotate(-10, 0, 0, 1);
    tail_part2.matrix.scale(-0.03, -0.15, 0.1);
    tail_part2.render();

    // time taken to draw
    var duration = performance.now() - startTime;
    var len = 10;
    // console.log(duration)
    // console.log("numdot:", len, ",ms:",Math.floor(duration), ",fps:",Math.floor(10000/duration)/10,"numdot")
    document.getElementById("perf").innerHTML = "NumDot: " + len + ", Time Taken in rendering: " + Math.floor(duration) + ", fps: " + Math.floor(10000 / duration) / 10 + " numdot";
  }
}

  // Lerp function to linearly interpolate between two colors
  function lerpColor(color1, color2, t) {
    return color1.map((v, i) => v + t * (color2[i] - v));
}