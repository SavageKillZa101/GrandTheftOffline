export class UI {
    constructor(onSelectWeapon) {
        this.overlay = document.getElementById('ui-layer');
        this.wheelActive = false;
        this.onSelectWeapon = onSelectWeapon;
        this.initWeaponWheel();
    }

    initWeaponWheel() {
        // Create the wheel HTML dynamically
        this.wheelEl = document.createElement('div');
        this.wheelEl.id = 'weapon-wheel';
        this.wheelEl.style = `
            display: none; position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%); width: 300px; height: 300px;
            border-radius: 50%; border: 5px solid rgba(255,255,255,0.5);
            background: rgba(0,0,0,0.8); grid-template-columns: 1fr 1fr; align-items: center;
        `;
        // Add placeholders for your 6-8 weapon types
        const types = ['Fists', 'Pistol', 'SMG', 'Rifle', 'Heavy', 'Medkit'];
        types.forEach((type, i) => {
            const btn = document.createElement('button');
            btn.innerText = type;
            btn.onclick = () => { this.onSelectWeapon(i); this.toggleWheel(false); };
            this.wheelEl.appendChild(btn);
        });
        document.body.appendChild(this.wheelEl);
    }

    toggleWheel(active) {
        this.wheelActive = active;
        this.wheelEl.style.display = active ? 'grid' : 'none';
        if (active) document.exitPointerLock();
    }
}
