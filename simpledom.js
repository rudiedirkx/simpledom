
//(function() {

	function gettype( element ) {
		var t = typeof element

		// array or object
		if ( 'object' == t ) {
			// array
			if ( undefined != element[0] || 0 === element.length ) {
				// 1 element
				if ( 'string' == typeof element[0] && ( !elements[1] || 'attributes' == gettype(elements[1]) ) ) {
					return 'element'
				}

				// list of (text?) elements
				return 'elements'
			}

			// hash of events
			for ( x in element ) {
				if ( 'function' == typeof element[x] || 'function' == typeof element[x][0] ) {
					return 'events'
				}
			}

			// hash of attributes
			return 'attributes'
		}

		// string or function
		return t
	}

	function element( tag, attributes, events, children ) {
		var attrName, evName, L, i

		// create element
console.log('tag:', tag)
		var el = document.createElement(tag)

		// attach attributes
		/*for ( attrName in attributes ) {
			if ( attributes.hasOwnProperty(attrName) ) {
				el.setAttribute(attrName, attributes[attrName])
			}
		}*/

		// attach events
		/*for ( evName in events ) {
			if ( events.hasOwnProperty(evName) ) {
				if ( 'function' == typeof events[evName] ) {
					events[evName] = [events[evName]]
				}
				for ( i=0, L=events[evName].length; i<L; i++ ) {
					el.addEventListener(evName, events[evName][i], false)
				}
			}
		}*/

		// append children
console.log('children:', children)
		if ( 'string' == gettype(children) ) {
			children = [children]
		}

		for ( i=0, L=children.length; i<L; i++ ) {
			if ( 'string' == gettype(children[i]) ) {
				el.appendChild(document.createTextNode(children[i]))
			}
			else {
				el.appendChild(element.apply(null, children[i]))
			}
		}

		return el
	}

	simpledom = function( elements, container ) {
console.log('input elements:', gettype(elements))
		if ( 'elements' != gettype(elements) ) {
			elements = [elements]
		}

		for ( var out=[], i=0, L=elements.length; i<L; i++ ) {
			out.push(element.apply(null, elements[i]))
		}

		if ( container ) {
			for ( i=0; i<L; i++ ) {
				container.appendChild(out[i])
			}

			return container
		}

		return out
	}

//})()
