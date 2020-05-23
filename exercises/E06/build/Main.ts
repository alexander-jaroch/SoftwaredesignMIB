namespace E06 {
    const files: Array<string> = ["01.wav", "02.wav", "03.wav"];

    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";

    const audio: HTMLAudioElement = document.createElement("audio");
    audio.src = files[0];
    document.body.appendChild(audio);
    audio.controls = true;
    audio.crossOrigin = "";

    audio.style.position = "fixed";
    audio.style.top = "25px";

    files.forEach(function (file: string): void {
        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.appendChild(document.createTextNode(file));
        anchor.addEventListener("click", function (): void {
            audio.src = file;
            audio.play();
        });
        anchor.style.padding = "10px";
        anchor.style.color = "rgb(255, 255, 255)";
        document.body.appendChild(anchor);
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
    const analyser: RadialAnalyser = new RadialAnalyser(audio, 512, canvas, style);
    requestAnimationFrame(animate);    
    function animate(): void {
        analyser.analyse();
        analyser.beautify();
        analyser.clearCanvas();
        analyser.renderAll();
        requestAnimationFrame(animate);
    }
}