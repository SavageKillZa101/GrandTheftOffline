import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class WeaponSystem {
    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.mixer = null;
        this.actions = {};
        this.currentWeapon = null;
    }

    async loadWeapon(modelName) {
        return new Promise((resolve) => {
            this.loader.load(modelName, (gltf) => {
                this.currentWeapon = gltf.scene;
                
                // Adjusting scale/position for FPS view
                this.currentWeapon.position.set(0.4, -0.4, -0.6);
                this.currentWeapon.scale.set(0.1, 0.1, 0.1);
                
                this.camera.add(this.currentWeapon);
                this.mixer = new THREE.AnimationMixer(this.currentWeapon);

                // Map your animations: take, shoot, idle, reload
                gltf.animations.forEach(clip => {
                    const name = clip.name.toLowerCase();
                    this.actions[name] = this.mixer.clipAction(clip);
                });

                this.play('take');
                resolve();
            });
        });
    }

    play(name) {
        const action = this.actions[name];
        if (!action) return;

        // Reset and play
        Object.values(this.actions).forEach(a => a.stop());
        action.reset().setLoop(THREE.LoopOnce).play();
        action.clampWhenFinished = true;

        // Auto-return to idle
        this.mixer.addEventListener('finished', () => {
            if (this.actions['idle']) this.actions['idle'].play();
        });
    }

    update(delta) {
        if (this.mixer) this.mixer.update(delta);
    }
}
