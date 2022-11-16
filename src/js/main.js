import { createDiv, createButton, createInput } from "./createElements"
//import { modalWin } from "./modalWin"

const header = document.querySelector('.header')
const headerContainer = document.querySelector('.header__container')
const headerLogo = createDiv('header__logo', 'Trello')
const headerClock = createDiv('header__clock')
headerClock.id = 'clock'

headerContainer.append(headerLogo, headerClock)

function clockFun() {
	let date = new Date(),
		hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
		minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
	seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
	document.getElementById('clock').innerHTML = hours + ':' + minutes + ':' + seconds;
	//console.log(hours + ':' + minutes + ':' + seconds);
}
setInterval(clockFun, 1000);

const tasks = document.querySelector('.tasks')
const tasksContainer = createDiv('container tasks__container')
const tasksBoardCreated = createDiv('tasks-board tasks-board__created')
const tasksBoardInProgress = createDiv('tasks-board tasks-board__inProrgess')
const tasksBoardDone = createDiv('tasks-board tasks-board__done')

tasks.append(tasksContainer)
tasksContainer.append(tasksBoardCreated, tasksBoardInProgress, tasksBoardDone)

const tasksBoardHeaderCreated = createDiv('tasks-board__header tasks-board__header_created', 'TODO:')
const tasksHeaderInProgress = createDiv('tasks-board__header tasks-board__header_inProgress', 'IN PROGRESS:')
const tasksHeaderDone = createDiv('tasks-board__header tasks-board__header_done', 'DONE:')
const tasksBoardContentCreated = createDiv('tasks-board__content')
const tasksBoardContentInProgress = createDiv('tasks-board__content')
const tasksBoardContentDone = createDiv('tasks-board__content')

const wrapper = createDiv('hidden')
wrapper.id = 'modalWindowWrapper'

const contentModal = createDiv('modal-window-content')
//const modalText = openModal()

//contentModal.append(modalText)

//const modalWin = createDiv('modalWin-wrapper')
// modalWin.id = modal

tasksBoardCreated.append(tasksBoardHeaderCreated, tasksBoardContentCreated, wrapper)
tasksBoardInProgress.append(tasksHeaderInProgress, tasksBoardContentInProgress)
tasksBoardDone.append(tasksHeaderDone, tasksBoardContentDone)
wrapper.append(contentModal)

const addTaskButton = createButton('button tasks-board__addTaskButton', `+ Add todo`)
tasksBoardCreated.append(addTaskButton)

const deleteTasksButton = createButton('button tasks-board__deleteAllTasksButton', 'Delete All')
tasksBoardDone.append(deleteTasksButton)

//Array

const todoCardsArray = []
const dataCardsArray = []
let createdTasksDataArray = []
const inProgressTasksArray = []
const doneTasksArray = []


function addTask() {
	taskData = {
		id: new Date(),
		title: title,
		description: description,
		date: new Date().toLocaleDateString(),

	}
	createdTasksDataArray.push(taskData)
	generateTodo(createdTasksDataArray)
}

//TodoCard elements
function generateTodo(array) {

	array.forEach(element => {
		const taskItem = createDiv('task-item')
		taskItem.id = element.id
		tasksBoardContentCreated.appendChild(taskItem)

		const taskItemHeader = createDiv('task-item__header')
		taskItem.appendChild(taskItemHeader)

		const taskItemTitle = createDiv('task-item__title', element.title)
		taskItemHeader.appendChild(taskItemTitle)

		const taskItemButtons = createDiv('task-item__buttons-container')
		taskItemHeader.append(taskItemButtons)

		const taskItemButtonEdit = createInput('button task-item__button task-item__button_header', 'button', 'edit')
		taskItemButtonEdit.id = 'taskItemButtonEdit'
		taskItemButtons.appendChild(taskItemButtonEdit)

		const taskItemButtonDelete = createInput('button task-item__button task-item__button_header', 'button', 'delete')
		taskItemButtonDelete.id = 'taskItemButtonDelete'
		taskItemButtons.appendChild(taskItemButtonDelete)

		const taskItemDescriptionContainer = createDiv('task-item__description-container')
		taskItem.appendChild(taskItemDescriptionContainer)

		const taskItemDescriptionText = createDiv('task-item__description-text', element.description)
		taskItemDescriptionContainer.appendChild(taskItemDescriptionText)

		const taskItemSlideButton = createInput('task-item__slide-button', 'button', '>')
		taskItemDescriptionContainer.appendChild(taskItemSlideButton)

		const taskItemFooter = createDiv('task-item__footer')
		taskItem.appendChild(taskItemFooter)

		const taskItemUser = createDiv('task-item__user')
		taskItemUser.innerHTML = element.user // = ...value in future
		taskItemFooter.appendChild(taskItemUser)

		const taskItemTime = createDiv('task-item__date')
		taskItemTime.innerHTML = element.date
		taskItemFooter.appendChild(taskItemTime)
	})
	//TodoCard elements
}

function taskForm() {

	const taskItem = createDiv('task-item')
	tasksBoardContentCreated.appendChild(taskItem)

	const taskItemTitleText = createInput('task-item__input-title', 'text')
	taskItemTitleText.placeholder = 'Title' // = .value in future
	taskItem.appendChild(taskItemTitleText)

	const taskItemDescriptionTextarea = document.createElement('textarea')
	taskItemDescriptionTextarea.className = 'button task-item__textarea'
	taskItemDescriptionTextarea.innerHTML = '' // = .value in future
	taskItem.appendChild(taskItemDescriptionTextarea)

	const taskItemFooter = createDiv('task-item__footer')
	taskItem.appendChild(taskItemFooter)

	const taskItemSelectUser = document.createElement('select')
	taskItemSelectUser.className = 'task-item__select-user'
	taskItemFooter.appendChild(taskItemSelectUser)

	const taskItemSelectUserItem1 = document.createElement('option')
	taskItemSelectUserItem1.innerHTML = 'user1'
	const taskItemSelectUserItem2 = document.createElement('option')
	taskItemSelectUserItem2.innerHTML = 'user2'
	taskItemSelectUser.append(taskItemSelectUserItem1, taskItemSelectUserItem2)

	const taskItemButtons = createDiv('task-item__buttons-container')
	taskItemFooter.append(taskItemButtons)

	const taskItemCancelButton = createInput('button task-item__button', 'button', 'Cancel')
	const taskItemConfirmButton = createInput('button task-item__button', 'submit', 'Confirm')
	taskItemButtons.append(taskItemCancelButton, taskItemConfirmButton)

	taskItemCancelButton.addEventListener('click', () => taskItem.remove())

	taskItemConfirmButton.addEventListener('click', () => {
		taskData = {
			id: new Date(),
			title: taskItemTitleText.value,
			description: taskItemDescriptionTextarea.value,
			date: new Date().toLocaleDateString(),
			user: taskItemSelectUser.value,
		}
		createdTasksDataArray.push(taskData)
		tasksBoardContentCreated.innerHTML = null
		generateTodo(createdTasksDataArray)
		taskItem.remove()
	})
	return taskData
}

addTaskButton.addEventListener('click', taskForm)

// //Delete Card

window.addEventListener('click', function (e) {

	if (e.target.id == 'taskItemButtonDelete') {
		//Delete element
		let cardToDelete = e.target.parentNode.parentNode.parentNode
		createdTasksDataArray.forEach((element, index) => {
			if (cardToDelete.id == element.id) {
				cardToDelete.remove()
				createdTasksDataArray.splice(index, 1)
				tasksBoardContentCreated.innerHTML = null
				generateTodo(createdTasksDataArray)
			}
		})
	}
})

//localStorage
window.addEventListener('beforeunload', function () {
	localStorage.setItem('task', JSON.stringify(createdTasksDataArray))
})

window.addEventListener('load', function (e) {
	let dataFromLocalStorage = localStorage.getItem('task')
	createdTasksDataArray = JSON.parse(dataFromLocalStorage) || []
	generateTodo(createdTasksDataArray)
})

function openModal() {
	const taskItemOpenModal = createDiv('task-item__OpenModal')
	contentModal.appendChild(taskItemOpenModal)

	const taskItemTitleTextOpenModal = createInput('task-item__input-title__OpenModal', 'text__OpenModal')
	taskItemTitleTextOpenModal.placeholder = ''// = .value in future
	taskItemOpenModal.appendChild(taskItemTitleTextOpenModal)

	const taskItemDescriptionTextareaOpenModal = document.createElement('textarea__OpenModal')
	taskItemDescriptionTextareaOpenModal.className = 'button task-item__textarea__OpenModal'
	taskItemDescriptionTextareaOpenModal.innerHTML = ''// = .value in future
	taskItemOpenModal.appendChild(taskItemDescriptionTextareaOpenModal)

	const taskItemFooterOpenModal = createDiv('task-item__footer')
	taskItemOpenModal.appendChild(taskItemFooterOpenModal)

	const taskItemSelectUserOpenModal = document.createElement('select__OpenModal')
	taskItemSelectUserOpenModal.className = 'task-item__select-user__OpenModal'
	taskItemFooterOpenModal.appendChild(taskItemSelectUserOpenModal)

	const taskItemSelectUserItem1OpenModal = document.createElement('option__OpenModal')
	taskItemSelectUserItem1OpenModal.innerHTML = 'user1'
	const taskItemSelectUserItem2OpenModal = document.createElement('option__OpenModal')
	taskItemSelectUserItem2OpenModal.innerHTML = 'user2'
	taskItemSelectUserOpenModal.append(taskItemSelectUserItem1OpenModal, taskItemSelectUserItem2OpenModal)

	const taskItemButtonsOpenModal = createDiv('task-item__buttons-container__OpenModal')
	taskItemFooterOpenModal.append(taskItemButtonsOpenModal)

	const taskItemCancelButtonOpenModal = createInput('button task-item__button__OpenModal', 'button__OpenModal', 'Cancel')
	const taskItemConfirmButtonOpenModal = createInput('button task-item__button__OpenModal', 'submit__OpenModal', 'Confirm')
	taskItemButtonsOpenModal.append(taskItemCancelButtonOpenModal, taskItemConfirmButtonOpenModal)

	taskItemCancelButtonOpenModal.addEventListener('click', () => taskItemOpenModal.remove())

	taskItemConfirmButtonOpenModal.addEventListener('click', () => {
		// taskData = {
		// 	id: new Date(),
		// 	title: taskItemTitleTextOpenModal.value,
		// 	description: taskItemDescriptionTextareaOpenModal.value,
		// 	date: new Date().toLocaleDateString(),
		// 	user: taskItemSelectUserOpenModal.value,
		// }
		// createdTasksDataArray.push(taskData)
		wrapper.classList.add('hidden')
		// tasksBoardContentCreated.innerHTML = null
		// generateTodo(createdTasksDataArray)
		// taskItemOpenModal.remove()

	})
	return taskItemOpenModal
}


window.addEventListener('click', function (e) {
	if (e.target.id == 'taskItemButtonEdit') {
		let cardOpenModalWindow = e.target.parentNode.parentNode.parentNode
		createdTasksDataArray.forEach((element, index) => {
			if (cardOpenModalWindow.id == element.id) {
				//let modalWindowWrapper = document.querySelector('#modalWindowWrapper')
				openModal()
				wrapper.classList.remove('hidden')
				//let taskItemDescriptionTextarea = cardOpenModalWindow.querySelector('.button task-item__textarea')
				let taskItemDescriptionTextareaOpenModal = cardOpenModalWindow.querySelector('.button task-item__textarea__OpenModal')
				taskItemDescriptionTextareaOpenModal.innerHTML = taskData.description
				//taskItemDescriptionTextarea.innerHTML
				//openModal()
				// let taskItemTitleTextCard = cardOpenModalWindow.querySelector('.task-item__input-title')
				// let taskItemTitleText = cardOpenModalWindow.querySelector('.task-item__input-title_OpenModal')
				// taskItemTitleText.placehold = taskData.title
				//taskForm()

			}
		})
	}
})
// //Delete Card

// const prorgessBtn = document.createElement('button')
// prorgessBtn.className = 'prorgessBtn'
// prorgessBtn.innerHTML = 'IN PRORGESS'// + счетчик форм
// tasksInProgress.appendChild(prorgessBtn)

// const doneBtn = document.createElement('button')
// doneBtn.className = 'doneBtn'
// doneBtn.innerHTML = 'DONE'// + счетчик форм
// tasksDone.appendChild(doneBtn)

// const deleteAll = document.createElement('button')
// deleteAll.className = 'deleteAll'
// deleteAll.innerHTML = 'Delete all'
// tasksDone.appendChild(deleteAll)

