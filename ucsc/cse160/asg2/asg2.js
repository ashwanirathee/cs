import * as THREE from 'three';

const scene = new THREE.Scene(); // ig this has the scene graph
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // camera

const renderer = new THREE.WebGLRenderer(); // renderer
renderer.setSize( window.innerWidth, window.innerHeight );// size
renderer.setAnimationLoop( animate ); // loop
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); // add cube to scene graph

//create a blue LineBasicMaterial
const material1 = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry1 = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry1, material1 );
scene.add( line );

// camera initial position
// camera.position.z = 5;
camera.position.set( 0, 5, 15 );
camera.lookAt( 0, 0, 0 );
scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );
function animate() {
	cube.loca
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}