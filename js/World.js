import * as THREE from 'three';

export class World {
    constructor(scene) {
        this.scene = scene;
        this.createEnvironment();
    }

    createEnvironment() {
        // Lighting
        const ambient = new THREE.HemisphereLight(0xffffff, 0x444444, 2.5);
        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xffffff, 1.5);
        sun.position.set(5, 10, 7.5);
        this.scene.add(sun);

        // Ground - GTA Concrete Style
        const floorGeo = new THREE.PlaneGeometry(1000, 1000);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        this.scene.add(floor);

        // Add some basic boxes as landmarks
        for (let i = 0; i < 20; i++) {
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
            );
            box.position.set(Math.random() * 50 - 25, 1, Math.random() * 50 - 25);
            this.scene.add(box);
        }
    }
}
