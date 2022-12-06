import { createDiv } from "./createElements"

export function handleAlertModal() {
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
