import { writable, type Writable } from 'svelte/store';

function mapSpectrumToFrequency(n, sampleRate, fftSize) {
    return (n * sampleRate) / fftSize;
}

export function getPartialVolume(spectrum, from, to) {
    if (from > to) {
        throw new RangeError('from can not be larger than to.');
    }
    let sum = 0;
    for (let i = from; i < to; i += 1) {
        sum += spectrum[i] * 2;
    }

    return Math.sqrt(sum / (to - from + 1));
}

export default class AudioAnalyzer {
    context: AudioContext;
    sampleRate: number;
    analyser: AnalyserNode;
    source: MediaElementAudioSourceNode;
    spectrum: Uint8Array;
    store: Writable<Uint8Array>;
    requestId: number;

    constructor(source) {
        this.context = new AudioContext({ sampleRate: 44100 });
        this.sampleRate = 44100;
        this.analyser = this.context.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.4;
        this.analyser.fftSize = 1024;
        this.source = this.context.createMediaElementSource(source);
        this.spectrum = new Uint8Array(this.analyser.frequencyBinCount);
        this.source.connect(this.analyser);
        this.store = writable(this.spectrum);
        this.process = this.process.bind(this);
        this.processNode = this.processNode.bind(this);
        this.stop = this.stop.bind(this);
        this.connect = this.connect.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    process() {
        this.requestId = requestAnimationFrame(this.process);
        this.processNode();
    }

    processNode() {
        this.analyser.getByteFrequencyData(this.spectrum);
        const arr = this.mapNodeToFrequency();
        this.store.set(arr);
    }

    stop() {
        cancelAnimationFrame(this.requestId);
    }

    connect() {
        this.analyser.connect(this.context.destination);
    }

    destroy() {
        this.stop();
        this.context.close();
        this.source.disconnect();
        this.analyser.disconnect();
    }



    mapNodeToFrequency() {
        const highFreq = [];
        const HFreq = [];
        const midFreq = [];
        const lowFreq = [];
        const veryLowReq = [];
        const sampleRate = 44100;
        const fftSize = 1024;

        this.spectrum.forEach((v, i) => {
            const frequency = mapSpectrumToFrequency(
                i,
                sampleRate / 2,
                fftSize
            );
            if (frequency > 0 && frequency < 140) {
                veryLowReq.push(v * 0.25);
            } else if (frequency >= 150 && frequency <= 350) {
                lowFreq.push(v * 0.5);
            } else if (frequency > 350 && frequency <= 1500) {
                midFreq.push(v * 1.2);
            } else if (frequency >= 1500 && frequency <= 3000) {
                highFreq.push(v * 1.5);
            } else if (frequency >= 3000 && frequency <= 9000) {
                HFreq.push(v * 2);
            }
        });

      const frequencies = [...HFreq, ...highFreq, ...midFreq, ...lowFreq, ...veryLowReq];
    const mappedFrequencies = frequencies.map(v => Math.round(v * 255));

    return new Uint8Array(mappedFrequencies);
    }
}
