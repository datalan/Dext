Ext.define('Dext.helpers.Encoding', {
    singleton: true,

    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encodeHTMLmap: {
        '&': '&amp;',
        '\'': '&#39;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;'
    },

    /**
     * Kodovanie specialnych znakov
     *
     *
     * @param {String} string
     * @return {String} encoded string
     */
    utf8Encode: function(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    /**
     * Kodovanie vyuzivane pre stahovanie suborov cez POST. Klasicky btoa nefunguje kvoli specialnym znakom
     *
     *
     * @param {String} input
     * @return {String} encoded string
     */
    encodedBtoa: function(input){
        var encodedInput = this.utf8Encode(input);
        return this.btoa(encodedInput);
    },

    /**
     * Btoa polyfill.
     *
     * Source: [https://gist.github.com/999166] by [https://github.com/nignag]
     *
     * @param {String} input
     * @return {String} encoded string
     */
    btoa: function(input){
        if(window.btoa){
            return window.btoa(input);
        }

        var str = String(input);
        for(// initialize result and counter
            var block, charCode, idx = 0, map = this.chars, output = ''; // if the next str index does not exist:
            //   change the mapping table to "="
            //   check if d has no fractional digits
            str.charAt(idx | 0) || (map = '=', idx % 1); // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)){
            charCode = str.charCodeAt(idx += 3 / 4);
            if(charCode > 0xFF){
                throw new Error('\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.');
            }
            block = block << 8 | charCode;
        }
        return output;
    },

    /**
     * Atob polyfill.
     *
     * Source: [https://gist.github.com/999166] by [https://github.com/nignag]
     *
     * @param {String} input
     * @return {String} decoded string
     */
    atob: function(input){
        if(window.atob){
            return window.atob(input);
        }

        var str = String(input).replace(/=+$/, '');
        if(str.length % 4 == 1){
            throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
        }
        for(// initialize result and counters
            var bc = 0, bs, buffer, idx = 0, output = ''; // get next character
            buffer = str.charAt(idx++); // character found in table? initialize bit storage and add its ascii value;
            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0){
            // try to find character in table (0-63, not found => -1)
            buffer = this.chars.indexOf(buffer);
        }
        return output;
    },

    html: function(text){
        if(Ext.isString(text)){
            return text.replace(/[&"'<>]/g, Ext.bind(function(match){
                return this.encodeHTMLmap[match];
            }, this));
        } else{
            return text;
        }
    }
});
