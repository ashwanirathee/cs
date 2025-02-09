class RGB {
    constructor(r, g, b) {
      this.r = r; // Expecting values in range [0, 1] or [0, 255]
      this.g = g;
      this.b = b;
    }
  
    // Convert RGB to HSV
    toHSV() {
      let r = this.r / 255, g = this.g / 255, b = this.b / 255;
      let v = Math.max(r, g, b);
      let c = v - Math.min(r, g, b);
      let s = v === 0 ? 0 : c / v;
  
      let h = 0;
      if (c !== 0) {
        if (v === r) h = ((g - b) / c) % 6;
        else if (v === g) h = (b - r) / c + 2;
        else if (v === b) h = (r - g) / c + 4;
        h *= 60;
        if (h < 0) h += 360;
      }
  
      return { h, s, v };
    }
  
    // Convert RGB to CMY
    toCMY() {
      let c = 1 - this.r / 255;
      let m = 1 - this.g / 255;
      let y = 1 - this.b / 255;
      return { c, m, y };
    }
  
    // Static Method: Convert HSV to RGB
    static fromHSV(h, s, v) {
      let c = v * s;
      let x = c * (1 - Math.abs((h / 60) % 2 - 1));
      let m = v - c;
      let r, g, b;
  
      if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
      else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
      else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
      else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
      else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
      else [r, g, b] = [c, 0, x];
  
      return new RGB((r + m) * 255, (g + m) * 255, (b + m) * 255);
    }
  
    // Static Method: Convert CMY to RGB
    static fromCMY(c, m, y) {
      return new RGB((1 - c) * 255, (1 - m) * 255, (1 - y) * 255);
    }
  }
  

function main() {
  console.log("Test");
  var r = 0;
  var g = 0;
  var b = 0;
  var color = new RGB(r, g, b);
  console.log(color.toHSV());
//   console.log(color.toCMY());
}
