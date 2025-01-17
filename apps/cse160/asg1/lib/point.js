class Point {
  // Constructor method for initializing objects
  constructor(loc, color, size) {
    this.loc = loc;
    this.color = color;
    this.size = size;
  }

  // // Method
  // method1() {
  //   console.log(`Property1 is: ${this.property1}`);
  // }

  // // Static method (belongs to the class, not the instance)
  // static staticMethod() {
  //   console.log("This is a static method");
  // }

  // // Getter method
  // get computedProperty() {
  //   return `Computed: ${this.property1}`;
  // }

  // // Setter method
  // set computedProperty(value) {
  //   this.property1 = value;
  // }
  render(a_Position, a_Size, u_FragColor) {
    console.log("I need to learn how to render myself");

    var xy = this.loc;
    var rgba = this.color;
    var size = this.size;
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    gl.uniform1f(a_Size, size);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
