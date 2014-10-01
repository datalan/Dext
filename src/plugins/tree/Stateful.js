/**
 * Created by rkuka on 30. 9. 2014.
 *
 * This plugin can be added to TreePanel to support stateful tree.
 * Client treepanel should define stateful and stateId properties.
 */
Ext.define('Dext.plugins.tree.Stateful', {
    extend: 'Ext.AbstractPlugin',

    alias: 'plugin.statefultree',
    pluginId: 'statefultree',

    init: function(clientTree){
        clientTree.expandedNodes = clientTree.expandedNodes || {};
        clientTree.addStateEvents(['select', 'expandnode', 'collapsenode']);

        clientTree.on({
            viewready: this.restoreTreeState,
            afteritemexpand: this.afterExpandNode,
            afteritemcollapse: this.afterCollapseNode
        });

        // overwrite original getState function
        clientTree.originalGetState = clientTree.getState; // this should be done because of scoping
        clientTree.getState = this.getTreeState;
    },

    afterExpandNode: function(node){
        var nodeId = node.getId();
        if(nodeId){
            this.expandedNodes[nodeId] = node.getPath();
        }
    },

    afterCollapseNode: function(node){
        var nodeId = node.getId();
        if(nodeId){
            delete(this.expandedNodes[nodeId]);
            node.cascadeBy(function(child) {
                if(child.id) {
                    delete(this.expandedNodes[child.getId()]);
                }
            }, this);
        }
    },

    getTreeState: function(){
        var state = this.originalGetState(arguments);
        var selectedItems = this.getSelection();

        return Ext.merge({}, state, {
            selectedItemId: selectedItems.length ? selectedItems[0].getId() : '',
            expandedNodes: this.expandedNodes || {}
        });
    },

    restoreTreeState: function(){
        for(var itemId in this.expandedNodes) {
            if(this.expandedNodes.hasOwnProperty(itemId)) {
                this.expandPath(this.expandedNodes[itemId]);
            }
        }
    }
});