/**
 * Created by rkuka on 7. 10. 2014.
 */
Ext.define('Dext.custom.panel.TextTool', {
    extend: 'Ext.panel.Tool',
    alias: 'widget.texttool',

    type: 'text',

    ariaRole: 'textbox',

    renderTpl: ['<span class="{baseCls}-{type} {specificCls}" role="presentation" >{caption}</span>'],

    initComponent: function(){
        Ext.applyIf(this.renderData, {
            caption: this.caption,
            specificCls: this.linkCls
        });

        this.callParent();
    }
});