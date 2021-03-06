/// <reference path="FrequencyMap.ts" />
/// <reference path="RadialVisualiser.ts" />
/// <reference path="BarVisualiser.ts" />

namespace E07 {
    type fftSize = (32 | 64 | 128 | 256 | 512 | 1024 | 2048);

    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";

    const audio: HTMLAudioElement = document.createElement("audio");
    audio.controls = true;
    audio.style.position = "fixed";
    audio.style.top = "50px";
    audio.style.left = "50px";

    const fftSize: fftSize = 512;
    let audioContext: AudioContext;
    let mediaSource: MediaElementAudioSourceNode;
    let analyserNode: AnalyserNode;

    const inputSong: HTMLInputElement = document.createElement("input");
    inputSong.type = "file";
    inputSong.style.color = "rgba(255, 255, 255, 1)";
    inputSong.style.position = "fixed";
    inputSong.style.top = "5px";
    inputSong.style.left = "10px";
    inputSong.addEventListener("change", function (): void {
        if (inputSong.files[0]) {
            audio.src = URL.createObjectURL(inputSong.files[0]);
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

    const canvasVisualizer: HTMLCanvasElement = document.createElement("canvas");
    canvasVisualizer.width = innerWidth;
    canvasVisualizer.height = innerHeight;
    canvasVisualizer.style.position = "fixed";

    const radialStyle: Partial<VisualiserStyle> = {
        shadowColorFrom: new RGBA(0, 0, 0, 0.5),
        shadowColorTo: new RGBA(0, 0, 0, 0),
        amplitudeColorLow: new RGBA(0, 0, 0, 0.5),
        amplitudeColorHigh: new RGBA(255, 255, 255, 0.5)
    };

    const barStyle: Partial<VisualiserStyle> = {
        maxAmplitudeHeight: 100,
        amplitudeWidth: 0.75,
        shadowHeight: 50,
        shadowColorFrom: new RGBA(0, 0, 0, 0.5),
        shadowColorTo: new RGBA(0, 0, 0, 0),
        amplitudeColorLow: new RGBA(0, 0, 0, 0.5),
        amplitudeColorHigh: new RGBA(255, 255, 255, 0.5),
        padding: 0
    };

    let visualiserType: string = "radial";
    const values: Uint8Array = new Uint8Array(fftSize / 2);
    let visualiser: Visualiser = new RadialVisualiser(values, canvasVisualizer, radialStyle);
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
        canvasVisualizer.width = innerWidth;
        canvasVisualizer.height = innerHeight;
        visualiser.recenter();
        visualiser.resize();
    });

    canvasVisualizer.addEventListener("click", function (): void {
        if (visualiserType === "radial") {
            visualiserType = "bar";
            visualiser = new BarVisualiser(values, canvasVisualizer, barStyle);
        } else if (visualiserType === "bar") {
            visualiserType = "radial";
            visualiser = new RadialVisualiser(values, canvasVisualizer, radialStyle);
        }
    });

    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";

    const inputImage: HTMLInputElement = document.createElement("input");
    inputImage.type = "file";
    inputImage.style.color = "rgba(255, 255, 255, 1)";
    inputImage.style.position = "fixed";
    inputImage.style.top = "5px";
    inputImage.style.right = "10px";

    const canvasImage: HTMLCanvasElement = document.createElement("canvas");
    canvasImage.style.position = "fixed";
    const context: CanvasRenderingContext2D = canvasImage.getContext("2d");
    document.body.appendChild(canvasImage);
    document.body.appendChild(canvasVisualizer);
    document.body.appendChild(inputSong);
    document.body.appendChild(inputImage);
    document.body.appendChild(audio);

    let image: HTMLImageElement = new Image();

    function inRange(x: number, min: number, max: number): boolean {
        return x >= min && x <= max;
    }

    function filter(rgba: Countable<RGBA>): boolean {
        const c: RGBA = (rgba as RGBA);
        const t: number = 50;
        return inRange(c.r, c.g - t, c.g + t) && inRange(c.r, c.b - t, c.b + t)
            || inRange(c.g, c.r - t, c.r + t) && inRange(c.g, c.b - t, c.b + t)
            || inRange(c.b, c.r - t, c.r + t) && inRange(c.b, c.g - t, c.g + t);
    }

    inputImage.addEventListener("change", function (): void {
        if (inputImage.files[0]) {
            image.src = URL.createObjectURL(inputImage.files[0]);
            image.addEventListener("load", function (): void {
                canvasImage.width = image.width;
                canvasImage.height = image.height;
                context.drawImage(image, 0, 0);
                const imageData: ImageData = context.getImageData(0, 0, canvasImage.width, canvasImage.height);
                const colors: FrequencyMap<RGBA> = new FrequencyMap<RGBA>(filter);

                ////////////////////////////////
                const resolution: number = 4096;
                ////////////////////////////////

                const skip: number = image.width * image.height / resolution;
                let brightest: RGBA = new RGBA(imageData.data[0], imageData.data[1], imageData.data[2], 1);
                let darkest: RGBA = new RGBA(imageData.data[0], imageData.data[1], imageData.data[2], 1);
                for (let i: number = 0; i < imageData.data.length; i = Math.floor(i + 4 * skip)) {
                    const pixel: RGBA = new RGBA(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2], 1);
                    colors.count(pixel);
                    if (!filter(pixel)) {
                        if (pixel.brightness > brightest.brightness) {
                            brightest = pixel;
                        }
                        if (pixel.brightness < darkest.brightness) {
                            darkest = pixel;
                        }
                    }
                }

                console.log(darkest.toString(), (colors.max as RGBA).toString(), brightest.toString());

                visualiser.style.amplitudeColorLow = (colors.max as RGBA).brightness > 0.5 ? darkest : brightest;
                visualiser.style.amplitudeColorHigh = (colors.max as RGBA).brightness > 0.5 ? brightest : darkest;
                visualiser.style.shadowColorFrom = new RGBA(0, 0, 0, 0.5);
                visualiser.style.shadowColorTo = new RGBA(0, 0, 0, 0);

                barStyle.amplitudeColorLow = (colors.max as RGBA).brightness > 0.5 ? darkest : brightest;
                barStyle.amplitudeColorHigh = (colors.max as RGBA).brightness > 0.5 ? brightest : darkest;
                barStyle.shadowColorFrom = new RGBA(0, 0, 0, 0.5);
                barStyle.shadowColorTo = new RGBA(0, 0, 0, 0);

                radialStyle.amplitudeColorLow = (colors.max as RGBA).brightness > 0.5 ? darkest : brightest;
                radialStyle.amplitudeColorHigh = (colors.max as RGBA).brightness > 0.5 ? brightest : darkest;
                radialStyle.shadowColorFrom = new RGBA(0, 0, 0, 0.5);
                radialStyle.shadowColorTo = new RGBA(0, 0, 0, 0);
            });
        }

    });
}