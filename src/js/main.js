import { createDiv, createButton,createInput } from "./createElements"

const header = document.querySelector('.header')
const headerContainer = document.querySelector('.header__container')
const headerLogo = createDiv('header__logo','Trello')
const headerClock = createDiv('header__clock')
headerClock.id = 'clock'

headerContainer.append(headerLogo,headerClock)

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
tasksContainer.append(tasksBoardCreated,tasksBoardInProgress,tasksBoardDone)

const tasksBoardHeaderCreated= createDiv('tasks-board__header tasks-board__header_created', 'TODO:')
const tasksHeaderInProgress= createDiv('tasks-board__header tasks-board__header_inProgress', 'IN PROGRESS:')
const tasksHeaderDone= createDiv('tasks-board__header tasks-board__header_done', 'DONE:')
const tasksBoardContentCreated = createDiv('tasks-board__content')
const tasksBoardContentInProgress = createDiv('tasks-board__content')
const tasksBoardContentDone = createDiv('tasks-board__content') 

tasksBoardCreated.append(tasksBoardHeaderCreated,tasksBoardContentCreated)
tasksBoardInProgress.append(tasksHeaderInProgress,tasksBoardContentInProgress)
tasksBoardDone.append(tasksHeaderDone,tasksBoardContentDone)

const addTaskButton = createButton('button tasks-board__addTaskButton',`+ Add todo`)
tasksBoardCreated.append(addTaskButton)

const deleteTasksButton = createButton('button tasks-board__deleteAllTasksButton','Delete All')
tasksBoardDone.append(deleteTasksButton)

//Array

const todoCardsArray = []
const dataCardsArray = []
const createdTasksDataArray = []
const inProgressTasksArray = []
const doneTasksArray = []

function addTask(){
	taskData = {
		id:new Date(),
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

		const taskItemButtonEdit = createInput('button task-item__button task-item__button_header','button','edit')
		taskItemButtonEdit.id = 'taskItemButtonEdit'
		taskItemButtons.appendChild(taskItemButtonEdit)

		const taskItemButtonDelete = createInput('button task-item__button task-item__button_header','button','delete')
		taskItemButtonDelete.id = 'taskItemButtonDelete'
		taskItemButtons.appendChild(taskItemButtonDelete)

		const taskItemDescriptionContainer = createDiv('task-item__description-container')
		taskItem.appendChild(taskItemDescriptionContainer)

		const taskItemDescriptionText = createDiv('task-item__description-text', element.description) 
		taskItemDescriptionContainer.appendChild(taskItemDescriptionText)

		const taskItemSlideButton = createInput('task-item__slide-button','button','>')
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

	const taskItemTitleText = createInput('task-item__input-title','text') 
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
	taskItemSelectUser.append(taskItemSelectUserItem1,taskItemSelectUserItem2)

	const taskItemButtons = createDiv('task-item__buttons-container')
	taskItemFooter.append(taskItemButtons)

	const taskItemCancelButton = createInput('button task-item__button','button','Cancel')
	const taskItemConfirmButton = createInput('button task-item__button','submit','Confirm') 
	taskItemButtons.append(taskItemCancelButton,taskItemConfirmButton)
		
	taskItemCancelButton.addEventListener('click', () => taskItem.remove())

	taskItemConfirmButton.addEventListener('click', () => {
		taskData = {
			id:new Date(),
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

}

addTaskButton.addEventListener('click', taskForm)

// //Delete Card

window.addEventListener('click', function (e) {

	if (e.target.id == 'taskItemButtonDelete') {
		//Delete element
		let cardToDelete = e.target.parentNode.parentNode.parentNode
		createdTasksDataArray.forEach((element,index) => {
			if(cardToDelete.id == element.id){
				cardToDelete.remove()
				createdTasksDataArray.splice(index, 1)
				tasksBoardContentCreated.innerHTML = null
				generateTodo(createdTasksDataArray)
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

