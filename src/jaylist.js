// Jaylist v2.0
// Copyright (C) 2011 by Ben Brooks Scholz. MIT Licensed.


var list = function () {
    
    var _table = {};
    var _next;
    
    // replace 'instanceof List' with _isList(item), because instanceof 
    // breaks without the 'new' operator.
    var _isList = function (item) {
        if (item._table && item.next)
            return true;
        else
            return false;
    };

    var _isArray = function (item) {
        if (item && typeof item === 'object' && item.constructor === Array) 
            return true;
        else if (Object.prototype.toString.call(item) == '[object Array]')
            return true;
        else
            return false;
    };
    
    var _deepEquals = function (a_obj, b_obj) { 
        var i, 
            key, 
            atype = typeof a_obj, 
            btype = typeof b_obj;
                
        if (a_obj === b_obj)
            return true;
        if (atype !== btype)
            return false;
                    
        if (_isArray(a_obj) && _isArray(b_obj)) {
            if (a_obj.length !== b_obj.length)
                return false;
            for (i = 0; i < a_obj.length; i += 1)
                if (a_obj[i] !== b_obj[i]) 
                    return false;
            return true;
        }
                
        if (atype !== "object") 
            return false;
                    
        if (Object.keys(a_obj).length !== Object.keys(b_obj).length)
            return false;
                    
        for (key in a_obj) {
            if (!b_obj.hasOwnProperty(key))
                return false;
            if (a_obj.hasOwnProperty(key) && b_obj.hasOwnProperty(key))
                return _deepEquals(a_obj[key], b_obj[key]);
        }
                
        return true;
    };
    
    var _deepCopy = function (obj) {
        var entry, 
            copied = {};

        if (_isList(obj)) 
            copied = list();

        else if (_isArray(obj))
            copied = [];
                
        for (entry in obj) {

            if (obj.hasOwnProperty(entry)) {
                if (typeof obj[entry] === 'string' ||
                    typeof obj[entry] === 'number' ||
                    typeof obj[entry] === 'boolean')
                    copied[entry] = obj[entry];
                
                else if (typeof obj[entry] === 'object' || _isArray(obj)) 
                    copied[entry] = _deepCopy(obj[entry]);

            }
        }
        return copied;
    };

    
    return {
        _table : _table,
        _next : _next,
        
        // get: Returns the value attached to the given key or undefined 
        // if it isn't found.
        get : function (key) {
            if (this._table.hasOwnProperty(key))
                return this._table[key];
            else
                return undefined;
        },
        
        // add: Inserts an object into the list, assigning it to the given key.
        // It returns the value upon successful addition to the list. If a value
        // is inserted with a key that exists in the list already, the old value 
        // is overwritten.
        add : function (key, value) {     
            return (this._table[key] = value);
        },
        
        // remove: Removes an object from the list with the given key. It returns
        // undefined if no object with the given key exists in the list. Otherwise,
        // it returns the value removed. A list or array of keys may also be passed.
        remove : function (item) {
            var nitem;
            
            if (_isList(item)) {
                while ((nitem = item.next())) 
                    delete this._table[nitem];
                        
            } else if (_isArray(item)) {
                while (item.length !== 0)
                    delete this._table[item.pop()];
                        
            } else {
                var val = this._table[item];
                delete this._table[item];
                return val;
            }
        },
        
        // take: Returns an array of key-value pairs of n-length from the beginning of the list.
        take : function (n) {
	    	var i = n,
	    		item,
	    		items = [];
	    	while ((item = this.next()) && i--) {
		    	items.push([item, this._table[item]]);
		    	this.remove(item);
	    	}
	    	return items;
        },

        // keys: Returns an array of the keys in the list.
        keys : function () {
            return Object.keys(this._table);
        },

        // values: Returns an array of the values in the list. Duplicate values
        // are only displayed once.
        values : function () {
            var i, 
                contains, 
                self = this, 
                values = [];
                
            this.each(function (key) {
                    
                contains = false;
                i = values.length;
                    
                while (i-- && !contains)
                    if (self.get(key) === values[i])
                        contains = true;
                    
                if (!contains)
                    values.push(self.get(key));
            });
                
            return values;
        },

        // items: Returns an array of key-value pairs: [[key, value]]
        items : function () {
            var itemlist = [], 
                self = this;
            
            this.each(function (key) { 
                itemlist.push([key, self._table[key]]); 
            });
            
            return itemlist;
        },

        // len: Returns the number of items in the list. Returns zero if empty.
        len : function () {
            var len = 0;
            
            this.each(function () { 
                len = len + 1; 
            });
            
            return len;
        },

        // clear: Removes the items from the list.
        clear : function () {
            this._table = {};
        },

        // hasKey: Returns true if the list contains the given key and false if
        // if does not.
        hasKey : function (key) {
            return (this.get(key) !== undefined);
        },

        // pop: Returns the value associated with the key and removes it. If there
        // is no value associated with the key, return undefined, & for that reason
        // def is optional.
        pop : function (key, def) {
            if (this.hasKey(key))
                this.remove(key);
            else
                return def;
        },

        // popItem: Returns a random key value pair ( [key, value] ) and removes it.
        popItem : function () {
            var pair,
                keys = this.keys();
            
            if (keys.length === 0)
                return undefined;
                
            pair = [keys[0]];
            
            pair.push(this.remove(pair[0]));
            
            return pair;
        },

        // update: Adds all the entries from the input list to the list.
        update : function (list) {
            var self = this;

            list.each(function (key) {
                self._table[key] = list.get(key);
            });
        },

        // copy: Returns a deep copy of the list.
        copy : function () {
            var copy = list();
            copy.update(_deepCopy(this));
            
            return copy;
        },

        // each: Iterates over each entry in the list, calling the callback with the
        // parameter 'key'.
        each : function (callback) {
            for (var key in this._table)
                if (this._table.hasOwnProperty(key))
                    callback(key);
        },

        // next: Iterates over the list, returning the key of next entry on each call.
        // Returns undefined when the iteration is complete.
        next : function () {
            if (this._next !== undefined && this._next.length !== 0)
                return this._next.pop();
                
            else if (this._next === undefined) {
                this._next = this.keys().reverse();
                return this._next.pop();
                
            } else if (this._next.length === 0) {
                this._next = undefined;
                return this._next;
            }
        },

        // object: Return the key-value list as an object.
        object : function () {
            return this._table;
        },

        // isEqual: Returns true if the lists are equivalent and false otherwise.
        isEqual : function (list) {           
            if (!(_isList(list)))
                return false;
                
            return _deepEquals(this._table, list._table);
        }
    };
};
