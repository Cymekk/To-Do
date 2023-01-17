let TodoInput
let DateInput
let PriorityInput
let AddBtn
let NewTodo
let TodoList
let AlertInfo
let Id = 0
let Popup
let EditedToDo
let EditedPriority
let EditedDate
let PopupInput
let PopupDate
let PopupPriority
let AllLi
let ClosePopupBtn
let ChangeTaskBtn
let TaskTitle

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	TodoInput = document.querySelector(".todo-input")
	DateInput = document.querySelector(".date-input")
	PriorityInput = document.querySelector(".priority")
	AddBtn = document.querySelector(".add-btn")
	NewTodo
	TodoList = document.querySelector(".list")
	AlertInfo = document.querySelector(".todo-alert")
	Id = 0
	Popup = document.querySelector(".popup")
	EditedToDo
	EditedPriority
	EditedDate
	PopupInput = document.querySelector(".popup-input")
	PopupDate = document.querySelector(".popup-date")
	PopupPriority = document.querySelector(".popup-priority")
	AllLi = document.getElementsByTagName("li")
	ClosePopupBtn = document.querySelector(".cancel")
	ChangeTaskBtn = document.querySelector(".apply")
	TaskTitle = document.querySelector(".task-title")
}

const prepareDOMEvents = () => {
	TodoList.addEventListener("click", checkClick)
	AddBtn.addEventListener("click", addTodo)
	ClosePopupBtn.addEventListener("click", closePopup)
	ChangeTaskBtn.addEventListener("click", changeToDo)
}

const addTodo = () => {
	if (
		TodoInput.value !== "" &&
		DateInput.value !== "" &&
		PriorityInput.value !== "0"
	) {
		Id++
		NewTodo = document.createElement("li")
		NewTodo.setAttribute("id", `id${Id}`)
		NewTodo.classList.add("task")
		TaskTitle.style.display = "flex"
		NewTodo.style.display = "flex"

		const taskTitle = document.createElement("div")
		taskTitle.classList.add("box")
		taskTitle.textContent = TodoInput.value

		const priority = document.createElement("div")
		priority.classList.add("box", "priority")
		priority.textContent =
			PriorityInput.options[PriorityInput.selectedIndex].text

		const date = document.createElement("div")
		date.classList.add("box", "date")

		date.textContent = DateInput.value
		NewTodo.append(taskTitle, priority, date)
		TodoList.appendChild(NewTodo)
		AlertInfo.style.display = "none"
		TodoInput.value = ""
		PriorityInput.value = "0"
		DateInput.value = "0"

		createToolsArea()
	}
}

const createToolsArea = () => {
	const toolbox = document.createElement("div")
	toolbox.classList.add("box")
	NewTodo.appendChild(toolbox)

	const completeBtn = document.createElement("button")
	completeBtn.classList.add("complete")
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement("button")
	editBtn.classList.add("edit")
	editBtn.textContent = "EDIT"

	const removeBtn = document.createElement("button")
	removeBtn.classList.add("remove")
	removeBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolbox.appendChild(completeBtn)
	toolbox.appendChild(editBtn)
	toolbox.appendChild(removeBtn)
}

const checkClick = e => {
	if (e.target.classList.value !== "") {
		if (e.target.closest("button").classList.contains("complete")) {
			e.target.closest("li").classList.toggle("completed")
			e.target.closest("button").classList.toggle("completed")
		} else if (e.target.closest("button").classList.contains("edit")) {
			editTask(e)
		} else if (e.target.closest("button").classList.contains("remove")) {
			deleteToDo(e)
		}
	} else {
		console.log(e.target)
	}
}

const editTask = e => {
	const oldToDo = e.target.closest("li").id
	EditedToDo = document.getElementById(oldToDo)
	EditedPriority = EditedToDo.getElementsByTagName("div")[1]
	EditedDate = EditedToDo.getElementsByTagName("div")[2]

	PopupInput.value = EditedToDo.firstChild.textContent
	PopupDate.value = EditedDate.textContent

	if (EditedPriority.textContent !== "") {
		if (EditedPriority.textContent == "Niski") {
			PopupPriority.value = 1
		} else if (EditedPriority.textContent == "Średni") {
			PopupPriority.value = 2
		} else if (EditedPriority.textContent == "Wysoki") {
			PopupPriority.value = 3
		}
	}
	Popup.style.display = "flex"
}

const changeToDo = () => {
	if (PopupInput.value !== "" && PopupDate !== "" && PopupPriority !== "0") {
		EditedToDo.firstChild.textContent = PopupInput.value

		EditedDate.textContent = PopupDate.value
		EditedPriority.textContent =
			PopupPriority.options[PopupPriority.selectedIndex].text
		Popup.style.display = "none"
		PopupInput.value = ""
	}
}

const deleteToDo = e => {
	const deleteTask = e.target.closest("li")
	deleteTask.remove()

	if (AllLi.length == 0) {
		AlertInfo.style.display = "block"
		TaskTitle.style.display = "none"
	}
}

const closePopup = () => {
	Popup.style.display = "none"
}

document.addEventListener("DOMContentLoaded", main)
