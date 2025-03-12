import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.addLights();
    this.addObjects();
    this.loadObjects();
    this.addSkyBox();
    this.addFog();

    this.addRenderToTarget();
    this.billboards = [];
    this.addBillBoard("Miner.js with Three.js", 0, 5, -10);
    this.addBillBoard("Animated Cube with Render To Target", 0, 5, 0);
    this.addBillBoard("Fog is added", 15, 10, 15);
    this.addBillBoard("Point,Ambient,Directional Lights Added", 4.25, 3, 5);
  }

  addLights() {
    const color = 0xffffff;
    const intensity = 1;
    // const color = 0xFFFFFF;
    // const intensity = 1;
    let light = new THREE.DirectionalLight(color, 3);
    light.position.set(-1, 5, 4);
    this.scene.add(light);

    light = new THREE.AmbientLight(color, intensity);
    this.scene.add(light);

    const cubeSize = 0.2;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshBasicMaterial({ color: "yellow" });
    let cube = new THREE.Mesh(cubeGeo, cubeMat);

    light = new THREE.PointLight(color, 100);
    light.position.set(-0.25, 2.2, 5);
    this.scene.add(light);
    cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(-0.25, 2.2, 5);
    this.scene.add(cube);

    light = new THREE.PointLight(color, 100);
    light.position.set(4.25, 2.2, 5);
    this.scene.add(light);
    cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(4.25, 2.2, 5);
    this.scene.add(cube);

    // add point light like sun that's animated and rotates
    light = new THREE.DirectionalLight(color, 20);
    light.name = "pointLight";
    light.position.set(0, 0, 0);
    light.target.position.set(0, 0, 0);
    this.scene.add(light);
    cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.name = "pointLightCube";
    cube.position.set(0, 0, 0);
    this.scene.add(cube);
  }

  addObjects() {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);
    const texture = new THREE.TextureLoader().load("assets/atlas.png");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    const materials = [
      new THREE.MeshPhongMaterial({ map: loader.load("assets/wood.png"),   side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: loader.load("assets/rock1.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("assets/grass.png") }),
      new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide }),
    ];
    const material_extra = [
      new THREE.MeshBasicMaterial({ map: loader.load("assets/grass_side.png") }), // Right face
      new THREE.MeshBasicMaterial({ map: loader.load("assets/grass_side.png") }), // Left face
      new THREE.MeshBasicMaterial({ map: loader.load("assets/grass_top.png") }), // Top face
      new THREE.MeshBasicMaterial({ map: loader.load("assets/grass_top.png") }), // Bottom face
      new THREE.MeshBasicMaterial({ map: loader.load("assets/grass_side.png") }), // Front face
      new THREE.MeshBasicMaterial({ map: loader.load("assets/grass_side.png") }), // Back face
    ];

    const trunkRadius = 0.2;
    const trunkHeight = 1;
    const trunkRadialSegments = 12;
    const trunkGeometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius, trunkHeight, trunkRadialSegments);

    const topRadius = trunkRadius * 4;
    const topHeight = trunkHeight * 2;
    const topSegments = 12;
    const topGeometry = new THREE.ConeGeometry(topRadius, topHeight, topSegments);

    const trunkMaterial = new THREE.MeshPhongMaterial({ color: "brown" });
    const topMaterial = new THREE.MeshPhongMaterial({ color: "green" });
    function makeTree(scene, x, y, z) {
      const root = new THREE.Object3D();
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = trunkHeight / 2;
      root.add(trunk);

      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.y = trunkHeight + topHeight / 2;
      root.add(top);

      root.position.set(x, y, z);
      scene.add(root);

      return root;
    }
    for (let x = -32; x < 32; x++) {
      for (let z = -32; z < 32; z++) {
        let height = Math.floor(Math.sin(x, z) + Math.sin(z, x)) + 3;
        if (x > -16 && x < 16 && z > -16 && z < 16) {
          height = 1;
        } else {
          if(x%3==0){
            makeTree(this.scene, x, height, z);
          }
        }
        for (let y = 0; y < 4; y++) {
          if (y < height) {
            let material;
            if (y == height - 1) {
              material = material_extra;
            } else if (y == height - 2) {
              material = materials[1];
            } else {
              material = materials[1];
            }

            // materials[Math.floor(Math.random() * materials.length)]
            const cube = new THREE.Mesh(geometry, material);
            this.scene.add(cube);
            cube.position.x = x;
            cube.position.y = y;
            cube.position.z = z;
          }
        }
      }
    }

    // one animated cube
    // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    let material = materials[Math.floor(Math.random() * materials.length)];
    // this.cube = new THREE.Mesh(geometry, material);
    // this.cube.position.y = 10;
    // this.scene.add(this.cube);

    // add a cylinder to scene
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    this.cylinder = new THREE.Mesh(cylinderGeometry, material);
    this.cylinder.position.y = 1;
    this.cylinder.position.x = 5;
    this.cylinder.position.z = 5;
    this.scene.add(this.cylinder);

    // add a spher  e to scene
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    this.sphere = new THREE.Mesh(sphereGeometry, material);
    this.sphere.position.y = 1;
    this.sphere.position.x = -5;
    this.sphere.position.z = -5;
    this.scene.add(this.sphere);

    // make a cube table with 4 cube legs and a cube top
    const tableTop = new THREE.Mesh(geometry, materials[0]);
    let tableOffsetX = 10;
    let tableOffsetZ = 10;
    tableTop.scale.set(2, 0.2, 2);
    tableTop.position.set(0 + tableOffsetX, 1.5, 0 + tableOffsetZ);
    this.scene.add(tableTop);

    const tableLeg1 = new THREE.Mesh(geometry, materials[3]);
    tableLeg1.scale.set(0.2, 1, 0.2);
    tableLeg1.position.set(-0.9 + tableOffsetX, 1, -0.9 + tableOffsetZ);
    this.scene.add(tableLeg1);

    const tableLeg2 = new THREE.Mesh(geometry, materials[3]);
    tableLeg2.scale.set(0.2, 1, 0.2);
    tableLeg2.position.set(0.9 + tableOffsetX, 1, -0.9 + tableOffsetZ);
    this.scene.add(tableLeg2);

    const tableLeg3 = new THREE.Mesh(geometry, materials[3]);
    tableLeg3.scale.set(0.2, 1, 0.2);
    tableLeg3.position.set(-0.9 + tableOffsetX, 1, 0.9 + tableOffsetZ);
    this.scene.add(tableLeg3);

    const tableLeg4 = new THREE.Mesh(geometry, materials[3]);
    tableLeg4.scale.set(0.2, 1, 0.2);
    tableLeg4.position.set(0.9 + tableOffsetX, 1, 0.9 + tableOffsetZ);
    this.scene.add(tableLeg4);

    // add a small conical house
    // House dimensions
    const radius = 2; // Roof base radius
    const height = 2; // Roof height
    const radialSegments = 16;


    // Create the cone (roof)
    let coneHouseOffsetX = 10;
    let coneHouseOffsetZ = 2;
    const conegeometry = new THREE.ConeGeometry(radius, height, radialSegments);
    let cone = new THREE.Mesh(conegeometry, materials[0]);
    cone.position.y = height / 2; // Position it above the box as the roof
    cone.position.set(coneHouseOffsetX, 3, coneHouseOffsetZ);
    this.scene.add(cone);

    const boxGeometry = new THREE.BoxGeometry(2, 3, 2);  // Width, Height, Depth
    let box = new THREE.Mesh(boxGeometry, materials[0]);
    box.position.set(coneHouseOffsetX, 1, coneHouseOffsetZ);
    this.scene.add(box);


    // house 1
    let coneHouseOffsetX1 = 10;
    let coneHouseOffsetZ1 = -13;
    cone = new THREE.Mesh(conegeometry, materials[0]);
    cone.position.y = height / 2; // Position it above the box as the roof
    cone.position.set(coneHouseOffsetX1, 3, coneHouseOffsetZ1);
    this.scene.add(cone);

    box = new THREE.Mesh(boxGeometry, materials[0]);
    box.position.set(coneHouseOffsetX1, 1, coneHouseOffsetZ1);
    this.scene.add(box);

    // house 3
    let coneHouseOffsetX2 = -10;
    let coneHouseOffsetZ2 = 2;
    cone = new THREE.Mesh(conegeometry, materials[0]);
    cone.position.y = height / 2; // Position it above the box as the roof
    cone.position.set(coneHouseOffsetX2, 3, coneHouseOffsetZ2);
    this.scene.add(cone);

    box = new THREE.Mesh(boxGeometry, materials[0]);
    box.position.set(coneHouseOffsetX2, 1, coneHouseOffsetZ2);
    this.scene.add(box);

    // house 4
    let coneHouseOffsetX3 = -10;
    let coneHouseOffsetZ3 = -10;
    cone = new THREE.Mesh(conegeometry, materials[0]);
    cone.position.y = height / 2; // Position it above the box as the roof
    cone.position.set(coneHouseOffsetX3, 3, coneHouseOffsetZ3);
    this.scene.add(cone);

    box = new THREE.Mesh(boxGeometry, materials[0]);
    box.position.set(coneHouseOffsetX3, 1, coneHouseOffsetZ3);
    this.scene.add(box);
    

    const points = [];
    for ( let i = 0; i < 10; ++ i ) {
        points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 3 + 3, ( i - 5 ) * .8 ) );
    }

    const lathegeometry =  new THREE.LatheGeometry( points );
    box = new THREE.Mesh(lathegeometry, materials[0]);
    box.position.set(-8, 1, 4);
    box.scale.set(0.2, 0.2, 0.2);
    this.scene.add(box);

    // Umbrella dimensions
    const innerRadius = 0;  // The radius of the inner part of the umbrella
    const outerRadius = 1;  // The radius of the outer part of the umbrella
    const thetaSegments = 18;  // Number of segments to define the ring

    // Create the umbrella top (the fabric)
    let umbrellaTopOffsetX = 2;
    let umbrellaTopOffsetZ = -3;
    const umbrellaTopGeometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);
    const umbrellaTop = new THREE.Mesh(umbrellaTopGeometry, materials[0]);
    umbrellaTop.rotation.x = Math.PI / 2;  // Rotate it to lie flat like an umbrella
    umbrellaTop.position.y = 3;  // Position it above the handle
    umbrellaTop.position.set(umbrellaTopOffsetX, 1.5, umbrellaTopOffsetZ);
    this.scene.add(umbrellaTop);

    const boxGeometry1 = new THREE.BoxGeometry(0.2, 1, 0.2);  // Width, Height, Depth
    box = new THREE.Mesh(boxGeometry1, materials[0]);
    box.position.set(umbrellaTopOffsetX, 1, umbrellaTopOffsetZ);
    this.scene.add(box);
  }

  loadObjects() {
    const mtlLoader = new MTLLoader();
    mtlLoader.load("assets/minecraft-small-house.mtl", (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load("assets/minecraft-small-house.obj", (root) => {
        root.scale.set(0.5, 0.5, 0.5); // Example: Scale down by 50%
        root.position.set(5, 0.5, 15); // Example: Move the object to position (5, 0, 5)

        this.scene.add(root);
      });
    });
  }

  addSkyBox() {
    const loader = new THREE.TextureLoader();
    const texture = loader.load("assets/skybox.png", () => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      this.scene.background = texture;
    });
  }

  addFog() {
    const color = 0x8fafc1;
    const density = 0.1;
    const near = 10;
    const far = 40;
    // this.scene.fog = new THREE.FogExp2(color, density);
    this.scene.fog = new THREE.Fog(color, near, far);
  }

  addRenderToTarget() {
    const rtWidth = 512;
    const rtHeight = 512;
    this.renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);

    const rtFov = 75;
    const rtAspect = rtWidth / rtHeight;
    const rtNear = 0.1;
    const rtFar = 5;
    this.rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
    this.rtCamera.position.z = 2;

    this.rtScene = new THREE.Scene();
    this.rtScene.background = new THREE.Color("red");
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.rtScene.add(light);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(rtScene, geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({ color });

      const cube = new THREE.Mesh(geometry, material);
      rtScene.add(cube);

      cube.position.x = x;

      return cube;
    }

    this.rtCubes = [makeInstance(this.rtScene, geometry, 0x44aa88, 0), makeInstance(this.rtScene, geometry, 0x8844aa, -2), makeInstance(this.rtScene, geometry, 0xaa8844, 2)];
    const material = new THREE.MeshPhongMaterial({
      map: this.renderTarget.texture,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.name = "animatedCube";
    cube.position.y = 2;
    this.scene.add(cube);
  }

  makePerson(x, size, name, color) {
    const canvas = makeLabelCanvas(size, name);
    const texture = new THREE.CanvasTexture(canvas);
    // because our canvas is likely not a power of 2
    // in both dimensions set the filtering appropriately.
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const labelMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color,
      flatShading: true,
    });

    const root = new THREE.Object3D();
    root.position.x = x;

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    root.add(body);
    body.position.y = bodyHeight / 2;

    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    root.add(head);
    head.position.y = bodyHeight + headRadius * 1.1;

    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    root.add(label);
    label.position.y = (bodyHeight * 4) / 5;
    label.position.z = bodyRadiusTop * 1.01;

    // if units are meters then 0.01 here makes size
    // of the label into centimeters.
    const labelBaseScale = 0.01;
    label.scale.x = canvas.width * labelBaseScale;
    label.scale.y = canvas.height * labelBaseScale;

    scene.add(root);
    return root;
  }

  addBillBoard(text, x, y, z) {
    // Create a canvas and get its context
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set a larger canvas size for better resolution
    canvas.width = 1024;
    canvas.height = 512;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background (Optional)
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Auto-scale text size
    const fontSize = Math.floor(canvas.width / text.length);
    ctx.font = `${Math.max(40, Math.min(100, fontSize))}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert canvas to texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Create material with double-sided rendering
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Create a plane geometry for the billboard
    const aspect = canvas.width / canvas.height;
    const geometry = new THREE.PlaneGeometry(5 * aspect, 5); // Adjust size

    const billboard = new THREE.Mesh(geometry, material);
    billboard.position.set(x, y, z);

    this.scene.add(billboard);

    // Make billboard always face the camera
    this.billboards.push(billboard);
  }
}
