import "./orbitControls";

const THREE = window.THREE;
var scene = new THREE.Scene();

let count = 0

let container = document.getElementById("sphere"),
  loader = new THREE.TextureLoader(),
  renderer,
  camera,
  elapsed = 0,
  maxParticles = 7000,
  particlesDelay = 0.5,
  radius = 50,
  sphereGeometry,
  sphere,
  stats;

function init() {
  let vw = window.innerWidth,
    vh = window.innerHeight;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(vw, vh);
  renderer.setPixelRatio(window.devicePixelRatio);

  camera = new THREE.PerspectiveCamera(45, vw / vh, 1, 1000);
  camera.position.z = 160;//130;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.lookAt(scene.position);
  scene.add(camera);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  // let axisHelper = new THREE.AxisHelper(50);
  // scene.add(axisHelper);

  container.appendChild(renderer.domElement);

  window.addEventListener("resize", onResize, false);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function setupStats() {
  stats = new Stats();
  container.appendChild(stats.domElement);
}

function draw() {
  sphereGeometry = new THREE.Geometry();

  loader.crossOrigin = true;

  // "https://threejs.org/examples/textures/particle2.png"
  let particleTexture = loader.load("/images/particle2.png"),
    material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.8,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: particleTexture,
      depthWrite: false
    });

  for (let i = 0; i < maxParticles; i++) {
    let xPos = i % 2 === 0 ? radius : -radius,
      vertex = new THREE.Vector3(xPos, 0, 0);

    vertex.rotationAxis = new THREE.Vector3(
      0,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    );
    vertex.rotationAxis.normalize();
    vertex.delay = particlesDelay * i;
    sphereGeometry.vertices.push(vertex);
  }

  sphere = new THREE.Points(sphereGeometry, material);
  scene.add(sphere);
}

function update() {
  for (let i = 0; i < maxParticles; i++) {
    let particle = sphereGeometry.vertices[i];

    if (elapsed > particle.delay)
      particle.applyAxisAngle(particle.rotationAxis, 0.008);
  }

  sphere.geometry.verticesNeedUpdate = true;
}

let elapsed_rate = 6;
function render() {
  if (elapsed_rate > 1) elapsed_rate -= 1;
  elapsed += elapsed_rate;
  // stats.update();
  update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

init();
// setupStats();
draw();
render();
