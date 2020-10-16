var myApp = myApp || {}; 
myApp.namespace = function(ns_string) { 
	var parts = ns_string.split('.'), parent = myApp, i; 
	if (parts[0] === "myApp") { 
		parts = parts.slice(1); 
	} 
	for (i = 0; i < parts.length; i += 1) { 
		if (typeof parent[parts[i]] === "undefined") { 
			parent[parts[i]] = {}; 
		} 
		parent = parent[parts[i]]; 
	} 
	return parent; 
} 
myApp.namespace('myApp.modules.utils'); 
myApp.modules.StringUtils = function() { 
	
	///////////////////////////////////////////// 
	// 특권 메서드가 들어있는 객체를 반환 
	return { 
	
	
	}; 
}();