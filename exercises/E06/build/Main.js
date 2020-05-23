"use strict";
var E06;
(function (E06) {
    const files = ["01.wav", "02.wav", "03.wav"];
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";
    const audio = document.createElement("audio");
    audio.src = files[0];
    document.body.appendChild(audio);
    audio.controls = true;
    audio.crossOrigin = "";
    audio.style.position = "fixed";
    audio.style.top = "25px";
    files.forEach(function (file) {
        const anchor = document.createElement("a");
        anchor.appendChild(document.createTextNode(file));
        anchor.addEventListener("click", function () {
            audio.src = file;
            audio.play();
        });
        anchor.style.padding = "10px";
        anchor.style.color = "rgb(255, 255, 255)";
        document.body.appendChild(anchor);
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
    const analyser = new E06.RadialAnalyser(audio, 512, canvas, style);
    requestAnimationFrame(animate);
    function animate() {
        analyser.analyse();
        analyser.beautify();
        analyser.clearCanvas();
        analyser.renderAll();
        requestAnimationFrame(animate);
    }
})(E06 || (E06 = {}));
//# sourceMappingURL=Main.js.map