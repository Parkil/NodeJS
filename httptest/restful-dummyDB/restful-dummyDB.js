/*
 * Restful에 사용될 더미 DB
 */

/*
 * 기본변수 선언
 */
var DummyDB = {};
var storage = [];
var count	= 1;

exports.get = function(id) {
	if(id) {
		id = (typeof id == 'string') ?  Number(id) : id;
		for(var i in storage) {
			if(storage[i].id == id) {
				return storage[i];
			} 
		}
	}else {
		return storage;
	}
};

exports.insert = function(data) {
	data.id = count++;
	storage.push(data);
	return data;
};

exports.remove = function(id) {
	id = (typeof id == 'string') ? Number(id) : id;
	
	for(var i in storage) {
		if(storage[i].id == id) {
			storage.splice(i,1);
			return true;
		}
	}
	
	return false;
};
