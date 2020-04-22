var Message = /** @class */ (function () {
    function Message(lang, message) {
        this.lang = lang;
        this.message = message;
    }
    Message.prototype.greet = function () {
        return this.message;
    };
    Message.prototype.language = function () {
        return this.lang;
    };
    return Message;
}());
var MessageCollection = /** @class */ (function () {
    function MessageCollection() {
        this.messages = new Array();
    }
    MessageCollection.prototype.add = function (lang, message) {
        this.messages.push(new Message(lang, message));
    };
    MessageCollection.prototype.random = function () {
        return this.messages[this.randomIndex()];
    };
    MessageCollection.prototype.randomIndex = function () {
        return Math.floor(Math.random() * this.messages.length);
    };
    return MessageCollection;
}());
var messages = new MessageCollection();
messages.add('English', 'Hello World!');
messages.add('German', 'Hallo Welt!');
messages.add('Greek', 'Γειά σου Κόσμε!');
messages.add('Italian', 'Ciao mondo!');
messages.add('Japanese', 'こんにちは世界！');
messages.add('Russian', 'Привет мир!');
messages.add('Spanish', '¡Hola Mundo!');
messages.add('Swedish', 'Hej världen!');
var rnd = messages.random();
console.log(rnd.language() === 'English' ? rnd.greet() : '"' + rnd.greet() + '" means "Hello World!" in ' + rnd.language() + '.');
//# sourceMappingURL=main.js.map