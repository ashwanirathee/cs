import * as THREE from "three";

export class RenderManager {
  constructor(sceneManager, cameraManager) {
    this.sceneManager = sceneManager;
    this.cameraManager = cameraManager;

    const canvas = document.querySelector("#c"); // don't change canvas to anyting else
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  }

  render(time) {
    time *= 0.001; // convert time to seconds

    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.cameraManager.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.cameraManager.camera.updateProjectionMatrix();
    }

    // animate the point light
    const pointLight = this.sceneManager.scene.getObjectByName("pointLight");
    pointLight.position.z = Math.sin(time) * 33;
    pointLight.position.y = Math.cos(time) * 33;

    // animate the cube that visualizes the point light
    const pointLightCube = this.sceneManager.scene.getObjectByName("pointLightCube");
    pointLightCube.position.z = Math.sin(time) * 33;
    pointLightCube.position.y = Math.cos(time) * 33;

    // rotate all the cubes in the render target scene
    this.sceneManager.rtCubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    // draw render target scene to render target
    this.renderer.setRenderTarget(this.sceneManager.renderTarget);
    this.renderer.render(this.sceneManager.rtScene, this.sceneManager.rtCamera);
    this.renderer.setRenderTarget(null);
    const animatedCube = this.sceneManager.scene.getObjectByName("animatedCube");

    // this handles the animated cube
    animatedCube.rotation.x = time;
    animatedCube.rotation.y = time;

    // this handles camera controls
    this.cameraManager.controls.update();
    // Ensure all billboards face the camera
    this.sceneManager.billboards.forEach(billboard => billboard.lookAt(this.cameraManager.camera.position));
    
    this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);

    requestAnimationFrame((t) => this.render(t));
  }

  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    return needResize;
  }
}
