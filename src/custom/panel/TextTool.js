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
                    '<span class="x-tool-caption {specificCaptionCls}" role="presentation">{caption}</span>' +
                '</span>'],

    listeners : {
        afterrender: function( component ) {
            component.setWidth(component.getWidth());
        }
    },

    initComponent: function(){
        this.callParent();
        this.caption = this.replaceSpecialCharacters(this.caption);

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
            specificCaptionCls: this.specificCaptionCls,
            specificCls: this.linkCls
        });
    },

    setCaption: function(caption) {
        caption = this.replaceSpecialCharacters(caption);
        this.getEl().down('.x-tool-caption').setHtml(caption);
        this.setWidth(this.getEl().down('.x-tool-caption').getWidth());
    },

    replaceSpecialCharacters: function(caption) {
        caption = caption.replace(/</g, '&#60;');
        caption = caption.replace(/>/g, '&#62;');
        return caption;
    }
});