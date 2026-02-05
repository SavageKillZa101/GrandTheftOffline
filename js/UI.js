export class UI {
    constructor(onSelect) {
        this.onSelect = onSelect;
        this.isActive = false;
        this.setupHTML();
    }

    setupHTML() {
        const style = document.createElement('style');
        style.innerHTML = `
            #weapon-wheel {
                position: fixed; inset: 0; background: rgba(0,0,0,0.7);
                display: none; justify-content: center; align-items: center; z-index: 9999;
            }
            .wheel {
                display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
            }
            .slot {
                padding: 20px; border: 2px solid white; color: white;
                cursor: pointer; text-align: center; background: rgba(255,255,255,0.1);
            }
            .slot:hover { background: white; color: black; }
        `;
        document.head.appendChild(style);

        this.el = document.createElement('div');
        this.el.id = 'weapon-wheel';
        this.el.innerHTML = `
            <div class="wheel">
                <div class="slot" data-weapon="fists">FISTS</div>
                <div class="slot" data-weapon="pistol">PISTOL</div>
                <div class="slot" data-weapon="mp5">SMG</div>
                <div class="slot" data-weapon="scar">SCAR</div>
                <div class="slot" data-weapon="rifle">RIFLE</div>
                <div class="slot" data-weapon="medkit">MEDKIT</div>
            </div>
        `;
        document.body.appendChild(this.el);

        this.el.querySelectorAll('.slot').forEach(s => {
            s.onclick = () => {
                this.onSelect(s.dataset.weapon);
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
