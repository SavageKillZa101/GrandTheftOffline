import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class WeaponSystem {
    constructor(camera) {
        this.camera = camera;
        this.loader = new GLTFLoader();
        this.mixer = null;
        this.actions = {};
        this.currentModel = null;
    }

    async loadWeapon(weaponPath) {
        if (this.currentModel) this.camera.remove(this.currentModel);

        return new Promise((resolve) => {
            this.loader.load(weaponPath, (gltf) => {
                this.currentModel = gltf.scene;
                // Standard FPS positioning
                this.currentModel.position.set(0.3, -0.4, -0.5);
                this.currentModel.scale.set(0.1, 0.1, 0.1);
                this.camera.add(this.currentModel);

                this.mixer = new THREE.AnimationMixer(this.currentModel);
                this.actions = {};

                gltf.animations.forEach(clip => {
                    const name = clip.name.toUpperCase();
                    this.actions[name] = this.mixer.clipAction(clip);
                });

                this.play('UP'); 
                resolve();
            });
        });
    }

    play(name, loop = false) {
        const action = this.actions[name.toUpperCase()];
        if (!action) return;

        // Smoothly blend between animations
        Object.values(this.actions).forEach(a => a.fadeOut(0.1));
        
        action.reset().fadeIn(0.1);
        action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();

        if (!loop && name !== 'DOWN') {
            const onFinished = () => {
                this.mixer.removeEventListener('finished', onFinished);
                if (this.actions['IDLE']) this.play('IDLE', true);
            };
            this.mixer.addEventListener('finished', onFinished);
        }
    }

    update(delta) {
        if (this.mixer) this.mixer.update(delta);
    }
}
