import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

export class CameraManager {
  constructor(fov = 75, aspect = 2, near = 0.5, far = 1000) {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(15, 2, -5);

    const canvas = document.querySelector("#c"); // don't change canvas to anyting else
    
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.target.set(0, 5, 0);
    this.controls.update();
    this.type = "orbit";
  }

  // I want to have both first person controls and orbit controls
  // add now
  setFirstPersonalControls() {
    this.controls = new PointerLockControls(this.camera, document.body);
    this.controls.lock();
  }

  setOrbitControls() {
    this.controls.unlock();
    this.controls = new OrbitControls(this.camera, document.body);
    this.controls.update();
  }
}
