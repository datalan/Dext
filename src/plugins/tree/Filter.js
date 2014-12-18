/**
 * Created by Radovan Kuka on 17. 9. 2014.
 *
 * This plugin can be added to TreePanel to support client filtering of tree.
 */
Ext.define('Dext.plugins.tree.Filter', {
    extend: 'Ext.AbstractPlugin',

    alias: 'plugin.filter',
    pluginId: 'filter',

    requires: [
        'Dext.helpers.RegExp'
    ],

    /**
     * Placeholder of searchField
     * @default 'Search'
     */
    emptyText: 'Search',

    /**
     * Background color of toolbar.
     * @default color defined in theme
     */
    backgroundColor: '',

    /**
     * Last selected item, that should be selected after filter is cleared
     * @private
     */
    lastSelectedItem: null,

    /**
     * Add search field at the top of tree panel
     *
     * @param clientTree
     * @private
     */
    init: function(clientTree){
        this.tree = clientTree;

        clientTree.on({
            select: {
                scope: this,
                fn: function(tree, item){
                    this.lastSelectedItem = item;
                }
            }
        });

        clientTree.reconfigure(null, [
            {
                xtype: 'treecolumn',
                flex: 1,
                dataIndex: clientTree.displayField,
                scope: this,
                renderer: function(value){
                    var searchString = this.searchField ? this.searchField.getValue() : '';

                    if(searchString.length > 0){
                        return this.markMatchedItems(searchString, value);
                    }

                    return value;
                }
            }
        ]);

        clientTree.addDocked({
            xtype: 'toolbar',
            dock: 'top',
            border: true,

            style: {
                backgroundColor: this.backgroundColor
            },

            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items: {
                xtype: 'textfield',
                emptyText: this.emptyText,

                listeners: {
                    change: {
                        fn: 'onFilterChange',
                        buffer: 150
                    },
                    render: {
                        fn: function(searchField){
                            this.searchField = searchField;
                        }
                    },
                    scope: this
                },

                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        handler: 'onClearTriggerClick',
                        hidden: true,
                        scope: this
                    },
                    search: {
                        cls: 'x-form-search-trigger',
                        weight: 1,
                        handler: 'onSearchTriggerClick',
                        scope: this
                    }
                }
            }
        });
    },

    /**
     * Fires when search value was changed
     *
     * @event Dext.plugins.tree.Filter#[event:]onFilterChange
     * @param searchField
     * @param newValue
     * @param oldValue
     */
    onFilterChange: function(searchField, newValue, oldValue){
        if(newValue !== oldValue){
            var clearTrigger = searchField.getTrigger('clear');
            var searchTrigger = searchField.getTrigger('search');

            if(newValue){
                clearTrigger.show();
                searchTrigger.hide();
            } else{
                clearTrigger.hide();
                searchTrigger.show();
            }

            this.filterStore(newValue);
        }
    },

    /**
     * Fires when search trigger was clicked
     *
     * @event Dext.plugins.tree.Filter#[event:]onSearchTriggerClick
     * @param searchField
     */
    onSearchTriggerClick: function(searchField){
        this.filterStore(searchField.getValue());
    },

    /**
     * Fires when clear trigger was clicked
     *
     * @event Dext.plugins.tree.Filter#[event:]onClearTriggerClick
     * @param searchField
     */
    onClearTriggerClick: function(){
        this.resetFilter();
    },

    /**
     * Reset filter and tree
     */
    resetFilter: function(){
        this.searchField.reset();
        this.searchField.getTrigger('clear').hide();

        this.tree.getStore().clearFilter();

        this.tree.collapseAll();

        // If something is selected, expand branch to this item
        if(this.lastSelectedItem){
            this.tree.selectPath(this.lastSelectedItem.getPath());
        }
    },

    /**
     * Filter store by text (displayField)
     *
     * @param searchString
     */
    filterStore: function(searchString){
        var displayField = this.tree.displayField;
        var navigationStore = this.tree.getStore();

        // escape sepcail character for security reasons
        var searchStr = Dext.helpers.RegExp.escape(searchString);
        var searchRegex = new RegExp(searchStr, 'i');

        if(searchString.length < 1){
            this.resetFilter();
        } else{
            navigationStore.getFilters().replaceAll({
                filterFn: function(node){
                    var children = node.childNodes;
                    var len = children && children.length;

                    // Visibility of leaf nodes is whether they pass the test.
                    // Visibility of branch nodes depends on them having visible children.
                    var visible = node.isLeaf() ? searchRegex.test(node.get(displayField)) : false;

                    // We're visible if one of our child nodes is visible.
                    // No loop body here. We are looping only while the visible flag remains false.
                    // Child nodes are filtered before parents, so we can check them here.
                    // As soon as we find a visible child, this branch node must be visible.
                    for(var i = 0; i < len && !(visible = children[i].get('visible')); i++);

                    return visible;
                }
            });

            this.tree.expandAll();
        }
    },

    markMatchedItems: function(searchString, item){
        return item.replace(new RegExp('(' + searchString + ')', 'gi'), "<span class='matched-filter'>$1</span>");
    }
});