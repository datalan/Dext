/**
 * Created by rkuka on 17. 9. 2014.
 */
Ext.define('Dext.helpers.RegExp', {
    singleton: true,

    /**
     * Special characters to be escaped
     */
    specials: [
        // order matters for these
        '-', '[', ']',
        // order doesn't matter for any of these
        '/', '{', '}', '(', ')', '*', '+', '?', '.', '\\', '^', '$', '|'
    ],

    constructor: function(){
        this.regex = new RegExp('[' + this.specials.join('\\') + ']', 'g');
        this.callParent(arguments);
    },

    /**
     * Escape special characters of regexp
     * @link http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
     */
    escape: function(str){
        return str.replace(this.regex, '\\$&');
    }
});
