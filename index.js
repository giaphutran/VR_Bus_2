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
  // const hb1LowLeft = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(15, 10, 39)),
  // });
  // hb1LowLeft.position.set(20, 0, -38);
  // //hb1LowLeft.quaternion.setFromEuler(0, Math.PI / 4, 0);
  // physicsWorld.addBody(hb1LowLeft);
  // const hb2LowLeft = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(45, 10, 23)),
  // });
  // hb2LowLeft.position.set(-9, 0, -94);
  // physicsWorld.addBody(hb2LowLeft);
  // const hb3LowLeft = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(10, 10, 19.5)),
  // });
  // hb3LowLeft.position.set(44, 0, 19);
  // physicsWorld.addBody(hb3LowLeft);
  // const hb4LowLeft = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(48, 10, 7)),
  // });
  // hb4LowLeft.position.set(74, 0, -10);
  // physicsWorld.addBody(hb4LowLeft);
  // const hb5LowLeft = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(26, 10, 10)),
  // });
  // hb5LowLeft.position.set(-30, 0, -50);
  // physicsWorld.addBody(hb5LowLeft);
  // const hb6LowLeft = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(15.5, 10, 28)),
  // });
  // hb6LowLeft.position.set(-18.8, 0, -23.5);
  // physicsWorld.addBody(hb6LowLeft);
  // const hb7LowLeftCorner = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(60, 10, 53)),
  // });
  // hb7LowLeftCorner.position.set(-38, 0, 61);
  // physicsWorld.addBody(hb7LowLeftCorner);
  // const hb8LeftMostSide = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(15, 10, 1357)),
  // });
  // hb8LeftMostSide.position.set(-89, 0, -1218);
  // physicsWorld.addBody(hb8LeftMostSide);
  // const hb9 = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(22, 10, 12)),
  // });
  // hb9.position.set(-49, 0, -187.5);
  // physicsWorld.addBody(hb9);
  // const hb10LeftMostSide = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(4, 10, 1227)),
  // });
  // hb10LeftMostSide.position.set(-68, 0, -1418);
  // physicsWorld.addBody(hb10LeftMostSide);
  // const hb11LowLeftTwoWayStreet = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(28, 10, 8)),
  // });
  // hb11LowLeftTwoWayStreet.position.set(-25.5, 0, -150);
  // physicsWorld.addBody(hb11LowLeftTwoWayStreet);
  // const hb12LowLeftTwoWayStreet = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(19, 10, 30)),
  // });
  // hb12LowLeftTwoWayStreet.position.set(15, 0, -169);
  // physicsWorld.addBody(hb12LowLeftTwoWayStreet);
  // const hb13LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(40, 10, 40)),
  // });
  // hb13LowLeftTwoWayStreetBuildingBlock.position.set(-3.5, 0, -258.5);
  // physicsWorld.addBody(hb13LowLeftTwoWayStreetBuildingBlock);
  // const hb14LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(41, 10, 100)),
  // });
  // hb14LowLeftTwoWayStreetBuildingBlock.position.set(-4, 0, -421);
  // physicsWorld.addBody(hb14LowLeftTwoWayStreetBuildingBlock);
  // const hb15LowLeftLaneDivVerti = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(5.5, 5, 235)),
  // });
  // hb15LowLeftLaneDivVerti.position.set(72, 0, -287);
  // physicsWorld.addBody(hb15LowLeftLaneDivVerti);
  // const hb16LowLeftLaneDivHori = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(624, 5, 4)),
  // });
  // hb16LowLeftLaneDivHori.position.set(691.5, 0, -54);
  // physicsWorld.addBody(hb16LowLeftLaneDivHori);
  // const hb17LowLeftLaneDivVerti = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(6, 5, 130)),
  // });
  // hb17LowLeftLaneDivVerti.position.set(69.5, 0, -670.5);
  // physicsWorld.addBody(hb17LowLeftLaneDivVerti);
  // const hb18LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(36, 10, 226)),
  // });
  // hb18LowLeftTwoWayStreetBuildingBlock.position.set(1.5, 0, -769);
  // physicsWorld.addBody(hb18LowLeftTwoWayStreetBuildingBlock);
  // const hb19LowLeftLaneDivVerti = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(6, 5, 127)),
  // });
  // hb19LowLeftLaneDivVerti.position.set(71, 0, -966);
  // physicsWorld.addBody(hb19LowLeftLaneDivVerti);
  // const hb20MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(42, 10, 195)),
  // });
  // hb20MidLeftTwoWayStreetBuildingBlock.position.set(-3.5, 0, -1213);
  // physicsWorld.addBody(hb20MidLeftTwoWayStreetBuildingBlock);
  // const hb21MidLeftLaneDivVerti = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(6, 5, 161)),
  // });
  // hb21MidLeftLaneDivVerti.position.set(70, 0, -1273);
  // physicsWorld.addBody(hb21MidLeftLaneDivVerti);
  // const hb22LowLeftPlantBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(139, 5, 14)),
  // });
  // hb22LowLeftPlantBlock.position.set(246.5, 0, -105);
  // physicsWorld.addBody(hb22LowLeftPlantBlock);
  // const hb23LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(125, 10, 58)),
  // });
  // hb23LowLeftTwoWayStreetBuildingBlock.position.set(235, 0, -198);
  // physicsWorld.addBody(hb23LowLeftTwoWayStreetBuildingBlock);
  // // Plane collision, bad thing so far
  // const planeShape = new CANNON.Plane();
  // const planeBody = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(42.5, 0.1, 6)),
  //   friction: 0.1,
  // });
  // planeBody.position.set(-20.5, -3, -113);
  // planeBody.quaternion.setFromEuler(0, 0, Math.PI / 30);
  // // planeBody.addShape(planeShape);
  // physicsWorld.addBody(planeBody);
  // const rampPlane = new CANNON.Body({
  //   mass: 1,
  //   shape: new CANNON.Plane(new CANNON.Vec3(42.5, 0.1, 8)),
  // });
  // rampPlane.position.set(-7.5, 3, -113);
  // rampPlane.quaternion.setFromEuler(0, 0, Math.PI / 2);
  // physicsWorld.addBody(rampPlane);

  // const hb24LowLeftRamp1 = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(46.5, 0.1, 8)),
  // });
  // hb24LowLeftRamp1.position.set(-11, 0, -113);
  // hb24LowLeftRamp1.quaternion.setFromEuler(0, 0, Math.PI / 30);
  // physicsWorld.addBody(hb24LowLeftRamp1);
  // const hb25LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(31, 10, 123)),
  // });
  // hb25LowLeftTwoWayStreetBuildingBlock.position.set(134.5, 0, -378);
  // physicsWorld.addBody(hb25LowLeftTwoWayStreetBuildingBlock);
  // const hb26LowLeftTwoWayStreetPavement = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(31, 10, 5.5)),
  // });
  // hb26LowLeftTwoWayStreetPavement.position.set(132, 0, -520);
  // physicsWorld.addBody(hb26LowLeftTwoWayStreetPavement);

  // const hb27LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(32, 10, 63)),
  // });
  // hb27LowLeftTwoWayStreetBuildingBlock.position.set(134.5, 0, -605);
  // physicsWorld.addBody(hb27LowLeftTwoWayStreetBuildingBlock);
  // const hb28LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(27, 10, 65)),
  // });
  // hb28LowLeftTwoWayStreetBuildingBlock.position.set(134.5, 0, -738);
  // physicsWorld.addBody(hb28LowLeftTwoWayStreetBuildingBlock);

  // const hb29LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(75, 10, 79)),
  // });
  // hb29LowLeftTwoWayStreetBuildingBlock.position.set(181, 0, -916);
  // physicsWorld.addBody(hb29LowLeftTwoWayStreetBuildingBlock);

  // const hb30LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(71, 10, 34)),
  // });
  // hb30LowLeftTwoWayStreetBuildingBlock.position.set(347, 0, -878);
  // physicsWorld.addBody(hb30LowLeftTwoWayStreetBuildingBlock);

  // const hb31LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(72.5, 10, 37)),
  // });
  // hb31LowLeftTwoWayStreetBuildingBlock.position.set(345, 0, -966);
  // physicsWorld.addBody(hb31LowLeftTwoWayStreetBuildingBlock);

  // const hb32LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(33, 10, 33)),
  // });
  // hb32LowLeftTwoWayStreetBuildingBlock.position.set(385, 0, -1054);
  // physicsWorld.addBody(hb32LowLeftTwoWayStreetBuildingBlock);
  // const hb33LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(33, 10, 33)),
  // });
  // hb33LowLeftTwoWayStreetBuildingBlock.position.set(305, 0, -1054);
  // physicsWorld.addBody(hb33LowLeftTwoWayStreetBuildingBlock);

  // const hb34LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(75, 10, 38)),
  // });
  // hb34LowLeftTwoWayStreetBuildingBlock.position.set(182, 0, -1054);
  // physicsWorld.addBody(hb34LowLeftTwoWayStreetBuildingBlock);

  // const hb35LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(120, 10, 28)),
  // });
  // hb35LowLeftTwoWayStreetBuildingBlock.position.set(225, 0, -1156);
  // physicsWorld.addBody(hb35LowLeftTwoWayStreetBuildingBlock);

  // const hb36LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(53, 10, 29)),
  // });
  // hb36LowLeftTwoWayStreetBuildingBlock.position.set(415, 0, -1160);
  // physicsWorld.addBody(hb36LowLeftTwoWayStreetBuildingBlock);

  // const hb37MidLeftTwoWayStreetBuildingBlockExtension = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(11, 10, 26)),
  // });
  // hb37MidLeftTwoWayStreetBuildingBlockExtension.position.set(372, 0, -1226);
  // physicsWorld.addBody(hb37MidLeftTwoWayStreetBuildingBlockExtension);

  // const hb38LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(30, 10, 30)),
  // });
  // hb38LowLeftTwoWayStreetBuildingBlock.position.set(514, 0, -1159);
  // physicsWorld.addBody(hb38LowLeftTwoWayStreetBuildingBlock);

  // const hb39MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(29, 10, 53)),
  // });
  // hb39MidLeftTwoWayStreetBuildingBlock.position.set(516, 0, -1266);
  // physicsWorld.addBody(hb39MidLeftTwoWayStreetBuildingBlock);

  // const hb40MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(29, 10, 57)),
  // });
  // hb40MidLeftTwoWayStreetBuildingBlock.position.set(435, 0, -1264);
  // physicsWorld.addBody(hb40MidLeftTwoWayStreetBuildingBlock);

  // const hb41MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(46, 10, 24)),
  // });
  // hb41MidLeftTwoWayStreetBuildingBlock.position.set(338, 0, -1298);
  // physicsWorld.addBody(hb41MidLeftTwoWayStreetBuildingBlock);

  // const hb42LowLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(117, 10, 28)),
  // });
  // hb42LowLeftTwoWayStreetBuildingBlock.position.set(704, 0, -1159);
  // physicsWorld.addBody(hb42LowLeftTwoWayStreetBuildingBlock);

  // const hb43MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(16, 10, 58)),
  // });
  // hb43MidLeftTwoWayStreetBuildingBlock.position.set(598, 0, -1266);
  // physicsWorld.addBody(hb43MidLeftTwoWayStreetBuildingBlock);

  // const hb44MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(17, 10, 32)),
  // });
  // hb44MidLeftTwoWayStreetBuildingBlock.position.set(653, 0, -1245);
  // physicsWorld.addBody(hb44MidLeftTwoWayStreetBuildingBlock);

  // const hb45MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(28, 10, 30)),
  // });
  // hb45MidLeftTwoWayStreetBuildingBlock.position.set(704, 0, -1241);
  // physicsWorld.addBody(hb45MidLeftTwoWayStreetBuildingBlock);

  // const hb46MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(17, 10, 34)),
  // });
  // hb46MidLeftTwoWayStreetBuildingBlock.position.set(760, 0, -1240);
  // physicsWorld.addBody(hb46MidLeftTwoWayStreetBuildingBlock);

  // const hb47MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(12, 10, 56)),
  // });
  // hb47MidLeftTwoWayStreetBuildingBlock.position.set(812, 0, -1261);
  // physicsWorld.addBody(hb47MidLeftTwoWayStreetBuildingBlock);

  // const hb48MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(60.5, 10, 31.5)),
  // });
  // hb48MidLeftTwoWayStreetBuildingBlock.position.set(905, 0, -1292.5);
  // physicsWorld.addBody(hb48MidLeftTwoWayStreetBuildingBlock);

  // const hb49MidMidTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(58, 10, 48)),
  // });
  // hb49MidMidTwoWayStreetBuildingBlock.position.set(907, 0, -1189);
  // physicsWorld.addBody(hb49MidMidTwoWayStreetBuildingBlock);

  // const hb50MidLeftTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(70, 10, 23.5)),
  // });
  // hb50MidLeftTwoWayStreetBuildingBlock.position.set(711, 0, -1297.5);
  // physicsWorld.addBody(hb50MidLeftTwoWayStreetBuildingBlock);


  // const hb51LeftMidTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(219.5, 10, 28)),
  // });
  // hb51LeftMidTwoWayStreetBuildingBlock.position.set(323.5, 0, -1373);
  // physicsWorld.addBody(hb51LeftMidTwoWayStreetBuildingBlock);

  // const hb52LeftMidTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(190, 10, 31)),
  // });
  // hb52LeftMidTwoWayStreetBuildingBlock.position.set(773, 0, -1371);
  // physicsWorld.addBody(hb52LeftMidTwoWayStreetBuildingBlock);

  // const hb53MidMidTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(42, 10, 95)),
  // });
  // hb53MidMidTwoWayStreetBuildingBlock.position.set(1050, 0, -1224);
  // physicsWorld.addBody(hb53MidMidTwoWayStreetBuildingBlock);

  // const hb54MidMidTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(164, 10, 25)),
  // });
  // hb54MidMidTwoWayStreetBuildingBlock.position.set(1171, 0, -1369);
  // physicsWorld.addBody(hb54MidMidTwoWayStreetBuildingBlock);

  // const hb55MidMidTwoWayStreetBuildingBlock = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Box(new CANNON.Vec3(111, 10, 35)),
  // });
  
  const hb56MidMidTwoWayStreetRampDown = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(15.5, 0.01, 39)),
  });
  hb56MidMidTwoWayStreetRampDown.position.set(1355.5, -8, -1520);
  hb56MidMidTwoWayStreetRampDown.quaternion.setFromEuler(-Math.PI/25, 0, 0);

  physicsWorld.addBody(hb56MidMidTwoWayStreetRampDown);


  
}

collisionBoxes();

// Build the car chassis
const chassisShape = new CANNON.Box(new CANNON.Vec3(1.3, 0.5, 6));
const chassisBody = new CANNON.Body({ mass: 30 });
chassisBody.addShape(chassisShape, new CANNON.Vec3(0, 0.75, 0));

// Create the vehicle
const vehicle = new CANNON.RigidVehicle({
  chassisBody: chassisBody,
});

// Add wheels to the vehicle
const mass = 1.45;
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
const maxForce = 220;
const maxSteerVal = Math.PI / 8;

let currentInclineAngle = 0;
physicsWorld.addEventListener("beginContact", (event) => {
  // Check if event.contact exists and has the property 'ni'
  if (event.contact && event.contact.ni) {
    const bodyA = event.bodyA;
    const bodyB = event.bodyB;

    // Check if one of the bodies is the vehicle chassis
    let chassisBody = null;
    if (bodyA === vehicle.chassisBody || bodyB === vehicle.chassisBody) {
      chassisBody = vehicle.chassisBody;
    }

    // If the chassis is involved in the collision, calculate the incline angle
    if (chassisBody) {
      // The collision normal vector is event.contact.ni
      // Negate it if it's not pointing away from the chassis body
      const contactNormal =
        chassisBody === bodyA
          ? event.contact.ni.clone()
          : event.contact.ni.clone().negate();
      const upVector = new CANNON.Vec3(0, 1, 0);
      currentInclineAngle = Math.acos(contactNormal.dot(upVector));
    }
  }
});

// Add force on keydown
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      //code for climbing incline plane, didn't work
      // const inclineFactor = Math.sin(currentInclineAngle);
      // const adjustedForce = maxForce + inclineFactor * 10;
      const inclineForceModifier = Math.sin(currentInclineAngle);

      // Apply a dynamic force based on the incline angle
      vehicle.setWheelForce(maxForce, 2);
      vehicle.setWheelForce(-maxForce, 3);

      // vehicle.setWheelForce(maxForce, 2);
      // vehicle.setWheelForce(-maxForce, 3);
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
    case "c":
      vehicle.chassisBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(0, 1, 0),
        0
      );
      vehicle.chassisBody.velocity.set(0, 0, 0);
      vehicle.chassisBody.angularVelocity.set(0, 0, 0);

      break;
    case "e":
      vehicle.chassisBody.position.set(1300,0,-1300);
      vehicle.chassisBody.velocity.set(0, 0, 0);
      vehicle.chassisBody.angularVelocity.set(0, 0, 0);

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
      // busModel.position.x = vehicle.chassisBody.position.x;
      // busModel.position.z = vehicle.chassisBody.position.z;
      // busModel.position.y = vehicle.chassisBody.position.y;
      // busModel.rotation.y = angle.y - Math.PI / 2;
      busModel.position.copy(vehicle.chassisBody.position);
      busModel.quaternion.copy(vehicle.chassisBody.quaternion);

      const correctionQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -Math.PI / 2
      ); //-90 degrees around y axis
      busModel.quaternion.multiply(correctionQuaternion);
    }
    controllerInput();
    // camera.position.set(
    //   vehicle.chassisBody.position.x + 5 * Math.sin(angle.y),
    //   30,
    //   vehicle.chassisBody.position.z + 5 * Math.cos(angle.y)
    // );
    camera.position.set(
      vehicle.chassisBody.position.x,
      15,
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
