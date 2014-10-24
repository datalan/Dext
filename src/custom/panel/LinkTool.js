/**
 * Created by rkuka on 7. 10. 2014.
 */
Ext.define('Dext.custom.panel.LinkTool', {
    extend: 'Ext.panel.Tool',
    alias: 'widget.linktool',

    type: 'link',

    ariaRole: 'link',

    glyph: null,

    /**
     * Defines if content should be load to new browser tab/window, or current should be reloaded
     * @default false = new tab/window
     */
    redirectCurrent: false,

    renderTpl: ['<span class="{baseCls}-{type} {specificCls}" >' +
                    '<span role="img" class="x-tool-glyph" unselectable="on" style="' +
                        '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">' +
                        '<tpl if="glyph">&#{glyph};</tpl>' +
                    '</span>' +
                    '<a class="x-tool-caption" role="link" href="{link}">{caption}</a>' +
                '</span>'],

    initComponent: function(){
        this.callParent();

        if(typeof this.glyph === 'string'){
            var glyphParts = this.glyph.split('@');
            this.glyph = glyphParts[0];
            this.glyphFontFamily = glyphParts[1];
        } else {
            this.glyphFontFamily = Ext._glyphFontFamily;
        }

        Ext.applyIf(this.renderData, {
            link: this.link,
            caption: this.caption,
            glyph: this.glyph || '',
            glyphFontFamily: this.glyphFontFamily,
            specificCls: this.linkCls
        });
    },

    handler: function(){
        if(this.redirectCurrent){
            window.location = this.link;
        } else {
            var windowReference = window.open(this.link, this.caption);
            if(windowReference){
                windowReference.focus();
            }
        }
    }
});
