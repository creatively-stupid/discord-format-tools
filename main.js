var fs = require("fs");

process.on('SIGINT', () => {
    console.log("\nExiting...");
    process.exit(0);
});
function error() {
    console.log("\nERROR INCOUNTERED! \nExiting...");
    process.exit(0);
}
String.prototype.isLowerCase = () => {
    return /^[a-z]*$/.test(this.valueOf());
};
var converters = [
    (s) => {
        var o = "";
        for (var i = 0; i < s.length; i++) {
            if (s[i].isLowerCase()) {
                o += "\\:regional_indicator_" + s[i] + ":";
            } else {
                o += s[i];
            }
        }
        return o;
    },
    (s) => {
        var arr = {
            "a": "ᴀ",
            "b": "ʙ",
            "c": "ᴄ",
            "d": "ᴅ",
            "e": "ᴇ",
            "f": "ғ",
            "g": "ɢ",
            "h": "ʜ",
            "i": "ɪ",
            "j": "ᴊ",
            "k": "ᴋ",
            "l": "ʟ",
            "m": "ᴍ",
            "n": "ɴ",
            "o": "ᴏ",
            "p": "ᴘ",
            "q": "ǫ",
            "r": "ʀ",
            "s": "s",
            "t": "ᴛ",
            "u": "ᴜ",
            "v": "ᴠ",
            "w": "ᴡ",
            "x": "x",
            "y": "ʏ",
            "z": "ᴢ"
        };
        var o = "";
        for (var i = 0; i < s.length; i++) {
            o += "||**~~__*`"+s[i]+"`*__~~**||";
        }
        return o;
    },
    (s) => {
    };
    var o = "";
    for (var i = 0; i < s.length; i++) {
        if (arr[s[i]]) {
            o += arr[s[i]];
        } else {
            o += s[i];
        }
    }
    return o;
    }
];
var askstage = -1;
var tree = 0;
var handleData = (d) => {
    var str = d.toString().trim();
    ( // thanks reddit I now use this instead of switch case
        (askstage === 0)?()=>{
            (
                (str === "1")?()=>{
                    console.log("chose small caps (discord style)");
                    console.log("enter message to be converted:");
                    console.log("");
                    process.stdout.write("> ");
                    askstage = 1;
                    tree = 0;
                }:
                (str === "2")?()=>{
                    console.log("chose small caps (unicode style)");
                    console.log("enter message to be converted:");
                    console.log("");
                    process.stdout.write("> ");
                    askstage = 1;
                    tree = 1;
                }:
                (str === "3")?()=>{
                    console.log("chose crazy text");
                    console.log("enter message to be converted:");
                    console.log("");
                    process.stdout.write("> ");
                    askstage = 1;
                    tree = 2;
                }:
                ()=>{
                console.log("invalid option! Valid options are:");
                console.log(" 1. small caps (discord style)");
                console.log(" 2. small caps (unicode style)");
                console.log(" 3. crazy text");
                console.log("");
                process.stdout.write("> ");
                }
            )();
        }:
        (askstage === 1)?()=>{
            console.log("converting...");
            var o = converters[tree](str);
            console.log("done!");
            console.log("output is " + o.length + " characters long!");
            console.log("storing output in " + process.cwd() + "out.txt");
            fs.writeFileSync('out.txt', o);
            console.log("saved!");
            console.log("raw text:\n");
            console.log(o);
            console.log("");
            console.log("thank you for using Dɪsᴄᴏʀᴅ-Fᴏʀᴍᴀᴛ-Tᴏᴏʟs");
            process.exit(0);
        }:
    error)();
};

console.log("Welcome to Dɪsᴄᴏʀᴅ-Fᴏʀᴍᴀᴛ-Tᴏᴏʟs");
console.log("");
console.log("select your tool:");
console.log(" 1. small caps (discord style)");
console.log(" 2. small caps (unicode style)");
console.log(" 3. crazy text");
console.log("");
process.stdout.write("> ");
askstage = 0;

process.stdin.addListener("data", handleData);