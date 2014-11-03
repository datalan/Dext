Ext.define('Dext.custom.form.RadioGroupController', {
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
     * Pri vybere formulara sa spusti najskor sluzba na zistenie ActorId a TenantId, potom sa zavola sluzba na
     * zistenie adresy formulara a nakoniec sa nastavi tato adresa iframu
     */
    onRadioChange: function(cb, checked){
        var container = this.view.down('#itemsContainer');
        if(checked){
            container.nastavEnabled();
        } else{
            container.nastavDisabled();
        }

    },

    onAfterRender: function(cb, checked){
        var itemsContainer = this.view.down('#itemsContainer');
        if(!this.view.defaultChecked){
            itemsContainer.nastavDisabled();
        }

    }
});