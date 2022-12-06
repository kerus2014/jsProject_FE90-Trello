import { createDiv } from "./createElements"

export function getAndAppendUsersData(parent, array){
    return fetch("https://638cd7acd2fc4a058a618bc5.mockapi.io/users")
	.then(response => response.json())
	.then(response => {
		array = response
		array.forEach(el => {
			const user = createDiv('header__user')
			user.style.background = `url(${el.avatar})`
			parent.prepend(user)

			})
		})
}