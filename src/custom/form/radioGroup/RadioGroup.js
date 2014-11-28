Ext.define('Dext.custom.form.radioGroup.RadioGroup', {
    extend: 'Ext.container.Container',
    alias: 'widget.customradiogroup',

    layout: {
        type: 'hbox'
    },

    fields: null,
    defaultChecked: null,
    defaultType: null, // possible types: checkbox, radio

    requires: [
        'Dext.custom.form.radioGroup.RadioGroupController'
    ],

    controller: 'radiogroupcontroller',

    initComponent: function(){
        this.items = [
            {
                xtype: (this.defaultType === 'checkbox') ? 'checkbox' : 'radio',
                name: 'rb-auto',
                itemId: 'checkField',
                checked: this.defaultChecked
            },
            {
                xtype: 'container',
                reference: 'itemsContainer',
                margin: '0 0 0 10',
                layout: {
                    type: 'vbox'
                },

                /**
                 * when item was not rendered, first we need to render it and then we can set opacity property
                 */
                setDisableLook: function(){
                    Ext.Array.forEach(this.items.items, function(item){
                        item.setDisabled(true);
                        if(!item.bodyEl){
                            item.doAutoRender();
                        }
                        item.bodyEl.setOpacity(0.3);
                        item.reset();
                    }, this);
                },

                setEnableLook: function(){
                    Ext.Array.forEach(this.items.items, function(item){
                        item.setDisabled(false);
                        if(!item.bodyEl){
                            item.doAutoRender();
                        }
                        item.bodyEl.setOpacity(1);
                    }, this);
                }
            }
        ];

        this.callParent();
        this.getController().setFields();

    }
});