import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export class Controls {
    constructor(camera, domElement) {
        this.instance = new PointerLockControls(camera, domElement);
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.moveStates = { forward: false, backward: false, left: false, right: false };

        this._initListeners();
    }

    _initListeners() {
        const onKey = (val) => (e) => {
            switch (e.code) {
                case 'KeyW': this.moveStates.forward = val; break;
                case 'KeyA': this.moveStates.left = val; break;
                case 'KeyS': this.moveStates.backward = val; break;
                case 'KeyD': this.moveStates.right = val; break;
            }
        };

        document.addEventListener('keydown', onKey(true));
        document.addEventListener('keyup', onKey(false));
    }

    update(delta) {
        if (!this.instance.isLocked) return;

        // Friction/Damping
        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;

        this.direction.z = Number(this.moveStates.forward) - Number(this.moveStates.backward);
        this.direction.x = Number(this.moveStates.right) - Number(this.moveStates.left);
        this.direction.normalize();

        // Acceleration
        const speed = 400.0;
        if (this.moveStates.forward || this.moveStates.backward) this.velocity.z -= this.direction.z * speed * delta;
        if (this.moveStates.left || this.moveStates.right) this.velocity.x -= this.direction.x * speed * delta;

        this.instance.moveRight(-this.velocity.x * delta);
        this.instance.moveForward(-this.velocity.z * delta);
    }
}
