import * as THREE from 'three';
import { World } from './js/World.js';
import { Controls } from './js/Controls.js';
import { WeaponSystem } from './js/WeaponSystem.js';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const clock = new THREE.Clock();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize Modules
const world = new World(scene);
const controls = new Controls(camera, renderer.domElement);
const weapon = new WeaponSystem(camera, scene);

// Load your first weapon
weapon.loadWeapon('animated_mp5.glb');

// Interaction
document.getElementById('overlay').addEventListener('click', () => controls.instance.lock());
window.addEventListener('mousedown', () => {
    if (controls.instance.isLocked) weapon.play('shoot');
});

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    controls.update(delta);
    weapon.update(delta);
    renderer.render(scene, camera);
}

animate();
