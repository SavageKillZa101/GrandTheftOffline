import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class VehicleSystem {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
    }

    spawn(modelPath, position) {
        this.loader.load(`assets/vehicles/${modelPath}`, (gltf) => {
            const vehicle = gltf.scene;
            vehicle.position.copy(position);
            this.scene.add(vehicle);
            
            // If the vehicle has a 'drive' or 'idle' animation
            const mixer = new THREE.AnimationMixer(vehicle);
            if (gltf.animations.length > 0) {
                mixer.clipAction(gltf.animations[0]).play();
            }
            // You would push this to a global animation array to update in main loop
        });
    }
}
