// ESCENA Y CÁMARA
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLES
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// LUCES DINÁMICAS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFD700, 1);
directionalLight.position.set(5,10,7);
scene.add(directionalLight);

// PARTICULAS TIPO CONFETI
const particleCount = 200;
const particlesGeometry = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particleCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 20, // x
    Math.random() * 10 - 5,     // y
    (Math.random() - 0.5) * 20  // z
  );
}
particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({ color: 0xFFEB3B, size: 0.1 });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// FLORES QUE FLORECEN Y GIRAN
const flowers = [];
for (let i = 0; i < 40; i++) {
  const geometry = new THREE.ConeGeometry(0.2, 0.5, 6);
  const material = new THREE.MeshStandardMaterial({ color: 0xFFEB3B, flatShading: true });
  const flower = new THREE.Mesh(geometry, material);
  flower.position.set((Math.random()-0.5)*15, -2, (Math.random()-0.5)*15);
  flower.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
  flower.scale.setScalar(0);
  scene.add(flower);
  flowers.push({ mesh: flower, speed: 0.002 + Math.random()*0.003 });
}

// PÉTALOS QUE CAEN
const petals = [];
for (let i = 0; i < 60; i++) {
  const geo = new THREE.SphereGeometry(0.05, 6, 6);
  const mat = new THREE.MeshStandardMaterial({ color: 0xFFEB3B });
  const petal = new THREE.Mesh(geo, mat);
  petal.position.set((Math.random()-0.5)*15, Math.random()*10, (Math.random()-0.5)*15);
  petal.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
  petal.speed = 0.002 + Math.random()*0.003;
  scene.add(petal);
  petals.push(petal);
}

// ANIMACIÓN
function animate() {
  requestAnimationFrame(animate);

  // Control de cámara
  controls.update();

  // Animar flores que florecen y giran
  flowers.forEach(f => {
    if (f.mesh.scale.x < 1) {
      f.mesh.scale.x += f.speed;
      f.mesh.scale.y += f.speed;
      f.mesh.scale.z += f.speed;
    }
    f.mesh.rotation.y += 0.005;
    f.mesh.position.y += f.speed * 5; 
    if (f.mesh.position.y > 5) f.mesh.position.y = -2;
  });

  // Animar pétalos cayendo
  petals.forEach(p => {
    p.position.y -= p.speed;
    p.rotation.x += 0.01;
    p.rotation.z += 0.01;
    if (p.position.y < -5) p.position.y = 5;
  });

  // Animar partículas tipo confeti
  particles.rotation.y += 0.001;

  // Luz dinámica suave
  directionalLight.intensity = 0.8 + Math.sin(Date.now() * 0.001) * 0.2;

  renderer.render(scene, camera);
}

animate();

// AJUSTE AL CAMBIO DE VENTANA
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});