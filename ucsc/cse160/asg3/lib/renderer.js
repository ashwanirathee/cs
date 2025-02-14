class WebGLRenderer {
  constructor() {
    this.dayColor = [0.53, 0.81, 0.92]; // Day Sky color (Sky Blue)
    this.nightColor = [0.2, 0.2, 0.2]; // Night Sky color (Dark Blue)
    this.g_map = [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,1,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1],
    ];
  }

  drawMap(){
    var x;
    var y;
    for(x=0;x<8;x++){
      for(y=0;y<8;y++){
        if(this.g_map[x][y] == 1){
          var body = new Cube();
          body.color = [1.0,1.0,1.0,1.0];
          // body.textureNum = 3;s
          body.matrix.translate(x-4,0,y-4);
          // body.matrix.scale(1, 1, 1);
          body.render();
        }
      }
    }
  }
  
  render(scene) {
    // check the time at the start of this function
    var startTime = performance.now();

    var projMat = new Matrix4();
    projMat.setPerspective(field_angle, asp_ratio, .1, 100)
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

    var viewMat = new Matrix4();
    viewMat.setLookAt(...g_eye,...g_at,...g_up)
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

    var globalRotMat = new Matrix4().rotate(g_globalAngleX, 0, 1, 0);
    globalRotMat.rotate(g_globalAngleY, 1, 0, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let t = Math.sin(0.1 * g_seconds * Math.PI); 
    let currentColor = lerpColor(this.dayColor, this.nightColor, (t + 1) / 2);
    gl.clearColor(...currentColor, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var floor = new Cube();
    floor.color = [1.0,0.0,0.0,1.0];
    floor.textureNum = 0;
    floor.matrix.translate(0,-0.5,0.0);
    floor.matrix.scale(10, 0.01, 10);
    // floor.matrix.translate(-0.5,0,-0.5);
    floor.render();
    

    var sky = new Cube();
    sky.color = [0.0,0.0,1.0,1.0];
    sky.textureNum = -2;
    sky.matrix.scale(100, 100, 100);
    sky.render();

    // draw a cube
    var body = new Cube();
    body.color = [1.0,0.0,0.0,1.0];
    body.textureNum = 0;
    body.matrix.scale(1, 1, 1);
    body.render();


    this.drawMap();
    // time taken to draw
    var duration = performance.now() - startTime;
    document.getElementById("perf").innerHTML = "Time Taken in rendering: " + duration.toFixed(3)  + " ms, fps: " + (1000 / duration).toFixed(2)+ "";
  }
}

// Lerp function to linearly interpolate between two colors
function lerpColor(color1, color2, t) {
  return color1.map((v, i) => v + t * (color2[i] - v));
}
