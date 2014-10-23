/**
 * Created by rkuka on 7. 10. 2014.
 */
Ext.define('Dext.custom.panel.TextTool', {
    extend: 'Ext.panel.Tool',
    alias: 'widget.texttool',

    type: 'text',

    ariaRole: 'textbox',

    renderTpl: ['<span class="{baseCls}-{type} {specificCls}">' +
                    '<span role="img" class="x-tool-glyph" unselectable="on" style="' +
                        '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">' +
                        '<tpl if="glyph">&#{glyph};</tpl>' +
                    '</span>' +
                    '<span class="x-tool-caption" role="presentation" >{caption}</span>' +
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
            caption: this.caption,
            glyph: this.glyph || '',
            glyphFontFamily: this.glyphFontFamily,
            specificCls: this.linkCls
        });
    }
});