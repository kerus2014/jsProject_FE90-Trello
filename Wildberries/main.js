const korzina = document.querySelector('.btn-outline-success')
const modal = document.querySelector('.modal')
const modalList = document.querySelector('.modal-ul')
const btnSumma = document.querySelector('.summa')
let productKorzinaArray = []
let productAllArray = []

korzina.addEventListener('click', (e) => {
	e.preventDefault()
	modal.style.display = 'block'
	modalList.innerHTML = null
	creatContentModal()
}
)

function creatContentModal() {
	let summa = 0
	for (let li of productKorzinaArray) {
		summa = productKorzinaArray.reduce((total, person) => {
			return total + Number(person.price)
		}, 0).toFixed(1)
		console.log(summa);

		const modalItemList = document.createElement('li')
		modalItemList.classList = 'modal-li'
		modalItemList.innerHTML = JSON.stringify(li.name + "  -  " + li.price + ' p')
		modalList.append(modalItemList)
	}
	btnSumma.innerHTML = "ИТОГО :    " + summa + '  p'
}

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

const url = 'https://6377cc2e5c477765122727ec.mockapi.io/products'

const saleProcent = 10

const listContainer = document.querySelector('.list-container')
let cardList = document.createElement('div')
cardList.classList = 'card-list'
listContainer.append(cardList)

function showCard(product, productItem) {
	//const cardList = document.querySelector('.card-list')
	//console.log(cardList);
	const cardItem = document.createElement('div')
	cardItem.classList = 'card__item'
	cardItem.id = product.id
	cardList.append(cardItem)

	const card = document.createElement('div')
	card.classList = 'card'
	card.style.width = "17rem"
	cardItem.append(card)

	const picture = document.createElement('img')
	picture.src = product.avatar
	picture.classList = 'card-img-top'
	card.append(picture)

	const cardBody = document.createElement('div')
	cardBody.classList = 'card-body'
	card.append(cardBody)

	const cardTitle = document.createElement('h5')
	cardTitle.classList = 'card-title'
	cardTitle.innerHTML = product.name
	cardBody.append(cardTitle)

	const cardText = document.createElement('p')
	cardText.classList = 'card-text'
	cardText.innerHTML = ' Товар участвует в АКЦИИ "Путешествие на двоих в Тайланд"'
	cardBody.append(cardText)

	const sale = document.createElement('a')
	sale.classList = 'btn btn-primary'
	sale.href = '#'
	sale.innerHTML = `- ${saleProcent} % `
	cardBody.append(sale)

	const btnKorzina = document.createElement('button')
	btnKorzina.classList = 'btn btn-primary btn-lg btn-korzina'
	btnKorzina.href = '#'
	btnKorzina.innerHTML = 'В корзину'
	cardBody.append(btnKorzina)

	btnKorzina.addEventListener('click', () => {
		productKorzinaArray.push(productItem)
		console.log(productKorzinaArray);
	})

	const price = document.createElement('div')
	price.classList = 'price'
	cardItem.append(price)

	const priceNow = document.createElement('p')
	priceNow.classList = 'price__now'
	const priceSummaNow = product.price / 100 * (100 - saleProcent)
	priceNow.innerHTML = priceSummaNow.toFixed(1) + ' p'
	price.append(priceNow)

	const priceBefore = document.createElement('p')
	priceBefore.classList = 'price__before'
	priceBefore.innerHTML = product.price + ' p'
	price.append(priceBefore)

	// if (!productItem) {
	productItem = {
		avatar: product.avatar,
		id: product.id,
		name: product.name,
		price: priceSummaNow.toFixed(1),
		price2: product.price
	}
	productAllArray.push(productItem)
	//console.log(productAllArray);
	// }
}

const postOptions = {
	method: 'POST',
	headers: {
		'Content-type': 'application/json'
	},
	body: JSON.stringify({ name: 'Kevin' })
}

const postRequest = new Request(url, postOptions)
fetch(url)
	.then(response => response.json())
	.then(products => {
		products.forEach(product => showCard(product))
	})
const modalBody = document.querySelector('.modal-body')


window.addEventListener('load', function (e) {
	let dataFromLocalStorage = localStorage.getItem('Price-list')
	productKorzinaArray = JSON.parse(dataFromLocalStorage) || []
	for (let productElement of productKorzinaArray) {
		creatContentModal(e, productElement)
	}
})

window.addEventListener('beforeunload', function () {
	localStorage.setItem('Price-list', JSON.stringify(productKorzinaArray))
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