/*

  ______         _____ _______   ____          ________ ____  
 |___  /   /\   |  __ \_   _\ \ / /\ \        / /  ____|  _ \ 
    / /   /  \  | |__) || |  \ V /  \ \  /\  / /| |__  | |_) |
   / /   / /\ \ |  ___/ | |   > <    \ \/  \/ / |  __| |  _ < 
  / /__ / ____ \| |    _| |_ / . \    \  /\  /  | |____| |_) |
 /_____/_/    \_\_|   |_____/_/ \_\    \/  \/   |______|____/ 
				                      ZAPiX Web
W H A T S A P P W E B   E X T R A C T O R						

ZAPiXWEB WhatsApp Extractor - 4 CHROME, FIREFOX, EDGE, OPERA, WhatsApp Desktop App (ELECTRON) 
(It also works offline for Browser extractions. It just works online for DesktopApp)

Script Name: SPIZAPIXWEB.js
Version: 1.7
Revised Date: 01/04/23

Description: A script that extracts throught Whatsapp WEB data records.
Technique described in paper:
Soares, A. (2022). WhatsApp Web Client Live Forensics Technique. In Proceedings of the 8th International Conference on Information Systems Security and Privacy - ICISSP, ISBN 978-989-758-553-1, pages 629-636. DOI: 10.5220/0011006400003120

Copyright: 2021 Alberto Magno <alberto.magno@gmail.com> 
URL: https://github.com/kraftdenker/cellebrite-UFEDPA-scripts

Manual: Copy and paste all this code into browser console + ENTER. 
Follow the commands in console window.
In Firefox, you have to manually type "allow paste" into the console to enable pasting.

WhatsApp Desktop  - Electron (For this whatsapp version, it only works online): 
-----------------------------------------------------------------
-start or locate running app dir with taskmanager->details->whatsapp->(rightclick)->File location (similar to C:\Program Files\WindowsApps\5319275A.WhatsAppDesktop_2.2228.14.0_x64__cv1g1gvanyjgm\app)
-CLOSE APPLICATION. start application with this command line in the app directory: 
C:\Program Files\WindowsApps\5319275A.WhatsAppDesktop_2.2228.14.0_x64__cv1g1gvanyjgm\app>WhatsApp.exe --remote-debugging-port=9222 --disable-web-security --expose-internals-for-testing --allow-sandbox-debugging --debug-devtools --disable-file-system --enable-logging  --unlimited-quota-for-files --enable-experimental-web-platform-features --allow-file-access-from-files
-Open a browser (Chrome, Edge, etc...) into debug inspector
 ex: Chrome, type into address bar: chrome://inspect
     Edge, type into address bar: edge://inspect
- Wait for remote sites location, click inspect in WhatsApp Desktop program.
- Copy/Paste ZAPiXWEB script
- Attention: User needs to explict type the file names to the zip file and to the hash file when asked. After extration, no hashfile is automatically generate. So, the user needs to click 'Last digest' to generate hash file.

- ChangeLog -
v1 		- [05-18-21]: Wrote original code
v1.2	- [09-27-21]: Command to extract one or more chats.
v1.3	- [10-08-21]: Correct chat extraction
v1.4	- [12-03-21]: Change extraction to full support multiple devices
v1.5	- [02-21-22]: Hash, new decryption code (using vendor module ligsignal)
v1.5.1	- [08-31-22]: Adjust in which DOM element to grab the current chat name
v1.6	- [08-31-22]: Adaptation for use with Electron (Whatsapp Desktop App)
v1.7	- [01-04-23]: Adaption to new quotedMsg structure.

Author: alberto.magno@gmail.com (https://github.com/kraftdenker)  _

Using this modules:
AXIOS - https://github.com/axios/axios/
JSZIP - https://raw.github.com/Stuk/jszip/
FILESSAVER - https://github.com/eligrey/FileSaver.js/
WA-AUTOMATE-NODEJS - https://github.com/open-wa/wa-automate-nodejs/blob/master/src/lib/wapi.js
*/






















//INCLUDE AXIOSMAP

//ICLUDE AXIOS
/* axios v0.21.1 | (c) 2020 by Matt Zabriskie */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axios"] = factory();
	else
		root["axios"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var bind = __webpack_require__(3);
	var Axios = __webpack_require__(4);
	var mergeConfig = __webpack_require__(22);
	var defaults = __webpack_require__(10);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance(defaults);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(mergeConfig(axios.defaults, instanceConfig));
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(23);
	axios.CancelToken = __webpack_require__(24);
	axios.isCancel = __webpack_require__(9);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(25);
	
	// Expose isAxiosError
	axios.isAxiosError = __webpack_require__(26);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(3);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is a Buffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Buffer, otherwise false
	 */
	function isBuffer(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
	    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a plain Object
	 *
	 * @param {Object} val The value to test
	 * @return {boolean} True if value is a plain Object, otherwise false
	 */
	function isPlainObject(val) {
	  if (toString.call(val) !== '[object Object]') {
	    return false;
	  }
	
	  var prototype = Object.getPrototypeOf(val);
	  return prototype === null || prototype === Object.prototype;
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
	                                           navigator.product === 'NativeScript' ||
	                                           navigator.product === 'NS')) {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (isPlainObject(result[key]) && isPlainObject(val)) {
	      result[key] = merge(result[key], val);
	    } else if (isPlainObject(val)) {
	      result[key] = merge({}, val);
	    } else if (isArray(val)) {
	      result[key] = val.slice();
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	/**
	 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	 *
	 * @param {string} content with BOM
	 * @return {string} content value without BOM
	 */
	function stripBOM(content) {
	  if (content.charCodeAt(0) === 0xFEFF) {
	    content = content.slice(1);
	  }
	  return content;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isPlainObject: isPlainObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim,
	  stripBOM: stripBOM
	};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var buildURL = __webpack_require__(5);
	var InterceptorManager = __webpack_require__(6);
	var dispatchRequest = __webpack_require__(7);
	var mergeConfig = __webpack_require__(22);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = arguments[1] || {};
	    config.url = arguments[0];
	  } else {
	    config = config || {};
	  }
	
	  config = mergeConfig(this.defaults, config);
	
	  // Set config.method
	  if (config.method) {
	    config.method = config.method.toLowerCase();
	  } else if (this.defaults.method) {
	    config.method = this.defaults.method.toLowerCase();
	  } else {
	    config.method = 'get';
	  }
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	Axios.prototype.getUri = function getUri(config) {
	  config = mergeConfig(this.defaults, config);
	  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(mergeConfig(config || {}, {
	      method: method,
	      url: url,
	      data: (config || {}).data
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(mergeConfig(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    var hashmarkIndex = url.indexOf('#');
	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }
	
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var transformData = __webpack_require__(8);
	var isCancel = __webpack_require__(9);
	var defaults = __webpack_require__(10);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var normalizeHeaderName = __webpack_require__(11);
	
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(12);
	  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(12);
	  }
	  return adapter;
	}
	
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Accept');
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	  maxBodyLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var settle = __webpack_require__(13);
	var cookies = __webpack_require__(16);
	var buildURL = __webpack_require__(5);
	var buildFullPath = __webpack_require__(17);
	var parseHeaders = __webpack_require__(20);
	var isURLSameOrigin = __webpack_require__(21);
	var createError = __webpack_require__(14);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    var fullPath = buildFullPath(config.baseURL, config.url);
	    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request.onreadystatechange = function handleLoad() {
	      if (!request || request.readyState !== 4) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle browser request cancellation (as opposed to a manual cancellation)
	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }
	
	      reject(createError('Request aborted', config, 'ECONNABORTED', request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
	      if (config.timeoutErrorMessage) {
	        timeoutErrorMessage = config.timeoutErrorMessage;
	      }
	      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
	        request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (!utils.isUndefined(config.withCredentials)) {
	      request.withCredentials = !!config.withCredentials;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (!requestData) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(14);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(15);
	
	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	
	  error.request = request;
	  error.response = response;
	  error.isAxiosError = true;
	
	  error.toJSON = function toJSON() {
	    return {
	      // Standard
	      message: this.message,
	      name: this.name,
	      // Microsoft
	      description: this.description,
	      number: this.number,
	      // Mozilla
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      columnNumber: this.columnNumber,
	      stack: this.stack,
	      // Axios
	      config: this.config,
	      code: this.code
	    };
	  };
	  return error;
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	    (function standardBrowserEnv() {
	      return {
	        write: function write(name, value, expires, path, domain, secure) {
	          var cookie = [];
	          cookie.push(name + '=' + encodeURIComponent(value));
	
	          if (utils.isNumber(expires)) {
	            cookie.push('expires=' + new Date(expires).toGMTString());
	          }
	
	          if (utils.isString(path)) {
	            cookie.push('path=' + path);
	          }
	
	          if (utils.isString(domain)) {
	            cookie.push('domain=' + domain);
	          }
	
	          if (secure === true) {
	            cookie.push('secure');
	          }
	
	          document.cookie = cookie.join('; ');
	        },
	
	        read: function read(name) {
	          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	          return (match ? decodeURIComponent(match[3]) : null);
	        },
	
	        remove: function remove(name) {
	          this.write(name, '', Date.now() - 86400000);
	        }
	      };
	    })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return {
	        write: function write() {},
	        read: function read() { return null; },
	        remove: function remove() {}
	      };
	    })()
	);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var isAbsoluteURL = __webpack_require__(18);
	var combineURLs = __webpack_require__(19);
	
	/**
	 * Creates a new URL by combining the baseURL with the requestedURL,
	 * only when the requestedURL is not already an absolute URL.
	 * If the requestURL is absolute, this function returns the requestedURL untouched.
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} requestedURL Absolute or relative URL to combine
	 * @returns {string} The combined full path
	 */
	module.exports = function buildFullPath(baseURL, requestedURL) {
	  if (baseURL && !isAbsoluteURL(requestedURL)) {
	    return combineURLs(baseURL, requestedURL);
	  }
	  return requestedURL;
	};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });
	
	  return parsed;
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	    (function standardBrowserEnv() {
	      var msie = /(msie|trident)/i.test(navigator.userAgent);
	      var urlParsingNode = document.createElement('a');
	      var originURL;
	
	      /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	      function resolveURL(url) {
	        var href = url;
	
	        if (msie) {
	        // IE needs attribute set twice to normalize properties
	          urlParsingNode.setAttribute('href', href);
	          href = urlParsingNode.href;
	        }
	
	        urlParsingNode.setAttribute('href', href);
	
	        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	        return {
	          href: urlParsingNode.href,
	          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	          host: urlParsingNode.host,
	          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	          hostname: urlParsingNode.hostname,
	          port: urlParsingNode.port,
	          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	            urlParsingNode.pathname :
	            '/' + urlParsingNode.pathname
	        };
	      }
	
	      originURL = resolveURL(window.location.href);
	
	      /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	      return function isURLSameOrigin(requestURL) {
	        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	        return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	      };
	    })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return function isURLSameOrigin() {
	        return true;
	      };
	    })()
	);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	module.exports = function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  var config = {};
	
	  var valueFromConfig2Keys = ['url', 'method', 'data'];
	  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
	  var defaultToConfig2Keys = [
	    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
	    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
	    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
	    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
	    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
	  ];
	  var directMergeKeys = ['validateStatus'];
	
	  function getMergedValue(target, source) {
	    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
	      return utils.merge(target, source);
	    } else if (utils.isPlainObject(source)) {
	      return utils.merge({}, source);
	    } else if (utils.isArray(source)) {
	      return source.slice();
	    }
	    return source;
	  }
	
	  function mergeDeepProperties(prop) {
	    if (!utils.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (!utils.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  }
	
	  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
	    if (!utils.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    }
	  });
	
	  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
	
	  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
	    if (!utils.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    } else if (!utils.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });
	
	  utils.forEach(directMergeKeys, function merge(prop) {
	    if (prop in config2) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (prop in config1) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });
	
	  var axiosKeys = valueFromConfig2Keys
	    .concat(mergeDeepPropertiesKeys)
	    .concat(defaultToConfig2Keys)
	    .concat(directMergeKeys);
	
	  var otherKeys = Object
	    .keys(config1)
	    .concat(Object.keys(config2))
	    .filter(function filterAxiosKeys(key) {
	      return axiosKeys.indexOf(key) === -1;
	    });
	
	  utils.forEach(otherKeys, mergeDeepProperties);
	
	  return config;
	};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(23);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the payload is an error thrown by Axios
	 *
	 * @param {*} payload The value to test
	 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
	 */
	module.exports = function isAxiosError(payload) {
	  return (typeof payload === 'object') && (payload.isAxiosError === true);
	};


/***/ })
/******/ ])
});
;
//# sourceMappingURL=axios.map
//INCLUDE ZIP 
/*!

JSZip v3.6.0 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JSZip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*!

JSZip v3.5.0 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=e()}}(function(){return function s(a,o,u){function h(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(f)return f(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return h(t||e)},i,i.exports,s,a,o,u)}return o[r].exports}for(var f="function"==typeof require&&require,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(e,t,r){"use strict";var c=e("./utils"),l=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,u=[],h=0,f=e.length,l=f,d="string"!==c.getTypeOf(e);h<e.length;)l=f-h,n=d?(t=e[h++],r=h<f?e[h++]:0,h<f?e[h++]:0):(t=e.charCodeAt(h++),r=h<f?e.charCodeAt(h++):0,h<f?e.charCodeAt(h++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<l?(15&r)<<2|n>>6:64,o=2<l?63&n:64,u.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return u.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,u=0;if("data:"===e.substr(0,"data:".length))throw new Error("Invalid base64 input, it looks like a data url.");var h,f=3*(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(h=l.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),h[u++]=t,64!==s&&(h[u++]=r),64!==a&&(h[u++]=n);return h}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(e){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils"),a=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r){var n=a,i=0+r;e^=-1;for(var s=0;s<i;s++)e=e>>>8^n[255&(e^t[s])];return-1^e}(0|t,e,e.length):function(e,t,r){var n=a,i=0+r;e^=-1;for(var s=0;s<i;s++)e=e>>>8^n[255&(e^t.charCodeAt(s))];return-1^e}(0|t,e,e.length):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function u(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(u,a),u.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},u.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},u.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},u.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new u("Deflate",e)},r.uncompressWorker=function(){return new u("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function I(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function i(e,t,r,n,i,s){var a,o,u=e.file,h=e.compression,f=s!==B.utf8encode,l=O.transformTo("string",s(u.name)),d=O.transformTo("string",B.utf8encode(u.name)),c=u.comment,p=O.transformTo("string",s(c)),m=O.transformTo("string",B.utf8encode(c)),_=d.length!==u.name.length,g=m.length!==c.length,v="",b="",w="",y=u.dir,k=u.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),f||!_&&!g||(S|=2048);var z,C=0,E=0;y&&(C|=16),"UNIX"===i?(E=798,C|=((z=u.unixPermissions)||(z=y?16893:33204),(65535&z)<<16)):(E=20,C|=63&(u.dosPermissions||0)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v+="up"+I((b=I(1,1)+I(R(l),4)+d).length,2)+b),g&&(v+="uc"+I((w=I(1,1)+I(R(p),4)+m).length,2)+w);var A="";return A+="\n\0",A+=I(S,2),A+=h.magic,A+=I(a,2),A+=I(o,2),A+=I(x.crc32,4),A+=I(x.compressedSize,4),A+=I(x.uncompressedSize,4),A+=I(l.length,2),A+=I(v.length,2),{fileRecord:T.LOCAL_FILE_HEADER+A+l+v,dirRecord:T.CENTRAL_FILE_HEADER+I(E,2)+A+I(p.length,2)+"\0\0\0\0"+I(C,4)+I(n,4)+l+v+p}}var O=e("../utils"),s=e("../stream/GenericWorker"),B=e("../utf8"),R=e("../crc32"),T=e("../signature");function n(e,t,r,n){s.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}O.inherits(n,s),n.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,s.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},n.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=i(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},n.prototype.closedSource=function(e){this.accumulate=!1;var t,r=this.streamFiles&&!e.file.dir,n=i(e,r,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(n.dirRecord),r)this.push({data:(t=e,T.DATA_DESCRIPTOR+I(t.crc32,4)+I(t.compressedSize,4)+I(t.uncompressedSize,4)),meta:{percent:100}});else for(this.push({data:n.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},n.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r,n,i,s,a,o,u=this.bytesWritten-e,h=(r=this.dirRecords.length,n=u,i=e,s=this.zipComment,a=this.encodeFileName,o=O.transformTo("string",a(s)),T.CENTRAL_DIRECTORY_END+"\0\0\0\0"+I(r,2)+I(r,2)+I(n,4)+I(i,4)+I(o.length,2)+o);this.push({data:h,meta:{percent:100}})},n.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},n.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},n.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},n.prototype.error=function(e){var t=this._sources;if(!s.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},n.prototype.lock=function(){s.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=n},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var h=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),u=0;try{e.forEach(function(e,t){u++;var r=function(e,t){var r=e||t,n=h[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=u}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.5.0",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var n=e("./utils"),i=e("./external"),o=e("./utf8"),u=e("./zipEntries"),s=e("./stream/Crc32Probe"),h=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new s);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,s){var a=this;return s=n.extend(s||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:o.utf8decode}),h.isNode&&h.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",e,!0,s.optimizedBinaryString,s.base64).then(function(e){var t=new u(s);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(s.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n];a.file(i.fileNameStr,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:s.createFolders})}return t.zipComment.length&&(a.comment=t.zipComment),a})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=f.getTypeOf(t),s=f.extend(r||{},d);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=h(e)),s.createFolders&&(n=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""}(e))&&g.call(this,n,!0);var a,o="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!o),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string"),a=t instanceof c||t instanceof l?t:m.isNode&&m.isStream(t)?new _(e,t):f.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var u=new p(e,a,s);this.files[e]=u}function h(e){return"/"!==e.slice(-1)&&(e+="/"),e}var i=e("./utf8"),f=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),d=e("./defaults"),c=e("./compressedObject"),p=e("./zipObject"),o=e("./generate"),m=e("./nodejsUtils"),_=e("./nodejs/NodejsStreamInputAdapter"),g=function(e,t){return t=void 0!==t?t:d.createFolders,e=h(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function u(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)this.files.hasOwnProperty(t)&&(n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n))},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(u(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(u(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=g.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(e){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=f.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");f.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(e){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(e){},lastIndexOfSignature:function(e){},readAndCheckSignature:function(e){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),u=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new u(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),f=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function u(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}u.prototype={accumulate:function(e){return o=this,u=e,new a.Promise(function(t,r){var n=[],i=o._internalType,s=o._outputType,a=o._mimeType;o.on("data",function(e,t){n.push(e),u&&u(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return f.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()});var o,u},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),u=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),h=new Array(256),i=0;i<256;i++)h[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function f(){n.call(this,"utf-8 encode")}h[254]=h[254]=1,s.utf8encode=function(e){return u.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=u.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return u.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=h[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(u.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(u.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(u.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+h[e[r]]>t?r:t}(t),i=t;n!==t.length&&(u.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(f,n),f.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=f},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,o){"use strict";var u=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),n=e("set-immediate-shim"),f=e("./external");function i(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}o.newBlob=function(t,r){o.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var s={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return u.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return u.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function a(e){var t=65536,r=o.getTypeOf(e),n=!0;if("uint8array"===r?n=s.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=s.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return s.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return s.stringifyByChar(e)}function d(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}o.applyFromCharCode=a;var c={};c.string={string:i,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:a,array:i,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return a(new Uint8Array(e))},array:function(e){return d(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:i,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:a,array:function(e){return d(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:i,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:a,array:function(e){return d(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return d(e,new Uint8Array(e.length))},nodebuffer:i},o.transformTo=function(e,t){if(t=t||"",!e)return t;o.checkSupport(e);var r=o.getTypeOf(t);return c[r][e](t)},o.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":u.nodebuffer&&r.isBuffer(e)?"nodebuffer":u.uint8array&&e instanceof Uint8Array?"uint8array":u.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},o.checkSupport=function(e){if(!u[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},o.MAX_VALUE_16BITS=65535,o.MAX_VALUE_32BITS=-1,o.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},o.delay=function(e,t,r){n(function(){e.apply(r||null,t||[])})},o.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},o.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])arguments[e].hasOwnProperty(t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},o.prepareContent=function(n,e,i,s,a){return f.Promise.resolve(e).then(function(n){return u.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new f.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t,r=o.getTypeOf(e);return r?("arraybuffer"===r?e=o.transformTo("uint8array",e):"string"===r&&(a?e=h.decode(e):i&&!0!==s&&(e=l(t=e,u.uint8array?new Uint8Array(t.length):new Array(t.length)))),e):f.Promise.reject(new Error("Can't read the data of '"+n+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=(e("./utf8"),e("./support"));function u(e){this.files=[],this.loadOptions=e}u.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=u},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),u=e("./compressions"),h=e("./support");function f(e,t){this.options=e,this.loadOptions=t}f.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in u)if(u.hasOwnProperty(t)&&u[t].magic===e)return u[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(e){if(this.extraFields[1]){var t=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=t.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=t.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=t.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=t.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=h.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=f},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),u=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new u("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof u?this._data:new i(this._data)}};for(var h=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],f=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},l=0;l<h.length;l++)n.prototype[h[l]]=f;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,f,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(h),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){h(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(h,0)};else{var o=new t.MessageChannel;o.port1.onmessage=h,r=function(){o.port2.postMessage(0)}}var u=[];function h(){var e,t;n=!0;for(var r=u.length;r;){for(t=u,u=[],e=-1;++e<r;)t[e]();r=u.length}n=!1}f.exports=function(e){1!==u.push(e)||n||r()}}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function h(){}var f={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==h&&c(this,e)}function u(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function l(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return f.reject(t,e)}e===t?f.reject(t,new TypeError("Cannot resolve promise with itself")):f.resolve(t,e)})}function d(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function c(t,e){var r=!1;function n(e){r||(r=!0,f.reject(t,e))}function i(e){r||(r=!0,f.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(h);return this.state!==n?l(r,this.state===a?e:t,this.outcome):this.queue.push(new u(r,e,t)),r},u.prototype.callFulfilled=function(e){f.resolve(this.promise,e)},u.prototype.otherCallFulfilled=function(e){l(this.promise,this.onFulfilled,e)},u.prototype.callRejected=function(e){f.reject(this.promise,e)},u.prototype.otherCallRejected=function(e){l(this.promise,this.onRejected,e)},f.resolve=function(e,t){var r=p(d,t);if("error"===r.status)return f.reject(e,r.value);var n=r.value;if(n)c(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},f.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){return e instanceof this?e:f.resolve(new this(h),e)},o.reject=function(e){var t=new this(h);return f.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);for(var s=new Array(n),a=0,t=-1,o=new this(h);++t<n;)u(e[t],t);return o;function u(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,f.resolve(o,s))},function(e){i||(i=!0,f.reject(o,e))})}},o.race=function(e){if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var t=e.length,r=!1;if(!t)return this.resolve([]);for(var n,i=-1,s=new this(h);++i<t;)n=e[i],this.resolve(n).then(function(e){r||(r=!0,f.resolve(s,e))},function(e){r||(r=!0,f.reject(s,e))});return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),u=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),h=Object.prototype.toString,f=0,l=-1,d=0,c=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:l,method:c,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==f)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?u.string2buf(t.dictionary):"[object ArrayBuffer]"===h.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==f)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=u.string2buf(e):"[object ArrayBuffer]"===h.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==f)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(u.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===f):2!==n||(this.onEnd(f),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===f&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var d=e("./zlib/inflate"),c=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=c.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=d.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,d.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,u=this.strm,h=this.options.chunkSize,f=this.options.dictionary,l=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?u.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?u.input=new Uint8Array(e):u.input=e,u.next_in=0,u.avail_in=u.input.length;do{if(0===u.avail_out&&(u.output=new c.Buf8(h),u.next_out=0,u.avail_out=h),(r=d.inflate(u,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&f&&(o="string"==typeof f?p.string2buf(f):"[object ArrayBuffer]"===_.call(f)?new Uint8Array(f):f,r=d.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===l&&(r=m.Z_OK,l=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);u.next_out&&(0!==u.avail_out&&r!==m.Z_STREAM_END&&(0!==u.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(u.output,u.next_out),s=u.next_out-i,a=p.buf2string(u.output,i),u.next_out=s,u.avail_out=h-s,s&&c.arraySet(u.output,u.output,i,s,0),this.onData(a)):this.onData(c.shrinkBuf(u.output,u.next_out)))),0===u.avail_in&&0===u.avail_out&&(l=!0)}while((0<u.avail_in||0===u.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=d.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(u.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=c.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var u=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var h=new u.Buf8(256),n=0;n<256;n++)h[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function f(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,u.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}h[254]=h[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new u.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return f(e,e.length)},r.binstring2buf=function(e){for(var t=new u.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=h[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return f(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+h[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var u,d=e("../utils/common"),h=e("./trees"),c=e("./adler32"),p=e("./crc32"),n=e("./messages"),f=0,l=0,m=-2,i=2,_=8,s=286,a=30,o=19,g=2*s+1,v=15,b=3,w=258,y=w+b+1,k=42,x=113;function S(e,t){return e.msg=n[t],t}function z(e){return(e<<1)-(4<e?9:0)}function C(e){for(var t=e.length;0<=--t;)e[t]=0}function E(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(d.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function A(e,t){h._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,E(e.strm)}function I(e,t){e.pending_buf[e.pending++]=t}function O(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function B(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,u=e.strstart>e.w_size-y?e.strstart-(e.w_size-y):0,h=e.window,f=e.w_mask,l=e.prev,d=e.strstart+w,c=h[s+a-1],p=h[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(h[(r=t)+a]===p&&h[r+a-1]===c&&h[r]===h[s]&&h[++r]===h[s+1]){s+=2,r++;do{}while(h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&s<d);if(n=w-(d-s),s=d-w,a<n){if(e.match_start=t,o<=(a=n))break;c=h[s+a-1],p=h[s+a]}}}while((t=l[t&f])>u&&0!=--i);return a<=e.lookahead?a:e.lookahead}function R(e){var t,r,n,i,s,a,o,u,h,f,l=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=l+(l-y)){for(d.arraySet(e.window,e.window,l,l,0),e.match_start-=l,e.strstart-=l,e.block_start-=l,t=r=e.hash_size;n=e.head[--t],e.head[t]=l<=n?n-l:0,--r;);for(t=r=l;n=e.prev[--t],e.prev[t]=l<=n?n-l:0,--r;);i+=l}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,u=e.strstart+e.lookahead,f=void 0,(h=i)<(f=a.avail_in)&&(f=h),r=0===f?0:(a.avail_in-=f,d.arraySet(o,a.input,a.next_in,f,u),1===a.state.wrap?a.adler=c(a.adler,o,f,u):2===a.state.wrap&&(a.adler=p(a.adler,o,f,u)),a.next_in+=f,a.total_in+=f,f),e.lookahead+=r,e.lookahead+e.insert>=b)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+b-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<b)););}while(e.lookahead<y&&0!==e.strm.avail_in)}function T(e,t){for(var r,n;;){if(e.lookahead<y){if(R(e),e.lookahead<y&&t===f)return 1;if(0===e.lookahead)break}if(r=0,e.lookahead>=b&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-y&&(e.match_length=B(e,r)),e.match_length>=b)if(n=h._tr_tally(e,e.strstart-e.match_start,e.match_length-b),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=b){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=h._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=e.strstart<b-1?e.strstart:b-1,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}function D(e,t){for(var r,n,i;;){if(e.lookahead<y){if(R(e),e.lookahead<y&&t===f)return 1;if(0===e.lookahead)break}if(r=0,e.lookahead>=b&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=b-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-y&&(e.match_length=B(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===b&&4096<e.strstart-e.match_start)&&(e.match_length=b-1)),e.prev_length>=b&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-b,n=h._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-b),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=b-1,e.strstart++,n&&(A(e,!1),0===e.strm.avail_out))return 1}else if(e.match_available){if((n=h._tr_tally(e,0,e.window[e.strstart-1]))&&A(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return 1}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=h._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<b-1?e.strstart:b-1,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}function F(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function N(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=_,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*g),this.dyn_dtree=new d.Buf16(2*(2*a+1)),this.bl_tree=new d.Buf16(2*(2*o+1)),C(this.dyn_ltree),C(this.dyn_dtree),C(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(v+1),this.heap=new d.Buf16(2*s+1),C(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*s+1),C(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function U(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?k:x,e.adler=2===t.wrap?0:1,t.last_flush=f,h._tr_init(t),l):S(e,m)}function P(e){var t,r=U(e);return r===l&&((t=e.state).window_size=2*t.w_size,C(t.head),t.max_lazy_match=u[t.level].max_lazy,t.good_match=u[t.level].good_length,t.nice_match=u[t.level].nice_length,t.max_chain_length=u[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=b-1,t.match_available=0,t.ins_h=0),r}function L(e,t,r,n,i,s){if(!e)return m;var a=1;if(-1===t&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||9<i||r!==_||n<8||15<n||t<0||9<t||s<0||4<s)return S(e,m);8===n&&(n=9);var o=new N;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+b-1)/b),o.window=new d.Buf8(2*o.w_size),o.head=new d.Buf16(o.hash_size),o.prev=new d.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new d.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,P(e)}u=[new F(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(R(e),0===e.lookahead&&t===f)return 1;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,A(e,!1),0===e.strm.avail_out))return 1;if(e.strstart-e.block_start>=e.w_size-y&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,4===t?(A(e,!0),0===e.strm.avail_out?3:4):(e.strstart>e.block_start&&(A(e,!1),e.strm.avail_out),1)}),new F(4,4,8,4,T),new F(4,5,16,8,T),new F(4,6,32,32,T),new F(4,4,16,16,D),new F(8,16,32,32,D),new F(8,16,128,128,D),new F(8,32,128,256,D),new F(32,128,258,1024,D),new F(32,258,258,4096,D)],r.deflateInit=function(e,t){return L(e,t,_,15,8,0)},r.deflateInit2=L,r.deflateReset=P,r.deflateResetKeep=U,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?m:(e.state.gzhead=t,l):m},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?S(e,m):m;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&4!==t)return S(e,0===e.avail_out?-5:m);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===k)if(2===n.wrap)e.adler=0,I(n,31),I(n,139),I(n,8),n.gzhead?(I(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),I(n,255&n.gzhead.time),I(n,n.gzhead.time>>8&255),I(n,n.gzhead.time>>16&255),I(n,n.gzhead.time>>24&255),I(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),I(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(I(n,255&n.gzhead.extra.length),I(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(I(n,0),I(n,0),I(n,0),I(n,0),I(n,0),I(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),I(n,3),n.status=x);else{var a=_+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=x,O(n,a),0!==n.strstart&&(O(n,e.adler>>>16),O(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),E(e),i=n.pending,n.pending!==n.pending_buf_size));)I(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),E(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,I(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),E(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,I(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&E(e),n.pending+2<=n.pending_buf_size&&(I(n,255&e.adler),I(n,e.adler>>8&255),e.adler=0,n.status=x)):n.status=x),0!==n.pending){if(E(e),0===e.avail_out)return n.last_flush=-1,l}else if(0===e.avail_in&&z(t)<=z(r)&&4!==t)return S(e,-5);if(666===n.status&&0!==e.avail_in)return S(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==f&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(R(e),0===e.lookahead)){if(t===f)return 1;break}if(e.match_length=0,r=h._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=w){if(R(e),e.lookahead<=w&&t===f)return 1;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=b&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+w;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=w-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=b?(r=h._tr_tally(e,1,e.match_length-b),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=h._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}(n,t):u[n.level].func(n,t);if(3!==o&&4!==o||(n.status=666),1===o||3===o)return 0===e.avail_out&&(n.last_flush=-1),l;if(2===o&&(1===t?h._tr_align(n):5!==t&&(h._tr_stored_block(n,0,0,!1),3===t&&(C(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),E(e),0===e.avail_out))return n.last_flush=-1,l}return 4!==t?l:n.wrap<=0?1:(2===n.wrap?(I(n,255&e.adler),I(n,e.adler>>8&255),I(n,e.adler>>16&255),I(n,e.adler>>24&255),I(n,255&e.total_in),I(n,e.total_in>>8&255),I(n,e.total_in>>16&255),I(n,e.total_in>>24&255)):(O(n,e.adler>>>16),O(n,65535&e.adler)),E(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?l:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==k&&69!==t&&73!==t&&91!==t&&103!==t&&t!==x&&666!==t?S(e,m):(e.state=null,t===x?S(e,-3):l):m},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,u,h,f=t.length;if(!e||!e.state)return m;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==k||r.lookahead)return m;for(1===s&&(e.adler=c(e.adler,t,f,0)),r.wrap=0,f>=r.w_size&&(0===s&&(C(r.head),r.strstart=0,r.block_start=0,r.insert=0),h=new d.Buf8(r.w_size),d.arraySet(h,t,f-r.w_size,r.w_size,0),t=h,f=r.w_size),a=e.avail_in,o=e.next_in,u=e.input,e.avail_in=f,e.next_in=0,e.input=t,R(r);r.lookahead>=b;){for(n=r.strstart,i=r.lookahead-(b-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+b-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=b-1,R(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=b-1,r.match_available=0,e.next_in=o,e.input=u,e.avail_in=a,r.wrap=s,l},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,u,h,f,l,d,c,p,m,_,g,v,b,w,y,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),u=r.dmax,h=r.wsize,f=r.whave,l=r.wnext,d=r.window,c=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,v=(1<<r.distbits)-1;e:do{p<15&&(c+=z[n++]<<p,p+=8,c+=z[n++]<<p,p+=8),b=m[c&g];t:for(;;){if(c>>>=w=b>>>24,p-=w,0==(w=b>>>16&255))C[s++]=65535&b;else{if(!(16&w)){if(0==(64&w)){b=m[(65535&b)+(c&(1<<w)-1)];continue t}if(32&w){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}y=65535&b,(w&=15)&&(p<w&&(c+=z[n++]<<p,p+=8),y+=c&(1<<w)-1,c>>>=w,p-=w),p<15&&(c+=z[n++]<<p,p+=8,c+=z[n++]<<p,p+=8),b=_[c&v];r:for(;;){if(c>>>=w=b>>>24,p-=w,!(16&(w=b>>>16&255))){if(0==(64&w)){b=_[(65535&b)+(c&(1<<w)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&b,p<(w&=15)&&(c+=z[n++]<<p,(p+=8)<w&&(c+=z[n++]<<p,p+=8)),u<(k+=c&(1<<w)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(c>>>=w,p-=w,(w=s-a)<k){if(f<(w=k-w)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=d,(x=0)===l){if(x+=h-w,w<y){for(y-=w;C[s++]=d[x++],--w;);x=s-k,S=C}}else if(l<w){if(x+=h+l-w,(w-=l)<y){for(y-=w;C[s++]=d[x++],--w;);if(x=0,l<y){for(y-=w=l;C[s++]=d[x++],--w;);x=s-k,S=C}}}else if(x+=l-w,w<y){for(y-=w;C[s++]=d[x++],--w;);x=s-k,S=C}for(;2<y;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],y-=3;y&&(C[s++]=S[x++],1<y&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(y-=3););y&&(C[s++]=C[x++],1<y&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=y=p>>3,c&=(1<<(p-=y<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=c,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function u(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function h(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=u(e,t))!==N&&(e.state=null),r):U}var f,l,d=!0;function j(e){if(d){var t;for(f=new I.Buf32(512),l=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,f,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,l,0,e.work,{bits:5}),d=!1}e.lencode=f,e.lenbits=9,e.distcode=l,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=u,r.inflateResetKeep=a,r.inflateInit=function(e){return h(e,15)},r.inflateInit2=h,r.inflate=function(e,t){var r,n,i,s,a,o,u,h,f,l,d,c,p,m,_,g,v,b,w,y,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,u=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,h=r.hold,f=r.bits,l=o,d=u,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(2&r.wrap&&35615===h){E[r.check=0]=255&h,E[1]=h>>>8&255,r.check=B(r.check,E,2,0),f=h=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&h)<<8)+(h>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&h)){e.msg="unknown compression method",r.mode=30;break}if(f-=4,k=8+(15&(h>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&h?10:12,f=h=0;break;case 2:for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(r.flags=h,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=h>>8&1),512&r.flags&&(E[0]=255&h,E[1]=h>>>8&255,r.check=B(r.check,E,2,0)),f=h=0,r.mode=3;case 3:for(;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.head&&(r.head.time=h),512&r.flags&&(E[0]=255&h,E[1]=h>>>8&255,E[2]=h>>>16&255,E[3]=h>>>24&255,r.check=B(r.check,E,4,0)),f=h=0,r.mode=4;case 4:for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.head&&(r.head.xflags=255&h,r.head.os=h>>8),512&r.flags&&(E[0]=255&h,E[1]=h>>>8&255,r.check=B(r.check,E,2,0)),f=h=0,r.mode=5;case 5:if(1024&r.flags){for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.length=h,r.head&&(r.head.extra_len=h),512&r.flags&&(E[0]=255&h,E[1]=h>>>8&255,r.check=B(r.check,E,2,0)),f=h=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(c=r.length)&&(c=o),c&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,c,k)),512&r.flags&&(r.check=B(r.check,n,c,s)),o-=c,s+=c,r.length-=c),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(c=0;k=n[s+c++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,n,c,s)),o-=c,s+=c,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(c=0;k=n[s+c++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,n,c,s)),o-=c,s+=c,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(h!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}f=h=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}e.adler=r.check=L(h),f=h=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=u,e.next_in=s,e.avail_in=o,r.hold=h,r.bits=f,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){h>>>=7&f,f-=7&f,r.mode=27;break}for(;f<3;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}switch(r.last=1&h,f-=1,3&(h>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;h>>>=2,f-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}h>>>=2,f-=2;break;case 14:for(h>>>=7&f,f-=7&f;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if((65535&h)!=(h>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&h,f=h=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(c=r.length){if(o<c&&(c=o),u<c&&(c=u),0===c)break e;I.arraySet(i,n,s,c,a),o-=c,s+=c,u-=c,a+=c,r.length-=c;break}r.mode=12;break;case 17:for(;f<14;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(r.nlen=257+(31&h),h>>>=5,f-=5,r.ndist=1+(31&h),h>>>=5,f-=5,r.ncode=4+(15&h),h>>>=4,f-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;f<3;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.lens[A[r.have++]]=7&h,h>>>=3,f-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[h&(1<<r.lenbits)-1])>>>16&255,v=65535&C,!((_=C>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(v<16)h>>>=_,f-=_,r.lens[r.have++]=v;else{if(16===v){for(z=_+2;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(h>>>=_,f-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],c=3+(3&h),h>>>=2,f-=2}else if(17===v){for(z=_+3;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}f-=_,k=0,c=3+(7&(h>>>=_)),h>>>=3,f-=3}else{for(z=_+7;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}f-=_,k=0,c=11+(127&(h>>>=_)),h>>>=7,f-=7}if(r.have+c>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;c--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=u){e.next_out=a,e.avail_out=u,e.next_in=s,e.avail_in=o,r.hold=h,r.bits=f,R(e,d),a=e.next_out,i=e.output,u=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,h=r.hold,f=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[h&(1<<r.lenbits)-1])>>>16&255,v=65535&C,!((_=C>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(g&&0==(240&g)){for(b=_,w=g,y=v;g=(C=r.lencode[y+((h&(1<<b+w)-1)>>b)])>>>16&255,v=65535&C,!(b+(_=C>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}h>>>=b,f-=b,r.back+=b}if(h>>>=_,f-=_,r.back+=_,r.length=v,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.length+=h&(1<<r.extra)-1,h>>>=r.extra,f-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[h&(1<<r.distbits)-1])>>>16&255,v=65535&C,!((_=C>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(0==(240&g)){for(b=_,w=g,y=v;g=(C=r.distcode[y+((h&(1<<b+w)-1)>>b)])>>>16&255,v=65535&C,!(b+(_=C>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}h>>>=b,f-=b,r.back+=b}if(h>>>=_,f-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=v,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.offset+=h&(1<<r.extra)-1,h>>>=r.extra,f-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===u)break e;if(c=d-u,r.offset>c){if((c=r.offset-c)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=c>r.wnext?(c-=r.wnext,r.wsize-c):r.wnext-c,c>r.length&&(c=r.length),m=r.window}else m=i,p=a-r.offset,c=r.length;for(u<c&&(c=u),u-=c,r.length-=c;i[a++]=m[p++],--c;);0===r.length&&(r.mode=21);break;case 26:if(0===u)break e;i[a++]=r.length,u--,r.mode=21;break;case 27:if(r.wrap){for(;f<32;){if(0===o)break e;o--,h|=n[s++]<<f,f+=8}if(d-=u,e.total_out+=d,r.total+=d,d&&(e.adler=r.check=r.flags?B(r.check,i,d,a-d):O(r.check,i,d,a-d)),d=u,(r.flags?h:L(h))!==r.check){e.msg="incorrect data check",r.mode=30;break}f=h=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(h!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}f=h=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=u,e.next_in=s,e.avail_in=o,r.hold=h,r.bits=f,(r.wsize||d!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,d-e.avail_out)?(r.mode=31,-4):(l-=e.avail_in,d-=e.avail_out,e.total_in+=l,e.total_out+=d,r.total+=d,r.wrap&&d&&(e.adler=r.check=r.flags?B(r.check,i,d,e.next_out-d):O(r.check,i,d,e.next_out-d)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==l&&0===d||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var u,h,f,l,d,c,p,m,_,g=o.bits,v=0,b=0,w=0,y=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(v=0;v<=15;v++)O[v]=0;for(b=0;b<n;b++)O[t[r+b]]++;for(k=g,y=15;1<=y&&0===O[y];y--);if(y<k&&(k=y),0===y)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(w=1;w<y&&0===O[w];w++);for(k<w&&(k=w),v=z=1;v<=15;v++)if(z<<=1,(z-=O[v])<0)return-1;if(0<z&&(0===e||1!==y))return-1;for(B[1]=0,v=1;v<15;v++)B[v+1]=B[v]+O[v];for(b=0;b<n;b++)0!==t[r+b]&&(a[B[t[r+b]]++]=b);if(c=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),v=w,d=s,S=b=E=0,f=-1,l=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=v-S,_=a[b]<c?(m=0,a[b]):a[b]>c?(m=R[T+a[b]],A[I+a[b]]):(m=96,0),u=1<<v-S,w=h=1<<x;i[d+(E>>S)+(h-=u)]=p<<24|m<<16|_|0,0!==h;);for(u=1<<v-1;E&u;)u>>=1;if(0!==u?(E&=u-1,E+=u):E=0,b++,0==--O[v]){if(v===y)break;v=t[r+a[b]]}if(k<v&&(E&l)!==f){for(0===S&&(S=k),d+=w,z=1<<(x=v-S);x+S<y&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[f=E&l]=k<<24|x<<16|d-s|0}}return 0!==E&&(i[d+E]=v-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var o=e("../utils/common");function n(e){for(var t=e.length;0<=--t;)e[t]=0}var _=15,i=16,u=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],h=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],f=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],l=new Array(576);n(l);var d=new Array(60);n(d);var c=new Array(512);n(c);var p=new Array(256);n(p);var m=new Array(29);n(m);var g,v,b,w=new Array(30);function y(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function s(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function k(e){return e<256?c[e]:c[256+(e>>>7)]}function x(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function S(e,t,r){e.bi_valid>i-r?(e.bi_buf|=t<<e.bi_valid&65535,x(e,e.bi_buf),e.bi_buf=t>>i-e.bi_valid,e.bi_valid+=r-i):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function z(e,t,r){S(e,r[2*t],r[2*t+1])}function C(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function E(e,t,r){var n,i,s=new Array(_+1),a=0;for(n=1;n<=_;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=C(s[o]++,o))}}function A(e){var t;for(t=0;t<286;t++)e.dyn_ltree[2*t]=0;for(t=0;t<30;t++)e.dyn_dtree[2*t]=0;for(t=0;t<19;t++)e.bl_tree[2*t]=0;e.dyn_ltree[512]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function I(e){8<e.bi_valid?x(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function O(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function B(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&O(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!O(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function R(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?z(e,i,t):(z(e,(s=p[i])+256+1,t),0!==(a=u[s])&&S(e,i-=m[s],a),z(e,s=k(--n),r),0!==(a=h[s])&&S(e,n-=w[s],a)),o<e.last_lit;);z(e,256,t)}function T(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,u=t.stat_desc.elems,h=-1;for(e.heap_len=0,e.heap_max=573,r=0;r<u;r++)0!==s[2*r]?(e.heap[++e.heap_len]=h=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=h<2?++h:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=h,r=e.heap_len>>1;1<=r;r--)B(e,s,r);for(i=u;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],B(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,B(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,u=t.dyn_tree,h=t.max_code,f=t.stat_desc.static_tree,l=t.stat_desc.has_stree,d=t.stat_desc.extra_bits,c=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=_;s++)e.bl_count[s]=0;for(u[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<573;r++)p<(s=u[2*u[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),u[2*n+1]=s,h<n||(e.bl_count[s]++,a=0,c<=n&&(a=d[n-c]),o=u[2*n],e.opt_len+=o*(s+a),l&&(e.static_len+=o*(f[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)h<(i=e.heap[--r])||(u[2*i+1]!==s&&(e.opt_len+=(s-u[2*i+1])*u[2*i],u[2*i+1]=s),n--)}}(e,t),E(s,h,e.bl_count)}function D(e,t,r){var n,i,s=-1,a=t[1],o=0,u=7,h=4;for(0===a&&(u=138,h=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<u&&i===a||(o<h?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[32]++):o<=10?e.bl_tree[34]++:e.bl_tree[36]++,s=i,h=(o=0)===a?(u=138,3):i===a?(u=6,3):(u=7,4))}function F(e,t,r){var n,i,s=-1,a=t[1],o=0,u=7,h=4;for(0===a&&(u=138,h=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<u&&i===a)){if(o<h)for(;z(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(z(e,i,e.bl_tree),o--),z(e,16,e.bl_tree),S(e,o-3,2)):o<=10?(z(e,17,e.bl_tree),S(e,o-3,3)):(z(e,18,e.bl_tree),S(e,o-11,7));s=i,h=(o=0)===a?(u=138,3):i===a?(u=6,3):(u=7,4)}}n(w);var N=!1;function U(e,t,r,n){var i,s,a;S(e,0+(n?1:0),3),s=t,a=r,I(i=e),x(i,a),x(i,~a),o.arraySet(i.pending_buf,i.window,s,a,i.pending),i.pending+=a}r._tr_init=function(e){N||(function(){var e,t,r,n,i,s=new Array(_+1);for(n=r=0;n<28;n++)for(m[n]=r,e=0;e<1<<u[n];e++)p[r++]=n;for(p[r-1]=n,n=i=0;n<16;n++)for(w[n]=i,e=0;e<1<<h[n];e++)c[i++]=n;for(i>>=7;n<30;n++)for(w[n]=i<<7,e=0;e<1<<h[n]-7;e++)c[256+i++]=n;for(t=0;t<=_;t++)s[t]=0;for(e=0;e<=143;)l[2*e+1]=8,e++,s[8]++;for(;e<=255;)l[2*e+1]=9,e++,s[9]++;for(;e<=279;)l[2*e+1]=7,e++,s[7]++;for(;e<=287;)l[2*e+1]=8,e++,s[8]++;for(E(l,287,s),e=0;e<30;e++)d[2*e+1]=5,d[2*e]=C(e,5);g=new y(l,u,257,286,_),v=new y(d,h,0,30,_),b=new y(new Array(0),a,0,19,7)}(),N=!0),e.l_desc=new s(e.dyn_ltree,g),e.d_desc=new s(e.dyn_dtree,v),e.bl_desc=new s(e.bl_tree,b),e.bi_buf=0,e.bi_valid=0,A(e)},r._tr_stored_block=U,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return 0;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return 1;for(t=32;t<256;t++)if(0!==e.dyn_ltree[2*t])return 1;return 0}(e)),T(e,e.l_desc),T(e,e.d_desc),a=function(e){var t;for(D(e,e.dyn_ltree,e.l_desc.max_code),D(e,e.dyn_dtree,e.d_desc.max_code),T(e,e.bl_desc),t=18;3<=t&&0===e.bl_tree[2*f[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?U(e,t,r,n):4===e.strategy||s===i?(S(e,2+(n?1:0),3),R(e,l,d)):(S(e,4+(n?1:0),3),function(e,t,r,n){var i;for(S(e,t-257,5),S(e,r-1,5),S(e,n-4,4),i=0;i<n;i++)S(e,e.bl_tree[2*f[i]+1],3);F(e,e.dyn_ltree,t-1),F(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),R(e,e.dyn_ltree,e.dyn_dtree)),A(e),n&&I(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(p[r]+256+1)]++,e.dyn_dtree[2*k(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){var t;S(e,2,3),z(e,256,l),16===(t=e).bi_valid?(x(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):8<=t.bi_valid&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){"use strict";t.exports="function"==typeof setImmediate?setImmediate:function(){var e=[].slice.apply(arguments);e.splice(1,0,0),setTimeout.apply(null,e)}},{}]},{},[10])(10)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});






// INCLUDE FILESAVER - https://github.com/eligrey/FileSaver.js/blob/master/dist/FileSaver.js
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.FileSaver = mod.exports;
  }
})(this, function () {
  "use strict";

  /*
  * FileSaver.js
  * A saveAs() FileSaver implementation.
  *
  * By Eli Grey, http://eligrey.com
  *
  * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
  * source  : http://purl.eligrey.com/github/FileSaver.js
  */
  // The one and only way of getting global scope in all environments
  // https://stackoverflow.com/q/3277182/1008999
  var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;

  function bom(blob, opts) {
    if (typeof opts === 'undefined') opts = {
      autoBom: false
    };else if (typeof opts !== 'object') {
      console.warn('Deprecated: Expected third argument to be a object');
      opts = {
        autoBom: !opts
      };
    } // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF

    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(0xFEFF), blob], {
        type: blob.type
      });
    }

    return blob;
  }

  function download(url, name, opts) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = function () {
      saveAs(xhr.response, name, opts);
    };

    xhr.onerror = function () {
      console.error('could not download file');
    };

    xhr.send();
  }

  function corsEnabled(url) {
    var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker

    xhr.open('HEAD', url, false);

    try {
      xhr.send();
    } catch (e) {}

    return xhr.status >= 200 && xhr.status <= 299;
  } // `a.click()` doesn't work for all browsers (#465)


  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  } // Detect WebView inside a native macOS app by ruling out all browsers
  // We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
  // https://www.whatismybrowser.com/guides/the-latest-user-agent/macos


  var isMacOSWebView = /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);
  var saveAs = _global.saveAs || ( // probably in some web worker
  typeof window !== 'object' || window !== _global ? function saveAs() {}
  /* noop */
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
  : 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? function saveAs(blob, name, opts) {
    var URL = _global.URL || _global.webkitURL;
    var a = document.createElement('a');
    name = name || blob.name || 'download';
    a.download = name;
    a.rel = 'noopener'; // tabnabbing
    // TODO: detect chrome extensions & packaged apps
    // a.target = '_blank'

    if (typeof blob === 'string') {
      // Support regular links
      a.href = blob;

      if (a.origin !== location.origin) {
        corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
      } else {
        click(a);
      }
    } else {
      // Support blobs
      a.href = URL.createObjectURL(blob);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 4E4); // 40s

      setTimeout(function () {
        click(a);
      }, 0);
    }
  } // Use msSaveOrOpenBlob as a second approach
  : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
    name = name || blob.name || 'download';

    if (typeof blob === 'string') {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        var a = document.createElement('a');
        a.href = blob;
        a.target = '_blank';
        setTimeout(function () {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  } // Fallback to using FileReader and a popup
  : function saveAs(blob, name, opts, popup) {
    // Open a popup immediately do go around popup blocker
    // Mostly only available on user interaction and the fileReader is async so...
    popup = popup || open('', '_blank');

    if (popup) {
      popup.document.title = popup.document.body.innerText = 'downloading...';
    }

    if (typeof blob === 'string') return download(blob, name, opts);
    var force = blob.type === 'application/octet-stream';

    var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;

    var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
      // Safari doesn't allow downloading of blob URLs
      var reader = new FileReader();

      reader.onloadend = function () {
        var url = reader.result;
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
        if (popup) popup.location.href = url;else location = url;
        popup = null; // reverse-tabnabbing #460
      };

      reader.readAsDataURL(blob);
    } else {
      var URL = _global.URL || _global.webkitURL;
      var url = URL.createObjectURL(blob);
      if (popup) popup.location = url;else location.href = url;
      popup = null; // reverse-tabnabbing #460

      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 4E4); // 40s
    }
  });
  _global.saveAs = saveAs.saveAs = saveAs;

  if (typeof module !== 'undefined') {
    module.exports = saveAs;
  }
});

// INCLUDE - WAPI

(function(console){
console.save = function(data, filename){
    if(!data) {
        console.error('Console.save: No data')
        return;
    }
    if(!filename) filename = 'console.json'
    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
	
	//field = document.getElementById("field");
    var e = document.createEvent("KeyboardEvent");
    e.initKeyboardEvent("keydown", true, true, window,true, false, false, false,13, 0);
    //field.dispatchEvent(e);
	a.dispatchEvent(e);
 }
})(console)

/**
 * This script contains WAPI functions that need to be run in the context of the webpage
 */

/**
 * Auto discovery the webpack object references of instances that contains all functions used by the WAPI
 * functions and creates the Store object.
 */

/**
 * This script contains WAPI functions that need to be run in the context of the webpage
 */

/**
 * Auto discovery the webpack object references of instances that contains all functions used by the WAPI
 * functions and creates the Store object.
 */

if (!window.Store||!window.Store.Msg) {
    (function () {
        function getStore(modules) {
            let foundCount = 0;
            let neededObjects = [
                { id: "Store", conditions: (module) => (module.default && module.default.Chat && module.default.Msg) ? module.default : null},
                { id: "MediaCollection", conditions: (module) => (module.default && module.default.prototype && (module.default.prototype.processFiles !== undefined||module.default.prototype.processAttachments !== undefined)) ? module.default : null },
                { id: "MediaProcess", conditions: (module) => (module.BLOB) ? module : null },
                { id: "Archive", conditions: (module) => (module.setArchive) ? module : null },
                { id: "Block", conditions: (module) => (module.blockContact && module.unblockContact) ? module : null },
                { id: "ChatUtil", conditions: (module) => (module.sendClear) ? module : null },
                { id: "GroupInvite", conditions: (module) => (module.queryGroupInviteCode) ? module : null },
                { id: "Wap", conditions: (module) => (module.createGroup) ? module : null },
                { id: "ServiceWorker", conditions: (module) => (module.default && module.default.killServiceWorker) ? module : null },
                { id: "State", conditions: (module) => (module.STATE && module.STREAM) ? module : null },
                { id: "_Presence", conditions: (module) => (module.setPresenceAvailable && module.setPresenceUnavailable) ? module : null },
                { id: "WapDelete", conditions: (module) => (module.sendConversationDelete && module.sendConversationDelete.length == 2) ? module : null },
                { id: "Conn", conditions: (module) => (module.default && module.default.ref && module.default.refTTL) ? module.default : null },
                { id: "WapQuery", conditions: (module) => (module.queryExist) ? module : ((module.default && module.default.queryExist) ? module.default : null) },
                { id: "CryptoLib", conditions: (module) => (module.decryptE2EMedia) ? module : null },
                { id: "OpenChat", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.openChat) ? module.default : null },
                { id: "UserConstructor", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.isServer && module.default.prototype.isUser) ? module.default : null },
                { id: "SendTextMsgToChat", conditions: (module) => (module.sendTextMsgToChat) ? module.sendTextMsgToChat : null },
                { id: "ReadSeen", conditions: (module) => (module.sendSeen) ? module : null },
                { id: "sendDelete", conditions: (module) => (module.sendDelete) ? module.sendDelete : null },
                { id: "addAndSendMsgToChat", conditions: (module) => (module.addAndSendMsgToChat) ? module.addAndSendMsgToChat : null },
                { id: "sendMsgToChat", conditions: (module) => (module.sendMsgToChat) ? module.sendMsgToChat : null },
                { id: "Catalog", conditions: (module) => (module.Catalog) ? module.Catalog : null },
                { id: "bp", conditions: (module) => (module.default&&module.default.toString&&module.default.toString().includes('bp_unknown_version')) ? module.default : null },
                { id: "MsgKey", conditions: (module) => (module.default&&module.default.toString&&module.default.toString().includes('MsgKey error: obj is null/undefined')) ? module.default : null },
                { id: "Parser", conditions: (module) => (module.convertToTextWithoutSpecialEmojis) ? module.default : null },
                { id: "Builders", conditions: (module) => (module.TemplateMessage && module.HydratedFourRowTemplate) ? module : null },
                { id: "Me", conditions: (module) => (module.PLATFORMS && module.Conn) ? module.default : null },
                { id: "CallUtils", conditions: (module) => (module.sendCallEnd && module.parseCall) ? module : null },
                { id: "Identity", conditions: (module) => (module.queryIdentity && module.updateIdentity) ? module : null },
                { id: "MyStatus", conditions: (module) => (module.getStatus && module.setMyStatus) ? module : null },
                { id: "ChatStates", conditions: (module) => (module.sendChatStatePaused && module.sendChatStateRecording && module.sendChatStateComposing) ? module : null },
                { id: "GroupActions", conditions: (module) => (module.sendExitGroup && module.localExitGroup) ? module : null },
                { id: "Features", conditions: (module) => (module.FEATURE_CHANGE_EVENT && module.features) ? module : null },
                { id: "MessageUtils", conditions: (module) => (module.storeMessages && module.appendMessage) ? module : null },
                { id: "WebMessageInfo", conditions: (module) => (module.WebMessageInfo && module.WebFeatures) ? module.WebMessageInfo : null },
                { id: "createMessageKey", conditions: (module) => (module.createMessageKey && module.createDeviceSentMessage) ? module.createMessageKey : null },
                { id: "Participants", conditions: (module) => (module.addParticipants && module.removeParticipants && module.promoteParticipants && module.demoteParticipants) ? module : null },
                { id: "WidFactory", conditions: (module) => (module.isWidlike && module.createWid && module.createWidFromWidLike) ? module : null },
                { id: "Base", conditions: (module) => (module.setSubProtocol && module.binSend && module.actionNode) ? module : null },
                { id: "Versions", conditions: (module) => (module.loadProtoVersions && module.default && module.default["15"] && module.default["16"] && module.default["17"]) ? module : null },
		        { id: "Sticker", conditions: (module) => (module.default && module.default.Sticker) ? module.default.Sticker : null },
                { id: "MediaUpload", conditions: (module) => (module.default && module.default.mediaUpload) ? module.default : null },
                { id: "UploadUtils", conditions: (module) => (module.default && module.default.encryptAndUpload) ? module.default : null },
                { id: "DownloadManager", conditions: (module) => (module.default && module.default.getEncryptedMediaSize && module.default.checkExistence) ? module.default : null }
            ];
            for (let idx in modules) {
            	if ((typeof modules[idx] === "object") && (modules[idx] !== null)) {
                    neededObjects.forEach((needObj) => {
                    	if (!needObj.conditions || needObj.foundedModule)
                            return;
                    	let neededModule = needObj.conditions(modules[idx]);
                    	if (neededModule !== null) {
                            foundCount++;
                            needObj.foundedModule = neededModule;
                    	}
		    });

                    if (foundCount == neededObjects.length) {
                    	break;
                    }
            	}
            }
	    let neededStore = neededObjects.find((needObj) => needObj.id === "Store");
            window.Store = neededStore.foundedModule ? neededStore.foundedModule : {};
            neededObjects.splice(neededObjects.indexOf(neededStore), 1);
            neededObjects.forEach((needObj) => {
                if (needObj.foundedModule) {
                    window.Store[needObj.id] = needObj.foundedModule;
                }
            });
	    if(window.Store.Chat) window.Store.Chat.modelClass.prototype.sendMessage = function (e) {
		window.Store.SendTextMsgToChat(this, ...arguments);
	    }
            return window.Store;
    	}
        const parasite = `parasite${Date.now()}`
        // webpackJsonp([], { [parasite]: (x, y, z) => getStore(z) }, [parasite]);
        if (typeof webpackJsonp === 'function') webpackJsonp([], {[parasite]: (x, y, z) => getStore(z)}, [parasite]); 
        else webpackChunkwhatsapp_web_client.push([[parasite], {}, function (o, e, t) {let modules = []; for (let idx in o.m) {modules.push(o(idx));}	getStore(modules);}]);        
    })();
}

window.WAPI = {};
window._WAPI = {};

window.WAPI._serializeRawObj = (obj) => {
    if (obj && obj.toJSON) {
        return obj.toJSON();
    }
    return {}
};

/**
 * Serializes a chat object
 *
 * @param rawChat Chat object
 * @returns {{}}
 */

window.WAPI._serializeChatObj = (obj) => {
    if (obj == undefined) {
        return null;
    }
    return Object.assign(window.WAPI._serializeRawObj(obj), {
        id: obj.id._serialized,
        kind: obj.kind,
        isGroup: obj.isGroup,
        formattedTitle: obj.formattedTitle,
        contact: obj['contact'] ? window.WAPI._serializeContactObj(obj['contact']) : null,
        groupMetadata: obj["groupMetadata"] ? window.WAPI._serializeRawObj(obj["groupMetadata"]) : null,
        presence: obj["presence"] ? window.WAPI._serializeRawObj(obj["presence"]) : null,
        msgs: null
    });
};

window.WAPI._serializeContactObj = (obj) => {
    if (obj == undefined) {
        return null;
    }
    return Object.assign(window.WAPI._serializeRawObj(obj), {
        id: obj.id._serialized,
        formattedName: obj.formattedName,
        isHighLevelVerified: obj.isHighLevelVerified,
        isMe: obj.isMe,
        isMyContact: obj.isMyContact,
        isPSA: obj.isPSA,
        isUser: obj.isUser,
        isVerified: obj.isVerified,
        isWAContact: obj.isWAContact,
        profilePicThumbObj: obj.profilePicThumb ? WAPI._serializeProfilePicThumb(obj.profilePicThumb) : {},
        statusMute: obj.statusMute,
        msgs: null
    });
};


window.WAPI._serializeMessageObj = (obj) => {
    if (obj == undefined) {
        return null;
    }
    const _chat = obj['chat'] ? WAPI._serializeChatObj(obj['chat']) : {};
    console.log(obj);
	if(obj.quotedMsg) obj.quotedMsg;
    return Object.assign(window.WAPI._serializeRawObj(obj), {
        id: obj.id._serialized,
        from: obj.from._serialized,
        quotedParticipant: obj.quotedParticipant? obj.quotedParticipant._serialized ? obj.quotedParticipant._serialized : undefined : undefined,
        author: obj.author? obj.author._serialized ? obj.author._serialized : undefined : undefined,
        chatId: obj.chatId? obj.chatId._serialized ? obj.chatId._serialized : undefined : undefined,
        to: obj.to? obj.to._serialized ? obj.to._serialized : undefined : undefined,
        fromMe: obj.id.fromMe,
        sender: obj["senderObj"] ? WAPI._serializeContactObj(obj["senderObj"]) : null,
        timestamp: obj["t"],
        content: obj["body"],
        isGroupMsg: obj.isGroupMsg,
        isLink: obj.isLink,
        isMMS: obj.isMMS,
        isMedia: obj.isMedia,
        isNotification: obj.isNotification,
        isPSA: obj.isPSA,
        type: obj.type,
        chat: _chat,
        isOnline: _chat.isOnline,
        lastSeen: _chat.lastSeen,
        chatId: obj.id.remote,
		quotedMsgObj: obj.quotedMsg,
        mediaData: window.WAPI._serializeRawObj(obj['mediaData']),
        reply: body => window.WAPI.reply(_chat.id._serialized, body, obj)
    });
};

window.WAPI._serializeNumberStatusObj = (obj) => {
    if (obj == undefined) {
        return null;
    }

    return Object.assign({}, {
        id: obj.jid,
        status: obj.status,
        isBusiness: (obj.biz === true),
        canReceiveMessage: (obj.status === 200)
    });
};

window.WAPI._serializeProfilePicThumb = (obj) => {
    if (obj == undefined) {
        return null;
    }

    return Object.assign({}, {
        eurl: obj.eurl,
        id: obj.id,
        img: obj.img,
        imgFull: obj.imgFull,
        raw: obj.raw,
        tag: obj.tag
    });
}

window.WAPI.createGroup = async function (name, contactsId) {
    if (!Array.isArray(contactsId)) {
        contactsId = [contactsId];
    }
    return await window.Store.WapQuery.createGroup(name, contactsId);
};

/**
 * Sends the command for your device to leave a group.
 * @param groupId stirng, the is for the group.
 * returns Promise<void>
 */
window.WAPI.leaveGroup = function (groupId) {
    groupId = typeof groupId == "string" ? groupId : groupId._serialized;
    var group = WAPI.getChat(groupId);
    return Store.GroupActions.sendExitGroup(group)
};


window.WAPI.getAllContacts = function () {
    return window.Store.Contact.map((contact) => WAPI._serializeContactObj(contact));
};

/**
 * Fetches all contact objects from store, filters them
 *
 * @returns {Array|*} List of contacts
 */
window.WAPI.getMyContacts = function () {
    return window.Store.Contact.filter((contact) => contact.isMyContact === true).map((contact) => WAPI._serializeContactObj(contact));
};

/**
 * Fetches contact object from store by ID
 *
 * @param id ID of contact
 * @returns {T|*} Contact object
 */
window.WAPI.getContact = function (id) {
    const found = window.Store.Contact.get(id);
    return window.WAPI._serializeContactObj(found);
};

window.WAPI.syncContacts = function() {
    Store.Contact.sync()
    return true;
}

/**
 * Fetches all chat objects from store
 *
 * @returns {Array|*} List of chats
 */
window.WAPI.getAllChats = function () {
    return window.Store.Chat.map((chat) => WAPI._serializeChatObj(chat));
};

window.WAPI.haveNewMsg = function (chat) {
    return chat.unreadCount > 0;
};

window.WAPI.getAllChatsWithNewMsg = function () {
    return window.Store.Chat.filter(window.WAPI.haveNewMsg).map((chat) => WAPI._serializeChatObj(chat));
};

/**
 * Fetches all chat IDs from store
 *
 * @returns {Array|*} List of chat id's
 */
window.WAPI.getAllChatIds = function () {
    return window.Store.Chat.map((chat) => chat.id._serialized || chat.id);
};

window.WAPI.getAllNewMessages = async function () {
    return WAPI.getAllChatsWithNewMsg().map(c => WAPI.getChat(c.id)).flatMap(c => c.msgs._models.filter(x => x.isNewMsg)).map(WAPI._serializeMessageObj) || [];
}

// nnoo longer determined by x.ack==-1
window.WAPI.getAllUnreadMessages = async function () {
    return Store.Chat.models.filter(chat=>chat.unreadCount&&chat.unreadCount>0).map(unreadChat=>unreadChat.msgs.models.slice(-1*unreadChat.unreadCount)).flat().map(WAPI._serializeMessageObj)
}

window.WAPI.getIndicatedNewMessages = async function () {
    return JSON.stringify(Store.Chat.models.filter(chat=>chat.unreadCount).map(chat=>{return {id:chat.id,indicatedNewMessages: chat.msgs.models.slice(Math.max(chat.msgs.length - chat.unreadCount, 0)).filter(msg=>!msg.id.fromMe)}}))
}

window.WAPI.getSingleProperty = function (namespace,id,property){
    if(Store[namespace] && Store[namespace].get(id) && Object.keys(Store[namespace].get(id)).find(x=>x.includes(property))) return Store[namespace].get(id)[property];
    return 404
}

window.WAPI.getAllChatsWithMessages = async function (onlyNew) {
    let x = [];
    if (onlyNew) { x.push(WAPI.getAllChatsWithNewMsg().map(c => WAPI.getChat(c.id._serialized))); }
    else {
        x.push(WAPI.getAllChatIds().map((c) => WAPI.getChat(c)));
    }
    const result = (await Promise.all(x)).flatMap(x => x);
    return JSON.stringify(result);
}

/**
 * Fetches all groups objects from store
 *
 * @returns {Array|*} List of chats
 */
window.WAPI.getAllGroups = function () {
    return window.WAPI.getAllChats().filter((chat) => chat.isGroup);
};

/**
 * Sets the chat state
 * 
 * @param {0|1|2} chatState The state you want to set for the chat. Can be TYPING (1), RECRDING (2) or PAUSED (3);
 * returns {boolean}
 */
window.WAPI.sendChatstate = async function (state, chatId) {
    switch(state) {
        case 0:
            await window.Store.ChatStates.sendChatStateComposing(chatId);
            break;
        case 1:
            await window.Store.ChatStates.sendChatStateRecording(chatId);
            break;
        case 2:
            await window.Store.ChatStates.sendChatStatePaused(chatId);
            break;
        default:
            return false
    }
    return true;
};

/**
 * Fetches chat object from store by ID
 *
 * @param id ID of chat
 * @returns {T|*} Chat object
 */
window.WAPI.getChat = function (id) {
    if (!id) return false;
    id = typeof id == "string" ? id : id._serialized;
    const found = window.Store.Chat.get(id);
    if (found) found.sendMessage = (found.sendMessage) ? found.sendMessage : function () { return window.Store.sendMessage.apply(this, arguments); };
    return found;
}

/**
 * Get your status
 * @param {string} to '000000000000@c.us'
 * returns: {string,string} and string -"Hi, I am using WA"
 */
window.WAPI.getStatus = async (id) => {
return await Store.MyStatus.getStatus(id)
}

window.WAPI.getChatByName = function (name) {
    return window.WAPI.getAllChats().find((chat) => chat.name === name);
};

window.WAPI.sendImageFromDatabasePicBot = function (picId, chatId, caption) {
    var chatDatabase = window.WAPI.getChatByName('DATABASEPICBOT');
    var msgWithImg = chatDatabase.msgs.find((msg) => msg.caption == picId);

    if (msgWithImg === undefined) {
        return false;
    }
    var chatSend = WAPI.getChat(chatId);
    if (chatSend === undefined) {
        return false;
    }
    const oldCaption = msgWithImg.caption;

    msgWithImg.id.id = window.WAPI.getNewId();
    msgWithImg.id.remote = chatId;
    msgWithImg.t = Math.ceil(new Date().getTime() / 1000);
    msgWithImg.to = chatId;

    if (caption !== undefined && caption !== '') {
        msgWithImg.caption = caption;
    } else {
        msgWithImg.caption = '';
    }

    msgWithImg.collection.send(msgWithImg).then(function (e) {
        msgWithImg.caption = oldCaption;
    });

    return true;
};

window.WAPI.getGeneratedUserAgent = function (useragent) {
    if (!useragent.includes('WhatsApp')) return 'WhatsApp/0.4.315 ' + useragent;
    return useragent.replace(useragent.match(/WhatsApp\/([.\d])*/g)[0].match(/[.\d]*/g).find(x => x), window.Debug.VERSION)
}

window.WAPI.getWAVersion = function () {
    return window.Debug.VERSION;
}

/**
 * Automatically sends a link with the auto generated link preview. You can also add a custom message to be added.
 * @param chatId 
 * @param url string A link, for example for youtube. e.g https://www.youtube.com/watch?v=61O-Galzc5M
 * @param text string Custom text as body of the message, this needs to include the link or it will be appended after the link.
 */
window.WAPI.sendLinkWithAutoPreview = async function (chatId, url, text) {
    text = text || '';
    var chatSend = WAPI.getChat(chatId);
    if (chatSend === undefined) {
        return false;
    }
    const linkPreview = await Store.WapQuery.queryLinkPreview(url);
    return (await chatSend.sendMessage(text.includes(url) ? text : `${url}\n${text}`, {linkPreview}))=='OK'
}

window.WAPI.sendMessageWithThumb = function (thumb, url, title, description, text, chatId) {
    var chatSend = WAPI.getChat(chatId);
    if (chatSend === undefined) {
        return false;
    }
    var linkPreview = {
        canonicalUrl: url,
        description: description,
        matchedText: url,
        title: title,
        thumbnail: thumb // Thumbnail max size allowed: 200x200
    };
    chatSend.sendMessage(text.includes(url) ? text : `${url}\n${text}`, { linkPreview: linkPreview, mentionedJidList: [], quotedMsg: null, quotedMsgAdminGroupJid: null });
    return true;
};

window.WAPI.revokeGroupInviteLink = async function (chatId) {
    var chat = Store.Chat.get(chatId);
    if(!chat.isGroup) return false;
    await Store.GroupInvite.revokeGroupInvite(chat);
    return true;
}

window.WAPI.getGroupInviteLink = async function (chatId) {
    var chat = Store.Chat.get(chatId);
    if(!chat.isGroup) return false;
    await Store.GroupInvite.queryGroupInviteCode(chat);
    return `https://chat.whatsapp.com/${chat.inviteCode}`
}

window.WAPI.inviteInfo = async function(link){
    return await Store.WapQuery.groupInviteInfo(link.split('\/').pop()).then(r=>r.status===200?WAPI.quickClean(r):r.status);
}

window.WAPI.getNewId = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

window.WAPI.getChatById = function (id) {
    let found = WAPI.getChat(id);
    if (found) {
        found = WAPI._serializeChatObj(found);
    } else {
        found = false;
    }
    return found;
};


/**
 * I return all unread messages from an asked chat and mark them as read.
 *
 * :param id: chat id
 * :type  id: string
 *
 * :param includeMe: indicates if user messages have to be included
 * :type  includeMe: boolean
 *
 * :param includeNotifications: indicates if notifications have to be included
 * :type  includeNotifications: boolean
 *
 * :returns: list of unread messages from asked chat
 * :rtype: object
 */
window.WAPI.getUnreadMessagesInChat = function (id, includeMe, includeNotifications) {
    // get chat and its messages
    let chat = WAPI.getChat(id);
    let messages = chat.msgs._models;

    // initialize result list
    let output = [];

    // look for unread messages, newest is at the end of array
    for (let i = messages.length - 1; i >= 0; i--) {
        // system message: skip it
        if (i === "remove") {
            continue;
        }

        // get message
        let messageObj = messages[i];

        // found a read message: stop looking for others
        if (typeof (messageObj.isNewMsg) !== "boolean" || messageObj.isNewMsg === false) {
            continue;
        } else {
            messageObj.isNewMsg = false;
            // process it
            let message = WAPI.processMessageObj(messageObj,
                includeMe,
                includeNotifications);

            // save processed message on result list
            if (message)
                output.push(message);
        }
    }
    // return result list
    return output;
};


/**
 * Load more messages in chat object from server. Use this in a while loop
 *
 * @param id ID of chat
 * @returns None
 */
window.WAPI.loadEarlierMessages = async function (id) {
    const chat = WAPI.getChat(id);
    if(chat){
        const someEarlierMessages = await chat.loadEarlierMsgs(); 
        if(someEarlierMessages) return someEarlierMessages.map(WAPI._serializeMessageObj);
    }
    return false;
};

/**
 * Load more messages in chat object from store by ID
 *
 * @param id ID of chat
 * @returns None
 */
window.WAPI.loadAllEarlierMessages = async function (id) {
    const found = WAPI.getChat(id);
    while (!found.msgs.msgLoadState.noEarlierMsgs) {
        console.log('loading more messages')
        await found.loadEarlierMsgs();
    }
    return true
};

window.WAPI.asyncLoadAllEarlierMessages = async function (id) {
    return await window.WAPI.loadAllEarlierMessages(id);
};

window.WAPI.areAllMessagesLoaded = function (id) {
    const found = WAPI.getChat(id);
    if (!found.msgs.msgLoadState.noEarlierMsgs) {
        return false
    }
    return true
};

/**
 * Load more messages in chat object from store by ID till a particular date
 *
 * @param id ID of chat
 * @param lastMessage UTC timestamp of last message to be loaded
 * @returns None
 */

window.WAPI.loadEarlierMessagesTillDate = async function (id, lastMessage) {
    const found = WAPI.getChat(id);
    x = async function () {
        if (found.msgs.models[0].t > lastMessage && !found.msgs.msgLoadState.noEarlierMsgs) {
            return await found.loadEarlierMsgs().then(x);
        } else {
            return true
        }
    };
    return await x();
};


/**
 * Fetches all group metadata objects from store
 *
 * @returns {Array|*} List of group metadata
 */
window.WAPI.getAllGroupMetadata = function () {
    return window.Store.GroupMetadata.map((groupData) => groupData.all);
};

/**
 * Fetches group metadata object from store by ID
 *
 * @param id ID of group
 * @returns {T|*} Group metadata object
 */
window.WAPI.getGroupMetadata = async function (id) {
    return window.Store.GroupMetadata.find(id);
};


/**
 * Fetches group participants
 *
 * @param id ID of group
 * @returns {Promise.<*>} Yields group metadata
 * @private
 */
window.WAPI._getGroupParticipants = async function (id) {
    return (await WAPI.getGroupMetadata(id)).participants;
};

/**
 * Fetches IDs of group participants
 *
 * @param id ID of group
 * @returns {Promise.<Array|*>} Yields list of IDs
 */
window.WAPI.getGroupParticipantIDs = async function (id) {
    return (await WAPI._getGroupParticipants(id))
        .map((participant) => participant.id._serialized);
};

window.WAPI.getGroupAdmins = async function (id) {
    return (await WAPI._getGroupParticipants(id))
        .filter((participant) => participant.isAdmin)
        .map((admin) => admin.id._serialized);
};

WAPI.iAmAdmin = async function(){
    return (await Promise.all(Store.GroupMetadata.models.map(({id})=>Store.GroupMetadata.find(id)))).filter(({participants})=>participants.iAmAdmin()||participants.iAmSuperAdmin()).map(({id})=>id._serialized);
}

/**
 * Returns an object with all of your host device details
 */
window.WAPI.getMe = function(){
    return {...WAPI.quickClean({
        ...Store.Contact.get(Store.Me.wid).attributes,
        ...Store.Me.attributes
    }),
    me:Store.Me.me};
}

window.WAPI.isLoggedIn = function () {
    // Contact always exists when logged in
    const isLogged = window.Store.Contact && window.Store.Contact.checksum !== undefined;
    return isLogged;
};

window.WAPI.isConnected = function () {
    // Phone or connection Disconnected icon appears when phone or connection is disconnected
    const isConnected=(document.querySelector('[data-testid="alert-phone"]') == null && document.querySelector('[data-testid="alert-computer"]') == null) ? true : false;	
    return isConnected;
};

//I dont think this will work for group chats.
window.WAPI.isChatOnline = async function (id) {
    return Store.Chat.get(id)?await Store.Chat.get(id).presence.subscribe().then(_=>Store.Chat.get(id).presence.attributes.isOnline):false;
}

window.WAPI.processMessageObj = function (messageObj, includeMe, includeNotifications) {
    if (messageObj.isNotification) {
        if (includeNotifications)
            return WAPI._serializeMessageObj(messageObj);
        else
            return;
        // System message
        // (i.e. "Messages you send to this chat and calls are now secured with end-to-end encryption...")
    } else if (messageObj.id.fromMe === false || includeMe) {
        return WAPI._serializeMessageObj(messageObj);
    }
    return;
};

window.WAPI.getAllMessagesInChat = function (id, includeMe = false, includeNotifications = false, clean = false) {
    const chat = WAPI.getChat(id);
    let output = chat.msgs._models || [];
    if(!includeMe) output =  output.filter(m=> !m.id.fromMe)
    if(!includeNotifications) output = output.filter(m=> !m.isNotification)
    return (clean ? output.map(WAPI.quickClean) : output.map(WAPI._serializeMessageObj)) || [];
};

window.WAPI.loadAndGetAllMessagesInChat = function (id, includeMe, includeNotifications) {
    return WAPI.loadAllEarlierMessages(id).then(_ => {
        const chat = WAPI.getChat(id);
        let output = [];
        const messages = chat.msgs._models;

        for (const i in messages) {
            if (i === "remove") {
                continue;
            }
            const messageObj = messages[i];

            let message = WAPI.processMessageObj(messageObj, includeMe, includeNotifications)
            if (message)
                output.push(message);
        }
        return output;
    })
};

window.WAPI.getAllMessageIdsInChat = function (id, includeMe, includeNotifications) {
    const chat = WAPI.getChat(id);
    let output = [];
    const messages = chat.msgs._models;

    for (const i in messages) {
        if ((i === "remove")
            || (!includeMe && messages[i].isMe)
            || (!includeNotifications && messages[i].isNotification)) {
            continue;
        }
        output.push(messages[i].id._serialized);
    }
    return output;
};

window.WAPI.getMessageById = function (id) {
    let result = false;
    try {
        let msg = window.Store.Msg.get(id);
        if (msg) {
            result = WAPI.processMessageObj(msg, true, true);
        }
    } catch (err) { }
        return result;
};

window.WAPI.sendMessageWithMentions = async function (ch, body) {
    var chat = ch.id ? ch : Store.Chat.get(ch);
    var chatId = chat.id._serialized;
    var msgIveSent = chat.msgs.filter(msg => msg.__x_isSentByMe)[0];
    if(!msgIveSent) return chat.sendMessage(body);
    var tempMsg = Object.create(msgIveSent);
    var newId = window.WAPI.getNewMessageId(chatId);
    var mentionedJidList = body.match(/@(\d*)/g).filter(x=>x.length>5).map(x=>Store.Contact.get(x.replace("@","")+"@c.us") ? new Store.WidFactory.createUserWid(x.replace("@","")) : '') || undefined;
    var extend = {
        ack: 0,
        id: newId,
        local: !0,
        self: "out",
        t: parseInt(new Date().getTime() / 1000),
        to: new Store.WidFactory.createWid(chatId),
        isNewMsg: !0,
        type: "chat",
        body,
        quotedMsg:null,
        mentionedJidList
    };
    Object.assign(tempMsg, extend);
    await Store.addAndSendMsgToChat(chat, tempMsg)
    return newId._serialized;
}

window.WAPI.sendMessageReturnId = async function (ch, body) {
    var chat = ch.id ? ch : Store.Chat.get(ch);
    var chatId = chat.id._serialized;
    var msgIveSent = chat.msgs.filter(msg => msg.__x_isSentByMe)[0];
    if(!msgIveSent) return chat.sendMessage(body);
    var tempMsg = Object.create(msgIveSent);
    var newId = window.WAPI.getNewMessageId(chatId);
    var extend = {
        ack: 0,
        id: newId,
        local: !0,
        self: "out",
        t: parseInt(new Date().getTime() / 1000),
        to: new Store.WidFactory.createWid(chatId),
        isNewMsg: !0,
        type: "chat",
        body,
        quotedMsg:null
    };
    Object.assign(tempMsg, extend);
    await Store.addAndSendMsgToChat(chat, tempMsg)
    return newId._serialized;
}


window.WAPI.sendMessage = async function (id, message) {
    if(id==='status@broadcast') return 'Not able to send message to broadcast';
    let chat = WAPI.getChat(id);
    if((!chat && !id.includes('g') || chat.msgs.models.length == 0)) {
        var contact = WAPI.getContact(id)
        if(!contact || !contact.isMyContact) return 'Not a contact';
        await Store.Chat.find(Store.Contact.get(id).id)
        chat = WAPI.getChat(id);
    }
    if (chat !== undefined) {
            // return WAPI.sendMessageReturnId(chat,message).then(id=>{return id})
            return await chat.sendMessage(message).then(_=>chat.lastReceivedKey._serialized);
    } 
    return false;
    };


window.WAPI.sendSeen = async function (id) {
    if (!id) return false;
    var chat = window.WAPI.getChat(id);
    if (chat !== undefined) {
            await Store.ReadSeen.sendSeen(chat, false);
            return true;
    }
    return false;
};

window.WAPI.markAsUnread = async function (id) {
    var chat = window.WAPI.getChat(id);
    if (chat !== undefined) {
            await Store.ReadSeen.markUnread(chat, true);
            return true;
    }
    return false;
};

window.isChatMessage = function (message) {
    if (message.isSentByMe) {
        return false;
    }
    if (message.isNotification) {
        return false;
    }
    if (!message.isUserCreatedType) {
        return false;
    }
    return true;
}

window.WAPI.setPresence = function (available) {
    if(available)Store._Presence.setPresenceAvailable();
    else Store._Presence.setPresenceUnavailable();
}

window.WAPI.getUnreadMessages = function (includeMe, includeNotifications, use_unread_count) {
    const chats = window.Store.Chat.models;
    let output = [];

    for (let chat in chats) {
        if (isNaN(chat)) {
            continue;
        }

        let messageGroupObj = chats[chat];
        let messageGroup = WAPI._serializeChatObj(messageGroupObj);

        messageGroup.messages = [];

        const messages = messageGroupObj.msgs._models;
        for (let i = messages.length - 1; i >= 0; i--) {
            let messageObj = messages[i];
            if (typeof (messageObj.isNewMsg) != "boolean" || messageObj.isNewMsg === false) {
                continue;
            } else {
                messageObj.isNewMsg = false;
                let message = WAPI.processMessageObj(messageObj, includeMe, includeNotifications);
                if (message) {
                    messageGroup.messages.push(message);
                }
            }
        }

        if (messageGroup.messages.length > 0) {
            output.push(messageGroup);
        } else { // no messages with isNewMsg true
            if (use_unread_count) {
                let n = messageGroupObj.unreadCount; // will use unreadCount attribute to fetch last n messages from sender
                for (let i = messages.length - 1; i >= 0; i--) {
                    let messageObj = messages[i];
                    if (n > 0) {
                        if (!messageObj.isSentByMe) {
                            let message = WAPI.processMessageObj(messageObj, includeMe, includeNotifications);
                            messageGroup.messages.unshift(message);
                            n -= 1;
                        }
                    } else if (n === -1) { // chat was marked as unread so will fetch last message as unread
                        if (!messageObj.isSentByMe) {
                            let message = WAPI.processMessageObj(messageObj, includeMe, includeNotifications);
                            messageGroup.messages.unshift(message);
                            break;
                        }
                    } else { // unreadCount = 0
                        break;
                    }
                }
                if (messageGroup.messages.length > 0) {
                    messageGroupObj.unreadCount = 0; // reset unread counter
                    output.push(messageGroup);
                }
            }
        }
    }
    return output;
};

window.WAPI.getGroupOwnerID = async function (id) {
    const output = (await WAPI.getGroupMetadata(id)).owner.id;
    return output;

};

window.WAPI.getCommonGroups = async function (id) {
    let output = [];

    groups = window.WAPI.getAllGroups();

    for (let idx in groups) {
        try {
            participants = await window.WAPI.getGroupParticipantIDs(groups[idx].id);
            if (participants.filter((participant) => participant == id).length) {
                output.push(groups[idx]);
            }
        } catch (err) {
            console.log("Error in group:");
            console.log(groups[idx]);
            console.log(err);
        }
    }
    return output;
};

window.WAPI.getProfilePicFromServer = function (id) {
    return Store.WapQuery.profilePicFind(id).then(x => x.eurl);
}

window.WAPI.getProfilePicSmallFromId = async function (id) {
    return await window.Store.ProfilePicThumb.find(id).then(async d=> {
        if (d.img !== undefined) {
            return await window.WAPI.downloadFileWithCredentials(d.img);
        } else {
            return false
        }
    }, function (e) {
        return false
    })
};

window.WAPI.getProfilePicFromId = async function (id) {
    return await window.Store.ProfilePicThumb.find(id).then(async d => {
        if (d.imgFull !== undefined) {
            return await window.WAPI.downloadFileWithCredentials(d.imgFull);
        } else {
            return false
        }
    }, function (e) {
        return false
    })
};

window.WAPI.downloadFileWithCredentials = async function (url) {
    if(!axios || !url) return false;
    const ab = (await axios.get(url,{responseType: 'arraybuffer'})).data
    return btoa(new Uint8Array(ab).reduce((data, byte) => data + String.fromCharCode(byte), ''));
};

window.WAPI.downloadFile = async function (url) {
    return await new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let reader = new FileReader();
                reader.readAsDataURL(xhr.response);
                reader.onload = function (e) {
                    resolve(reader.result.substr(reader.result.indexOf(',') + 1))
                };
            } else {
                console.error(xhr.statusText);
            }
        } else {
            console.log(err);
            resolve(false);
        }
    };

    xhr.open("GET", url, true);
    xhr.responseType = 'blob';
    xhr.send(null);
})
};

window.WAPI.getBatteryLevel = function () {
    return Store.Conn.battery;
};

window.WAPI.getIsPlugged = function () {
    return Store.Conn.plugged;
};

window.WAPI.deleteConversation = async function (chatId) {
    let userId = new window.Store.UserConstructor(chatId, { intentionallyUsePrivateConstructor: true });
    let conversation = WAPI.getChat(userId);
    if (!conversation) {
        return false;
    }
    return await window.Store.sendDelete(conversation, false).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

window.WAPI.smartDeleteMessages = async function (chatId, messageArray, onlyLocal) {
    var userId = new Store.WidFactory.createWid(chatId);
    let conversation = WAPI.getChat(userId);
    if (!conversation) return false;

    if (!Array.isArray(messageArray)) {
        messageArray = [messageArray];
    }

    let messagesToDelete = messageArray.map(msgId => (typeof msgId == 'string')?window.Store.Msg.get(msgId):msgId).filter(x=>x);
    if(messagesToDelete.length==0) return true;
    let jobs = onlyLocal ? [conversation.sendDeleteMsgs(messagesToDelete,conversation)] :[
        conversation.sendRevokeMsgs(messagesToDelete.filter(msg=>msg.isSentByMe),conversation),
        conversation.sendDeleteMsgs(messagesToDelete.filter(msg=>!msg.isSentByMe),conversation)
    ]
    return Promise.all(jobs).then(_=>true)
};

window.WAPI.deleteMessage = async function (chatId, messageArray, revoke = false) {
    let userId = new window.Store.UserConstructor(chatId, { intentionallyUsePrivateConstructor: true });
    let conversation = WAPI.getChat(userId);

    if (!conversation)return false;

    if (!Array.isArray(messageArray)) {
        messageArray = [messageArray];
    }

    let messagesToDelete = messageArray.map(msgId => window.Store.Msg.get(msgId));

    if (revoke) {
        conversation.sendRevokeMsgs(messagesToDelete, conversation);
    } else {
        conversation.sendDeleteMsgs(messagesToDelete, conversation);
    }

    return true;
};

window.WAPI.clearChat = async function (id) {
    return await Store.ChatUtil.sendClear(Store.Chat.get(id),true);
}

/**
 * @param id The id of the conversation
 * @param archive boolean true => archive, false => unarchive
 * @return boolean true: worked, false: didnt work (probably already in desired state)
 */
window.WAPI.archiveChat = async function (id, archive) {
    return await Store.Archive.setArchive(Store.Chat.get(id),archive).then(_=>true).catch(_=>false)
}

/**
 * Extracts vcards from a message
 * @param id string id of the message to extract the vcards from
 * @returns [vcard] 
 * ```
 * [
 * {
 * displayName:"Contact name",
 * vcard: "loong vcard string"
 * }
 * ]
 * ``` or false if no valid vcards found
 */
window.WAPI.getVCards = function(id) {
    var msg = Store.Msg.get(id);
    if(msg) {
        if(msg.type=='vcard') {
            return [
                {
                    displayName:msg.subtype,
                    vcard:msg.body
                }
            ]
        } else if (msg.type=='multi_vcard') {
            return msg.vcardList
        } else return false;
    } else {
        return false
    }
}

window.WAPI.checkNumberStatus = async function (id) {
    try {
        const result = await window.Store.WapQuery.queryExist(id);
        if (result.jid === undefined) throw 404;
        const data = window.WAPI._serializeNumberStatusObj(result);
        if (data.status == 200) data.numberExists = true
        return data;
    } catch (e) {
            return window.WAPI._serializeNumberStatusObj({
                status: e,
                jid: id
            });
    }
};

window.WAPI.onAnyMessage = callback => window.Store.Msg.on('add', (newMessage) => {
    if (newMessage && newMessage.isNewMsg) {
    if(!newMessage.clientUrl && (newMessage.mediaKeyTimestamp || newMessage.filehash)){
        const cb = (msg) => {
            if(msg.id._serialized === newMessage.id._serialized && msg.clientUrl) {
                callback(WAPI.processMessageObj(msg, true, false));
                Store.Msg.off('change:isUnsentMedia',cb);
            }
        };
        Store.Msg.on('change:isUnsentMedia',cb);
    } else {
        let pm = window.WAPI.processMessageObj(newMessage, true, true);
        let message = pm? JSON.parse(JSON.stringify(pm)) : WAPI.quickClean(newMessage.attributes);
        if (message) {
            callback(message)
        }
    }}
});

/**
 * Registers a callback to be called when a the acknowledgement state of the phone connection.
 * @param callback - function - Callback function to be called when the device state changes. this returns 'CONNECTED' or 'TIMEOUT'
 * @returns {boolean}
 */
window.WAPI.onStateChanged = function (callback) {
    window.Store.State.default.on('change:state', ({state})=>callback(state))
    return true;
}

/**
 * Returns the current state of the session. Possible state values:
 * "CONFLICT"
 * "CONNECTED"
 * "DEPRECATED_VERSION"
 * "OPENING"
 * "PAIRING"
 * "PROXYBLOCK"
 * "SMB_TOS_BLOCK"
 * "TIMEOUT"
 * "TOS_BLOCK"
 * "UNLAUNCHED"
 * "UNPAIRED"
 * "UNPAIRED_IDLE"
 */
window.WAPI.getState = function (){
    return Store.State.default.state;
}

/**
 * Registers a callback to be called when your phone receives a new call request.
 * @param callback - function - Callback function to be called upon a new call. returns a call object.
 * @returns {boolean}
 */
window.WAPI.onIncomingCall = function (callback) {
    window.Store.Call.on('add',callback);
    return true;
}

/**
 * @param label: either the id or the name of the label. id will be something simple like anhy nnumber from 1-10, name is the label of the label if that makes sense.
 * @param objectId The Chat, message or contact id to which you want to add a label
 * @param type The type of the action. It can be either "add" or "remove"
 * @returns boolean true if it worked otherwise false
 */
window.WAPI.addOrRemoveLabels = async function (label, objectId, type) {
    var {id} = Store.Label.models.find(x=>x.id==label||x.name==label)
    var to = Store.Chat.get(objectId) || Store.Msg.get(objectId) || Store.Contact.get(objectId);
    if(!id || !to) return false;
    const {status} = await Store.Label.addOrRemoveLabels([{id,type}],[to]);
    return status===200;
}

/**
 * Registers a callback to be called when a the acknowledgement state of a message changes.
 * @param callback - function - Callback function to be called when a message acknowledgement changes.
 * @returns {boolean}
 */
window.WAPI.onAck = function (callback) {
    Store.Msg.on("change:ack", m=>callback(WAPI.quickClean(m)));
    return true;
}

//returns an array of liveLocationChangeObjects
window.WAPI.forceUpdateLiveLocation = async function (chatId) {
    if(!Store.LiveLocation.get(chatId)) return false;
    return WAPI.quickClean(await Store.LiveLocation.update(chatId)).participants.map(l=>{
        return {
        ...l,
        msgId:l.msg.id._serialized
        }
        });
}

window.WAPI.onLiveLocation = function (chatId, callback) {
    var lLChat = Store.LiveLocation.get(chatId);
    if(lLChat) {
        var validLocs = lLChat.participants.validLocations();
        validLocs.map(x=>x.on('change:lastUpdated',(x,y,z)=>{
            const {id,lat,lng,accuracy,degrees,speed,lastUpdated}=x;
        const l = {
            id:id.toString(),lat,lng,accuracy,degrees,speed,lastUpdated};
        callback(l);
        }));
        return true;
    } else {
        return false;
    }
}

window.WAPI.onBattery = function(callback) {
    window.Store.Conn.on('change:battery', ({battery}) =>  callback(battery));
    return true;
}

window.WAPI.onPlugged = function(callback) {
    window.Store.Conn.on('change:plugged', ({plugged}) =>  callback(plugged));
    return true;
}

/**
 * A new approach to listening to add and remove events from groups. This takes only a callback and is prevents memory leaks
 */
WAPI.onGlobalParicipantsChanged = function(callback) {
    const events = [
        'change:isAdmin',
        'remove',
        'add'
    ]
    //const id = eventName.replace('group_participant_change','');
    const chats = Store.GroupMetadata.models
        //.filter(group=>group.participants.models.find(participant=>participant.id._serialized===id))
        .filter(x => x.id.server !== 'broadcast').map(group => window.Store.Chat.get(group.id._serialized));
    const cb = (eventName, eventData, extra) => {
        if (events.includes(eventName)) {
            let action = eventName;
            if (eventName == 'change:isAdmin') {
                action = extra ? 'promote' : 'demote';
            }
            callback({
                by: undefined,
                action: action,
                who: eventData.id._serialized,
                chat: extra.parent.id._serialized
            });
            chats.map(chat => {
                chat.groupMetadata.participants.off('all', cb)
                chat.groupMetadata.participants.off(cb)
            });
        }
    }
    chats.map(chat => chat.groupMetadata.participants.on('all', cb));
    Store.GroupMetadata.on('all', (eventName, groupId) => chats.map(chat => chat.groupMetadata.participants.on('all', cb)))
    return true;
}

/**
 * Registers a callback to participant changes on a certain, specific group
 * @param groupId - string - The id of the group that you want to attach the callback to.
 * @param callback - function - Callback function to be called when a message acknowledgement changes. The callback returns 3 variables
 * @returns {boolean}
 */
window.WAPI.onParticipantsChanged = function (groupId, callback) {
    const subtypeEvents = [
        "invite" , 
        "add" , 
        "remove" ,
        "leave" ,
        "promote" ,
        "demote"
    ];
    const events = [
        'change:isAdmin',
        'remove',
        'add'
    ]
    const chat = window.Store.Chat.get(groupId);
    chat.groupMetadata.participants.on('all', (eventName, eventData, extra) => {
        if(events.includes(eventName)) {
            let action = eventName;
            if(eventName=='change:isAdmin') {
                action = extra ? 'promote' : 'demote';
            }
        callback({
            by: undefined,
            action: action,
            who: eventData.id._serialized
        });
        }
    })
}

/**
 * Registers a callback to participant changes on a certain, specific group
 * @param groupId - string - The id of the group that you want to attach the callback to.
 * @param callback - function - Callback function to be called when a message acknowledgement changes. The callback returns 3 variables
 * @returns {boolean}
 */
window.groupParticpiantsEvents = {};
window.WAPI._onParticipantsChanged = function (groupId, callback) {
    const subtypeEvents = [
        "invite" , 
        "add" , 
        "remove" ,
        "leave" ,
        "promote" ,
        "demote"
    ];
    const chat = window.Store.Chat.get(groupId);
    //attach all group Participants to the events object as 'add'
    const metadata = window.Store.GroupMetadata.get(groupId);
    if (!groupParticpiantsEvents[groupId]) {
        groupParticpiantsEvents[groupId] = {};
        metadata.participants.forEach(participant => {
            groupParticpiantsEvents[groupId][participant.id.toString()] = {
                subtype: "add",
                from: metadata.owner
            }
        });
    }
    let i = 0;
    chat.on("change:groupMetadata.participants",
        _ => chat.on("all", (x, y) => {
            const { isGroup, previewMessage } = y;
            if (isGroup && x === "change" && previewMessage && previewMessage.type === "gp2" && subtypeEvents.includes(previewMessage.subtype)) {
                const { subtype, author, recipients } = previewMessage;
                const rec = recipients[0].toString();
                if (groupParticpiantsEvents[groupId][rec] && groupParticpiantsEvents[groupId][recipients[0]].subtype == subtype) {
                    //ignore, this is a duplicate entry
                    // console.log('duplicate event')
                } else {
                    //ignore the first message
                    if (i == 0) {
                        //ignore it, plus 1,
                        i++;
                    } else {
                        groupParticpiantsEvents[groupId][rec] = { subtype, author };
                        //fire the callback
                        // // previewMessage.from.toString()
                        // x removed y
                        // x added y
                        callback({
                            by: author.toString(),
                            action: subtype,
                            who: recipients
                        });
                        chat.off("all", this)
                        i = 0;
                    }
                }
            }
        })
    )
    return true;
}


/**
 * Registers a callback that fires when your host phone is added to a group.
 * @param callback - function - Callback function to be called when a message acknowledgement changes. The callback returns 3 variables
 * @returns {boolean}
 */
window.WAPI.onAddedToGroup = function(callback){
    Store.Chat.on('change:previewMessage', async event => {
        if(event.isGroup && event.previewMessage && event.previewMessage.type=='gp2' && event.previewMessage.subtype =='add' && event.previewMessage.recipients && event.previewMessage.recipients.map(x=>x._serialized).includes(Store.Me.wid._serialized)) {
            const tdiff = (Date.now()-Store.Msg.get(event.previewMessage.id._serialized).t*1000)/1000;
            if(tdiff<10.0) {
                console.log('added', tdiff,'seconds ago')
                await WAPI.sendSeen(event.id);
                callback(WAPI._serializeChatObj(Store.Chat.get(event.id)));
            } else console.log('Not a new group add', event.id._serialized)
        }
    })
    return true;
}

/**
 * Reads buffered new messages.
 * @returns {Array}
 */
window.WAPI.getBufferedNewMessages = function () {
    let bufferedMessages = window._WAPI._newMessagesBuffer;
    window._WAPI._newMessagesBuffer = [];
    return bufferedMessages;
};
/** End new messages observable functions **/

/** Joins a group via the invite link, code, or message
 * @param link This param is the string which includes the invite link or code. The following work:
 * - Follow this link to join my WA group: https://chat.whatsapp.com/DHTGJUfFJAV9MxOpZO1fBZ
 * - https://chat.whatsapp.com/DHTGJUfFJAV9MxOpZO1fBZ
 * - DHTGJUfFJAV9MxOpZO1fBZ
 * @returns Promise<string | boolean> Either false if it didn't work, or the group id.
 */
window.WAPI.joinGroupViaLink = async function(link){
    return await Store.WapQuery.acceptGroupInvite(link.split('\/').pop()).then(res=>res.status===200?res.gid._serialized:res.status);
    let code = link;
    //is it a link? if not, assume it's a code, otherwise, process the link to get the code.
    if(link.includes('chat.whatsapp.com')) {
        if(!link.match(/chat.whatsapp.com\/([\w\d]*)/g).length) return false;
        code = link.match(/chat.whatsapp.com\/([\w\d]*)/g)[0].replace('chat.whatsapp.com\/','');
    }
    const group = await Store.GroupInvite.joinGroupViaInvite(code);
    if(!group.id) return false;
    return group.id._serialized
}

window.WAPI.sendImage = async function (imgBase64, chatid, filename, caption, quotedMsg, waitForKey, ptt) {
    if(!chatid.includes('@g')&&!chatid.includes('@c')) return false;
    let extras = {};
    if(quotedMsg){
        if (typeof quotedMsg !== "object") quotedMsg = Store.Msg.get(quotedMsg);
        extras = {
            quotedMsg,
            quotedParticipant: quotedMsg.author || quotedMsg.from,
            quotedStanzaID:quotedMsg.id.id
        };
    }
    return await Store.Chat.find(chatid).then(async (chat) => {
        var mediaBlob = window.WAPI.base64ImageToFile(imgBase64, filename);
        return await window.WAPI.procFiles(chat,mediaBlob).then(async mc => {
            var media = mc.models[0];
            if(ptt) media.mediaPrep._mediaData.type = 'ptt';
            await media.sendToChat(chat, { caption,...extras });
            return waitForKey ? await new Promise(async (resolve,reject) => {
                const cb = msg=>{
                    if(media.attributes.file.size === msg.size) resolve(msg.id._serialized);
                    Store.Msg.off('change:clientUrl',cb);
                };
                Store.Msg.on('change:clientUrl',cb);
            }) : true
        });
    });
}

/**
 * This function sts the profile name of the number.
 * 
 * Please note this DOES NOT WORK ON BUSINESS ACCOUNTS!
 * 
 * @param newName - string the new name to set as profile name
 */
window.WAPI.setMyName = async function (newName) {
    if(!Store.Versions.default[12].BinaryProtocol) Store.Versions.default[12].BinaryProtocol=new Store.bp(Store.Me.binVersion);
    return (await Store.Versions.default[12].setPushname(newName)).status===200;
}

/** Change the icon for the group chat
 * @param groupId 123123123123_1312313123@g.us The id of the group
 * @param imgData 'data:image/jpeg;base64,...` The base 64 data uri
 * @returns boolean true if it was set, false if it didn't work. It usually doesn't work if the image file is too big.
 */
window.WAPI.setGroupIcon = async function(groupId, imgData) {
    const {status} = await Store.WapQuery.sendSetPicture(groupId,imgData,imgData);
    return status==200;
}

/**
* Update your status
*   @param newStatus string new Status
*/
window.WAPI.setMyStatus = function (newStatus) {
    return Store.MyStatus.setMyStatus(newStatus)
}

window.WAPI.sendVideoAsGif = async function (imgBase64, chatid, filename, caption, quotedMsg) {
    let extras = {};
    if(quotedMsg){
        if (typeof quotedMsg !== "object") quotedMsg = Store.Msg.get(quotedMsg);
        extras = {
            quotedMsg,
            quotedParticipant: quotedMsg.author || quotedMsg.from,
            quotedStanzaID:quotedMsg.id.id
        };
    }
    // create new chat
    return await Store.Chat.find(chatid).then(async (chat) => {
        var mediaBlob = window.WAPI.base64ImageToFile(imgBase64, filename);
        var mc = new Store.MediaCollection(chat);
        return await window.WAPI.procFiles(chat,mediaBlob).then(async mc => {
            var media = mc.models[0];
            media.mediaPrep._mediaData.isGif = true;
            media.mediaPrep._mediaData.gifAttribution = 1;
            await media.mediaPrep.sendToChat(chat, { caption,...extras });
            return chat.lastReceivedKey._serialized;
        });
    });
}

window.WAPI.refreshBusinessProfileProducts = async function (){
    await Promise.all(Store.BusinessProfile.models.map(async x=>{
        try{
        await Store.Catalog.findCarouselCatalog(x.id._serialized)
        } catch(error){}
        }));
        return true;
}

/**
 * Find any product listings of the given number. Use this to query a catalog
 *
 * @param id id of buseinss profile (i.e the number with @c.us)
 * @returns None
 */
window.WAPI.getBusinessProfilesProducts = async function (id) {
    try{
        if(!Store.Catalog.get(id)) await Store.Catalog.findCarouselCatalog(id)
        const catalog = Store.Catalog.get(id);
        if (catalog.productCollection && catalog.productCollection._models.length)
        return JSON.parse(JSON.stringify(catalog.productCollection._models));
        else return [];
    } catch(error){
        return false;
    }
};


window.WAPI.procFiles= async function(chat, blobs) {
    if (!Array.isArray(blobs)) {
        blobs = [blobs];
    }
    var mc = new Store.MediaCollection(chat);
    await mc.processFiles((Debug.VERSION === '0.4.613')?blobs:blobs.map(blob=>{return{file:blob}}) , chat, 1);
    return mc
}
/**
 * Sends product with image to chat
 * @param imgBase64 Base64 image data
 * @param chatid string the id of the chat that you want to send this product to
 * @param caption string the caption you want to add to this message
 * @param bizNumber string the @c.us number of the business account from which you want to grab the product
 * @param productId string the id of the product within the main catalog of the aforementioned business
 * @returns 
 */
window.WAPI.sendImageWithProduct = async function (imgBase64, chatid, caption, bizNumber, productId) {
    await WAPI.refreshBusinessProfileProducts();
    return await Store.Catalog.findCarouselCatalog(bizNumber).then(async cat => {
        if (cat && cat[0]) {
            const product = cat[0].productCollection.get(productId);
            const temp = {
                productMsgOptions: {
                    businessOwnerJid: product.catalogWid.toString({
                        legacy: !0
                    }),
                    productId: product.id.toString(),
                    url: product.url,
                    productImageCount: product.productImageCollection.length,
                    title: product.name,
                    description: product.description,
                    currencyCode: product.currency,
                    priceAmount1000: product.priceAmount1000,
                    type: "product"
                },
                caption
            }

            // var idUser = new Store.WidFactory.createWid(chatid);

            return Store.Chat.find(chatid).then(async (chat) => {
                var mediaBlob = window.WAPI.base64ImageToFile(imgBase64, "filename.jpg");
                // var mc = new Store.MediaCollection(chat);
                // mc.processFiles([mediaBlob], chat, 1)
                return await window.WAPI.procFiles(chat,mediaBlob).then(async mc => {
                    var media = mc.models[0];
                    Object.entries(temp.productMsgOptions).map(([k, v]) => media.mediaPrep._mediaData[k] = v)
                    await media.mediaPrep.sendToChat(chat, temp);
                    return chat.lastReceivedKey._serialized;
                });
            });
        }
    })
}

window.WAPI.base64ImageToFile = function (b64Data, filename) {
    var arr = b64Data.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = window.Base64 ? window.Base64.atob(arr[1]) : atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};

/**
 * Send contact card to a specific chat using the chat ids
 *
 * @param {string} to '000000000000@c.us'
 * @param {string|array} contact '111111111111@c.us' | ['222222222222@c.us', '333333333333@c.us, ... 'nnnnnnnnnnnn@c.us']
 */
window.WAPI.sendContact = function (to, contact) {
    if (!Array.isArray(contact)) {
        contact = [contact];
    }
    contact = contact.map((c) => {
        return WAPI.getChat(c).__x_contact;
    });

    if (contact.length > 1) {
        window.WAPI.getChat(to).sendContactList(contact);
    } else if (contact.length === 1) {
        window.WAPI.getChat(to).sendContact(contact[0]);
    }
};

/**
 * Ghost forwarding is like a normal forward but as if it were sent from the host phone.
 */
window.WAPI.ghostForward = async function(chatId, messageId) {
    if(!chatId.includes('@g')&&!chatId.includes('@c')) return false;
    var chat = Store.Chat.get(chatId);
    if(!Store.Msg.get(messageId)) return false;
    var tempMsg = Object.create(Store.Msg.get(messageId));
    var newId = window.WAPI.getNewMessageId(chatId);
    var extend = {
        ...JSON.parse(JSON.stringify(tempMsg)),
        ack: 0,
        id: newId,
        local: !0,
        self: "out",
        t: parseInt(new Date().getTime() / 1000),
        to: new Store.WidFactory.createWid(chatId),
        from: Store.Me.wid,
        isNewMsg: true
    };
    Object.assign(tempMsg, extend);
    const res = await Promise.all(Store.addAndSendMsgToChat(chat, extend))
    return res[1]=='success';
}


/**
 * Forward an array of messages to a specific chat using the message ids or Objects
 *
 * @param {string} to '000000000000@c.us'
 * @param {string|array[Message | string]} messages this can be any mixture of message ids or message objects
 * @param {boolean} skipMyMessages This indicates whether or not to skip your own messages from the array
 */
window.WAPI.forwardMessages = async function (to, messages, skipMyMessages) {
    if (!Array.isArray(messages)) {
        messages = [messages];
    }
    const finalForwardMessages = messages.map(msg => {
        if (typeof msg == 'string') {
            //msg is string, get the message object
            return window.Store.Msg.get(msg);
        } else {
            return window.Store.Msg.get(msg.id);
        }
    }).filter(msg => skipMyMessages ? !msg.__x_isSentByMe : true);

    // let userId = new window.Store.UserConstructor(to);
    let conversation = window.Store.Chat.get(to);
    return await conversation.forwardMessages(finalForwardMessages)
};

/**
 * Create an chat ID based in a cloned one
 *
 * @param {string} chatId '000000000000@c.us'
 */
window.WAPI.getNewMessageId = function (chatId) {
    var newMsgId = new Store.MsgKey(Object.assign({}, Store.Msg.models[0].__x_id))
    // .clone();

    newMsgId.fromMe = true;
    newMsgId.id = WAPI.getNewId().toUpperCase();
    newMsgId.remote = new Store.WidFactory.createWid(chatId);
    newMsgId._serialized = `${newMsgId.fromMe}_${newMsgId.remote}_${newMsgId.id}`

    return newMsgId;
};


/**
 * Simulate '...typing' in the chat.
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {boolean} on true to turn on similated typing, false to turn it off //you need to manually turn this off.
 */
window.WAPI.simulateTyping = async function (chatId, on) {
    if (on) Store.ChatStates.sendChatStateComposing(chatId)
    else Store.ChatStates.sendChatStatePaused(chatId)
    return true
};

/**
 * Send location
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {string} lat latitude
 * @param {string} lng longitude
 * @param {string} loc Text to go with the location message
 */
window.WAPI.sendLocation = async function (chatId, lat, lng, loc) {
    loc = loc || '';
    var chat = Store.Chat.get(chatId);
    if(!chat) return false;
    var tempMsg = Object.create(Store.Msg.models.filter(msg => msg.__x_isSentByMe && !msg.quotedMsg)[0]);
    var newId = window.WAPI.getNewMessageId(chatId);
    var extend = {
        ack: 0,
        id: newId,
        local: !0,
        self: "out",
        t: parseInt(new Date().getTime() / 1000),
        to: chatId,
        isNewMsg: !0,
        type: "location",
        lat,
        lng,
        loc,
        clientUrl:undefined,
        directPath:undefined,
        filehash:undefined,
        uploadhash:undefined,
        mediaKey:undefined,
        isQuotedMsgAvailable:false,
        invis:false,
        mediaKeyTimestamp:undefined,
        mimetype:undefined,
        height:undefined,
        width:undefined,
        ephemeralStartTimestamp:undefined,
        body:undefined,
        mediaData:undefined,
        isQuotedMsgAvailable: false
    };
    Object.assign(tempMsg, extend);
    return (await Promise.all(Store.addAndSendMsgToChat(chat, tempMsg)))[1]==='success' ? newId._serialized : false;
};

/**
 * Send VCARD
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {string} vcard vcard as a string
 * @param {string} contactName The display name for the contact. CANNOT BE NULL OTHERWISE IT WILL SEND SOME RANDOM CONTACT FROM YOUR ADDRESS BOOK.
 * @param {string} contactNumber If supplied, this will be injected into the vcard (VERSION 3 ONLY FROM VCARDJS) with the WA id to make it show up with the correct buttons on WA.
 */
window.WAPI.sendVCard = async function (chatId, vcard, contactName, contactNumber) {
    var chat = Store.Chat.get(chatId);
    var tempMsg = Object.create(Store.Msg.models.filter(msg => msg.__x_isSentByMe && !msg.quotedMsg)[0]);
    var newId = window.WAPI.getNewMessageId(chatId);
    var extend = {
        ack: 0,
        id: newId,
        local: !0,
        self: "out",
        t: parseInt(new Date().getTime() / 1000),
        to: chatId,
        isNewMsg: !0,
        type: "vcard",
        clientUrl:undefined,
        directPath:undefined,
        filehash:undefined,
        uploadhash:undefined,
        mediaKey:undefined,
        isQuotedMsgAvailable:false,
        invis:false,
        mediaKeyTimestamp:undefined,
        mimetype:undefined,
        height:undefined,
        width:undefined,
        ephemeralStartTimestamp:undefined,
        body:contactNumber?vcard.replace('TEL;TYPE=WORK,VOICE:',`TEL;TYPE=WORK,VOICE;waid=${contactNumber}:`):vcard,
        mediaData:undefined,
        isQuotedMsgAvailable: false,
        subtype: contactName
    };
    Object.assign(tempMsg, extend);
    return (await Promise.all(Store.addAndSendMsgToChat(chat, tempMsg)))[1]=="success"
};

window.WAPI.reply = async function (chatId, body, quotedMsg) {
    if (typeof quotedMsg !== "object") quotedMsg = Store.Msg.get(quotedMsg)
    var chat = Store.Chat.get(chatId);
    if(!chat) return false;
        let extras = {};
        if(quotedMsg) {
            extras = {
                quotedParticipant: quotedMsg.author || quotedMsg.from,
                quotedStanzaID:quotedMsg.id.id
            };
        }
    var tempMsg = Object.create(Store.Msg.models.filter(msg => msg.__x_isSentByMe && !msg.quotedMsg)[0]);
    var newId = window.WAPI.getNewMessageId(chatId);
    var extend = {
        ack: 0,
        id: newId,
        local: !0,
        self: "out",
        t: parseInt(new Date().getTime() / 1000),
        to:  new Store.WidFactory.createWid(chatId),
        isNewMsg: !0,
        type: "chat",
        quotedMsg,
        body,
        ...extras
    };
    Object.assign(tempMsg, extend);
    const res = await Promise.all(await Store.addAndSendMsgToChat(chat, tempMsg));
    if(res[1]!='success') return false;
    return res[0].id._serialized
};

/**
 * Send Payment Request
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {string} amount1000 The amount in base value / 10 (e.g 50000 in GBP = £50)
 * @param {string} currency Three letter currency code (e.g SAR, GBP, USD, INR, AED, EUR)
 * @param {string} note message to send with the payment request
 */
window.WAPI.sendPaymentRequest = async function (chatId, amount1000, currency, noteMessage) {
    var chat = Store.Chat.get(chatId);
    var tempMsg = Object.create(Store.Msg.models.filter(msg => msg.__x_isSentByMe && !msg.quotedMsg)[0]);
    var newId = window.WAPI.getNewMessageId(chatId);
    var extend = {
        ack: 0,
        id: newId,
        local: !0,
        self: "out",
        t: parseInt(new Date().getTime() / 1000),
        to: chatId,
        isNewMsg: !0,
        type: "payment",
        subtype: "request",
        amount1000,
        requestFrom: chatId,
        currency,
        noteMessage,
        expiryTimestamp: parseInt(new Date(new Date().setDate(new Date().getDate() + 1)).getTime() / 1000)
    };
    Object.assign(tempMsg, extend);
    await Store.addAndSendMsgToChat(chat, tempMsg)
};



/**
 * Send Customized VCard without the necessity of contact be a WA Contact
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {object|array} vcard { displayName: 'Contact Name', vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Contact Name;;;\nEND:VCARD' } | [{ displayName: 'Contact Name 1', vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Contact Name 1;;;\nEND:VCARD' }, { displayName: 'Contact Name 2', vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Contact Name 2;;;\nEND:VCARD' }]
 */
window.WAPI._sendVCard = function (chatId, vcard) {
    var chat = Store.Chat.get(chatId);
    var tempMsg = Object.create(Store.Msg.models.filter(msg => msg.__x_isSentByMe && !msg.quotedMsg)[0]);
    var newId = window.WAPI.getNewMessageId(chatId);

    var extend = {
        ack: 0,
        id: newId,
        local: !0,
        self: "out",
        t: parseInt(new Date().getTime() / 1000),
        to: chatId,
        isNewMsg: !0,
        isQuotedMsgAvailable:false,
    };

    if (Array.isArray(vcard)) {
        Object.assign(extend, {
            type: "multi_vcard",
            vcardList: vcard
        });

        delete extend.body;
    } else {
        Object.assign(extend, {
            type: "vcard",
            subtype: vcard.displayName,
            body: vcard.vcard
        });

        delete extend.vcardList;
    }

    Object.assign(tempMsg, extend);

    Store.addAndSendMsgToChat(chat, tempMsg)
};

/**
 * Block contact 
 * @param {string} id '000000000000@c.us'
 */
window.WAPI.contactBlock = async function (id) {
    const contact = window.Store.Contact.get(id);
    if (contact !== undefined) {
        await Store.Block.blockContact(contact)
        return true;
    }
    return false;
}
/**
 * Unblock contact 
 * @param {string} id '000000000000@c.us'
 */
window.WAPI.contactUnblock = async function (id) {
    const contact = window.Store.Contact.get(id);
    if (contact !== undefined) {
        await Store.Block.unblockContact(contact)
        return true;
    }
    return false;
}

/**
 * Remove participant of Group
 * @param {*} idGroup '0000000000-00000000@g.us'
 * @param {*} idParticipant '000000000000@c.us'
 */
window.WAPI.removeParticipant = async function (idGroup, idParticipant) {
    const chat = Store.Chat.get(idGroup);
    const rm = chat.groupMetadata.participants.get(idParticipant);
    await window.Store.Participants.removeParticipants(chat, [rm]);
    return true;
}


/**
 * Add participant to Group
 * @param {*} idGroup '0000000000-00000000@g.us'
 * @param {*} idParticipant '000000000000@c.us'
 */
window.WAPI.addParticipant = async function (idGroup, idParticipant) {
    const chat = Store.Chat.get(idGroup);
    const add = Store.Contact.get(idParticipant);
    await window.Store.Participants.addParticipants(chat, [add]);
    return true;
}

/**
 * Promote Participant to Admin in Group
 * @param {*} idGroup '0000000000-00000000@g.us'
 * @param {*} idParticipant '000000000000@c.us'
 */
window.WAPI.promoteParticipant = async function (idGroup, idParticipant) {
    const chat = Store.Chat.get(idGroup);
    const promote = chat.groupMetadata.participants.get(idParticipant);
    await window.Store.Participants.promoteParticipants(chat, [promote]);
    return true;
}

/**
 * Demote Admin of Group
 * @param {*} idGroup '0000000000-00000000@g.us'
 * @param {*} idParticipant '000000000000@c.us'
 */
window.WAPI.demoteParticipant = async function (idGroup, idParticipant) {
    await window.Store.WapQuery.demoteParticipants(idGroup, [idParticipant])
    const chat = Store.Chat.get(idGroup);
    const demote = chat.groupMetadata.participants.get(idParticipant);
    await window.Store.Participants.demoteParticipants(chat, [demote])
    return true
   
}

/**
 * @private
 * Send Sticker
 * @param {*} sticker 
 * @param {*} chatId '000000000000@c.us'
 * @param metadata about the image. Based on [sharp metadata](https://sharp.pixelplumbing.com/api-input#metadata)
 */
window.WAPI._sendSticker = async function (sticker, chatId, metadata) {
    var chat = Store.Chat.get(chatId)
        let stick = new window.Store.Sticker.modelClass();
		stick.__x_clientUrl = sticker.clientUrl;
		stick.__x_filehash = sticker.filehash;
		stick.__x_id = sticker.filehash;
		stick.__x_uploadhash = sticker.uploadhash;
		stick.__x_mediaKey = sticker.mediaKey;
		stick.__x_initialized = false;
		stick.__x_mediaData.mediaStage = 'INIT';
		stick.mimetype = 'image/webp';
		stick.height = (metadata && metadata.height) ?  metadata.height : 512;
		stick.width = (metadata && metadata.width) ?  metadata.width : 512;
		await stick.initialize();
		return await stick.sendToChat(chat);
};

window.WAPI.getFileHash = async (data) => {
	let buffer = await data.arrayBuffer();
	var sha = new jsSHA("SHA-256", "ARRAYBUFFER");
	sha.update(buffer);
	return sha.getHash("B64");
};

window.WAPI.generateMediaKey = async (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

/**
 * @param type: The type of file.  {'audio' | 'sticker' | 'video' | 'product' | 'document' | 'gif' | 'image' | 'ptt' | 'template' | 'history' | 'ppic'}
 * @param blob: file
 */
window.WAPI.encryptAndUploadFile = async function (type, blob) {	
    let filehash = await window.WAPI.getFileHash(blob);	
    let mediaKey = await window.WAPI.generateMediaKey(32);
    let controller = new AbortController();
    let signal = controller.signal;
    let encrypted = await window.Store.UploadUtils.encryptAndUpload({
        blob,
        type,
        signal,
        mediaKey
    });
    return {
        ...encrypted,
        clientUrl: encrypted.url,
        filehash,
        id: filehash,
        uploadhash: encrypted.encFilehash,
    };
};

/**
 * Send Image As Sticker
 * @param {*} imageBase64 A valid webp image is required.
 * @param {*} chatId '000000000000@c.us'
 * @param metadata about the image. Based on [sharp metadata](https://sharp.pixelplumbing.com/api-input#metadata)
 */
window.WAPI.sendImageAsSticker = async function (imageBase64,chatId, metadata) {
    let mediaBlob = await window.WAPI.base64ImageToFile(
        'data:image/webp;base64,'+imageBase64,
        'file.webp'
    );
    let encrypted = await window.WAPI.encryptAndUploadFile("sticker", mediaBlob);
    return await window.WAPI._sendSticker(encrypted, chatId, metadata);
};

/**
This will dump all possible stickers into the chat. ONLY FOR TESTING. THIS IS REALLY ANNOYING!!
 */
window.WAPI._STICKERDUMP = async function (chatId) {
    var chat = Store.Chat.get(chatId);
	let prIdx = await Store.StickerPack.pageWithIndex(0);
	await Store.StickerPack.fetchAt(0);        
	await Store.StickerPack._pageFetchPromises[prIdx];
    return await Promise.race(Store.StickerPack.models.forEach(pack=>pack.stickers.fetch().then(_=>pack.stickers.models.forEach(stkr => stkr.sendToChat(chat))))).catch(e=>{})
}


window.WAPI.getLastSeen = async function (id) {
    if(!Store.Chat.get(id)) return false;
    let {presence} = Store.Chat.get(id)
    await presence.subscribe();
    return presence.chatstate.t;
  }

window.WAPI.getUseHereString = async function() { 
    if (!window.l10n.localeStrings['en']){
    const originalLocale = window.l10n.getLocale();
    await window.l10n.init('en');
    await window.l10n.init(originalLocale)
  } 
  return window.l10n.localeStrings[window.l10n.getLocale()][0][window.l10n.localeStrings.en[0].findIndex(x=>x.toLowerCase()==='use here')]
 }

 window.WAPI.getAmountOfLoadedMessages = function() {
    return Store.Msg.models.length;
}

WAPI.getChatWithNonContacts = async function(){
    return Store.Chat.models.map(chat=>chat.contact && !chat.contact.isMyContact ?chat.contact :null).filter(x=>x && !x.isGroup).map(WAPI._serializeContactObj)
}

window.WAPI.cutMsgCache = function (){
    Store.Msg.models.map(msg=>Store.Msg.remove(msg));
    return true;
}

window.WAPI.getHostNumber = function() {
    return WAPI.getMe().me.user;
}

//All of the following features can be unlocked using a license key: https://github.com/open-wa/wa-automate-nodejs#license-key
window.WAPI.getStoryStatusByTimeStamp = function(){return false;}
window.WAPI.deleteAllStatus = function(){return false;}
window.WAPI.getMyStatusArray = function(){return false;}
window.WAPI.deleteStatus = function(){return false;}
window.WAPI.setGroupToAdminsOnly = function(){return false;}
window.WAPI.setGroupEditToAdminsOnly = function(){return false;}
window.WAPI.postTextStatus = function(){return false;}
window.WAPI.postImageStatus = function(){return false;}
window.WAPI.postVideoStatus = function(){return false;}
window.WAPI.onRemovedFromGroup = function(){return false;}
window.WAPI.onContactAdded = function(){return false;}
window.WAPI.sendReplyWithMentions = function(){return false;}
window.WAPI.clearAllChats = function(){return false;}
window.WAPI.getCommonGroups = function(){return false;}
window.WAPI.setChatBackgroundColourHex = function(){return false;}
window.WAPI.darkMode = function(){return false;}
window.WAPI.onChatOpened = function(){return false;}
window.WAPI.onStory = function(){return false;}
window.WAPI.getStoryViewers = function(){return false;}
window.WAPI.onChatState = function(){return false;}
window.WAPI.getStickerDecryptable = function(){return false;}
window.WAPI.forceStaleMediaUpdate = function(){return false;}
window.WAPI.setProfilePic = function(){return false;}
window.WAPI.setGroupDescription = function(){return false;}
window.WAPI.setGroupTitle = function(){return false;}
window.WAPI.tagEveryone = function(){return false;}

/**
 * Patches
 */
window.WAPI.sendGiphyAsSticker = function(){return false;}
window.WAPI.getBlockedIds = function(){return false;}

window.WAPI.quickClean = function (ob) {
    var r = JSON.parse(JSON.stringify(ob));
    if(r.mediaData && Object.keys(r.mediaData).length==0) delete r.mediaData;
    if(r.chat && Object.keys(r.chat).length==0) delete r.chat;
    Object.keys(r).filter(k=>r[k]==""||r[k]==[]||r[k]=={}||r[k]==null).forEach(k=>delete r[k]);
    Object.keys(r).filter(k=>r[k]?r[k]._serialized:false).forEach(k=>r[k]=r[k]._serialized);
    Object.keys(r).filter(k=>r[k]?r[k].id:false).forEach(k=>r[k]=r[k].id);
    return r;
};

window.WAPI.pyFunc = async function (fn, done) {
    return done(await fn())
}


//-------------------------------
//ZAPIX INCLUDE
//-------------------------------
window.ZAPiX = {};
window._ZAPiX = {};

window.ZAPiX._serializeRawObj = (obj) => {
    if (obj && obj.toJSON) {
        return obj.toJSON();
    }
    return {}
};

window.ZAPiX._lastDigest = undefined;
window.ZAPiX._statusTextnode = undefined;
window.ZAPiX._zip = undefined;
window.ZAPiX._injectedStatusNode = undefined;
window.ZAPiX._injectedHeaderNode = undefined;
// --- Tables
window.ZAPiX._decodeZapMedia = {
	"image": "WhatsApp Image Keys",
	"sticker": "WhatsApp Image Keys",
	"video": "WhatsApp Video Keys",
	"audio": "WhatsApp Audio Keys",
	"ptt": "WhatsApp Audio Keys",
	"document": "WhatsApp Document Keys"
}

window.ZAPiX._mediaTypes = new Set();

window.ZAPiX._fileExtensions = JSON.parse('{"audio/aac": ".aac","application/x-abiword": ".abw","application/octet-stream": ".abw","video/x-msvideo": ".avi","application/vnd.amazon.ebook": ".azw","application/octet-stream": ".bin","image/bmp": ".bmp","application/x-bzip": ".bz","application/x-bzip2":".bz2","application/x-csh": ".csh","text/css": ".css","text/csv": ".csv","application/msword": ".doc","application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx","application/vnd.ms-fontobject": ".eot","application/epub+zip": ".epub","video/x-flv": ".flv","image/gif": ".gif","text/html": ".htm","text/html": ".html","image/x-icon": ".ico","text/calendar": ".ics","application/java-archive": ".jar","image/jpeg": ".jpeg","text/javascript": ".js","application/json": ".json","audio/midi": ".midi","audio/x-midi": ".midi","video/x-matroska": ".mkv","audio/mpeg": ".mp3","audio/mp3": ".mp3","video/mpeg": ".mpeg","application/vnd.apple.installer+xml": ".mpkg","application/vnd.oasis.opendocument.presentation": ".odp","application/vnd.oasis.opendocument.spreadsheet": ".ods","application/vnd.oasis.opendocument.text": ".odt","audio/ogg": ".oga","audio/ogg; codecs=opus": ".opus","video/ogg": ".ogv","application/ogg": ".ogx","font/otf": ".otf","image/png": ".png","application/pdf": ".pdf","application/vnd.ms-powerpoint": ".ppt","application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx","application/x-rar-compressed": ".rar","application/rtf": ".rtf","application/x-sh": ".sh","image/svg+xml": ".svg","application/x-shockwave-flash": ".swf","application/x-tar": ".tar","image/tiff": ".tiff","application/typescript": ".ts","font/ttf": ".ttf","text/plain": ".txt","text/x-vcard": ".vcf","application/vnd.visio": ".vsd","audio/wav": ".wav","audio/webm": ".weba","video/webm": ".webm","image/webp": ".webp","font/woff": ".woff","font/woff2": ".woff2","application/xhtml+xml": ".xhtml","application/vnd.ms-excel": ".xls","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx","application/xml": ".xml","text/xml": ".xml","application/vnd.mozilla.xul+xml": ".xul","application/zip": ".zip","application/x-zip-compressed": ".zip","video/3gpp": ".3gp","audio/3gpp": ".3gp","video/3gpp2": ".3g2","audio/3gpp2": ".3g2","application/x-7z-compressed": ".7z","application/vnd.google-earth.kmz": ".kmz","video/mp4":".mp4","undef": ".undf", "undefined":".undf"}');

window.ZAPiX._zapix_header = '     _|_|_|   _|_|_|     |_|_|	\n    _|        _|  _|       _|	\n      _|_|    _|_|_|       _|	\n         _|   _|           _|	\n    _|_|_|    _|         _|_|_|	\n	                      ZAPiX Web\nW H A T S A P P W E B  E X T R A C T O R';

window.ZAPiX._logo = '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';

// ------UTILS functions
var blobfy = function (obj){
	const str = JSON.stringify(obj);
	const bytes = new TextEncoder().encode(str);
	const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8"
});
	return blob;

}
function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}


var b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// Main tasks functions
window.ZAPiX._getMe2 = function (){
	if (Store.Me == null || Store.Me.wid == null)
	{
		for (var contactIndex = 0; contactIndex<Store.Contact._models.length; contactIndex++)
		{
			if (Store.Contact._models[contactIndex].__x_isMe)
			{
				return Store.Contact._models[contactIndex]
			}
		}
	}
    else{
		return WAPI.getMe();
	}
}

window.ZAPiX._getProfilesPics = async function(contacts){
	for(var i = 0; i < contacts.length; i++) {
		var obj = contacts[i];
		console.log("Reading data id: "+obj.id);
		const picData = await WAPI.getProfilePicFromId(obj.id);
		console.log(picData)
		if (picData==false || picData == null) continue;
		var fileName = "Avatar "+obj.id+".jpg";
		try{
			var blob = b64toBlob(picData);
			window.ZAPiX._zip.file("Avatar "+obj.id+".jpg", blob);
			console.log("Avatar "+obj.id+" saved");
		}catch(e){
			console.log("Avatar "+obj.id+" NOT saved - "+e.message);
		}
	}
}

window.ZAPiX._downloadMediaFile = async function(msg) {
	console.log("Download media file");
	console.log(msg);
	var url = msg['deprecatedMms3Url'];
	var dec_media_withpad = await new Response(b64toBlob(await window.WAPI.downloadFileWithCredentials(url))).arrayBuffer();
	console.log(dec_media_withpad);
	dec_media = dec_media_withpad.slice(0,dec_media_withpad.byteLength-10);
	console.log(dec_media);
	window.ZAPiX._mediaTypes.add(msg['type']);
	mediakey = base64ToArrayBuffer(msg['mediaKey']);
	console.log(msg['type']);
	console.log(window.ZAPiX._decodeZapMedia[msg['type']]);
	const mediaKeyExpanded = (await libsignal.HKDF.deriveSecrets(mediakey,new Uint8Array(32),window.ZAPiX._decodeZapMedia[msg['type']]));
	console.log('mediaKeyExpanded:'+mediaKeyExpanded);
	var ivd = new Uint8Array(mediaKeyExpanded[0].slice(0, 16));
	console.log('IV:'+ivd+" bytelength:"+ivd.byteLength);
	var auxBlob = new Blob(mediaKeyExpanded);
	var auxByteBuffer = await new Response(auxBlob).arrayBuffer();
	var cipherKey = new Uint8Array(auxByteBuffer.slice(16,48));
	console.log('cipherKey:'+cipherKey);
	const decAESkey = await crypto.subtle.importKey('raw',cipherKey,{ name: 'AES-CBC' },false, ['decrypt']);
	console.log('decAESKey:'+decAESkey);
	var decoded = await crypto.subtle.decrypt({name:'AES-CBC', iv:new Uint8Array(ivd)}, decAESkey, dec_media);
	console.log(decoded);
	window.ZAPiX._zip.file('Attachment '+msg['id']+window.ZAPiX._fileExtensions[msg['mimetype']],decoded); 
	if (decoded.byteLength == 0)
	{
		console.log('Media file NOT decrypted');
	} else {
		window.ZAPiX._zip.file('Attachment '+msg['id']+window.ZAPiX._fileExtensions[msg['mimetype']],decoded); 
		console.log('Media file decrypted');
	}
};

window.ZAPiX._internal_start = async function(){
	window.ZAPiX._zip = new JSZip();
	window.ZAPiX._statusTextnode.data = "Extracting User Account...";
	var userAccount = window.ZAPiX._getMe2();
	window.ZAPiX._statusTextnode.data = "Extracting User Contacts...";
	var contacts = WAPI.getMyContacts();
	window.ZAPiX._statusTextnode.data = "Saving User Account...";
	window.ZAPiX._zip.file("userAccount.json", blobfy(userAccount));
	console.log('User account - Ok');
	window.ZAPiX._statusTextnode.data = "Saving User Contacts...";
	window.ZAPiX._zip.file("contacts.json", blobfy(contacts));
	console.log('User contacts - Ok');
	window.ZAPiX._statusTextnode.data = "Extracting User (recent) Chats...";
	var chats = WAPI.getAllChats();
	window.ZAPiX._statusTextnode.data = "Saving User Chats...";
	window.ZAPiX._zip.file("chats.json", blobfy(chats));
	console.log('User chats - Ok');
	window.ZAPiX._statusTextnode.data = "Extracting Profile Pics...";
	console.log('Download Profiles Pics');
	try{
		window.ZAPiX._getProfilesPics(contacts);
	}
	catch(e){
		console.log('Error extracting profilePics');
	}
}

window.ZAPiX._internal_saveAttachmentPreview = function(msg){
	try{
		var blob = b64toBlob(msg['body']);
		var mimetypeFileExtension = window.ZAPiX._fileExtensions[msg['mimetype']];
		if (msg['type']=='vcard'){
			mimetypeFileExtension = window.ZAPiX._fileExtensions['text/x-vcard'];
		}else{
			blob = msg['mediaData']['fullPreviewData']['_blob'];
			mimetypeFileExtension = window.ZAPiX._fileExtensions[msg['mimetype']]+window.ZAPiX._fileExtensions[msg['mediaData']['fullPreviewData']['_mimetype']];
		}
		window.ZAPiX._zip.file('Attachment '+msg['id']+'.embedded'+mimetypeFileExtension, blob);
		console.log("Saved ");
	}catch(e){
		console.log("NOT saved - "+e.message);
	}
}

window.ZAPiX._internal_getallchats = async function (){
	var chatIDs = WAPI.getAllChatIds();
	var chatCount = chatIDs.length;
	window.ZAPiX._statusTextnode.data = "Extracting User Chat Messages and attachments...";
	console.log('Getting messages from:'+chatCount+' chats');
	for (var i = 0; i < chatCount; i++) {
		var msgs = WAPI.getAllMessagesInChat(chatIDs[i],true,true);
		window.ZAPiX._zip.file('Chat '+chatIDs[i]+'.json',blobfy(msgs)); 
		for (var m=0; m < msgs.length; m++){
			window.ZAPiX._statusTextnode.data = "Chat "+msgs[m].chat.formattedTitle+"-"+i+"/"+chatCount+" - Message "+m+"/"+msgs.length;
			if (msgs[m]['type']=='image' || msgs[m]['type']=='video' || msgs[m]['type']=='ptt' || msgs[m]['type']=='document' || msgs[m]['type']=='sticker'){
				console.log(msgs[m]['deprecatedMms3Url']);
				try{
					await window.ZAPiX._downloadMediaFile(msgs[m],window.ZAPiX._zip);
					
				}catch(e){
					console.log('Error downloading:'+e.message+". Using embedded data.");
					window.ZAPiX._internal_saveAttachmentPreview(window.ZAPiX._zip,msgs[m])
				}
			} 
			else if (msgs[m]['type']=='vcard'){
				try{
					mimetypeFileExtension = window.ZAPiX._fileExtensions['text/x-vcard'];
					window.ZAPiX._zip.file('Attachment '+msgs[m]['id']+'.embedded'+mimetypeFileExtension, msgs[m]['body']);
					console.log("Vcard Saved ");
				}catch(e){
					console.log("Vcard NOT saved - "+e.message);
				}
			}
		window.ZAPiX._statusTextnode.data = "Chat "+chatIDs[i]+" extracted";
		}
	}
	window.ZAPiX._statusTextnode.data = chatCount+" chats extracted";

}

window.ZAPiX._internal_getChatByName = function(chatName){
	ret = null
	var chats = WAPI.getAllChats();
	for (var i = 0; i < chats.length; i++) {
		if ((chats[i].isGroup && chats[i].name == chatName)||(!chats[i].isGroup && chats[i].contact.name == chatName)){
			console.log("Found:"+chats[i].name)
			ret =  chats[i]
			break;
		}
	}
	return ret;
}

window.ZAPiX._internal_getchat = async function (chatName){
	window.ZAPiX._statusTextnode.data = "Extracting User Chat "+chatName+" messages and attachments...";
	console.log('Getting messages from:'+chatName+' chats');
	chat = window.ZAPiX._internal_getChatByName(chatName);
	if (chat == null){
		console.log('Chat:'+chatName+' not found.');
		window.ZAPiX._statusTextnode.data = 'Chat:'+chatName+' not found.';
		return;
	}
	console.log('Getting messages from:'+chat.id+' chats');
		var msgs = WAPI.getAllMessagesInChat(chat.id,true,true);
		window.ZAPiX._zip.file('Chat '+chat.id+'.json',blobfy(msgs)); 
		for (var m=0; m < msgs.length; m++){
			console.log(msgs[m]['type']);
			if (msgs[m]['type']=='image' || msgs[m]['type']=='video' || msgs[m]['type']=='ptt' || msgs[m]['type']=='document' || msgs[m]['type']=='sticker'){
				console.log(msgs[m]['deprecatedMms3Url']);
				try{
					await window.ZAPiX._downloadMediaFile(msgs[m],window.ZAPiX._zip);
				}catch(e){
					console.log('Error downloading '+msgs[m]['type']+':'+e.message+". Using embedded data.");
					window.ZAPiX._internal_saveAttachmentPreview(window.ZAPiX._zip,msgs[m])
				}
			} 
			else if (msgs[m]['type']=='vcard'){
				try{
					mimetypeFileExtension = window.ZAPiX._fileExtensions['text/x-vcard'];
					window.ZAPiX._zip.file('Attachment '+msgs[m]['id']+'.embedded'+mimetypeFileExtension, msgs[m]['body']);
					console.log("Vcard Saved ");
				}catch(e){
					console.log("Vcard NOT saved - "+e.message);
				}
			}
		}
	window.ZAPiX._statusTextnode.data = chatName+" extracted!";
}
async function saveAsElectron(dataFile, fileName) {
	if (!(dataFile instanceof Blob)){
		dataFile = new Blob([dataFile], {type:'text/plain'});
	}
	const opts = {
	suggestedName: fileName
	};
	const newHandle = await window.showSaveFilePicker(opts);
	const options = {};
	options.mode = 'readwrite';
	await newHandle.requestPermission(options);
	const writableStream = await newHandle.createWritable();
	await writableStream.write(dataFile);
	await writableStream.close();
}


window.ZAPiX.showDigest = function(){
	var hashHex = window.ZAPiX._lastDigest;
	if (hashHex!=undefined){
		var userAccount = window.ZAPiX._getMe2();
		var content = hashHex +" ?SHA512*"+ "ZAPiXWEB_"+userAccount.__x_id._serialized+".sha512.txt";
		var hashFile = new File([(content)],userAccount.__x_id._serialized+".sha512.txt", {type: "text/plain;charset=utf-8"});
		if (isElectron()){
			saveAsElectron(content, "hash");
		} else {
			saveAs(hashFile);
		}
	}

}

window.ZAPiX._internal_end = async function (){
	var userAccount = window.ZAPiX._getMe2();
	await window.ZAPiX._zip.generateAsync({type:"blob", compressionOptions: {level: 9}}).then(content => {
		binObject = new ArrayBuffer(content.arrayBuffer().byteLength);
		new Uint8Array(binObject).set(new Uint8Array(content.arrayBuffer()));
		var fileName = "ZAPiXWEB_"+userAccount.__x_id._serialized+".zip";
		if (isElectron()){
			saveAsElectron(content, fileName);
		} else {
			saveAs(content, "ZAPiXWEB_"+userAccount.__x_id._serialized+".zip");
		}
		window.ZAPiX._statusTextnode.data = "Save It.";
	});
	binObject ='';
	await window.ZAPiX._zip.generateAsync({type:"arraybuffer", compressionOptions: {level: 9}}).then(content => {
		binObject = content;
	});
	var byteArray = binObject;//new Uint8Array(binaryObj);
	window.ZAPiX._statusTextnode.data = "Calculating hash";
	const hashBuffer = await crypto.subtle.digest('SHA-512', byteArray);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	// convert buffer to byte array
	window.ZAPiX._lastDigest = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
	/*if (prompt('DIGEST SHA-512, want to save to file?',hashHex)){
		var hashFile = new File([(hashHex +" ?SHA512*"+ "ZAPiXWEB_"+userAccount.__x_id._serialized+".sha512.txt")],userAccount.__x_id._serialized+".sha512.txt", {type: "text/plain;charset=utf-8"});
		saveAs(hashFile);
	}*/
	if (!isElectron())
		window.ZAPiX.showDigest();
	
	window.ZAPiX._statusTextnode.data = "Extracted data saved.";
	//window.ZAPiX._injectedStatusNode.remove();
	//window.ZAPiX._injectedHeaderNode.remove();
	return binObject;
}

window.ZAPiX._clearUI = function (){
	var uiElements = document.getElementById('zapixweb_header_div');
	while (uiElements!=null){
		uiElements.remove();
		uiElements = document.getElementById('zapixweb_header_div');
	}
}

window.ZAPiX._bootstrap = function(){
	// BOOTSTRAP
	console.clear();
	window.ZAPiX._clearUI();
	console.log(window.ZAPiX._zapix_header);
	console.log('Please wait.Save the file after extraction.');
	var zapixweb_html = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_|_|&nbsp;&nbsp;&nbsp;_|_|_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_|_|	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|&nbsp;&nbsp;_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_|&nbsp;&nbsp;&nbsp;&nbsp;_|_|_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|&nbsp;&nbsp;&nbsp;_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|	<br>&nbsp;&nbsp;&nbsp;&nbsp;_|_|_|&nbsp;&nbsp;&nbsp;_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_|_|	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ZAPiX Web<br>W&nbsp;H&nbsp;A&nbsp;T&nbsp;S&nbsp;A&nbsp;P&nbsp;P&nbsp;W&nbsp;E&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;X&nbsp;T&nbsp;R&nbsp;A&nbsp;C&nbsp;T&nbsp;O&nbsp;R<br><br>';
	zapixweb_html += '<div id="zapixweb_status">Starting...</div>';
	alert('     _|_|_|   _|_|_|     |_|_|	\n    _|        _|  _|       _|	\n      _|_|    _|_|_|       _|	\n         _|   _|           _|	\n    _|_|_|    _|         _|_|_|	\n	                      ZAPiX Web\nW H A T S A P P W E B  E X T R A C T O R\n Follow the instruction in console window.');
	
	window.ZAPiX._injectedHeaderNode = document.createElement("DIV");
	window.ZAPiX._injectedHeaderNode.id = 'zapixweb_header_div'
	window.ZAPiX._injectedHeaderNode.setAttribute('align','middle');
	window.ZAPiX._injectedHeaderNode.innerHTML = '<img src="data:image/png;base64,'+window.ZAPiX._logo+'" alt="ZAPIXWEB LOGO" />'
	//var headerTextnode = document.createTextNode('Z A P i X W E B');
	//headerTextnode.id = 'zapixweb_header'
	//window.ZAPiX._injectedHeaderNode.appendChild(headerTextnode); 
	document.getElementById("pane-side").previousSibling.appendChild(window.ZAPiX._injectedHeaderNode);
	

	window.ZAPiX._mainMenu = document.createElement("DIV");
	window.ZAPiX._mainMenu.setAttribute("class","app-wrapper-web");
	window.ZAPiX._mainMenu.setAttribute('align','middle');
	window.ZAPiX._mainMenu.id = 'zapixweb_menu_div'
	
	//var style = document.createElement('style');
	//style.innerHTML = '{border: none;padding: 7px 26px;text-align: center;color: white;background: #dc3545;border-radius: 40px;}';
	var s = 'width: 100%;border: 1px solid black;padding: 1px 26px;text-align: left;color: white;background: forestgreen;border-radius: 40px;';
	var s2 = 'width: 100%;border: 1px solid black;padding: 1px 26px;text-align: left;color: white;background: darkgreen;border-radius: 40px;';
	//document.head.appendChild(style);
	window.ZAPiX._mainMenu.innerHTML = "MENU</br> <button title='Add the current selected chat in export list.' onclick='window.ZAPiX.getchat(this)' style='"+s+"'>ADD CURRENT CHAT</button></br><button  title='Add ALL chats into the export list.' onclick='window.ZAPiX.getall(this)' style='"+s+"'>GET ALL CHATS</button></br><button onclick='window.ZAPiX.takeout(this)' title='Pack all data into ZIP file.' style='"+s+"'>TAKEOUT</button></br><button onclick='window.ZAPiX.showDigest(this)' title='Show the last calculated digest' style='"+s+"'>LAST DIGEST</button></br><button onclick='window.ZAPiX.closeUI(this)' title='Exit ZAPiXWEB' style='"+s2+"'>CLOSE</button></br>"
	window.ZAPiX._injectedHeaderNode.appendChild(window.ZAPiX._mainMenu);
	
	window.ZAPiX._injectedStatusNode = document.createElement("DIV");
	window.ZAPiX._injectedStatusNode.id = 'zapixweb_status_div'
	window.ZAPiX._injectedStatusNode.setAttribute('align','middle');
	window.ZAPiX._injectedStatusNode.setAttribute('style','font-size:12px; border: 1px solid green');

	window.ZAPiX._statusTextnode = document.createTextNode('Starting...');
	window.ZAPiX._statusTextnode.id = 'zapixweb_status';
	window.ZAPiX._injectedStatusNode.appendChild(window.ZAPiX._statusTextnode); 
	//document.getElementById("pane-side").previousSibling.appendChild(window.ZAPiX._injectedStatusNode);
	window.ZAPiX._injectedHeaderNode.appendChild(window.ZAPiX._injectedStatusNode);
	
	window.ZAPiX._internal_start()
	
	console.log(window.ZAPiX._zapix_header);
	console.log('To extract all chats, click GETALL');
	console.log('To extract specific chat, open the chat windows , and click GETCHAT');
	console.log('You can repeate this last command selecting another chat windows. You can extract as many chats as you want');

	window.ZAPiX._statusTextnode.data = "ZAPiX choose type your operation in menu";
}

window.ZAPiX.getall = function (btn){
	btn.style.background = 'darkgreen';
	window.ZAPiX._internal_getallchats()
	btn.style.background = 'forestgreen';
	window.ZAPiX._statusTextnode.data = "All User Chat Messages and attachments extracted";
	console.log(window.ZAPiX._zapix_header);
	console.log(window.ZAPiX._statusTextnode.data);
}

window.ZAPiX.getchat = function (btn){
	if (document.getElementById("main") == null){
		alert('     _|_|_|   _|_|_|     |_|_|	\n    _|        _|  _|       _|	\n      _|_|    _|_|_|       _|	\n         _|   _|           _|	\n    _|_|_|    _|         _|_|_|	\n	                      ZAPiX Web\nW H A T S A P P W E B  E X T R A C T O R\n Before execute command, select a chat do extract data. Open chat clicking the mouse over it.');
		
		console.log('Before execute command, select a chat do extract data. Open chat clicking the mouse over it.');
		return;
	}
	btn.style.background = 'darkgreen';
	spanIndex = 0;
	var chatTitle = document.getElementById("main").getElementsByTagName('span')[spanIndex];
	while (chatTitle.dir != 'auto'){
		chatTitle = document.getElementById("main").getElementsByTagName('span')[++spanIndex];
	}
	window.ZAPiX._internal_getchat(document.getElementById("main").getElementsByTagName('span')[spanIndex].title)
	btn.style.background = 'forestgreen';

	console.log(window.ZAPiX._zapix_header);
	console.log('To extract specific chat, open the chat windows , and click GET CURRENT CHAT');
	console.log('You can repeate this last command selecting another chat windows. You can extract as many chats as you want');
	console.log('To FINISH click TAKEOUT');
}

window.ZAPiX.takeout = function (btn){
	console.clear();
	console.log(window.ZAPiX._zapix_header);
	console.log('Generating export file. Wait the file dialog. It can take several minutes.');
	window.ZAPiX._statusTextnode.data = "Packing takeout.. (Please wait save file dialog) - Save It.";
	console.log('After file saved, wait for HASH digest!!!!!!. Wait.');
	btn.style.background = 'darkgreen';
	window.ZAPiX._internal_end()
	btn.style.background = 'forestgreen';
	//window.ZAPiX._clearUI();
	console.clear();
	console.log(window.ZAPiX._zapix_header);
	console.log('A ZIP file and a SHA512 hash are beeing generated. It can take several minutes.');
	console.log('WAIT!WAIT!WAIT!WAIT!WAIT!WAIT!WAIT!WAIT!WAIT!WAIT!WAIT!WAIT!WAIT!WAIT!');
	console.log('Have a nice forensics!');
}
window.ZAPiX.closeUI = function (btn){
	if (confirm('Z A P i X W E B \n Do you really want to exit?')){
		console.clear();
		btn.style.background = 'darkgreen';
		window.ZAPiX._clearUI();
		btn.style.background = 'forestgreen';
		console.log('Close this console window (most browsers hit F12)');
		console.clear();
	}
}

window.ZAPiX._bootstrap();

//PRESS ENTER KEY NOW TO EXECUTE THIS SCRIPT!!!!!
