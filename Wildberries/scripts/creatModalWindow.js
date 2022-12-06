import { modalList } from "./util.js";
import { productKorzinaArray } from "./localStorage.js";
import { btnSumma } from "./util.js";

export function creatContentModal() {
	let summa = 0
	for (let li of productKorzinaArray) {
		summa = productKorzinaArray.reduce((total, person) => {
			return total + Number(person.price)
		}, 0).toFixed(1)
		console.log(summa);

		const modalItemList = document.createElement('li')
		modalItemList.classList = 'modal-li'
		modalItemList.innerHTML = JSON.stringify(li.name + "       -         " + li.price + ' p')
		modalList.append(modalItemList)
	}
	btnSumma.innerHTML = "ИТОГО :    " + summa + '  p'
}