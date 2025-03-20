import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 1. Crear la escena
const scene = new THREE.Scene();

// 2. Configurar la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// 3. Configurar el renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 4. Agregar controles con el mouse (mouse pad compatible)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Suavizar el movimiento
controls.dampingFactor = 0.25; // Factor de suavizado
controls.enableZoom = true; // Habilitar zoom
controls.enablePan = false; // Desactivar el pan, ya que lo queremos controlar con rotación
controls.screenSpacePanning = false; // Deshabilitar el paneo en el espacio de la pantalla
controls.maxPolarAngle = Math.PI / 1.5; // Limitar el ángulo polar para que no puedas mirar demasiado hacia abajo
controls.minPolarAngle = Math.PI / 4; // Limitar el ángulo para que no puedas mirar demasiado hacia arriba

// 5. Agregar luces
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 6. Cargar el modelo
const loader = new GLTFLoader();
loader.load('/models/harry_potter_bedroom.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    scene.add(model);
}, undefined, (error) => {
    console.error('Error cargando el modelo:', error);
});

// 7. Ajustar tamaño cuando cambia la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 8. Controles de teclado (WASD)
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
};

const speed = 0.1; // Velocidad de movimiento

document.addEventListener('keydown', (event) => {
    if (event.key in keys) keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key in keys) keys[event.key] = false;
});

// 9. Loop de animación
function animate() {
    requestAnimationFrame(animate);
    
    // Obtener dirección de la cámara
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Mantenerse en el mismo nivel

    // Perpendicular a la dirección de la cámara para movimiento lateral
    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();

    // Movimiento con WASD
    if (keys.w) camera.position.addScaledVector(direction, speed);
    if (keys.s) camera.position.addScaledVector(direction, -speed);
    if (keys.a) camera.position.addScaledVector(right, -speed);
    if (keys.d) camera.position.addScaledVector(right, speed);

    controls.update();
    renderer.render(scene, camera);
}

animate();
