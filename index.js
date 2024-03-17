import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { VRButton } from "three/addons/webxr/VRButton";
import { OBJLoader } from "three/addons/loaders/OBJLoader";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

var scene, camera, renderer, ambientLight, directionalLight;
var physicsWorld;
var controls;

function init() {
  // Set up the window
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Camera position
  camera.position.set(0, 100, 6);
  camera.lookAt(0, 0, 0);

  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.target.set(0, 0, 0);
  // controls.update();

  // Enable VR
  renderer.xr.enabled = true;
  document.body.appendChild(VRButton.createButton(renderer));

  // Lighting
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  // Create a cannon.js world
  physicsWorld = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),
  });
}
init();

// 3d model bus
const busLoader = new GLTFLoader();
let busModel;
busLoader.load(
  "/generic_town_bus_rotated.glb",
  function (gltf) {
    busModel = gltf.scene;
    scene.add(busModel);
    if (busModel) {
      busModel.position.set(0, 0, 0);
      busModel.scale.set(0.1, 0.1, 0.1);
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
if (busModel) {
  busModel.position.set(0, 0, -10);
}
// Map
const mapLoader2 = new GLTFLoader();
let cityMap;
mapLoader2.load("gta-san-map.glb", function (gltf) {
  cityMap = gltf.scene;
  scene.add(cityMap);
  if (cityMap) {
    cityMap.scale.set(1000, 1000, 1000);
    cityMap.position.set(-90, -20, 115);
  }
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

function collisionBoxes() {
  const hb1LowLeft = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(15, 10, 39)),
  });
  hb1LowLeft.position.set(20, 0, -38);
  //hb1LowLeft.quaternion.setFromEuler(0, Math.PI / 4, 0);
  physicsWorld.addBody(hb1LowLeft);

  const hb2LowLeft = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(45, 10, 23)),
  });
  hb2LowLeft.position.set(-9, 0, -94);
  physicsWorld.addBody(hb2LowLeft);

  const hb3LowLeft = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(10, 10, 19.5)),
  });
  hb3LowLeft.position.set(44, 0, 19);
  physicsWorld.addBody(hb3LowLeft);

  const hb4LowLeft = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(48, 10, 7)),
  });
  hb4LowLeft.position.set(74, 0, -10);
  physicsWorld.addBody(hb4LowLeft);

  const hb5LowLeft = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(26, 10, 10)),
  });
  hb5LowLeft.position.set(-30, 0, -50);
  physicsWorld.addBody(hb5LowLeft);

  const hb6LowLeft = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(15.5, 10, 28)),
  });
  hb6LowLeft.position.set(-18.8, 0, -23.5);
  physicsWorld.addBody(hb6LowLeft);

  const hb7LowLeftCorner = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(60, 10, 53)),
  });
  hb7LowLeftCorner.position.set(-38, 0, 61);
  physicsWorld.addBody(hb7LowLeftCorner);

  const hb8LeftMostSide = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(15, 10, 1357)),
  });
  hb8LeftMostSide.position.set(-89, 0, -1218);
  physicsWorld.addBody(hb8LeftMostSide);

  const hb9 = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(22, 10, 12)),
  });
  hb9.position.set(-49, 0, -187.5);
  physicsWorld.addBody(hb9);

  const hb10LeftMostSide = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(4, 10, 1227)),
  });
  hb10LeftMostSide.position.set(-68, 0, -1418);
  physicsWorld.addBody(hb10LeftMostSide);

  const hb11LowLeftTwoWayStreet = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(28, 10, 8)),
  });
  hb11LowLeftTwoWayStreet.position.set(-25.5, 0, -150);
  physicsWorld.addBody(hb11LowLeftTwoWayStreet);

  const hb12LowLeftTwoWayStreet = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(19, 10, 30)),
  });
  hb12LowLeftTwoWayStreet.position.set(15, 0, -169);
  physicsWorld.addBody(hb12LowLeftTwoWayStreet);

  const hb13LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(40, 10, 40)),
  });
  hb13LowLeftTwoWayStreetBuildingBlock.position.set(-3.5, 0, -258.5);
  physicsWorld.addBody(hb13LowLeftTwoWayStreetBuildingBlock);

  const hb14LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(41, 10, 100)),
  });
  hb14LowLeftTwoWayStreetBuildingBlock.position.set(-4, 0, -421);
  physicsWorld.addBody(hb14LowLeftTwoWayStreetBuildingBlock);

  const hb15LowLeftLaneDivVerti = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(5.5, 5, 235)),
  });
  hb15LowLeftLaneDivVerti.position.set(72, 0, -287);
  physicsWorld.addBody(hb15LowLeftLaneDivVerti);

  const hb16LowLeftLaneDivHori = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(624, 5, 4)),
  });
  hb16LowLeftLaneDivHori.position.set(691.5, 0, -54);
  physicsWorld.addBody(hb16LowLeftLaneDivHori);

  const hb17LowLeftLaneDivVerti = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(6, 5, 130)),
  });
  hb17LowLeftLaneDivVerti.position.set(69.5, 0, -670.5);
  physicsWorld.addBody(hb17LowLeftLaneDivVerti);

  const hb18LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(36, 10, 226)),
  });
  hb18LowLeftTwoWayStreetBuildingBlock.position.set(1.5, 0, -769);
  physicsWorld.addBody(hb18LowLeftTwoWayStreetBuildingBlock);
}

collisionBoxes();

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

const maxSpeed = 40;
const maxForce = 50;
const maxSteerVal = Math.PI / 8;
// Add force on keydown
document.addEventListener("keydown", (event) => {
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
    case "q":
      console.log(
        "x: ",
        vehicle.chassisBody.position.x,
        " z: ",
        vehicle.chassisBody.position.z
      );
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

let leftControllerIndex = null;
const leftController = renderer.xr.getController(1);
scene.add(leftController);

leftController.addEventListener("connected", (event) => {
  leftControllerIndex = event.data.gamepad;
  console.log("connected");
});
function controllerInput() {
  if (leftControllerIndex !== null) {
    if (leftControllerIndex.axes[3] < 0) {
      vehicle.setWheelForce(maxForce, 2);
      vehicle.setWheelForce(-maxForce, 3);
    } else if (leftControllerIndex.axes[3] > 0) {
      vehicle.setWheelForce(-maxForce / 2, 2);
      vehicle.setWheelForce(maxForce / 2, 3);
    } else {
      vehicle.setWheelForce(0, 2);
      vehicle.setWheelForce(0, 3);
    }

    if (leftControllerIndex.axes[2] < 0) {
      vehicle.setSteeringValue(maxSteerVal, 0);
      vehicle.setSteeringValue(maxSteerVal, 1);
    } else if (leftControllerIndex.axes[2] > 0) {
      vehicle.setSteeringValue(-maxSteerVal, 0);
      vehicle.setSteeringValue(-maxSteerVal, 1);
    } else {
      vehicle.setSteeringValue(0, 0);
      vehicle.setSteeringValue(0, 1);
    }

    if (leftControllerIndex.buttons[0].pressed) {
      console.log("2");
    }
  }
}

// document.addEventListener("keydown", (event) => {
//   switch (event.key) {
//     case "w":
//       camera.position.z -= 3;
//       break;

//     case "s":
//       camera.position.z += 3;
//       break;

//     case "a":
//       camera.position.x -= 3;
//       break;

//     case "d":
//       camera.position.x += 3;
//       break;

//     case "r":
//       camera.position.y *= 2;
//       break;

//     case "f":
//       camera.position.y /= 2;
//       break;
//   }
// });

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
    controllerInput();
    // camera.position.set(
    //   vehicle.chassisBody.position.x + 5 * Math.sin(angle.y),
    //   30,
    //   vehicle.chassisBody.position.z + 5 * Math.cos(angle.y)
    // );
    camera.position.set(
      vehicle.chassisBody.position.x,
      80,
      vehicle.chassisBody.position.z
    );
    camera.lookAt(
      vehicle.chassisBody.position.x,
      0,
      vehicle.chassisBody.position.z
    );
    // controls.target.set(
    //   vehicle.chassisBody.position.x + 5 * Math.sin(angle.y),
    //   30,
    //   vehicle.chassisBody.position.z + 5 * Math.cos(angle.y)
    // );
    // controls.update();
    // console.log(vehicle.getWheelSpeed(2));

    // console.log(
    //   "x: ",
    //   vehicle.chassisBody.position.x,
    //   " y: ",
    //   vehicle.chassisBody.position.z
    // );
    renderer.render(scene, camera);
  });
}

animate();
