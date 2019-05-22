return (s) => {
    var o = "";
    for (var i = 0; i < s.length; i++) {
        if (/^[a-zA-Z]*$/.test(s[i])) {
            o += ":regional_indicator_" + s[i].toLowerCase() + ": ";
        } else if (/^0*$/.test(s[i])) {
            o += ":zero: ";
        } else if (/^1*$/.test(s[i])) {
            o += ":one: ";
        } else if (/^2*$/.test(s[i])) {
            o += ":two: ";
        } else if (/^3*$/.test(s[i])) {
            o += ":three: ";
        } else if (/^4*$/.test(s[i])) {
            o += ":four: ";
        } else if (/^5*$/.test(s[i])) {
            o += ":five: ";
        } else if (/^6*$/.test(s[i])) {
            o += ":six: ";
        } else if (/^7*$/.test(s[i])) {
            o += ":seven: ";
        } else if (/^8*$/.test(s[i])) {
            o += ":eight: ";
        } else if (/^9*$/.test(s[i])) {
            o += ":nine: ";
        } else if (/^#*$/.test(s[i])) {
            o += ":hash: ";
        } else if (/^\**$/.test(s[i])) {
            o += ":asterisk: ";
        } else {
            o += s[i];
        }
    }
    return o;
};