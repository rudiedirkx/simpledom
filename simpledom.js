
(function() {

	function each( iterable, callback ) {
		for ( var x in iterable ) {
			if ( iterable.hasOwnProperty(x) ) {
				callback(iterable[x], x, iterable)
			}
		}
	}

	var is = {
		content: function( el ) {
			return 'string' == typeof el || el instanceof Array
		},
		events: function( el ) {
			if ( Object == el.constructor ) {
				for ( var x in el ) {
					if ( el.hasOwnProperty(x) ) {
						return 'function' == typeof el[x] || el[x] instanceof Array
					}
				}
			}
			return false
		},
		attributes: function( el ) {
			if ( Object == el.constructor ) {
				return !is.events(el)
			}
			return false
		}
	}

	// create 1 simple element (with children)
	simple = function( type ) {
		var attributes, events, content

		// arguments
		for ( var i=1, L=arguments.length; i<L; i++ ) {
			if ( is.attributes(arguments[i]) ) {
				attributes = arguments[i]
			}
			else if ( is.events(arguments[i]) ) {
				events = arguments[i]
			}
			else if ( is.content(arguments[i]) ) {
				content = arguments[i]
			}
		}

		// create node
		var el = document.createElement(type)

		// assign attributes
		if ( attributes ) {
			each(attributes, function(value, name) {
				el.setAttribute(name, value)
			})
		}

		// assign events
		if ( events ) {
			each(events, function(evs, name) {
				evs instanceof Array || (evs = [evs])
				for ( var i=0, L=evs.length; i<L; i++ ) {
					simple.event(el, name, evs[i])
				}
			})
		}

		// append children
		if ( content ) {
			content instanceof Array || (content = [content])
			for ( var i=0, L=content.length; i<L; i++ ) {
				if ( content[i].nodeName ) {
					el.appendChild(content[i])
				}
				else {
					el.appendChild(document.createTextNode(''+content[i]))
				}
			}
		}

		return el
	}

	// event assignment + handling

	simple.event = function( node, type, callback ) {
		if ( 'function' == typeof node.addEventListener ) {
			return node.addEventListener(type, callback, false)
		}

		if ( node.attachEvent ) {
			return node.attachEvent('on' + type, (function(callback) {
				return function() {
					var e = window.event
					e.preventDefault = function() {
						this.returnValue = false
						return false
					}
					e.target = e.srcElement
					callback.call(node, e)
				}
			})(callback))
		}
	}

	// dom injection helpers

	simple.first = function( reference, node ) {
		if ( reference.firstChild ) {
			return simple.before(reference.firstChild, node)
		}

		return simple.last(reference, node)
	}

	simple.last = function( reference, node ) {
		return reference.appendChild(node)
	}

	simple.before = function( reference, node ) {
		return reference.parentNode.insertBefore(node, reference)
	}

	simple.after = function( reference, node ) {
		if ( reference.nextSibling ) {
			return simple.before(reference.nextSibling, node)
		}

		return simple.last(reference.parentNode, node)
	}

	simple.replace = function( reference, node ) {
		return reference.parentNode.replaceChild(node, reference)
	}

})()
