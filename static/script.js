// Escena y cámara
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controles
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFD700, 1); // amarillo suave
directionalLight.position.set(5,10,7);
scene.add(directionalLight);

// Flores estilo Army
const flowers = [];
for (let i = 0; i < 50; i++) {
  const geometry = new THREE.ConeGeometry(0.2, 0.5, 6); // pétalos estilizados tipo geometría
  const material = new THREE.MeshStandardMaterial({ color: 0xFFEB3B, flatShading: true });
  const flower = new THREE.Mesh(geometry, material);
  flower.position.set((Math.random()-0.5)*15, Math.random()*5-1, (Math.random()-0.5)*15);
  flower.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
  flower.scale.setScalar(0.5 + Math.random()*0.8);
  scene.add(flower);
  flowers.push(flower);
}

// Animación elegante
function animate() {
  requestAnimationFrame(animate);
  flowers.forEach(f => {
    f.rotation.y += 0.005;
    f.position.y += Math.sin(Date.now() * 0.001 + f.position.x) * 0.0015;
    if (f.position.y > 5) f.position.y = -2;
  });
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Ajuste ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});