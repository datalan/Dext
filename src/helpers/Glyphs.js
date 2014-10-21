/**
 * Created by rkuka on 26. 8. 2014.
 *
 * usage: glyph: Glyphs.getIcon('search')
 *
 * http://www.enovision.net/how-to-make-glyphs-work-ext-js/
 * http://www.enovision.net/extjs-singletons-heavy-workers/
 */

Ext.define('Dext.helpers.Glyphs', {
    singleton: true,

    alternateClassName: 'Glyphs',

    /**
     * configuration object defining webfont and icons mapped to readable names
     */
    config: {
        add: 0xf067,
        filter: 0xf0b0,
        refresh: 0xf021,
        trash: 0xf1f8,
        view: 0xf06e
    },

    /**
     * Getter of configured icon by readable name
     * @param iconName
     * @returns {string} exactly name of icon
     */
    getIcon: function(iconName){
        return this.getGlyph(iconName);
    },

    /**
     *  Returns full name of icon
     * @private
     * @param iconName
     * @returns {string} webfont name
     */
    getGlyph: function(iconName){
        var icon = this.config[iconName];

        if(!icon){
            Ext.log({
                msg: 'Glyph ' + iconName +' was NOT found.',
                level: 'warn'
            });
            return;
        }

        return icon;
    }
});