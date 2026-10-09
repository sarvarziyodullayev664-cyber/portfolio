// Web Audio API Synthesizer for UI sound effects (Zero external dependencies)
class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.init();
    }

    init() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        } catch (e) {
            console.warn("Web Audio API not supported", e);
        }
    }

    ensureContext() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // High-tech subtle click
    playClick() {
        if (!this.enabled || !this.ctx) return;
        this.ensureContext();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
            
            gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch(e) {}
    }

    // Hover chime
    playHover() {
        if (!this.enabled || !this.ctx) return;
        this.ensureContext();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(520, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(680, this.ctx.currentTime + 0.05);
            
            gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch(e) {}
    }

    // Terminal keyboard blip
    playKey() {
        if (!this.enabled || !this.ctx) return;
        this.ensureContext();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            const freq = 400 + Math.random() * 200;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            
            gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + 0.03);
        } catch(e) {}
    }

    // Success chord (C major high-tech arpeggio)
    playSuccess() {
        if (!this.enabled || !this.ctx) return;
        this.ensureContext();
        try {
            const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            freqs.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + (i * 0.07);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);
                
                gain.gain.setValueAtTime(0.05, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(startTime);
                osc.stop(startTime + 0.25);
            });
        } catch(e) {}
    }
}

window.soundFX = new SoundFX();
