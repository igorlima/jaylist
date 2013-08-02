# jaylist
A simple wrapper for javascript's built-in hash storage. 
Much of the functionality was inspired by Python's dictionary.

[![Build Status](https://travis-ci.org/benbscholz/jaylist.png?branch=master)](https://travis-ci.org/benbscholz/jaylist)

## demo

		// let's create a list
		var jaylist = list();
		
		// and add some items
		jaylist.add("here", "strings");
		jaylist.add("there", 1638423);
		jaylist.add("these", [1,2,3,4,5]);
		
		// let's view the keys in the list
		// -> ["here", "there", "these"]
		jaylist.keys();

		// let's view the values in the list
		// -> ["strings", 1638423, [1,2,3,4,5]]
		jaylist.values();

		// let's remove an item
		jaylist.remove("here");

		// trying to retrieve an item that doesn't exist yields undefined
		// -> undefined
		jaylist.get("here");

		// -> 1638423
		jaylist.get("there");

		// deep copy a list
		var beelist = jaylist.copy();

		// list equality
		// -> true
		jaylist.isEqual(beelist);

		// empty a list
		jaylist.clear();

		// iteration with a callback 
		beelist.each(function(key){console.log(key);});

		// iteration with a loop
		var item;
		while (item = beelist.next()) {
				console.log(item);
		}		
		
		// update a list with the contents of another
		jaylist.update(beelist);

## Functions:
###Create the list:

    var jaylist = list(); 

   
###Add a value to the list:

#### add(key, value)
--Insert an object into the list, overwriting any value already assigned to the key. Returns the value upon successful addition.

    jaylist.add("key", value);

   
###Get the value from the list:

#### get(key)
--Returns the value associated with key, undefined if the key has not been entered into the list.

    var val = jaylist.get("key"); 

  
###Remove the value from the list:

#### remove(key)
--Removes the object from the list. Returns undefined if no value is assigned to the key. Upon successful removal, it returns the value removed. A list or array of keys may also be passed.

    jaylist.remove("key");


###Get the keys in the list:

#### keys()
--Returns an array of the keys in the list.

    var keys = jaylist.keys();


###Get the values in the list:

#### values()
--Returns an array of the values in the list.

    var values = jaylist.values();


###Get the items in the list:

#### items()
--Returns an array of key-value pairs. [[key, value]]

    var items = jaylist.items();


###Get the length of the list:

#### len() 
--Returns the number of elements in the list, 0 when empty.

    var len = jaylist.len();    


###Clear the list:

#### clear()
--Removes all the items from the list.

    jaylist.clear();


###Check if the list contains the key:
    
#### hasKey(key)
-- Returns true if the list contains the key and false otherwise.

    jaylist.hasKey(key);


###Update a list with another list:
    
#### update(list)
-- Adds the entries of the input list to the list.

    jaylist.update(somelist);


###Deep copy a list:

#### copy()
-- Returns a deep copy of the list.

    var newlist = jaylist.copy();


###Iterate through a list:

#### each(callback)
-- Iterates through each entry in the list, calling callback with parameter key for each value.

    jaylist.each(function(key){somefunction(key);});


###Iterate through a list:

#### next()
-- Iterates through each entry in the list, returning a key on each call. When the iteration is complete, next() returns undefined & the iteration can begin again.

    while(jaylist.next()) {...}


###Return an object representation of the list:

#### object()
-- Returns the list as an object of key-value pairs.

    var obj = jaylist.object();


###Check if two lists are equal:
	
#### isEqual(list)
-- Returns true if the lists are equivalent and false otherwise.

    jaylist.isEqual(alist);


