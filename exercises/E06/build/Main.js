"use strict";
var E06;
(function (E06) {
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";
    const audio = document.createElement("audio");
    document.body.appendChild(audio);
    audio.controls = true;
    audio.crossOrigin = "";
    audio.style.position = "fixed";
    audio.style.top = "25px";
    const fftSize = 512;
    const audioContext = new AudioContext();
    const mediaSource = audioContext.createMediaElementSource(audio);
    const analyserNode = audioContext.createAnalyser();
    mediaSource.connect(analyserNode);
    analyserNode.connect(audioContext.destination);
    analyserNode.fftSize = fftSize;
    const input = document.createElement("input");
    input.type = "file";
    input.style.color = "rgba(255, 255, 255, 1)";
    document.body.appendChild(input);
    input.addEventListener("change", function () {
        if (input.files[0]) {
            audio.src = URL.createObjectURL(input.files[0]);
        }
    });
    const canvas = document.createElement("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);
    const style = {
        innerRadius: 250,
        maxAmplitudeHeight: 40,
        shadowHeight: 25,
        shadowColorFrom: new E06.RGBA(255, 0, 102, 0.2),
        shadowColorTo: new E06.RGBA(255, 0, 102, 0),
        amplitudeColorLow: new E06.RGBA(255, 0, 102, 0.5),
        amplitudeColorHigh: new E06.RGBA(255, 179, 209, 0.5)
    };
    const values = new Uint8Array(analyserNode.frequencyBinCount);
    const analyser = new E06.RadialAnalyser(values, canvas, style);
    requestAnimationFrame(animate);
    function animate() {
        analyserNode.getByteFrequencyData(values);
        analyser.frequencies = values;
        analyser.beautify();
        analyser.clearCanvas();
        analyser.renderAll();
        requestAnimationFrame(animate);
    }
})(E06 || (E06 = {}));
//# sourceMappingURL=Main.js.map