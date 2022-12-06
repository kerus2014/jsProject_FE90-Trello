import { korzina } from './util.js'
import { modal } from './util.js'
import { modalList } from './util.js'
import { creatContentModal } from "./creatModalWindow.js";
import { btnSumma } from './util.js'
import { productKorzinaArray } from './localStorage.js'
import { cardList } from './showCard.js'
import { productAllArray } from './localStorage.js'

const listContainer = document.querySelector('.list-container')
listContainer.append(cardList)

korzina.addEventListener('click', (e) => {
	e.preventDefault()
	modal.style.display = 'block'
	modalList.innerHTML = null
	creatContentModal()
}
)

const clearKorzina = document.querySelector('#modalclear')
clearKorzina.addEventListener('click', () => {
	console.log(productKorzinaArray.length)
	productKorzinaArray.splice(0, productKorzinaArray.length)
	modalList.innerHTML = null
	btnSumma.innerHTML = null
})

const btnClose = document.querySelector('.btn-close')
btnClose.addEventListener('click', () => {
	modal.style.display = 'none'
})

const search = document.querySelector('.search-btn')
console.log(productAllArray);
console.log(search);
search.addEventListener('keyup', function (e) {
	let value = search.value
	let searchList = productAllArray.filter(el => el.name.includes(value))
	const listContainer = document.querySelector('.card-list')
	listContainer.innerHTML = null
	for (let product of searchList) {
		showCard(e, product)
	}
})