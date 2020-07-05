"use strict";
var E01;
(function (E01) {
    class Message {
        constructor(lang, message) {
            this.lang = lang;
            this.message = message;
        }
        greet() {
            return this.message;
        }
        language() {
            return this.lang;
        }
    }
    class MessageCollection {
        constructor() {
            this.messages = new Array();
        }
        add(lang, message) {
            this.messages.push(new Message(lang, message));
        }
        random() {
            return this.messages[this.randomIndex()];
        }
        randomIndex() {
            return Math.floor(Math.random() * this.messages.length);
        }
    }
    const messages = new MessageCollection();
    messages.add("English", "Hello World!");
    messages.add("German", "Hallo Welt!");
    messages.add("Greek", "Γειά σου Κόσμε!");
    messages.add("Italian", "Ciao mondo!");
    messages.add("Japanese", "こんにちは世界！");
    messages.add("Russian", "Привет мир!");
    messages.add("Spanish", "¡Hola Mundo!");
    messages.add("Swedish", "Hej världen!");
    const rnd = messages.random();
    const str = rnd.language() === "English" ? rnd.greet() : "\"" + rnd.greet() + "\" means \"Hello World!\" in " + rnd.language() + ".";
    console.log(str);
})(E01 || (E01 = {}));
//# sourceMappingURL=core.js.map