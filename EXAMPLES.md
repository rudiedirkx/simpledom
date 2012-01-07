
Slightly more advanced, but still no rocket science.

	var tbody = document.querySelector('tbody');
	users.each(function(user) {
		simple.last(tbody, simple('tr', {"data-uid": user.id}, [
			simple('td', {"class": 'pad2 c'}, [
				simple('input', {type: 'checkbox', name: 'user[]', value: user.id, checked: user.checked || undefined, disabled: !user.checkable || undefined})
			])
			,simple('td', [
				simple('a', {"class": 'ajaxlink', href: '/members/'+user.id}, user.fullname)
			])
			,simple('td', user.email)
			,simple('td', user.membership)
		]));
	});

Note the `<input>` element with these attributes:

	{ checked: user.checked || undefined, disabled: !user.checkable || undefined }

`user.checked` and `user.checkable` are booleans or ints (0, 1). A `checked`
attribute with the value `0`, `"0"` or `""` would still be enabled/true. The
solution: `undefined`. Simple DOM skips attributes that are undefined -- that
almost sounds logical -- so they can exist, yet not be set. Perfect.

Because every `simple()` returns an `HTMLElement`, you can do things like:

	simple('a', {"data-uid": "14"}, 'I contain therefore I am.').dataset.uid // "14"
	simple('a', {"class": 'special'}, 'Click me please!').addEventListener(listenToClick) // Not in IE < 9 though!

There's no reason to do these things. They are not sensible. Don't do these things.


