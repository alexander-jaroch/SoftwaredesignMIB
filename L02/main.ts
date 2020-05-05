namespace L02 {

    class Message {
        private lang: string;
        private message: string;

        public constructor(lang: string, message: string) {
            this.lang = lang;
            this.message = message;
        }

        public greet(): string {
            return this.message;
        }

        public language(): string {
            return this.lang;
        }
    }

    class MessageCollection {
        private messages: Message[];

        public constructor() {
            this.messages = new Array<Message>();
        }

        public add(lang: string, message: string): void {
            this.messages.push(new Message(lang, message));
        }

        public random(): Message {
            return this.messages[this.randomIndex()];
        }

        private randomIndex(): number {
            return Math.floor(Math.random() * this.messages.length);
        }
    }

    const messages: MessageCollection = new MessageCollection();

    messages.add("English", "Hello World!");
    messages.add("German", "Hallo Welt!");
    messages.add("Greek", "Γειά σου Κόσμε!");
    messages.add("Italian", "Ciao mondo!");
    messages.add("Japanese", "こんにちは世界！");
    messages.add("Russian", "Привет мир!");
    messages.add("Spanish", "¡Hola Mundo!");
    messages.add("Swedish", "Hej världen!");

    const rnd: Message = messages.random();
    const str: string = rnd.language() === "English" ? rnd.greet() : "\"" + rnd.greet() + "\" means \"Hello World!\" in " + rnd.language() + ".";
    console.log(str);

}