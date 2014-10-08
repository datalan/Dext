/**
 * Created by rkuka on 7. 10. 2014.
 */
Ext.define('Dext.custom.panel.LinkTool', {
    extend: 'Ext.panel.Tool',
    alias: 'widget.linktool',

    type: 'link',

    ariaRole: 'link',

    /**
     * Defines if content should be load to new browser tab/window, or current should be reloaded
     * @default false = new tab/window
     */
    redirectCurrent: false,

    renderTpl: ['<a class="{baseCls}-{type}" role="link" href="{link}">{caption}</a>'],

    initComponent: function(){
        Ext.applyIf(this.renderData, {
            link: this.link,
            caption: this.caption
        });

        this.callParent();
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
