/*!
 * Naukri.com Cache Library
 * http://www.naukri.com/
 *
 * Author: Rahul Batra (rahul.batra@naukri.com, rahul.batra@gmail.com)
 * Copyright 2014 Naukri.com
 */

ncCacheFactory = function() {
}

ncCacheFactory.getCache = function(appId, storageType) {
    if (typeof appId == "undefined" || parseInt(appId) <= 0) {
        throw new 'Invalid app id: '+appId;
    }
    storageType = storageType || 'localStorage';
    var isOldIE = window.navigator.userAgent.match(/MSIE 7/);
    var cacheStore = null;
    if (storageType == 'localStorage') {
        if (typeof window.localStorage != 'undefined') {
            cacheStore = new Cache.LocalStorageCacheStorage(String(appId));
        }
        else if (isOldIE) {
            cacheStore = new Cache.UserDataCacheStorage(String(appId));
        }
    }
    if (cacheStore == null) {
        throw 'Unsupported storage type: '+storageType;
    }
    return new Cache(-1, false, cacheStore);
}
