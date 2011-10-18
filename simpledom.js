
(function() {

	function extend(type, methods, name) {
		for ( name in methods ) {
			type.pototype[name] = methods[name]
		}
	}

	extend(HTMLElement, {
		create: function() {
			return new this; // ?
		}
	})

})()
