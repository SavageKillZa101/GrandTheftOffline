import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class WeaponSystem {
    constructor(camera) {
        this.camera = camera;
        this.loader = new GLTFLoader();
        this.mixer = null;
        this.actions = {};
        this.currentWeapon = null;
        this.isBusy = false; // Prevents animation overlapping (e.g. firing while reloading)
    }

    async loadWeapon(name) {
        if (this.currentWeapon) this.camera.remove(this.currentWeapon);
        this.isBusy = false;

        return new Promise((resolve) => {
            this.loader.load(`assets/weapons/animated_${name}.glb`, (gltf) => {
                this.currentWeapon = gltf.scene;
                this.currentWeapon.position.set(0.35, -0.4, -0.5);
                this.currentWeapon.scale.set(0.12, 0.12, 0.12);
                this.camera.add(this.currentWeapon);

                this.mixer = new THREE.AnimationMixer(this.currentWeapon);
                this.actions = {};

                gltf.animations.forEach(clip => {
                    const action = this.mixer.clipAction(clip);
                    this.actions[clip.name.toUpperCase()] = action;
                });

                this.play('UP', { force: true });
                resolve();
            });
        });
    }

    play(name, options = {}) {
        const action = this.actions[name.toUpperCase()];
        if (!action || (this.isBusy && !options.force)) return;

        // Reset and blend
        Object.values(this.actions).forEach(a => a.fadeOut(0.15));
        
        action.reset().fadeIn(0.15).setLoop(THREE.LoopOnce).play();
        action.clampWhenFinished = true;

        if (name !== 'IDLE') {
            this.isBusy = true;
            const onFinish = () => {
                this.mixer.removeEventListener('finished', onFinish);
                this.isBusy = false;
                if (this.actions['IDLE']) this.play('IDLE', { force: true });
            };
            this.mixer.addEventListener('finished', onFinish);
        }

        // Special logic for Medkit/Healing
        if (name === 'FIRE' && this.currentWeapon.name.includes('medkit')) {
            window.dispatchEvent(new CustomEvent('healPlayer', { detail: { amount: 25 } }));
        }
    }

    update(delta) {
        if (this.mixer) this.mixer.update(delta);
    }
}
