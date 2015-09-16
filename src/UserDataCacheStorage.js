/*!
 * Naukri.com Cache Library
 * http://www.naukri.com/
 *
 * Author: Rahul Batra (rahul.batra@naukri.com, rahul.batra@gmail.com)
 * Copyright 2014 Naukri.com
 */

jQuery.extend({
  stringify: function stringify(obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
      if (t == "string") obj = '"' + obj + '"';
      return String(obj);
    } else {
      var n, v, json = [], arr = (obj && obj.constructor == Array);
      for (n in obj) {
        v = obj[n];
        t = typeof(v);
        if (obj.hasOwnProperty(n)) {
          if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
          json.push((arr ? "" : '"' + n + '":') + String(v));
        }
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
  }
});

Cache.UserDataCacheStorage = function(namespace) {
  var namespace = namespace;
  var store = document.createElement('div');
  store.style.display = 'none';
  document.getElementsByTagName('head')[0].appendChild(store);
  store.addBehavior('#default#userdata');

  this.get = function(key) {
    store.load(namespace);
    var value = store.getAttribute(key);
    return value ? $.parseJSON(value) : null;
  }

  this.set = function(key, value) {
    store.load(namespace);
    store.setAttribute(key, $.stringify(value));
    store.save(namespace);
  }

  this.size = function(key, value) {
    return store.XMLDocument.documentElement.attributes.length;
  }

  this.remove = function(key) {
    store.load(namespace);
    store.removeAttribute(key);
    store.save(namespace);
  }

  this.keys = function() {
    store.load(namespace);
    var i = -1, keys = [], attr;
    while (attr = store.XMLDocument.documentElement.attributes[++i]) {
      keys.push(attr.name);
    }
    return keys;
  }
}
