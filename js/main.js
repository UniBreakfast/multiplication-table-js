let errors
const lieChance = 0.05

function buildTable(numLeft, numTop, rows) {
	errors = []
	table.innerHTML = ''
	const thead = document.createElement('thead')
	let tr = document.createElement('tr')
	thead.append(tr)
	let th = document.createElement('th')
	th.id = 'rowsInput'
	th.innerText = rows
	th.contentEditable = 'true'
	tr.append(th)
	table.append(thead)
	th = document.createElement('th')
	th.id = 'numTopInput'
	th.innerText = numTop
	th.contentEditable = 'true'
	tr.append(th)
	for (let i = 1; i < 10; i++) {
		th = document.createElement('th')
		th.innerText = numTop + i
		tr.append(th)
	}
	const tbody = document.createElement('tbody')
	table.append(tbody)
	for (let i = 0; i < rows; i++) {
		tr = document.createElement('tr')
		th = document.createElement('th')
		th.innerText = numLeft + i
		if (i == 0) {
			th.id = 'numLeftInput'
			th.contentEditable = 'true'
		}
		tr.append(th)
		for (let j = 0; j < 10; j++) {
			const td = document.createElement('td')
			const correct = Math.random() > lieChance
			const result = product(numLeft + i, numTop + j, correct)

			if (!correct) {
				counter.innerText++

				errors.push({
					el: td,
					result,
				})

				td.addEventListener(
					'click',
					() => {
						td.classList.add('danger')
						counter.innerText--
					},
					{ once: true }
				)
			}

			td.innerText = `${numLeft + i} x ${numTop + j} = ${result}`
			tr.append(td)
		}
		tbody.append(tr)
	}
	numLeftInput.onkeydown =
		numTopInput.onkeydown =
		rowsInput.onkeydown =
			(e) => {
				if (e.key == 'Enter')
					buildTable(
						+numLeftInput.innerText,
						+numTopInput.innerText,
						+rowsInput.innerText
					)
			}
	numLeftInput.oninput = (e) => {
		const numLeft = +numLeftInput.innerText
		if (Number.isNaN(numLeft)) numLeftInput.innerText = 1
		if (numLeft < -99) numLeftInput.innerText = -99
		if (numLeft > 99) numLeftInput.innerText = 99
	}
	numTopInput.oninput = (e) => {
		const numTop = +numTopInput.innerText
		if (Number.isNaN(numTop)) numTopInput.innerText = 1
		if (numTop < -99) numTopInput.innerText = -99
		if (numTop > 99) numTopInput.innerText = 99
	}
	rowsInput.oninput = (e) => {
		const rows = +rowsInput.innerText
		if (!rows || rows < 0) rowsInput.innerText = 1
		if (rows > 20) rowsInput.innerText = 20
	}
}

function product(a, b, correct = true) {
	const prod = a * b
	if (!correct) {
		return prod + Math.floor(Math.random() * 26) - 13
	}
	return prod
}

table.onmousemove = (e) => {
	if (e.target.tagName == 'TD' || e.target.tagName == 'TH') {
		const i = e.target.cellIndex
		table
			.querySelectorAll('.selected')
			.forEach((cell) => cell.classList.remove('selected'))
		void [...table.rows].forEach((row) =>
			row.cells[i].classList.add('selected')
		)
	}
}

buildTable(1, 1, 10)
