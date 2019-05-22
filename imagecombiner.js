var fs = require("fs"),
    path = require("path");
    PNG = require("pngjs").PNG;

var file1 = path.join(process.cwd(), process.argv[2]);
var file2 = path.join(process.cwd(), process.argv[3]);
var fileOut = path.join(process.cwd(), process.argv[4]);
console.log(file1 + " + " + file2 + " => " + fileOut);

var pallete = {
    "clear": [0, 0, 0, 0],
    "light": [54, 57, 63, 255],
    "dark":  [255, 255, 255, 255],
    "both": [155, 156, 159, 255],
};

function equ (a, b) {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i] != b[i]) return false;
    }
    return true;
}

fs.createReadStream(file1)
    .pipe(new PNG())
    .on('parsed', function() {
        var data = new Array(this.height);
        for (var y = 0; y < this.height; y++) {
            data[y] = new Array(this.width);
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;
                var color = [this.data[idx], this.data[idx+1], this.data[idx+2], this.data[idx+3]];

                if (equ(color, [0, 0, 0, 255])) data[y][x] = true;
                else if (equ(color, [255, 255, 255, 255])) data[y][x] = false;
                else throw new Error("f1: invalid color #" + toHex(color[0]*16777216 + color[1]*65536 + color[2]*256 + color[3]));
            }
        }

        //this.pack().pipe(fs.createWriteStream(fileOut));
        fs.createReadStream(file2)
        .pipe(new PNG())
        .on('parsed', function() {
            if (this.height != data.length || this.width != data[0].length) throw new Error("different sizes!");
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var idx = (this.width * y + x) << 2;
                    var color = [this.data[idx], this.data[idx+1], this.data[idx+2], this.data[idx+3]];

                    if (equ(color, [0, 0, 0, 255])) {
                        if (data[y][x]) {
                            color = pallete.both;
                        } else {
                            color = pallete.light;
                        }
                    }
                    else if (equ(color, [255, 255, 255, 255])) {
                        if (data[y][x]) {
                            color = pallete.dark;
                        } else {
                            color = pallete.clear;
                        }
                    }
                    else throw new Error("f2: invalid color #" + toHex(color[0]*16777216 + color[1]*65536 + color[2]*256 + color[3]));

                    this.data[idx] = color[0];
                    this.data[idx+1] = color[1];
                    this.data[idx+2] = color[2];
                    this.data[idx+3] = color[3];
                }
            }

            this.pack().pipe(fs.createWriteStream(fileOut));
        });
    });

function toHex(d) {
    return  ("0000000"+(Number(d).toString(16))).slice(-8).toUpperCase();
}
