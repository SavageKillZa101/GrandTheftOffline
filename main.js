import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { WeaponSystem } from './js/WeaponSystem.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const clock = new THREE.Clock();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup
const controls = new PointerLockControls(camera, document.body);
const weapon = new WeaponSystem(camera, scene);

// Lights & Environment
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 3));
const grid = new THREE.GridHelper(200, 50);
scene.add(grid);

// Load one of your files
weapon.loadWeapon('animated_mp5.glb');

// Input Handling
document.getElementById('overlay').addEventListener('click', () => controls.lock());
controls.addEventListener('lock', () => document.getElementById('overlay').style.display = 'none');
controls.addEventListener('unlock', () => document.getElementById('overlay').style.display = 'flex');

window.addEventListener('mousedown', () => weapon.play('shoot'));
window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR') weapon.play('reload');
});

// Main Loop
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    weapon.update(delta);
    renderer.render(scene, camera);
}

animate();
