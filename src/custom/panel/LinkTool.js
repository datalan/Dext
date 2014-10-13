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

    renderTpl: ['<a class="{baseCls}-{type} {specificCls}" role="link" href="{link}">{caption}</a>'],
    
    /**
     * added listener to fix bug with more panels on site.
     * 
     */
    listeners : {
    	afterrender: function( component ) {
    		component.setWidth(component.getWidth());
    	}
    },

    initComponent: function(){
        Ext.applyIf(this.renderData, {
            link: this.link,
            caption: this.caption,
            specificCls: this.linkCls
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
