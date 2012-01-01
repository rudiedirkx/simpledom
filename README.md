
# SimpleDOM

**A very inobtrusive way to simplyfy (create) the HTML DOM.**

### Use case

You load some struff from ajax (let's say a lot) and want to easily
append it to some div. Or maybe replace other content with it.

### Solution

You might want to make a table.

	var table = document.createElement('table'), tr, td
	// loop through the response:
	tr = table.insertRow(table.rows.length)
	td = tr.insertCell(tr.cells.length)
	td.setAttribute('class', 'disabled')
	td.innerHTML = AJAXRESPONSE[i][0]
	td = tr.insertCell(tr.cells.length)
	td.setAttribute('class', 'email')
	td.innerHTML = AJAXRESPONSE[i][1]

### Better solution

Make a table.

	var table = simple('table')
	// loop through the response:
	simple.last(table, simple('tr', [
		simple('td', {"class": 'disabled'}, AJAXRESPONSE[i][0]),
		simple('td', {"class": 'email'}, AJAXRESPONSE[i][1])
	])

See the example in `index.html` for all uses: attributes, events, children

### DOM additions

SimpleDOM doesn't alter prototypes. It does add a few handy DOM transparencies:

* `simple.event( node, type, callback )`
* `simple.first( referenceNode, newNode )`
* `simple.last( referenceNode, newNode )`
* `simple.before( referenceNode, newNode )`
* `simple.after( referenceNode, newNode )`
* `simple.replace( oldNode, newNode )`
