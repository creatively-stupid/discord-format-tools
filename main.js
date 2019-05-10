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
    }
];
var askstage = -1;
var tree = [0, "", "", ""];
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
            (
                (tree[0] === 1)?()=>{
                    console.log("converting...");
                    tree[1] = str;
                    process.stdout.write("> ");
                }:
                (tree[0] === 2)?()=>{
                    console.log("converting...");
                    tree[1] = str;
                    process.stdout.write("> ");
                }:
                (tree[0] === 3)?()=>{
                    console.log("converting...");
                    tree[1] = str;
                    process.stdout.write("> ");
                }:
            error)();
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