import * as THREE from "three";
import { CameraManager } from "./camera-manager.js";
import { SceneManager } from "./scene-manager.js";
import { RenderManager } from "./render-manager.js";
import { InputManager } from "./input-manager.js";

export class Game {
  constructor() {
    this.cameraManager = new CameraManager();
    this.sceneManager = new SceneManager();
    this.renderManager = new RenderManager(this.sceneManager, this.cameraManager);
    this.inputManager = new InputManager(this);
  }

  init() {
    this.renderManager.render();
  }
}
