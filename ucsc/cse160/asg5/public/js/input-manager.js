
export class InputManager {
  constructor(game) {
    this.game = game;
    this.init();
  }

  init() {
    // on press c, change the camera to other type
    document.addEventListener("keydown", (e) => {
      if (e.key === "c") {
        if (this.game.cameraManager.type === "orbit") {
          this.game.cameraManager.setFirstPersonalControls();
          this.game.cameraManager.type = "first-person";
        } else {
          this.game.cameraManager.setOrbitControls();
          this.game.cameraManager.type = "orbit";
        }
      }
    });

  }
}
