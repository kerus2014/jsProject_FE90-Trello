const container = document.querySelector('.container')
console.log(container);
const header = document.querySelector('.header')
console.log(header);
const content = document.querySelector('.content')
console.log(content);

const todoForms = document.createElement('div')
todoForms.className = 'todoForms'
content.append(todoForms)

const prorgessForms = document.createElement('div')
prorgessForms.className = 'prorgessForms'
content.append(prorgessForms)

const doneForms = document.createElement('div')
doneForms.className = 'doneForms'
content.append(doneForms)

const logo = document.createElement('div')
logo.className = 'logo'
logo.innerHTML = 'Trello'
header.appendChild(logo)

const clock = document.createElement('div')
clock.className = 'clock'
clock.id = 'clock'
header.appendChild(clock)

function clockFun() {
	let date = new Date(),
		hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
		minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
		seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
	document.getElementById('clock').innerHTML = hours + ':' + minutes + ':' + seconds;
	//console.log(hours + ':' + minutes + ':' + seconds);
}
setInterval(clockFun, 1000);

const todo = document.createElement('button')
todo.className = 'todo'
todo.innerHTML = 'TODO:'// + счетчик форм
todoForms.appendChild(todo)


//Array

const todoCardsArray = []
const dataCardsArray = []
console.log(todoCardsArray)


//TodoCard elements
function generateTodo() {

	const todoCardContainer = document.createElement('div')
	todoCardContainer.className = 'todoCardContainer'
	todoForms.appendChild(todoCardContainer)

	const todoCardEditButton = document.createElement('input')
	todoCardEditButton.className = 'todoCardEditButton'
	todoCardEditButton.type = 'button'
	todoCardEditButton.value = 'edit'
	todoCardContainer.appendChild(todoCardEditButton)

	const todoCardDeleteButton = document.createElement('input')
	todoCardDeleteButton.className = 'todoCardDeleteButton'
	todoCardDeleteButton.type = 'button'
	todoCardDeleteButton.value = 'delete'
	todoCardContainer.appendChild(todoCardDeleteButton)

	const todoCardSlideButton = document.createElement('input')
	todoCardSlideButton.className = 'todoCardSlideButton'
	todoCardSlideButton.type = 'button'
	todoCardSlideButton.value = '>'
	todoCardContainer.appendChild(todoCardSlideButton)

	const todoCardHeader = document.createElement('div')
	todoCardHeader.className = 'todoCardHeader'
	todoCardContainer.appendChild(todoCardHeader)

	const todoCardHeaderTitle = document.createElement('p')
	todoCardHeaderTitle.className = 'todoCardHeaderTitle'
	todoCardHeaderTitle.innerHTML = 'Title' // = .value in future
	todoCardHeader.appendChild(todoCardHeaderTitle)



	const todoCardDescription = document.createElement('div')
	todoCardDescription.className = 'todoCardDescription'
	todoCardContainer.appendChild(todoCardDescription)

	const todoCardDescriptionText = document.createElement('p')
	todoCardDescriptionText.className = 'todoCardDescriptionText'
	todoCardDescriptionText.innerHTML = 'Description' // = .value in future
	todoCardDescription.appendChild(todoCardDescriptionText)

	const todoCardFooter = document.createElement('div')
	todoCardFooter.className = 'todoCardFooter'
	todoCardContainer.appendChild(todoCardFooter)

	const todoCardFooterUser = document.createElement('p')
	todoCardFooterUser.className = 'todocardFooterUser'
	todoCardFooterUser.innerHTML = 'User' // = ...value in future
	todoCardFooter.appendChild(todoCardFooterUser)

	const todoCardFooterTime = document.createElement('div')
	todoCardFooterTime.className = 'todocardFooterTime'
	todoCardFooterTime.innerHTML = new Date().toLocaleTimeString()
	todoCardFooter.appendChild(todoCardFooterTime)

	todoCardsArray.push(todoCardContainer)
	console.log(todoCardsArray)
	//TodoCard elements
}

//Delete Card

window.addEventListener('click', function (e) {

	if (e.target.classList.contains('todoCardDeleteButton')) {
		//Delete element
		let cardToDelete = e.target.parentNode
		let index = todoCardsArray.indexOf(cardToDelete)
		cardToDelete.remove()
		todoCardsArray.splice(index, 1)
	}
})

//Delete Card


const addButton = document.createElement('button')
addButton.className = 'addButton'
addButton.innerHTML = 'Add todo'
todoForms.appendChild(addButton)

addButton.addEventListener('click', generateTodo)

const prorgessBtn = document.createElement('button')
prorgessBtn.className = 'prorgessBtn'
prorgessBtn.innerHTML = 'IN PRORGESS'// + счетчик форм
prorgessForms.appendChild(prorgessBtn)

const doneBtn = document.createElement('button')
doneBtn.className = 'doneBtn'
doneBtn.innerHTML = 'DONE'// + счетчик форм
doneForms.appendChild(doneBtn)

const deleteAll = document.createElement('button')
deleteAll.className = 'deleteAll'
deleteAll.innerHTML = 'Delete all'
doneForms.appendChild(deleteAll)

