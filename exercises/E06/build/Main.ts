namespace E06 {
    type fftSize = (32 | 64 | 128 | 256 | 512 | 1024 | 2048);

    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";

    const audio: HTMLAudioElement = document.createElement("audio");
    audio.controls = true;
    audio.style.position = "fixed";
    audio.style.top = "25px";
    document.body.appendChild(audio);

    const fftSize: fftSize = 512;
    let audioContext: AudioContext;
    let mediaSource: MediaElementAudioSourceNode;
    let analyserNode: AnalyserNode;

    const input: HTMLInputElement = document.createElement("input");
    input.type = "file";
    input.style.color = "rgba(255, 255, 255, 1)";
    document.body.appendChild(input);
    input.addEventListener("change", function (): void {
        if (input.files[0]) {
            audio.src = URL.createObjectURL(input.files[0]);
            if (!audioContext) {
                audioContext = new AudioContext();
                mediaSource = audioContext.createMediaElementSource(audio);
                analyserNode = audioContext.createAnalyser();
                mediaSource.connect(analyserNode);
                analyserNode.connect(audioContext.destination);
                analyserNode.fftSize = fftSize;
            }
            audio.play();
        }
    });

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);

    const radialStyle: VisualiserStyleOptions = {
        shadowColorFrom: new RGBA(255, 0, 102, 0.2),
        shadowColorTo: new RGBA(255, 0, 102, 0),
        amplitudeColorLow: new RGBA(255, 0, 102, 0.5),
        amplitudeColorHigh: new RGBA(255, 179, 209, 0.5)
    };

    const barStyle: VisualiserStyleOptions = {
        maxAmplitudeHeight: 100,
        amplitudeWidth: 0.75,
        shadowHeight: 50,
        shadowColorFrom: new RGBA(0, 255, 255, 0.2),
        shadowColorTo: new RGBA(255, 255, 0, 0),
        amplitudeColorLow: new RGBA(0, 255, 255, 0.5),
        amplitudeColorHigh: new RGBA(255, 255, 0, 0.5),
        padding: 0
    };

    let visualiserType: string = "radial";
    const values: Uint8Array = new Uint8Array(fftSize / 2);
    let visualiser: Visualiser = new RadialVisualiser(values, canvas, radialStyle);
    requestAnimationFrame(animate);
    function animate(): void {
        if (analyserNode) analyserNode.getByteFrequencyData(values);
        visualiser.frequencies = values;
        visualiser.beautify();
        visualiser.clearCanvas();
        visualiser.renderAll();
        requestAnimationFrame(animate);
    }

    addEventListener("resize", function (): void {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        visualiser.recenter();
        visualiser.resize();
    });

    canvas.addEventListener("click", function (): void {
        if (visualiserType === "radial") {
            visualiserType = "bar";
            visualiser = new BarVisualiser(values, canvas, barStyle);
        } else if (visualiserType === "bar") {
            visualiserType = "radial";
            visualiser = new RadialVisualiser(values, canvas, radialStyle);
        }
    });
}