export class UI {
    constructor(onSelect) {
        this.onSelect = onSelect;
        this.isActive = false;
        this._initHTML();
    }

    _initHTML() {
        const style = document.createElement('style');
        style.innerHTML = `
            #weapon-wheel {
                position: fixed; inset: 0; background: rgba(0,0,0,0.8);
                display: none; justify-content: center; align-items: center; z-index: 9999;
                backdrop-filter: blur(5px);
            }
            .wheel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .slot {
                width: 120px; height: 120px; border: 2px solid white; color: white;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; font-family: 'Arial'; font-weight: bold;
            }
            .slot:hover { background: white; color: black; }
        `;
        document.head.appendChild(style);

        this.el = document.createElement('div');
        this.el.id = 'weapon-wheel';
        this.el.innerHTML = `
            <div class="wheel-grid">
                <div class="slot" data-w="fists">FISTS</div>
                <div class="slot" data-w="pistol">PISTOL</div>
                <div class="slot" data-w="mp5">SMG</div>
                <div class="slot" data-w="scar">SCAR</div>
                <div class="slot" data-w="rifle">RIFLE</div>
                <div class="slot" data-w="medkit">MEDKIT</div>
            </div>`;
        document.body.appendChild(this.el);

        this.el.querySelectorAll('.slot').forEach(s => {
            s.onclick = () => {
                this.onSelect(s.dataset.w);
                this.toggle(false);
            };
        });
    }

    toggle(force) {
        this.isActive = force !== undefined ? force : !this.isActive;
        this.el.style.display = this.isActive ? 'flex' : 'none';
        if (this.isActive) document.exitPointerLock();
    }
}
