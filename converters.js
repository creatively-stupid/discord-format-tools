var converters = module.exports;
converters["small caps (discord style)"] = (s) => {
    var o = "";
    for (var i = 0; i < s.length; i++) {
        if (/^[a-z]*$/.test(s[i])) {
            o += "\\:regional_indicator_" + s[i] + ":";
        } else {
            o += s[i];
        }
    }
    return o;
};
converters["small caps (unicode style)"] = (s) => {
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
        if (arr[s[i]]) {
            o += arr[s[i]];
        } else {
            o += s[i];
        }
    }
    return o;
};
converters["crazy text"] = (s) => {
    var o = "";
    for (var i = 0; i < s.length; i++) {
        o += "||**~~__*`"+s[i]+"`*__~~**||";
    }
    return o;
};