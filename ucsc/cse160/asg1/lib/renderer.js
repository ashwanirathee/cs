class WebGLRenderer {
  constructor() {
  }

  render(scene) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = scene.shapesList.length;
    for (var i = 0; i < len; i++) {
      scene.shapesList[i].render(a_Position, a_Size, u_FragColor);
    }
  }
}
