//import { productAllArray } from "./util.js";

export let productKorzinaArray = []
export let productAllArray = []

window.addEventListener('load', function (e) {
	let dataFromLocalStorage = localStorage.getItem('Price-list')
	productKorzinaArray = JSON.parse(dataFromLocalStorage) || []
	// for (let productElement of productKorzinaArray) {
	// 	creatContentModal(e, productElement)
	// }
})

window.addEventListener('beforeunload', function () {
	localStorage.setItem('Price-list', JSON.stringify(productKorzinaArray))
})

window.addEventListener('load', function (e) {
	let dataFromLocalStorage = localStorage.getItem('Price-All')
	productAllArray = JSON.parse(dataFromLocalStorage) || []
	// for (let productElement of productKorzinaArray) {
	// 	creatContentModal(e, productElement)
	// }
})

window.addEventListener('beforeunload', function () {
	localStorage.setItem('Price-All', JSON.stringify(productAllArray))
})