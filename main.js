// ... existing imports ...
import { VehicleSystem } from './js/VehicleSystem.js';
import { UI } from './js/UI.js';

const vehicles = new VehicleSystem(scene);
const ui = new UI((index) => {
    // Logic to switch weapon based on wheel selection
    console.log("Selected Weapon Index:", index);
});

window.addEventListener('keydown', (e) => {
    if (e.key === '-') {
        // Spawn vehicle 5 units in front of player
        const spawnPos = camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(5));
        vehicles.spawn('animated_car.glb', spawnPos);
        console.log("Vehicle Spawned");
    }

    if (e.key === '=') {
        // Toggle Dev Console (browser default is F12, but we can log stats here)
        console.log("--- DEV CONSOLE ---");
        console.log("Player Pos:", camera.position);
        console.log("Active Objects:", scene.children.length);
    }

    if (e.key.toLowerCase() === 'i') {
        weapon.inspect();
    }

    if (e.key.toLowerCase() === 'q') {
        ui.toggleWheel(true);
    }
});

// Update main loop to handle Fire 1 and Fire 2
window.addEventListener('mousedown', (e) => {
    if (!controls.instance.isLocked) return;
    if (e.button === 0) weapon.play('fire');   // Left Click
    if (e.button === 2) weapon.play('fire 2'); // Right Click
});
