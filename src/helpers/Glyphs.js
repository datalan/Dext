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
        book: 0xf02d,
        circleArrowRight: 0xf18e,
        error: 0xf057,
        filter: 0xf0b0,
        info: 0xf05a,
        lock: 0xf023,
        refresh: 0xf021,
        success: 0xf058,
        trash: 0xf1f8,
        user: 0xf007,
        view: 0xf06e,
        warning: 0xf071,
        remove: 0xf00d,
        arrowUp: 0xf062,
        arrowDown: 0xf063,
        edit: 0xf044,
        gear: 0xf013
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
