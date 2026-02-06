import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class World {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.init();
    }

    init() {
        // High-end Environment Lighting
        const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
        this.scene.add(hemi);

        const sun = new THREE.DirectionalLight(0xffffff, 1.5);
        sun.position.set(50, 100, 50);
        sun.castShadow = true;
        this.scene.add(sun);

        // Load the Crateria City Map
        this.loader.load('crateria_city.glb', (gltf) => {
            const map = gltf.scene;
            // Ensure the map is centered and grounded
            map.position.set(0, 0, 0); 
            this.scene.add(map);
            
            // Basic collision flag for all meshes in the city
            map.traverse(node => {
                if (node.isMesh) {
                    node.receiveShadow = true;
                    node.castShadow = true;
                }
            });
        });
    }
}
