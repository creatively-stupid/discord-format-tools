var fs = require("fs"),
    converters = require("./converters"),
    cli = require("./cli"),
    chalk = require("chalk");

var askstage = 0;
var choice = 0;
cli((str) => {
    ( // thanks reddit I now use this instead of switch case
        (askstage === 0)?()=>{
            (
                (converters[parseInt(str)-1])?()=>{
                    choice = parseInt(str)-1;
                    cli.write(chalk.rgb(127, 127, 127)("chose "))
                        .write(converters[choice].n)
                        .write(chalk.rgb(127, 127, 127)("\nenter message to be converted:\n\n"))
                        .write(chalk.rgb(255, 0, 0)("> "));
                    askstage = 1;
                }:
                ()=>{
                cli.write("invalid option! Valid options are:\n");
                printchoices();
                }
            )();
        }:
        (askstage === 1)?()=>{
            cli.write(chalk.rgb(127, 127, 127)("converting...\n"));
            var o = converters[choice].f(str);
            cli.write(chalk.rgb(127, 127, 127)("done!\noutput is "))
                .write(o.length)
                .write(chalk.rgb(127, 127, 127)(" characters long!\nstoring output in "))
                .write(process.cwd())
                .write("/out.txt")
                .write(chalk.rgb(127, 127, 127)("...\n"));
            fs.writeFileSync('out.txt', o);
            cli.write(chalk.rgb(127, 127, 127)("saved!\nraw text:\n\n"))
                .write(o)
                .write(chalk.rgb(127, 127, 0)("\n\nthank you for using "))
                .write(chalk.rgb(0, 0, 255)("Dɪsᴄᴏʀᴅ-Fᴏʀᴍᴀᴛ-Tᴏᴏʟs"))
                .write("\n")
                .exit();
        }:
    cli.error)();
}).write(chalk.rgb(127, 127, 0)("Welcome to "))
    .write(chalk.rgb(0, 0, 255)("Dɪsᴄᴏʀᴅ-Fᴏʀᴍᴀᴛ-Tᴏᴏʟs"))
    .write(chalk.rgb(127, 127, 127)("\n\nselect your tool:\n"));
printchoices();

function printchoices() {
    for (var i = 0; i < converters.length; i++) {
        cli.write(chalk.rgb(0, 255, 255)((i+1).toString()))
            .write(chalk.rgb(0, 255, 255)(") "))
            .write(converters[i].n)
            .write("\n");
    }
    cli.write("\n")
        .write(chalk.rgb(255, 0, 0)("> "));
}