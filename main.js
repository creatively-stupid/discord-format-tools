var clipboard = require("clipboardy");

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
        var o = "";
        var arr = {"a": "ᴀ", "b": "ʙ", "c": "ᴄ", "d": "ᴅ", "e": "ᴇ", "f": "ғ", "g": "ɢ", "h": "ʜ", "i": "ɪ", "j": "ᴊ", "k": "ᴋ", "l": "ʟ", "m": "ᴍ", "n": "ɴ", "o": "ᴏ", "p": "ᴘ", "q": "ǫ", "r": "ʀ", "s": "s", "t": "ᴛ", "u": "ᴜ", "v": "ᴠ", "w": "ᴡ", "x": "x", "y": "ʏ", "z": "ᴢ"};
        for (var i = 0; i < s.length; i++) {
            if (arr[s[i]] !== undefined) {
                o += arr[s[i]];
            } else {
                o += s[i];
            }
        }
        return o;
    },
    (s) => {
        var o = "";
        for (var i = 0; i < s.length; i++) {
            o += "||**~~__*`" + s[i] + "`*__~~**||";
        }
        return o;
    }
];
var askstage = -1;
var tree = [0, "", ""];
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
                    tree[0] = 1;
                }:
                (str === "2")?()=>{
                    console.log("chose small caps (unicode style)");
                    console.log("enter message to be converted:");
                    console.log("");
                    process.stdout.write("> ");
                    askstage = 1;
                    tree[0] = 2;
                }:
                (str === "3")?()=>{
                    console.log("chose crazy text");
                    console.log("enter message to be converted:");
                    console.log("");
                    process.stdout.write("> ");
                    askstage = 1;
                    tree[0] = 3;
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
            tree[1] = str;
            tree[2] = converters[tree[0]-1](tree[1]);
            console.log("message is " + tree[2].length + " characters long.");
            if (tree[2].length > 2000) {
                console.log("message is over Discord's 2000 character limit");
                console.log("do you still want to continue? (Y/n)");
                askstage = 2;
            } else {
                console.log("copying message....");
                clipboard.writeSync(tree[2]);
                console.log("copied message to clipboard!");
                console.log("");
                console.log("Thank you for using Dɪsᴄᴏʀᴅ-Fᴏʀᴍᴀᴛ-Tᴏᴏʟs");
                console.log("");
                console.log("select your tool:");
                console.log(" 1. small caps (discord style)");
                console.log(" 2. small caps (unicode style)");
                console.log(" 3. crazy text");
                console.log("");
                process.stdout.write("> ");
                askstage = 0;
                tree = [0, "", "", ""];
            }
            console.log("");
            process.stdout.write("> ");
        }:
        (askstage === 1)?()=>{
            (
                (str.toLowerCase() === "y")?()=>{
                    console.log("copying message....");
                    clipboard.writeSync(tree[2]);
                    console.log("copied message to clipboard!");
                    console.log("");
                    console.log("Thank you for using Dɪsᴄᴏʀᴅ-Fᴏʀᴍᴀᴛ-Tᴏᴏʟs");
                    console.log("");
                    console.log("select your tool:");
                    console.log(" 1. small caps (discord style)");
                    console.log(" 2. small caps (unicode style)");
                    console.log(" 3. crazy text");
                    console.log("");
                    process.stdout.write("> ");
                    askstage = 0;
                    tree = [0, "", "", ""];
                }:
                (str.toLowerCase() === "n")?()=>{
                    console.log("Message not copied.");
                    console.log("");
                    console.log("Thank you for using Dɪsᴄᴏʀᴅ-Fᴏʀᴍᴀᴛ-Tᴏᴏʟs");
                    console.log("");
                    console.log("select your tool:");
                    console.log(" 1. small caps (discord style)");
                    console.log(" 2. small caps (unicode style)");
                    console.log(" 3. crazy text");
                    console.log("");
                    process.stdout.write("> ");
                    askstage = 0;
                    tree = [0, "", "", ""];
                }:
                ()=>{
                console.log("invalid option! Use \"Y\" or \"N\"");
                console.log("");
                process.stdout.write("> ");
                }
            )();
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