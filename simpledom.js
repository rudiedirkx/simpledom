
(function() {

	function render( tag, attributes, text, events, children ) {
		var attrName, evName, L, i

		// create element
		var el = document.createElement(tag)

		// attach attributes
		for ( attrName in attributes ) {
			if ( attributes.hasOwnProperty(attrName) ) {
				el.setAttribute(attrName, attributes[attrName])
			}
		}

		// attach events
		for ( evName in events ) {
			if ( events.hasOwnProperty(evName) ) {
				if ( 'function' == typeof events[evName] ) {
					events[evName] = [events[evName]]
				}
				for ( i=0, L=events[evName].length; i<L; i++ ) {
					el.addEventListener(evName, events[evName][i], false)
				}
			}
		}

		// append children
console.log(children)
		if ( children ) {
			for ( i=0, L=children.length; i<L; i++ ) {
				el.appendChild(render.apply(null, children[i]))
			}
		}

		return el
	}

	simpledom = function( elements ) {
console.log(elements)
		// array of elements
		if ( elements[0] && 'string' != typeof elements[0] ) {
			var output = []
			for ( var i=0, L=elements.length; i<L; i++ ) {
console.log(elements[i])
				output.push(render.apply(null, elements[i]))
			}

			// return array of DOM elements
			return output;
		}

		// just one element -- return array of DOM elements anyway
		return [render.apply(null, elements)]
	}

})()
