import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { WeaponSystem } from './js/WeaponSystem.js';
import { UI } from './js/UI.js';

// ... Setup Scene, Camera, Renderer, Controls ...

const weapon = new WeaponSystem(camera);
const ui = new UI((name) => weapon.loadWeapon(`assets/weapons/animated_${name}.glb`));
const loader = new GLTFLoader();

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === 'q') ui.toggle();
    if (key === 'i') weapon.play('INSPECTION');
    if (key === 'r') weapon.play('RELOAD');
    
    // Vehicle Spawner
    if (key === '-') {
        const spawnPos = camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(5));
        loader.load('assets/vehicles/animated_car.glb', (gltf) => {
            const car = gltf.scene;
            car.position.copy(spawnPos);
            scene.add(car);
            console.log("Vehicle Spawned at:", spawnPos);
        });
    }

    // Dev Console Info
    if (key === '=') {
        console.group("Dev Console");
        console.log("Player Position:", camera.position);
        console.log("Scene Objects:", scene.children.length);
        console.groupEnd();
    }
});

// Fire Logic
window.addEventListener('mousedown', (e) => {
    if (!controls.isLocked) return;
    if (e.button === 0) weapon.play('FIRE');
    if (e.button === 2) weapon.play('FIRE 2');
});
