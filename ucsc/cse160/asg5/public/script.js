import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

let canvas;
let renderer;
let camera;
let scene;

const fov = 60;
let aspect; // the canvas default
const near = 1;
const far = 20000;

const color = 0xffffff;
const intensity = 3;
let light;

let cubes;
let controls;
const clock = new THREE.Clock();

const worldWidth = 128,
  worldDepth = 128;
const worldHalfWidth = worldWidth / 2;
const worldHalfDepth = worldDepth / 2;
const data = generateHeight(worldWidth, worldDepth);

const socket = new WebSocket('ws://localhost:8080');

const players = new Map(); // Track players in the scene
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();

const objects = [];

let raycaster;
raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

// floor
// const color = new THREE.Color();
socket.onopen = () => {
  console.log("Connected to server");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'init') {
    // Initialize players
    data.players.forEach(({ id, x, y, z }) => addPlayer(id, x, y, z));
  } else if (data.type === 'update') {
    console.log("update");
    updatePlayer(data.id, data.x, data.y, data.z);
  } else if (data.type === 'remove') {
    console.log("remove");
    removePlayer(data.id);
  }
};


let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

function addPlayer(id, x, y, z) {
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const player = new THREE.Mesh(geometry, material);

  player.position.set(x, y, z);
  scene.add(player);
  players.set(id, player);
}

function updatePlayer(id, x, y, z) {
  if (players.has(id)) {
    players.get(id).position.set(x, y, z);
  }
}

function removePlayer(id) {
  if (players.has(id)) {
    scene.remove(players.get(id));
    players.delete(id);
  }
}


let blocker = document.getElementById( 'blocker' );
let instructions = document.getElementById( 'instructions' );
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

function init() {
  canvas = document.querySelector("#c");
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  aspect = canvas.clientWidth / canvas.clientHeight;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.y = getY(worldHalfWidth, worldHalfDepth) * 100 + 100;

  // camera.position.x = 0
  // camera.position.y = 0;
  // camera.position.z = 0;
  scene = new THREE.Scene();
  // scene.fog = new THREE.Fog(0xffffff, 10, 100);
  scene.background = new THREE.Color(0xbfd1e5);

  mtlLoader.load('./minecraft-small-house.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('./minecraft-small-house.obj', (root) => {
      scene.add(root);
    });
  });

  // controls = new FirstPersonControls(camera, canvas);
  // controls.constrainVertical = true;
  // controls.verticalMin = Math.PI / 4;
  // controls.verticalMax = (3 * Math.PI) / 4;
  // controls.movementSpeed = 150;
  // controls.lookSpeed = 0.4;
  // controls.enabled = false;
  controls = new PointerLockControls( camera, document.body );
  controls.movementSpeed = 150;
  controls.lookSpeed = 0.4;
  scene.add(controls.object);

  instructions.addEventListener( 'click', function () {

    controls.lock();

  } );

  controls.addEventListener( 'lock', function () {

    instructions.style.display = 'none';
    blocker.style.display = 'none';

  } );

  controls.addEventListener( 'unlock', function () {

    blocker.style.display = 'block';
    instructions.style.display = '';

  } );
// add event listener to show/hide a UI (e.g. the game's menu)
const onKeyDown = function ( event ) {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      moveForward = true;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = true;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = true;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = true;
      break;

    case 'Space':
      if ( canJump === true ) velocity.y += 350;
      canJump = false;
      break;

  }

};

const onKeyUp = function ( event ) {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      moveForward = false;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = false;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = false;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = false;
      break;

  }

};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
}
let lastTime = 0; // Keep track of previous time
let prevTime = performance.now();
function render(time) {
  time *= 0.001; // convert time to seconds

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }


  time = performance.now();

  if ( controls.isLocked === true ) {

    raycaster.ray.origin.copy( controls.object.position );
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects( objects, false );

    const onObject = intersections.length > 0;

    const delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 1.0 * delta; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    if ( onObject === true ) {

      velocity.y = Math.max( 0, velocity.y );
      canJump = true;

    }

    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    controls.object.position.y += ( velocity.y * delta ); // new behavior

    if ( controls.object.position.y < -5 ) {

      velocity.y = 0;
      controls.object.position.y = -5;

      canJump = true;

    }

  }

  prevTime = time;
  // cubes.forEach((cube, ndx) => {
  //   const speed = 1 + ndx * 0.1;
  //   const rot = time * speed;
  //   cube.rotation.x = rot;
  //   cube.rotation.y = rot;
  // });
  // console.log(camera.position);

    // Send position to server
  socket.send(JSON.stringify({
    type: 'move',
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }));

    
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function makeInstance(geometry, color, x, y, z) {
  const material = new THREE.MeshPhongMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;

  return cube;
}

function generateHeight(width, height) {
  const data = [],
    perlin = new ImprovedNoise(),
    size = width * height,
    z = Math.random() * 100;

  let quality = 2;

  for (let j = 0; j < 4; j++) {
    if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;

    for (let i = 0; i < size; i++) {
      const x = i % width,
        y = (i / width) | 0;
      data[i] += perlin.noise(x / quality, y / quality, z) * quality;
    }

    quality *= 4;
  }

  return data;
}

function getY(x, z) {
  return (data[x + z * worldWidth] * 0.15) | 0;
}

class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
  }
  pick(normalizedPosition, scene, camera, time) {
    // restore the color if there is a picked object
    if (this.pickedObject) {
      this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
      this.pickedObject = undefined;
    }

    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children);
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      this.pickedObject = intersectedObjects[0].object;
      // save its color
      this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
      // set its emissive color to flashing red/yellow
      this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xffff00 : 0xff0000);
    }
  }
}

async function main() {
  init();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  //   const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  //   //   cubes = [makeInstance(geometry, 0x44aa88, 0), makeInstance(geometry, 0x8844aa, -2), makeInstance(geometry, 0xaa8844, 2)];
  //   cubes = [];
  //   for (let i = 0; i < 32; i++) {
  //     for (let j = 0; j < 32; j++) {
  //       cubes.push(makeInstance(geometry, 0x44aa88, i, 0, j));
  //     }
  //   }

  
  const matrix = new THREE.Matrix4();

  const pxGeometry = new THREE.PlaneGeometry(100, 100);
  pxGeometry.attributes.uv.array[1] = 0.5;
  pxGeometry.attributes.uv.array[3] = 0.5;
  pxGeometry.rotateY(Math.PI / 2);
  pxGeometry.translate(50, 0, 0);

  const nxGeometry = new THREE.PlaneGeometry(100, 100);
  nxGeometry.attributes.uv.array[1] = 0.5;
  nxGeometry.attributes.uv.array[3] = 0.5;
  nxGeometry.rotateY(-Math.PI / 2);
  nxGeometry.translate(-50, 0, 0);

  const pyGeometry = new THREE.PlaneGeometry(100, 100);
  pyGeometry.attributes.uv.array[5] = 0.5;
  pyGeometry.attributes.uv.array[7] = 0.5;
  pyGeometry.rotateX(-Math.PI / 2);
  pyGeometry.translate(0, 50, 0);

  const pzGeometry = new THREE.PlaneGeometry(100, 100);
  pzGeometry.attributes.uv.array[1] = 0.5;
  pzGeometry.attributes.uv.array[3] = 0.5;
  pzGeometry.translate(0, 0, 50);

  const nzGeometry = new THREE.PlaneGeometry(100, 100);
  nzGeometry.attributes.uv.array[1] = 0.5;
  nzGeometry.attributes.uv.array[3] = 0.5;
  nzGeometry.rotateY(Math.PI);
  nzGeometry.translate(0, 0, -50);

  //

  const geometries = [];

  for (let z = 0; z < worldDepth; z++) {
    for (let x = 0; x < worldWidth; x++) {
      const h = getY(x, z);

      matrix.makeTranslation(x * 100 - worldHalfWidth * 100, h * 100, z * 100 - worldHalfDepth * 100);

      const px = getY(x + 1, z);
      const nx = getY(x - 1, z);
      const pz = getY(x, z + 1);
      const nz = getY(x, z - 1);

      geometries.push(pyGeometry.clone().applyMatrix4(matrix));

      if ((px !== h && px !== h + 1) || x === 0) {
        geometries.push(pxGeometry.clone().applyMatrix4(matrix));
      }

      if ((nx !== h && nx !== h + 1) || x === worldWidth - 1) {
        geometries.push(nxGeometry.clone().applyMatrix4(matrix));
      }

      if ((pz !== h && pz !== h + 1) || z === worldDepth - 1) {
        geometries.push(pzGeometry.clone().applyMatrix4(matrix));
      }

      if ((nz !== h && nz !== h + 1) || z === 0) {
        geometries.push(nzGeometry.clone().applyMatrix4(matrix));
      }
    }
  }

  const geometry = BufferGeometryUtils.mergeGeometries(geometries);
  geometry.computeBoundingSphere();

  const texture = new THREE.TextureLoader().load("atlas.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;

  const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide }));
  console.log("mesh", mesh);
  scene.add(mesh);

  const geometry1 = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  //   cubes = [makeInstance(geometry, 0x44aa88, 0), makeInstance(geometry, 0x8844aa, -2), makeInstance(geometry, 0xaa8844, 2)];
  // cubes = [];
  // for (let i = 0; i < 32; i++) {
  //   for (let j = 0; j < 32; j++) {
  //     cubes.push(makeInstance(geometry1, 0x44aa88, i, 0, j));
  //   }
  // }
  // scene.add(geometry1);


  const ambientLight = new THREE.AmbientLight(0xeeeeee, 3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 12);
  directionalLight.position.set(1, 1, 0.5).normalize();
  scene.add(directionalLight);
  await sleep(2000); // Sleep for 2 seconds
  requestAnimationFrame(render);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main();
