import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { World } from './js/World.js';
import { Controls } from './js/Controls.js';
import { WeaponSystem } from './js/WeaponSystem.js';
import { UI } from './js/UI.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const clock = new THREE.Clock();
const loader = new GLTFLoader();

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

// Initialize Components
const world = new World(scene);
const controls = new Controls(camera, renderer.domElement);
const weapon = new WeaponSystem(camera);
const ui = new UI((name) => {
    weapon.loadWeapon(`assets/weapons/animated_${name}.glb`);
});

// Default Load
weapon.loadWeapon('assets/weapons/animated_fists.glb');

// Keybindings
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    
    if (key === 'q') ui.toggle();
    if (key === 'i') weapon.play('INSPECTION');
    if (key === 'r') weapon.play('RELOAD');
    
    // Spawn Vehicle Logic
    if (key === '-') {
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        const spawnPos = camera.position.clone().add(forward.multiplyScalar(5));
        
        loader.load('assets/vehicles/animated_car.glb', (gltf) => {
            const car = gltf.scene;
            car.position.set(spawnPos.x, 0, spawnPos.z);
            scene.add(car);
        });
    }

    // Dev Console Info
    if (key === '=') {
        console.log("%c--- DEV CONSOLE ---", "color: yellow; font-weight: bold;");
        console.log("Player Pos:", camera.position);
        console.log("Entities:", scene.children.length);
    }
});

// Mouse Input
window.addEventListener('mousedown', (e) => {
    if (ui.isActive) return;
    if (e.button === 0) weapon.play('FIRE');
    if (e.button === 2) weapon.play('FIRE 2'); // GTA-style secondary action
});

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    controls.update(delta);
    weapon.update(delta);
    renderer.render(scene, camera);
}
animate();
