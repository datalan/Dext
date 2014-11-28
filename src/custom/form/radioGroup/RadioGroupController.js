Ext.define('Dext.custom.form.radioGroup.RadioGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.radiogroupcontroller',

    control: {
        '#': {
            afterrender: 'onAfterRender'
        },
        'radio': {
            change: 'onRadioChange'
        }
    },

    /**
     * event on radio state change
     */
    onRadioChange: function(cb, checked){
        var container = this.lookupReference('itemsContainer');
        if(checked){
            container.setEnableLook();
        } else{
            container.setDisableLook();
        }

    },

    /**
     * when radio is not default, disable fields
     */
    onAfterRender: function(cb, checked){
        var itemsContainer = this.lookupReference('itemsContainer');
        if(!this.view.defaultChecked){
            itemsContainer.setDisableLook();
        }
    },

    /**
     * set fields for radio controller
     */
    setFields: function(){
        var itemsContainer = this.lookupReference('itemsContainer');
        Ext.Array.forEach(this.view.fields, function(item){
            item.disabledCls= 'radioGroupField';
            itemsContainer.add(item);
        }, this);

        Ext.Array.forEach(itemsContainer.items.items, function(item){
            item.addListener('render', function(c){
                c.labelEl.on('click', function(){
                    this.up('customradiogroup').down('#checkField').setValue(true);
                }, c);
            }, this);
        }, this);
    }
});