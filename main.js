var fs = require("fs"),
    converters = require("./obj-to-arr")(require("./converters")),
    cli = require("./cli"),
    chalk = require("chalk"),
    clipboard = require("clipboardy");

var askstage = 0;
var choice = 0;
cli((str) => {
    ( // thanks reddit I now use this instead of switch case
        (askstage === 0)?()=>{
            (
                (converters[parseInt(str)-1])?()=>{
                    choice = parseInt(str)-1;
                    cli.write(127, 127, 127, "chose ")
                        .write(converters[choice][0])
                        .write(127, 127, 127, "\nenter message to be converted:\n\n")
                        .write(255, 0, 0, "> ");
                    askstage = 1;
                }:
                ()=>{
                cli.write("invalid option! Valid options are:\n");
                printchoices();
                }
            )();
        }:
        (askstage === 1)?()=>{
            cli.write(127, 127, 127, "converting...\n");
            var o = converters[choice][1](str);
            cli.write(127, 127, 127, "done!\noutput is ")
                .write(o.length)
                .write(127, 127, 127, " characters long!\nstoring output in ")
                .write(process.cwd())
                .write("/out.txt")
                .write(127, 127, 127, "...\n");
            fs.writeFileSync('out.txt', o);
            cli.write(127, 127, 127, "saved!\nCopying to clipboard...");
            clipboard.writeSync(o);
            cli.write(127, 127, 127, "Copied!\nraw text:\n\n")
                .write(o)
                .write(127, 127, 0, "\n\nthank you for using ")
                .write(0, 0, 255, "Dɪsᴄᴏʀᴅ-Fᴏʀᴍᴀᴛ-Tᴏᴏʟs")
                .write("\n")
                .exit();
        }:
    cli.error)();
}, chalk)
    .write("Color support level ")
    .write(chalk.level)
    .write("\n")
    .write(127, 127, 0, "Welcome to ")
    .write(0, 0, 255, "Dɪsᴄᴏʀᴅ-Fᴏʀᴍᴀᴛ-Tᴏᴏʟs")
    .write(127, 127, 127, "\n\nselect your tool:\n");
printchoices();

function printchoices() {
    for (var i = 0; i < converters.length; i++) {
        cli.write(0, 255, 255, (i+1).toString())
            .write(0, 255, 255, ") ")
            .write(converters[i][0])
            .write("\n");
    }
    cli.write("\n")
        .write(255, 0, 0, "> ");
}