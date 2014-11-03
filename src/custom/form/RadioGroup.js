/**
 * Created by Milan on 3. 9. 2014.
 */
Ext.define('Dext.custom.form.RadioGroup', {
    extend: 'Ext.container.Container',
    alias: 'widget.dcom-assistedsubmission-form-radiogroup',

    layout: {
        type: 'hbox'
    },

    itemy: null,
    defaultChecked: null,
    defaultType: null,

    requires: [
        'Dext.custom.form.RadioGroupController'
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
                itemId: 'itemsContainer',
                margin: '0 0 0 10',
                layout: {
                    type: 'vbox'
                },

                nastavDisabled: function(){
                    Ext.Array.forEach(this.items.items, function(item){
                        item.setReadOnly(true);
                        if(!item.bodyEl){
                            item.doAutoRender();
                        }
                        item.bodyEl.setOpacity(0.5);
                        item.reset();
                    }, this);
                },

                nastavEnabled: function(){
                    Ext.Array.forEach(this.items.items, function(item){
                        item.setReadOnly(false);
                        if(!item.bodyEl){
                            item.doAutoRender();
                        }
                        item.bodyEl.setOpacity(1);
                    }, this);
                }
            }
        ];

        this.callParent();

        var itemsContainer = this.down('#itemsContainer');
        Ext.Array.forEach(this.itemy, function(item){
            itemsContainer.add(item);
        }, this);

        Ext.Array.forEach(itemsContainer.items.items, function(item){
            item.addListener('render', function(c){
                c.labelEl.on('click', function(){
                    this.up('dcom-assistedsubmission-form-radiogroup').down('#checkField').setValue(true);
                }, c);
            }, this);
        }, this);

    }
});