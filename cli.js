process.on('SIGINT', () => {
    console.log("\nExiting...");
    process.exit(0);
});
function error() {
    console.log("\nERROR ENCOUNTERED! \nExiting...");
    process.exit(1);
    return cli;
}
function write(msg) {
    process.stdout.write(msg.toString());
    return cli;
}
function exit() {
    process.exit(0);
    return cli;
}
function cli(handler) {
    process.stdin.addListener("data", (d) => {
        handler(d.toString().trim());
    });
    return cli;
}
cli.error = error;
cli.write = write;
cli.exit = exit;
module.exports = cli;