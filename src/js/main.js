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

//Array

let createdTasksDataArray = []
let inProgressTasksDataArray = []
let doneTasksDataArray = []

tasks.append(tasksContainer)
tasksContainer.append(tasksBoardCreated, tasksBoardInProgress, tasksBoardDone)

const tasksHeaderCreated = createDiv('tasks-board__header tasks-board__header_created')
const taskBoardHeaderCreatedTitle = createDiv('tasks-board__header-title', 'Created:')
const taskBoardHeaderCreatedCounter = createDiv('tasks-board__header-counter', createdTasksDataArray.length)

const tasksHeaderInProgress = createDiv('tasks-board__header tasks-board__header_inProgress',)
const tasksHeaderInProgressTitle = createDiv('tasks-board__header-title', 'IN PROGRESS:')
const tasksHeaderInProgressCounter = createDiv('tasks-board__header-counter', inProgressTasksDataArray.length)

const tasksHeaderDone = createDiv('tasks-board__header tasks-board__header_done')
const tasksHeaderDoneTitle = createDiv('tasks-board__header-title', 'DONE:')
const tasksHeaderDoneCounter = createDiv('tasks-board__header-counter', doneTasksDataArray.length)

const tasksBoardContentCreated = createDiv('tasks-board__content')
const tasksBoardContentInProgress = createDiv('tasks-board__content')
const tasksBoardContentDone = createDiv('tasks-board__content')

const wrapper = createDiv('hidden')
wrapper.id = 'modalWindowWrapper'

const contentModal = createDiv('modal-window-content')
wrapper.append(contentModal)

tasksBoardCreated.append(tasksHeaderCreated, tasksBoardContentCreated, wrapper)
tasksBoardInProgress.append(tasksHeaderInProgress, tasksBoardContentInProgress)
tasksBoardDone.append(tasksHeaderDone, tasksBoardContentDone)

tasksHeaderCreated.append(taskBoardHeaderCreatedTitle, taskBoardHeaderCreatedCounter)
tasksHeaderInProgress.append(tasksHeaderInProgressTitle, tasksHeaderInProgressCounter)
tasksHeaderDone.append(tasksHeaderDoneTitle, tasksHeaderDoneCounter)

const addTaskButton = createButton('button tasks-board__addTaskButton', `+ Add todo`)
tasksBoardCreated.append(addTaskButton)

const deleteTasksButton = createButton('button tasks-board__deleteAllTasksButton', 'Delete All')
tasksBoardDone.append(deleteTasksButton)

//TodoCard elements
function generateTodo(array) {

	array.forEach((element, index) => {
		const taskItem = createDiv('task-item')
		taskItem.id = element.id

		if (JSON.stringify(array) === JSON.stringify(createdTasksDataArray)) {
			tasksBoardContentCreated.append(taskItem)
		} else if (JSON.stringify(array) === JSON.stringify(inProgressTasksDataArray)) {
			tasksBoardContentInProgress.append(taskItem)
		} else if (JSON.stringify(array) === JSON.stringify(doneTasksDataArray)) {
			tasksBoardContentDone.append(taskItem)
		}

		const taskItemHeader = createDiv('task-item__header')
		taskItem.appendChild(taskItemHeader)

		const taskItemTitle = createDiv('task-item__title', element.title)
		taskItemHeader.appendChild(taskItemTitle)

		const taskItemButtons = createDiv('task-item__buttons-container')
		taskItemHeader.append(taskItemButtons)

		const taskItemButtonEdit = createInput('button task-item__button task-item__button_header', 'button', 'edit')
		taskItemButtonEdit.id = 'taskItemButtonEdit'

		const taskItemButtonDelete = createInput('button task-item__button task-item__button_header', 'button', 'delete')
		taskItemButtonDelete.id = 'taskItemButtonDelete'

		const taskItemButtonBack = createInput('button task-item__button task-item__button_header', 'button', 'back')
		taskItemButtonBack.id = 'taskItemButtonBack'

		const taskItemButtonComplete = createInput('button task-item__button task-item__button_header', 'button', 'complete')
		taskItemButtonComplete.id = 'taskItemButtonComplete'

		if (JSON.stringify(array) === JSON.stringify(inProgressTasksDataArray)) {
			taskItemButtons.append(taskItemButtonBack, taskItemButtonComplete)
		} else if (JSON.stringify(array) === JSON.stringify(createdTasksDataArray)) {
			taskItemButtons.append(taskItemButtonEdit, taskItemButtonDelete)
		} else if (JSON.stringify(array) === JSON.stringify(doneTasksDataArray)) {
			taskItemButtons.append(taskItemButtonDelete)
		}

		const taskItemDescriptionContainer = createDiv('task-item__description-container')
		taskItem.appendChild(taskItemDescriptionContainer)

		const taskItemDescriptionText = createDiv('task-item__description-text', element.description)
		taskItemDescriptionContainer.appendChild(taskItemDescriptionText)

		const taskItemSlideButton = createInput('task-item__slide-button', 'button', '>')


		if (JSON.stringify(array) === JSON.stringify(createdTasksDataArray)) {
			taskItemDescriptionContainer.appendChild(taskItemSlideButton)
		}

		taskItemSlideButton.addEventListener('click', () => {
			inProgressTasksDataArray.push(element)
			createdTasksDataArray.splice(index, 1)
			tasksBoardContentCreated.innerHTML = null
			tasksBoardContentInProgress.innerHTML = null
			generateTodo(inProgressTasksDataArray)
			generateTodo(createdTasksDataArray)
		})

		taskItemButtonBack.addEventListener('click', () => {
			createdTasksDataArray.push(element)
			inProgressTasksDataArray.splice(index, 1)
			tasksBoardContentCreated.innerHTML = null
			tasksBoardContentInProgress.innerHTML = null
			generateTodo(inProgressTasksDataArray)
			generateTodo(createdTasksDataArray)
		})

		taskItemButtonComplete.addEventListener('click', () => {
			doneTasksDataArray.push(element)
			inProgressTasksDataArray.splice(index, 1)
			tasksBoardContentDone.innerHTML = null
			tasksBoardContentInProgress.innerHTML = null
			generateTodo(inProgressTasksDataArray)
			generateTodo(doneTasksDataArray)
		})

		taskItemButtonDelete.addEventListener('click', () => {
			if (JSON.stringify(array) === JSON.stringify(createdTasksDataArray)) {
				createdTasksDataArray.splice(index, 1)
				tasksBoardContentCreated.innerHTML = null
				generateTodo(createdTasksDataArray)
			} else if (JSON.stringify(array) === JSON.stringify(doneTasksDataArray)) {
				doneTasksDataArray.splice(index, 1)
				tasksBoardContentDone.innerHTML = null
				generateTodo(doneTasksDataArray)
			}
		})

		const taskItemFooter = createDiv('task-item__footer')
		taskItem.appendChild(taskItemFooter)

		const taskItemUser = createDiv('task-item__user')
		taskItemUser.innerHTML = element.user // = ...value in future
		taskItemFooter.appendChild(taskItemUser)

		const taskItemTime = createDiv('task-item__date')
		taskItemTime.innerHTML = element.date
		taskItemFooter.appendChild(taskItemTime)
	})
	taskBoardHeaderCreatedCounter.innerHTML = createdTasksDataArray.length
	tasksHeaderInProgressCounter.innerHTML = inProgressTasksDataArray.length
	tasksHeaderDoneCounter.innerHTML = doneTasksDataArray.length
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
		let taskData = {
			id: new Date(),
			title: taskItemTitleText.value,
			description: taskItemDescriptionTextarea.value,
			date: new Date().toLocaleDateString(),
			user: taskItemSelectUser.value,
		}

		createdTasksDataArray.push(taskData)
		tasksBoardContentCreated.innerHTML = null
		generateTodo(createdTasksDataArray)
		return taskData
	})
}

addTaskButton.addEventListener('click', taskForm)

deleteTasksButton.addEventListener('click', () => {
	doneTasksDataArray.splice(0)
	tasksBoardContentDone.innerHTML = null
	generateTodo(doneTasksDataArray)
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
	const taskItemOpenModal = createDiv('task-item-openmodal')
	contentModal.appendChild(taskItemOpenModal)

	const taskItemTitleTextOpenModal = createInput('task-item__input-title-openmodal', 'text')
	//let taskItemTitleText = document.querySelector('.task-item__input-title')
	taskItemTitleTextOpenModal.placeholder = ''//taskItemTitleText.placeholder//''// = .value in future
	taskItemOpenModal.appendChild(taskItemTitleTextOpenModal)

	const taskItemDescriptionTextareaOpenModal = document.createElement('textarea-openModal')
	taskItemDescriptionTextareaOpenModal.className = 'button task-item__textarea-openModal'
	taskItemDescriptionTextareaOpenModal.innerHTML = ''// = .value in future
	taskItemOpenModal.appendChild(taskItemDescriptionTextareaOpenModal)

	const taskItemDescriptionContainer = createDiv('task-item__description-container-openmodal')
	taskItemOpenModal.appendChild(taskItemDescriptionContainer)

	const taskItemDescriptionText = createInput('task-item__description-text-openmodal')
	taskItemDescriptionContainer.appendChild(taskItemDescriptionText)

	const taskItemFooterOpenModal = createDiv('task-item__footer')
	taskItemOpenModal.appendChild(taskItemFooterOpenModal)

	const taskItemSelectUserOpenModal = document.createElement('select')
	taskItemSelectUserOpenModal.className = 'task-item__select-user'
	taskItemFooterOpenModal.appendChild(taskItemSelectUserOpenModal)

	const taskItemSelectUserItem1OpenModal = document.createElement('option')
	taskItemSelectUserItem1OpenModal.innerHTML = 'user1'
	const taskItemSelectUserItem2OpenModal = document.createElement('option')
	taskItemSelectUserItem2OpenModal.innerHTML = 'user2'
	taskItemSelectUserOpenModal.append(taskItemSelectUserItem1OpenModal, taskItemSelectUserItem2OpenModal)

	const taskItemButtonsOpenModal = createDiv('task-item__buttons-container-openmodal')
	taskItemFooterOpenModal.append(taskItemButtonsOpenModal)

	const taskItemCancelButtonOpenModal = createInput('button task-item__button-openmodal', 'button', 'Cancel')
	const taskItemConfirmButtonOpenModal = createInput('button task-item__button-openmodal confirm-button', 'submit', 'Confirm')
	taskItemButtonsOpenModal.append(taskItemCancelButtonOpenModal, taskItemConfirmButtonOpenModal)

	taskItemCancelButtonOpenModal.addEventListener('click', () => {
		wrapper.classList.add('hidden')
	})

	//taskItemConfirmButtonOpenModal.addEventListener('click', () => {
	//wrapper.classList.add('hidden')
	// taskData.title = taskItemTitleTextOpenModal.value,
	// 	taskData.description = taskItemDescriptionTextareaOpenModal.value,
	// 	taskData.user = taskItemSelectUserOpenModal.value,
	// taskData = {
	// 	//id: new Date(),
	// 	title: taskItemTitleTextOpenModal.value,
	// 	description: taskItemDescriptionTextareaOpenModal.value,
	// 	//date: new Date().toLocaleDateString(),
	// 	user: taskItemSelectUserOpenModal.value,
	// }
	//createdTasksDataArray.push(taskData)
	//tasksBoardContentCreated.innerHTML = null
	//generateTodo(createdTasksDataArray)
	//})
	//return taskItemOpenModal
}


window.addEventListener('click', function (e) {
	if (e.target.id == 'taskItemButtonEdit') {
		let cardOpenModalWindow = e.target.parentNode.parentNode.parentNode
		createdTasksDataArray.forEach((element, index) => {
			if (cardOpenModalWindow.id == element.id) {
				console.log(cardOpenModalWindow)
				openModal()
				wrapper.classList.remove('hidden')
				let title = cardOpenModalWindow.querySelector('.task-item__title')
				console.log(title);
				let text = cardOpenModalWindow.querySelector('.task-item__description-text')
				console.log(text)
				let titleOpenModal = document.querySelector('.task-item__input-title-openmodal')
				console.log(titleOpenModal);
				titleOpenModal.placeholder = title.innerHTML
				let textOpenModal = document.querySelector('.task-item__description-text-openmodal')
				console.log(textOpenModal);
				textOpenModal.placeholder = text.innerHTML

				let confirmModal = document.querySelector('.confirm-button')
				console.log(confirmModal);
				confirmModal.addEventListener('click', () => {
					title.innerHTML = titleOpenModal.placeholder
					text.innerHTML = textOpenModal.placeholder
					wrapper.classList.add('hidden')
					//generateTodo(createdTasksDataArray)
				})
			}
		})
	}
})


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

