class Cube {
    constructor(textureAtlasNum, textureNum) {
      this.type = "cube";
      this.color = [1.0,1.0,1.0,1.0];
      this.matrix = new Matrix4();
      this.buffer = null;
      this.vertices = null;
      this.uvs = null;
      this.uvBuffer = null;
      this.textureAtlasNum = textureAtlasNum;
      this.textureNum = textureNum;
      this.setUvs();
    }
    
    generateVertices(){  
      //this.vertices = new Float32Array(v);
      this.vertices = new Float32Array([
        //FRONT
        -0.5,0.5,0.5, -0.5,-0.5,0.5, 0.5,-0.5,0.5,
        -0.5,0.5,0.5, 0.5,-0.5,0.5, 0.5,0.5,0.5,
        //LEFT
        -0.5,0.5,-0.5, -0.5,-0.5,-0.5, -0.5,-0.5,0.5,
        -0.5,0.5,-0.5, -0.5,-0.5,0.5, -0.5,0.5,0.5,
        //RIGHT
        0.5,0.5,0.5, 0.5,-0.5,0.5, 0.5,-0.5,-0.5,
        0.5,0.5,0.5, 0.5,-0.5,-0.5, 0.5,0.5,-0.5,
        //TOP
        -0.5,0.5,-0.5, -0.5,0.5,0.5, 0.5,0.5,0.5,
        -0.5,0.5,-0.5, 0.5,0.5,0.5, 0.5,0.5,-0.5,
        //BACK
        0.5,0.5,-0.5, 0.5,-0.5,-0.5, -0.5,-0.5,-0.5,
        0.5,0.5,-0.5, -0.5,-0.5,-0.5, -0.5,0.5,-0.5,

        //BOTTOM
        -0.5,-0.5,0.5, -0.5,-0.5,-0.5, 0.5,-0.5,-0.5,
        -0.5,-0.5,0.5, 0.5,-0.5,-0.5, 0.5,-0.5,0.5
      ]);
    }

    setUvs() {
      // console.log("ntex:", ntex);

      // console.log(this.textureNum)
      // prettier-ignore
      if(this.textureNum === 2){
        var x = 0;
        var y = 1;
        var eps = 0.1;
        // var offx = 1
        this.uvs = new Float32Array([
          // FRONT
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
          // LEFT
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        
          // RIGHT
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        
          // TOP
          (x+ eps)/ntex,(y+2-eps)/ntex, (x+eps)/ntex,(y+1+eps)/ntex, (x+1-eps)/ntex,(y+1-eps)/ntex,
          (x+ eps)/ntex,(y+2-eps)/ntex, (x+1-eps)/ntex,(y+1+eps)/ntex, (x+1-eps)/ntex,(y+2-eps)/ntex ,
          // BACK
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        
          // BOTTOM
          (x+ eps)/ntex,(y-eps)/ntex, (x+eps)/ntex,(y-1+eps)/ntex, (x+1-eps)/ntex,(y-1+eps)/ntex,
          (x+ eps)/ntex,(y-eps)/ntex, (x+1-eps)/ntex,(y-1+eps)/ntex, (x+1-eps)/ntex,(y-eps)/ntex, 
        ]);
      } else if (this.textureNum === 3){
        var x = 10;
        var y = 0;
        var eps = 0.1;
        // var offx = 1
        this.uvs = new Float32Array([
          // FRONT
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
          // LEFT
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        
          // RIGHT
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        
          // TOP
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
          // BACK
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        
          // BOTTOM
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        ]);
       
      } else if(this.textureNum === 4){
        // gold target
        var x = 0;
        var y = 11;
        var eps = 0.1;
        // var offx = 1
        this.uvs = new Float32Array([
          // FRONT
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
          // LEFT
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        
          // RIGHT
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        
          // TOP
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
          // BACK
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        
          // BOTTOM
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, 
          (x + eps)/ntex, (y + 1 - eps)/ntex, (x + 1 - eps)/ntex, (y + eps)/ntex, (x + 1 - eps)/ntex, (y + 1 - eps)/ntex,
        ]);
      } else {
        this.uvs = new Float32Array([
          // FRONT
          0,1, 0,0, 1,0, 
          0,1, 1,0, 1,1,
          // LEFT
          0,1, 0,0, 1,0,
          0,1, 1,0, 1,1,
          // RIGHT
          0,1, 0,0, 1,0, 
          0,1, 1,0, 1,1,
          // TOP
          1,0, 1,1, 0,1, 
          1,0, 0,1, 0,0,
          // BACK
          0,1, 0,0, 1,1, 
          1,1, 0,0, 1,0,
          // BOTTOM
          0,1, 0,0, 1,0, 
          0,1, 1,0, 1,1,
        ]);
      }

    }
  
    drawCube(M, color) {      
      gl.uniform1i(u_whichTexture, this.textureAtlasNum);
      gl.uniform4f(u_FragColor, ...color);
      gl.uniformMatrix4fv(u_ModelMatrix, false, M.elements);
      if (this.vertices === null) {
        this.generateVertices();
      }
    
      if (this.buffer === null) {
        // Create a buffer object
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
          console.log("Failed to create the buffer object");
          return -1;
        }
      }
    
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
      gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(a_Position);

      if (this.uvBuffer === null) {
        this.uvBuffer = gl.createBuffer();
        if (!this.uvBuffer) {
          console.log("Failed to create the buffer object");
          return -1;
        }
      }
  
      gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.DYNAMIC_DRAW);
      gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(a_UV);
      gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    render() {
      this.drawCube(this.matrix, this.color)
    }
  }

