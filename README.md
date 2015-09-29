# ncCache


ncCache is a simple wrapper over a pre-built local storage plugin, which includes many options such as absolute expiration, sliding expiration, cache priority, and a callback function. ncCache even supports local storage on those browsers which themselves don’t support local storage. It can be used to cache data locally in the user's browser, saving a server roundtrip in  web  applications, hence improving page performance.

How It Works
--------------------  

- Create a new cache item
-     var cache = ncCacheFactory.getCache(projectName);

- Add an item to the cache

	###### Parameters: 
    - key - the key to refer to the object
    - value - the object to cache options. An optional parameter described below
	the last parameter accepts an object which controls various caching options:
        * expirationAbsolute: the datetime when the item should expire
        * expirationSliding: an integer representing the seconds since the last cache access after which the item should expire.
        
- Priority : How important it is to leave this item in the cache. You can use the values Cache.Priority.LOW, .NORMAL, or .HIGH, or you can just use an integer.  
- Note that placing a priority on an item does not guarantee it will remain in cache.  It can still be purged if an expiration is hit, or if the cache is full.
- callback: A function that gets called when the item is purged from cache.  The key and value of the removed item
 are passed as parameters to the callback function.
		cache.setItem("A", "1", {expirationAbsolute: null,
		                         expirationSliding: 60,
		                         priority: Cache.Priority.HIGH,
		                         callback: function(k, v) { alert('removed ' + k); }
		                        });

		// retrieve an item from the cache
		// takes one parameter, the key to retreive
		// returns the cached item
		cache.getItem("A");

		// Remove and return an item from the cache.
		// If the item doesn't exist it returns null.
		cache.removeItem("A");
		
		// Removes items from the cache which pass the provided test.
		// If the test function returns true, the item will be removed.
		// E.g., Remove keys which start with 'RemoveMe'
		cache.removeWhere(function(k, v) { return /^RemoveMe/.test(k); });

		// Returns the number of items in the cache.
		cache.size();

		// Return stats about the cache, like {"hits": 1, "misses": 4}
		cache.stats();

		// clears all items from the cache
		cache.clear();



KNOWN LIMITATIONS (IMPORTANT):
------------------------------
As per IE 7's documentation available here:  
http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx 

a UserData store is available only in the same directory and with the same protocol used to persist the store

In other words, data stored in IE 7 at this URL: http://example.com/foo
will NOT BE AVIALBLE at the URL: http://example.com/bar
and will also not be available at the URL: https://example.com/foo



Dependencies:
-------------
    If IE 7 support is required, this library requires that jQuery 1.x should be already included in the page.






