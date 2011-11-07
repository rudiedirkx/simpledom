
# SimpleDOM

**A very inobtrusive way to simplyfy (create) the HTML DOM.**

### Use case

You load some struff from ajax (let's say a lot) and want to easily
append it to some div. Or maybe replace other content with it.

### Solution

You might want to make a table.

	var table = document.createElement('table'), tr, td
	tr = table.insertRow(table.rows.length)
	td = tr.insertCell(tr.cells.length)
	td.setAttribute('class', 'disabled')
	td.innerHTML = AJAXRESPONSE[0][0]
	td = tr.insertCell(tr.cells.length)
	td.setAttribute('class', 'email')
	td.innerHTML = AJAXRESPONSE[0][1]
	// etc
	container.appendChild(table)

### Better solution

Make a table.

	simpledom(['table', {}, [
		['tr', {}, [
			['td', {class: 'disabled'}, AJAXRESPONSE[0][0]]
			['td', {}, AJAXRESPONSE[0][1]]
		]]
		// etc
	]], container)
