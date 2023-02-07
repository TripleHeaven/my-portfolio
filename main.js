import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(100, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: "#FFD700",
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("public/spaceTexture.jpg");
scene.background = spaceTexture;

const myselfTexture = new THREE.TextureLoader().load("public/myself.jpg");
const myself = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: myselfTexture })
);

myself.position.x = 2;
myself.position.z = -5;

scene.add(myself);

const jsLogoTexture = new THREE.TextureLoader().load("public/jsLogo.png");
const jsLogo = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: jsLogoTexture })
);

jsLogo.position.x = -5;
jsLogo.position.z = 0;

scene.add(jsLogo);

const htmlLogoTexture = new THREE.TextureLoader().load("public/htmlLogo.png");
const htmlLogo = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: htmlLogoTexture })
);

htmlLogo.position.x = -5;
htmlLogo.position.z = 0;

scene.add(htmlLogo);

const cssLogoTexture = new THREE.TextureLoader().load("public/cssLogo.png");
const cssLogo = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: cssLogoTexture })
);

cssLogo.position.x = -5;
cssLogo.position.z = 0;

scene.add(cssLogo);

const earthTexture = new THREE.TextureLoader().load("public/worldColour.jpg");
const earthNormalTexture = new THREE.TextureLoader().load(
  "public/earth_normalmap.jpg"
);
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormalTexture,
  })
);

earth.position.x = 1.5;
earth.position.z = 9;

scene.add(earth);

const moonTexture = new THREE.TextureLoader().load("public/moonTexture.jpg");
const moonNormalTexture = new THREE.TextureLoader().load(
  "public/moonNormal.jpg"
);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalTexture,
  })
);

moon.position.x = 1.5;
moon.position.z = 18;

scene.add(moon);

const venusTexture = new THREE.TextureLoader().load("public/venus.jpg");

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);

venus.position.x = -1.5;
venus.position.z = 35;

scene.add(venus);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  myself.rotation.x += 0.01;
  myself.rotation.y += 0.01;

  jsLogo.position.x = t * -0.0001 - 2;
  jsLogo.position.z = t * -0.0001 + 2;
  jsLogo.position.y = -0.75;

  htmlLogo.position.x = t * -0.0001 + 0;
  htmlLogo.position.z = t * -0.0001 + 2;
  htmlLogo.position.y = -0.75;

  cssLogo.position.x = t * -0.0001 + 2;
  cssLogo.position.z = t * -0.0001 + 2;
  cssLogo.position.y = -0.75;

  if (t < 0) {
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.x += 0.005;
  earth.rotation.y += 0.005;
  earth.rotation.z += 0.005;

  moon.rotation.x -= 0.005;
  moon.rotation.y -= 0.005;
  moon.rotation.z -= 0.005;

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  jsLogo.rotation.y += 0.01;
  htmlLogo.rotation.y += 0.01;
  cssLogo.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
