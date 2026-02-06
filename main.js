import * as THREE from 'three';
import { World } from './js/World.js';
import { Controls } from './js/Controls.js';
import { WeaponSystem } from './js/WeaponSystem.js';
import { UI } from './js/UI.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const clock = new THREE.Clock();

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const world = new World(scene);
const weapon = new WeaponSystem(camera);
const controls = new Controls(camera, renderer.domElement);
const ui = new UI((choice) => weapon.loadWeapon(choice));

// Setup Player Health
let health = 100;
window.addEventListener('healPlayer', (e) => {
    health = Math.min(100, health + e.detail.amount);
    console.log(`Healed! Health: ${health}`);
});

// Keybinds for GTA features
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'q') ui.toggle();
    if (key === 'i') weapon.play('INSPECTION');
    if (key === 'r') weapon.play('RELOAD');
    if (key === '-') spawnVehicle();
    if (key === '=') devConsole();
});

function spawnVehicle() {
    const loader = new THREE.GLTFLoader();
    const spawnDir = new THREE.Vector3();
    camera.getWorldDirection(spawnDir);
    const spawnPos = camera.position.clone().add(spawnDir.multiplyScalar(10));
    
    loader.load('assets/vehicles/animated_car.glb', (gltf) => {
        const car = gltf.scene;
        car.position.set(spawnPos.x, 0, spawnPos.z);
        scene.add(car);
    });
}

function devConsole() {
    console.clear();
    console.table({ Health: health, Pos: camera.position, Objects: scene.children.length });
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    controls.update(delta);
    weapon.update(delta);
    renderer.render(scene, camera);
}

animate();
