namespace E06 {
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";

    const audio: HTMLAudioElement = document.createElement("audio");
    document.body.appendChild(audio);
    audio.controls = true;
    audio.crossOrigin = "";

    audio.style.position = "fixed";
    audio.style.top = "25px";

    const fftSize: fftSize = 512;
    const audioContext: AudioContext = new AudioContext();
    const mediaSource: MediaElementAudioSourceNode = audioContext.createMediaElementSource(audio);
    const analyserNode: AnalyserNode = audioContext.createAnalyser();
    mediaSource.connect(analyserNode);
    analyserNode.connect(audioContext.destination);
    analyserNode.fftSize = fftSize;

    const input: HTMLInputElement = document.createElement("input");
    input.type = "file";
    input.style.color = "rgba(255, 255, 255, 1)";
    document.body.appendChild(input);
    input.addEventListener("change", function (): void {
        if (input.files[0]) {
            audio.src = URL.createObjectURL(input.files[0]);
        }
    });

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);

    const style: RadialAnalyserStyle = {
        innerRadius: 250,
        maxAmplitudeHeight: 40,
        shadowHeight: 25,
        shadowColorFrom: new RGBA(255, 0, 102, 0.2),
        shadowColorTo: new RGBA(255, 0, 102, 0),
        amplitudeColorLow: new RGBA(255, 0, 102, 0.5),
        amplitudeColorHigh: new RGBA(255, 179, 209, 0.5)
    };
    const values: Uint8Array = new Uint8Array(analyserNode.frequencyBinCount);
    const analyser: RadialAnalyser = new RadialAnalyser(values, canvas, style);
    requestAnimationFrame(animate);
    function animate(): void {
        analyserNode.getByteFrequencyData(values);
        analyser.frequencies = values;
        analyser.beautify();
        analyser.clearCanvas();
        analyser.renderAll();
        requestAnimationFrame(animate);
    }
}