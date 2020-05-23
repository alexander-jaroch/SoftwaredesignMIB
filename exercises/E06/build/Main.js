"use strict";
var E06;
(function (E06) {
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.style.position = "fixed";
    audio.style.top = "25px";
    document.body.appendChild(audio);
    const fftSize = 512;
    let audioContext;
    let mediaSource;
    let analyserNode;
    const input = document.createElement("input");
    input.type = "file";
    input.style.color = "rgba(255, 255, 255, 1)";
    document.body.appendChild(input);
    input.addEventListener("change", function () {
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
    const canvas = document.createElement("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);
    const style = {
        shadowColorFrom: new E06.RGBA(255, 0, 102, 0.2),
        shadowColorTo: new E06.RGBA(255, 0, 102, 0),
        amplitudeColorLow: new E06.RGBA(255, 0, 102, 0.5),
        amplitudeColorHigh: new E06.RGBA(255, 179, 209, 0.5)
    };
    const values = new Uint8Array(fftSize / 2);
    const visualiser = new E06.RadialVisualiser(values, canvas, style);
    requestAnimationFrame(animate);
    function animate() {
        if (analyserNode)
            analyserNode.getByteFrequencyData(values);
        visualiser.frequencies = values;
        visualiser.beautify();
        visualiser.clearCanvas();
        visualiser.renderAll();
        requestAnimationFrame(animate);
    }
    addEventListener("resize", function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        visualiser.recenter();
        visualiser.resize();
    });
})(E06 || (E06 = {}));
//# sourceMappingURL=Main.js.map