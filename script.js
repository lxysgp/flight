const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Ground
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Plane
const planeGeometry = new THREE.BoxGeometry(1, 0.2, 2);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

camera.position.set(0, 2, -5);
camera.lookAt(plane.position);

let keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function animate() {
  requestAnimationFrame(animate);

  // Controls
  if (keys['ArrowUp'] || keys['w']) plane.rotation.x -= 0.01;
  if (keys['ArrowDown'] || keys['s']) plane.rotation.x += 0.01;
  if (keys['ArrowLeft'] || keys['a']) plane.rotation.y += 0.01;
  if (keys['ArrowRight'] || keys['d']) plane.rotation.y -= 0.01;

  // Move plane forward
  const direction = new THREE.Vector3(0, 0, 1);
  direction.applyQuaternion(plane.quaternion);
  plane.position.addScaledVector(direction, -0.1);

  // Move camera with plane
  camera.position.copy(plane.position).add(new THREE.Vector3(0, 2, -5).applyQuaternion(plane.quaternion));
  camera.lookAt(plane.position);

  renderer.render(scene, camera);
}

animate();
