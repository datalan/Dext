/**
 * Created by rkuka on 7. 10. 2014.
 */
Ext.define('Dext.custom.panel.DialogTool', {
    extend: 'Ext.panel.Tool',
    alias: 'widget.dialogtool',

    type: 'link',

    ariaRole: 'link',

    glyph: null,

    /**
     * Defines if content should be load to new browser tab/window, or current should be reloaded
     * @default false = new tab/window
     */

    renderTpl: ['<span class="{baseCls}-{type} {specificCls}">' +
                    '<span role="img" class="x-tool-glyph-close" unselectable="on" style="' +
                        '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">' +
                        '<tpl if="glyph">&#{glyph};</tpl>' +
                    '</span>' +
                '</span>'],

    initComponent: function(){
        this.callParent();

        this.type = this.tooltype;

        if(typeof this.glyph === 'string'){
            var glyphParts = this.glyph.split('@');
            this.glyph = glyphParts[0];
            this.glyphFontFamily = glyphParts[1];
        } else {
            this.glyphFontFamily = Ext._glyphFontFamily;
        }


        Ext.applyIf(this.renderData, {
            glyph: this.glyph || '',
            glyphFontFamily: this.glyphFontFamily,
            specificCls: this.linkCls
        });
    }
});
