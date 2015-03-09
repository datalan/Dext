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
    target: null,

    renderTpl: ['<span class="{baseCls}-{type} {specificCls}" >' +
                    '<span role="img" class="x-tool-glyph" unselectable="on" style="' +
                        '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">' +
                        '<tpl if="glyph">&#{glyph};</tpl>' +
                    '</span>' +
                    '<a class="x-tool-caption" role="link" href="{link}" target="{target}">{caption}</a>' +
                '</span>'],

    initComponent: function(){
        this.callParent();

        if(!this.redirectCurrent){
            this.target = '_blank';
        }else{
            this.target = '_self';
        }

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
            specificCls: this.linkCls,
            target: this.target
        });
    },

    handler: function(){
        if(Ext.isIE){
            return;
        }
        if(this.redirectCurrent){
            window.location = this.link;
        } else {
            var windowReference = window.open(this.link, this.caption);
            if(windowReference){
                windowReference.focus();
            }
        }
    },

    setLink: function(link) {
        this.link = link;
        this.getEl().down('.x-tool-caption').dom.href = link;
    }
});
