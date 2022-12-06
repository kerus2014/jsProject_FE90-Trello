function createDiv(divClassName, divInnerText = ''){
	let divName = document.createElement('div')
	divName.className = divClassName
	divName.innerHTML = divInnerText
	return divName
}

function createButton(btnClassName, btnInnerText = ''){
	let btnName = document.createElement('button')
	btnName.className = btnClassName
	btnName.innerHTML = btnInnerText
	return btnName
}

function createInput(inputClassName, inputType,inputValue = null){
    let inputName = document.createElement('input')
	inputName.className = inputClassName
	inputName.type = inputType
    inputName.value = inputValue
	return inputName
}

export{
    createDiv,
    createButton,
    createInput
}