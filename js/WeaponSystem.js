export class WeaponSystem {
    // ... previous constructor ...
    
    play(name, force = false) {
        const action = this.actions[name.toLowerCase()];
        if (!action) return;

        // Priority Logic: If firing or reloading, don't interrupt unless forced
        if (!force && (this.isActionPlaying('fire') || this.isActionPlaying('reload'))) return;

        Object.values(this.actions).forEach(a => a.fadeOut(0.2));
        action.reset().fadeIn(0.2).setLoop(THREE.LoopOnce).play();
        action.clampWhenFinished = true;
    }

    isActionPlaying(name) {
        const action = this.actions[name];
        return action && action.isRunning();
    }

    // New logic for switching to vehicles or fists
    inspect() { this.play('inspection', true); }
    down() { this.play('down', true); }
}
