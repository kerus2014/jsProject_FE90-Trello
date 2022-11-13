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

const addButton = document.createElement('button')
addButton.className = 'addButton'
addButton.innerHTML = 'Add todo'
todoForms.appendChild(addButton)

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
