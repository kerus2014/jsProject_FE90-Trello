// import { createDiv, createButton, createInput } from "./createElements"

function createDiv(divClassName, divInnerText = ''){
	divName = document.createElement('div')
	divName.className = divClassName
	divName.innerHTML = divInnerText
	return divName
}

function createButton(btnClassName, btnInnerText = ''){
	btnName = document.createElement('button')
	btnName.className = btnClassName
	btnName.innerHTML = btnInnerText
	return btnName
}

function createInput(inputClassName, inputType,inputValue = null){
    inputName = document.createElement('input')
	inputName.className = inputClassName
	inputName.type = inputType
    inputName.value = inputValue
	return inputName
}

let createdTasksDataArray = []
let inProgressTasksDataArray = []
let doneTasksDataArray = []
let usersArray = []

const header = document.querySelector('.header')
const headerContainer = document.querySelector('.header__container')
const headerTitle = createDiv('header__title', 'Tasks on this week')
const headerLeftContent = createDiv('header__left-content')
const allUsers = createDiv('header__all-users')
const buttonAddUser = createButton('header__add-user button', '+ Add participant') 
headerLeftContent.append(headerTitle, allUsers)
fetch("https://638cd7acd2fc4a058a618bc5.mockapi.io/users")
		.then(response => response.json())
		.then(response => {
			usersArray = response
			usersArray.forEach(el => {
				const user = createDiv('header__user')
				user.style.background = `url(${el.avatar})`
				allUsers.append(user)
			})
			allUsers.append(buttonAddUser)
			})
const headerClock = createDiv('header__clock')
headerClock.id = 'clock'

headerContainer.append(headerLeftContent,headerClock)

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



tasks.append(tasksContainer)
tasksContainer.append(tasksBoardCreated, tasksBoardInProgress, tasksBoardDone)

const tasksHeaderCreated = createDiv('tasks-board__header tasks-board__header_created')
const taskBoardHeaderCreatedTitle = createDiv('tasks-board__header-title', 'Created')
const taskBoardHeaderCreatedCounter = createDiv('tasks-board__header-counter', createdTasksDataArray.length)

const tasksHeaderInProgress = createDiv('tasks-board__header tasks-board__header_inProgress',)
const tasksHeaderInProgressTitle = createDiv('tasks-board__header-title', 'In progress')
const tasksHeaderInProgressCounter = createDiv('tasks-board__header-counter tasks-board__header-counter_inProgress ', inProgressTasksDataArray.length)

const tasksHeaderDone = createDiv('tasks-board__header tasks-board__header_done')
const tasksHeaderDoneTitle = createDiv('tasks-board__header-title', 'Done')
const tasksHeaderDoneCounter = createDiv('tasks-board__header-counter tasks-board__header-counter_done', doneTasksDataArray.length)
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
		const taskItemMask = createDiv('task-item__mask')
		taskItem.append(taskItemMask)
		// taskItem.setAttribute('draggable', true) //Включил драгбл
		
		taskItem.id = element.id

		if (JSON.stringify(array) === JSON.stringify(createdTasksDataArray)) {
			taskItem.className += ' tasksCreated-color'
			tasksBoardContentCreated.append(taskItem)
		} else if (JSON.stringify(array) === JSON.stringify(inProgressTasksDataArray)) {
			tasksBoardContentInProgress.append(taskItem)
			taskItem.className += ' tasksInProgress-color'
		} else if (JSON.stringify(array) === JSON.stringify(doneTasksDataArray)) {
			tasksBoardContentDone.append(taskItem)
			taskItem.className += ' tasksDone-color'
		}

		const taskItemHeader = createDiv('task-item__header')
		taskItem.appendChild(taskItemHeader)

		const taskItemTitle = createDiv('task-item__title', element.title)
		taskItemHeader.appendChild(taskItemTitle)

		const taskItemButtonMore = createDiv('task-item__button-more')
		taskItemHeader.append(taskItemButtonMore)

		const taskItemButtonsInMore = createDiv('task-item__buttons-container task-item__buttons-container_inMore ')
		taskItemHeader.append(taskItemButtonsInMore)

		const taskItemButtonEdit = createInput('button task-item__button task-item__button_header', 'button', 'Edit')
		taskItemButtonEdit.id = 'taskItemButtonEdit'

		const taskItemButtonDelete = createInput('button task-item__button task-item__button_header', 'button', 'Delete')
		taskItemButtonDelete.id = 'taskItemButtonDelete'

		const taskItemButtonBack = createInput('button task-item__button task-item__button_header', 'button', 'In Created')
		taskItemButtonBack.id = 'taskItemButtonBack'

		const taskItemButtonComplete = createInput('button task-item__button task-item__button_header', 'button', 'In Done')
		taskItemButtonComplete.id = 'taskItemButtonComplete'

		if (JSON.stringify(array) === JSON.stringify(inProgressTasksDataArray)) {
			taskItemButtonsInMore.append(taskItemButtonBack, taskItemButtonComplete)
		} else if (JSON.stringify(array) === JSON.stringify(createdTasksDataArray)) {
			taskItemButtonsInMore.append(taskItemButtonEdit, taskItemButtonDelete)
		} else if (JSON.stringify(array) === JSON.stringify(doneTasksDataArray)) {
			taskItemButtonsInMore.append(taskItemButtonDelete)
		}

		const taskItemDescriptionContainer = createDiv('task-item__description-container')
		taskItem.appendChild(taskItemDescriptionContainer)

		const taskItemDescriptionText = createDiv('task-item__description-text', element.description)
		taskItemDescriptionContainer.appendChild(taskItemDescriptionText)

		const taskItemSlideButton = createInput('button task-item__button task-item__button_header', 'button', 'In Progress')


		if (JSON.stringify(array) === JSON.stringify(createdTasksDataArray)) {
			taskItemButtonsInMore.appendChild(taskItemSlideButton)
		}

		taskItemButtonMore.addEventListener('click', () => {
			taskItemButtonsInMore.classList.toggle('show')
			taskItemButtonMore.classList.toggle('task-item__button-more_bottom-border90')
			taskItemMask.classList.toggle('task-item__mask_show')
		})

		taskItemSlideButton.addEventListener('click', () => {
			if (inProgressTasksDataArray.length == 4) {
				handleAlertModal()
				return
			}
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

		function openEditTaskItemModalWindow() {
			const modalWindow = createDiv('modal-window')
			document.body.append(modalWindow)
			document.body.classList.add('body-noScroll')

			const taskItem = createDiv('task-item modal-window__task-item')
			taskItem.className += ' tasksCreated-color'
			document.body.append(taskItem)

			const taskItemTitleText = createInput('task-item__input-title task-item__form-input', 'text')
			taskItemTitleText.value = element.title // = .value in future
			taskItem.appendChild(taskItemTitleText)

			const taskItemDescriptionTextarea = document.createElement('textarea')
			taskItemDescriptionTextarea.className = 'button task-item__textarea task-item__form-input'
			taskItemDescriptionTextarea.value = element.description // = .value in future
			taskItem.appendChild(taskItemDescriptionTextarea)

			const taskItemFooter = createDiv('task-item__footer')
			taskItem.appendChild(taskItemFooter)

			const taskItemSelectUser = document.createElement('select')
			taskItemSelectUser.className = 'task-item__select-user task-item__form-input'
			taskItemFooter.appendChild(taskItemSelectUser)

			usersArray.forEach(el => {
				let taskItemSelectUserItem = document.createElement('option')
				taskItemSelectUserItem.innerHTML = el.name
				taskItemSelectUser.append(taskItemSelectUserItem)
			})

			const taskItemButtons = createDiv('task-item__buttons-container')
			taskItemFooter.append(taskItemButtons)

			const taskItemCancelButton = createInput('button  button__cancel task-item__button', 'button', 'Cancel')
			const taskItemConfirmButton = createInput('button button__confirm task-item__button', 'submit', 'Confirm')
			taskItemButtons.append(taskItemCancelButton, taskItemConfirmButton)

			taskItemCancelButton.addEventListener('click', () => {
				taskItem.remove()
				modalWindow.remove()
				taskItemButtonsInMore.classList.remove('show')
				taskItemButtonMore.classList.remove('task-item__button-more_bottom-border90')
				taskItemMask.classList.remove('task-item__mask_show')
				document.body.classList.remove('body-noScroll')
			})

			taskItemConfirmButton.addEventListener('click', () => {
				taskItemTitleText.classList.remove('input-error')
				taskItemDescriptionTextarea.classList.remove('input-error')
				if(taskItemTitleText.value != '' && taskItemDescriptionTextarea.value != ''){
					element.title = taskItemTitleText.value
					element.description = taskItemDescriptionTextarea.value
					element.user = taskItemSelectUser.value
					taskItem.remove()
					modalWindow.remove()
					tasksBoardContentCreated.innerHTML = null
					generateTodo(createdTasksDataArray)
					document.body.classList.remove('body-noScroll')
				} else if (taskItemTitleText.value == '' && taskItemDescriptionTextarea.value == ''){
					taskItemTitleText.classList.add('input-error')
					taskItemDescriptionTextarea.classList.add('input-error')
				} else if (taskItemTitleText.value == ''){
					taskItemTitleText.classList.add('input-error')
				} else if (taskItemDescriptionTextarea.value == ''){
					taskItemDescriptionTextarea.classList.add('input-error')
				} 
			})
		}

		taskItemButtonEdit.addEventListener('click', openEditTaskItemModalWindow)

		const taskItemFooter = createDiv('task-item__footer')
		taskItem.appendChild(taskItemFooter)

		const taskItemUser = createDiv('task-item__user')
		taskItemFooter.appendChild(taskItemUser)
		usersArray.forEach(el =>{
				if (el.name == element.user){
					taskItemUser.style.background = `url(${el.avatar})` // = ...value in future
				}
				
			})
		

		const taskItemTime = createDiv('task-item__date')
		taskItemTime.innerHTML = element.date
		taskItemFooter.appendChild(taskItemTime)

	// 	//Drag start drag end
	// 	const dragStart = function () {
	// 		// setTimeout(() => {
	// 		// 	taskItem.classList.add('hide')	
	// 		// }, 0);
	// 		console.log(element.id);
	// 	}
	// 	const dragEnd = function () {
	// 		// taskItem.classList.remove('hide')
	// 	}
	// 	taskItem.addEventListener('dragstart', dragStart)
	// 	// taskItem.addEventListener('dragend', dragEnd)
	// 	//Drag start drag end

	// 	//DragOver func
	// 	const dragOver = function (event) {
	// 		event.preventDefault()
	// 	}
	// 	//DragOver func
	// 	tasksBoardContentCreated.addEventListener('dragover', dragOver)
	// 	tasksBoardContentInProgress.addEventListener('dragover', dragOver)
	// 	tasksBoardContentDone.addEventListener('dragover', dragOver)
	// 	//DragEnter
	// 	const dragEnter = function (event) {
	// 		event.preventDefault()
	// 		this.classList.add('hovered')
	// 	}
	// 	//DragEnter
	// 	tasksBoardContentCreated.addEventListener('dragenter', dragEnter)
	// 	tasksBoardContentInProgress.addEventListener('dragenter', dragEnter)
	// 	tasksBoardContentDone.addEventListener('dragenter', dragEnter)

	// 	//DragLeave
	// 	const dragLeave = function () {
	// 		this.classList.remove('hovered')
	// 	}
	// 	//DragLeave
	// 	tasksBoardContentCreated.addEventListener('dragleave', dragLeave)
	// 	tasksBoardContentInProgress.addEventListener('dragleave', dragLeave)
	// 	tasksBoardContentDone.addEventListener('dragleave', dragLeave)

	// 	//DragDrop
	// 	const dragDrop = function () {
	// 		debugger
	// 		if (this.parentNode.classList.contains('tasks-board__created')){
	// 			createdTasksDataArray.push(element)
	// 			tasksBoardContentCreated.innerHTML = null
	// 			generateTodo(createdTasksDataArray)
	// 		} else if (this.parentNode.classList.contains('tasks-board__done')){
	// 			doneTasksDataArray.push(element)
	// 			tasksBoardContentDone.innerHTML = null
	// 			generateTodo(doneTasksDataArray)
	// 		} else{
	// 			inProgressTasksDataArray.push(element)
	// 			tasksBoardContentInProgress.innerHTML = null
	// 			generateTodo(inProgressTasksDataArray)
	// 		}
	// 		array.splice(index,1)
	// 		this.classList.remove('hovered')
	// 		generateTodo(array)
	// 	}
	// 	//DragDrop
	// 	tasksBoardContentCreated.addEventListener('drop', dragDrop)
	// 	tasksBoardContentInProgress.addEventListener('drop', dragDrop)
	// 	tasksBoardContentDone.addEventListener('drop', dragDrop)

	// })
	taskBoardHeaderCreatedCounter.innerHTML = createdTasksDataArray.length
	tasksHeaderInProgressCounter.innerHTML = inProgressTasksDataArray.length
	tasksHeaderDoneCounter.innerHTML = doneTasksDataArray.length
	//TodoCard elements
	// const cells = document.querySelectorAll('tasks-board__content')
	})

}

function handleAlertModal() {
	const alertModalWindow = createDiv('modal-window')
	document.body.classList.add('body-noScroll')

	const alertModalContainer = createDiv('task-item modal-window__task-item')

	const alertModalText = document.createElement('p')
	alertModalText.className = 'task-item__text'
	alertModalText.innerHTML = 'Complete current tasks in progress column, until add new task'

	const alertModalButtonConfirm = createInput('button task-item__button', 'submit', 'Confirm')

	document.body.append(alertModalWindow)
	document.body.append(alertModalContainer)
	alertModalContainer.appendChild(alertModalText)
	alertModalContainer.appendChild(alertModalButtonConfirm)

	alertModalButtonConfirm.addEventListener('click', () => {
		alertModalContainer.remove()
		alertModalWindow.remove()
		document.body.classList.remove('body-noScroll')
	})
}

function taskForm() {

	const taskItem = createDiv('task-item task-form')
	taskItem.className += ' tasksCreated-color'
	tasksBoardContentCreated.appendChild(taskItem)

	const taskItemTitleText = createInput('task-item__input-title task-item__form-input', 'text')
	taskItemTitleText.placeholder = 'Title' // = .value in future
	taskItem.appendChild(taskItemTitleText)

	const taskItemDescriptionTextarea = document.createElement('textarea')
	taskItemDescriptionTextarea.className = 'button task-item__textarea task-item__form-input'
	taskItemDescriptionTextarea.innerHTML = '' // = .value in future
	taskItem.appendChild(taskItemDescriptionTextarea)

	const taskItemFooter = createDiv('task-item__footer')
	taskItem.appendChild(taskItemFooter)

	const taskItemSelectUser = document.createElement('select')
	taskItemSelectUser.className = 'task-item__select-user task-item__form-input'
	taskItemFooter.appendChild(taskItemSelectUser)

	usersArray.forEach(el => {
		let taskItemSelectUserItem = document.createElement('option')
		taskItemSelectUserItem.innerHTML = el.name
		taskItemSelectUser.append(taskItemSelectUserItem)
	})
	
	const taskItemButtons = createDiv('task-item__buttons-container')
	taskItemFooter.append(taskItemButtons)

	const taskItemCancelButton = createInput('button button__cancel task-item__button', 'button', 'Cancel')
	const taskItemConfirmButton = createInput('button button__confirm task-item__button', 'submit', 'Confirm')
	taskItemButtons.append(taskItemCancelButton, taskItemConfirmButton)

	taskItemCancelButton.addEventListener('click', () => taskItem.remove())

	taskItemConfirmButton.addEventListener('click', () => {
		taskItemTitleText.classList.remove('input-error')
		taskItemDescriptionTextarea.classList.remove('input-error')
		if(taskItemTitleText.value != '' && taskItemDescriptionTextarea.value != ''){
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
		} else if (taskItemTitleText.value == '' && taskItemDescriptionTextarea.value == ''){
			taskItemTitleText.classList.add('input-error')
			taskItemDescriptionTextarea.classList.add('input-error')
		} else if (taskItemTitleText.value == ''){
			taskItemTitleText.classList.add('input-error')
		} else if (taskItemDescriptionTextarea.value == ''){
			taskItemDescriptionTextarea.classList.add('input-error')
		} 

	})
	// return taskData
}

addTaskButton.addEventListener('click', taskForm)

function handleDeleteAllCards() {
	document.body.classList.add('body-noScroll')
	if (doneTasksDataArray.length == 0) return
	const deleteModalWindow = createDiv('modal-window')

	const deleteModalContainer = createDiv('task-item modal-window__task-item')

	const deleteModalText = document.createElement('p')
	deleteModalText.className = 'task-item__text'
	deleteModalText.innerHTML = 'Are you sure to delete all done cards?'

	const deleteModalButtonCancel = createInput('button task-item__button', 'button', 'Cancel')
	const deleteModalButtonConfirm = createInput('button task-item__button', 'submit', 'Confirm')

	document.body.append(deleteModalWindow)
	document.body.append(deleteModalContainer)
	deleteModalContainer.appendChild(deleteModalText)
	deleteModalContainer.append(deleteModalButtonCancel, deleteModalButtonConfirm)

	deleteModalButtonConfirm.addEventListener('click', () => {
		doneTasksDataArray.splice(0)
		tasksBoardContentDone.innerHTML = null
		generateTodo(doneTasksDataArray)
		deleteModalWindow.remove()
		deleteModalContainer.remove()
		document.body.classList.remove('body-noScroll')
	})

	deleteModalButtonCancel.addEventListener('click', () => {
		deleteModalWindow.remove()
		deleteModalContainer.remove()
		document.body.classList.remove('body-noScroll')
	})
}

//Наверное можно проще
setInterval(() => {
	if (doneTasksDataArray.length == 0) {
		deleteTasksButton.classList.add('disabled')
	} else { deleteTasksButton.classList.remove('disabled') }
}, 0);

deleteTasksButton.addEventListener('click', handleDeleteAllCards)

//localStorage
window.addEventListener('beforeunload', function () {
	localStorage.setItem('task', JSON.stringify(createdTasksDataArray))
})
















// let draggedItem = null


// function dragNdrop() {
// 	const listItems = 1

// }
// dragNdrop()

// window.addEventListener("load", () => {
// 	for (const draggableElement of document.querySelectorAll(".task-item")) {
// 		draggableElement.onmousedown = onMouseDown;
// 		draggableElement.ondragstart = () => {
// 			return false;
// 		};
// 	}
// });





