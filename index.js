import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { VRButton } from "three/addons/webxr/VRButton";
import { OBJLoader } from "three/addons/loaders/OBJLoader";

function init() {}

// Set up the window
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera position
camera.position.set(0, 10, 6);
camera.lookAt(0, 0, 0);

// Enable VR
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

//3d model bus
const busLoader = new GLTFLoader();
let busModel;
busLoader.load(
  "/generic_town_bus_rotated.glb",
  function (gltf) {
    busModel = gltf.scene;
    scene.add(busModel);
    if (busModel) {
      busModel.position.set(0, 0.15, 0);
      busModel.scale.set(0.1, 0.1, 0.1);
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//map
const mapLoader2 = new GLTFLoader();
let cityMap;
mapLoader2.load("manhattan-map.glb", function (gltf) {
  cityMap = gltf.scene;
  scene.add(cityMap);
  if (cityMap) {
    cityMap.scale.set(0.4, 0.3, 0.4);
    cityMap.position.set(35, -1, 0);
  }
});

// const mapLoader = new GLTFLoader();
// let map;
// mapLoader.load(
//   "/map2.glb",
//   function (gltf) {
//     map = gltf.scene;
//     scene.add(map);
//     if (map) {
//       map.position.set(0, 0, 0);
//       map.scale.set(2, 2, 2);
//     }
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );

// Create a cannon.js world
const physicsWorld = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0),
});

// Add a ground body
const groundMaterial = new CANNON.Material("ground");
const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
  material: groundMaterial,
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
groundBody.position.set(0, 0, 0);
physicsWorld.addBody(groundBody);

// For testing only
const prismBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Box(new CANNON.Vec3(1, 5, 1)),
});
prismBody.position.set(10, 0, -10);
physicsWorld.addBody(prismBody);

// Build the car chassis
const chassisShape = new CANNON.Box(new CANNON.Vec3(1.3, 0.5, 6));
const chassisBody = new CANNON.Body({ mass: 10 });
chassisBody.addShape(chassisShape, new CANNON.Vec3(0, 0.75, 0));

// Create the vehicle
const vehicle = new CANNON.RigidVehicle({
  chassisBody: chassisBody,
});

// Add wheels to the vehicle
const mass = 1;
const wheelShape = new CANNON.Sphere(0.5);
const wheelMaterial = new CANNON.Material("wheel");
const down = new CANNON.Vec3(0, -1, 0);
const wheelBody1 = new CANNON.Body({ mass, material: wheelMaterial });
wheelBody1.addShape(wheelShape);
vehicle.addWheel({
  isFrontWheel: true,
  body: wheelBody1,
  position: new CANNON.Vec3(-1.3, 0.5, -3.5),
  axis: new CANNON.Vec3(-1, 0, 0),
  direction: down,
});
const wheelBody2 = new CANNON.Body({ mass, material: wheelMaterial });
wheelBody2.addShape(wheelShape);
vehicle.addWheel({
  isFrontWheel: true,
  body: wheelBody2,
  position: new CANNON.Vec3(1.3, 0.5, -3.5),
  axis: new CANNON.Vec3(1, 0, 0),
  direction: down,
});
const wheelBody3 = new CANNON.Body({ mass, material: wheelMaterial });
wheelBody3.addShape(wheelShape);
vehicle.addWheel({
  body: wheelBody3,
  position: new CANNON.Vec3(-1.3, 0.5, 2.5),
  axis: new CANNON.Vec3(-1, 0, 0),
  direction: down,
});
const wheelBody4 = new CANNON.Body({ mass, material: wheelMaterial });
wheelBody4.addShape(wheelShape);
vehicle.addWheel({
  body: wheelBody4,
  position: new CANNON.Vec3(1.3, 0.5, 2.5),
  axis: new CANNON.Vec3(1, 0, 0),
  direction: down,
});
vehicle.wheelBodies.forEach((wheelBody) => {
  // Some damping to not spin wheels too fast
  wheelBody.angularDamping = 0.9;
});

vehicle.addToWorld(physicsWorld);
// Track rotation of the vehicle
const angle = new CANNON.Vec3();
vehicle.chassisBody.quaternion.toEuler(angle);

// Define interactions between wheels and ground
const wheel_ground = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
  friction: 1,
  restitution: 0,
  contactEquationStiffness: 1000,
});
physicsWorld.addContactMaterial(wheel_ground);

// Keybindings
// Add force on keydown
const maxSpeed = 30;
const maxForce = 20;
document.addEventListener("keydown", (event) => {
  const maxSteerVal = Math.PI / 8;

  switch (event.key) {
    case "w":
      vehicle.setWheelForce(maxForce, 2);
      vehicle.setWheelForce(-maxForce, 3);
      break;

    case "s":
      vehicle.setWheelForce(-maxForce / 2, 2);
      vehicle.setWheelForce(maxForce / 2, 3);
      break;

    case "a":
      vehicle.setSteeringValue(maxSteerVal, 0);
      vehicle.setSteeringValue(maxSteerVal, 1);
      break;

    case "d":
      vehicle.setSteeringValue(-maxSteerVal, 0);
      vehicle.setSteeringValue(-maxSteerVal, 1);
      break;
  }
});
// Reset force on keyup
document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      vehicle.setWheelForce(0, 2);
      vehicle.setWheelForce(0, 3);
      break;

    case "s":
      vehicle.setWheelForce(0, 2);
      vehicle.setWheelForce(0, 3);
      break;

    case "a":
      vehicle.setSteeringValue(0, 0);
      vehicle.setSteeringValue(0, 1);
      break;

    case "d":
      vehicle.setSteeringValue(0, 0);
      vehicle.setSteeringValue(0, 1);
      break;
  }
});

const cannonDebugger = new CannonDebugger(scene, physicsWorld, {});
// Animation loop
function animate() {
  renderer.setAnimationLoop(() => {
    physicsWorld.fixedStep();
    cannonDebugger.update();
    vehicle.chassisBody.quaternion.toEuler(angle);
    if (busModel) {
      // Update the bus's position and rotation
      busModel.position.x = vehicle.chassisBody.position.x;
      busModel.position.z = vehicle.chassisBody.position.z;
      busModel.rotation.y = angle.y - Math.PI / 2;
    }
    camera.position.set(
      vehicle.chassisBody.position.x + 5 * Math.sin(angle.y),
      30,
      vehicle.chassisBody.position.z + 5 * Math.cos(angle.y)
    );
    camera.lookAt(
      vehicle.chassisBody.position.x,
      0,
      vehicle.chassisBody.position.z
    );
    //console.log(vehicle.getWheelSpeed(2));
    renderer.render(scene, camera);
  });
}

animate();
