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
let Day
let Month
let Year
let FullDate
let InputAlert
let PopupAlert

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
	Day = new Date().getDate()
	Month = new Date().getMonth() + 1
	Year = new Date().getFullYear()

	FullDate = Date.parse(`${Year}-${Month}-${Day}`)
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
	InputAlert = document.querySelector(".inputs-alert")
	PopupAlert = document.querySelector(".popup-alert")
}

const prepareDOMEvents = () => {
	TodoList.addEventListener("click", checkClick)
	AddBtn.addEventListener("click", checkTodo)
	ClosePopupBtn.addEventListener("click", closePopup)
	ChangeTaskBtn.addEventListener("click", checkPopup)
}

const checkTodo = () => {
	if (
		TodoInput.value !== "" &&
		DateInput.value !== "" &&
		Date.parse(DateInput.value) >= FullDate &&
		PriorityInput.value !== "0"
	) {
		InputAlert.style.display = "none"
		InputAlert.textContent = ""
		addTodo()
	} else if (
		TodoInput.value == "" &&
		DateInput.value == "" &&
		PriorityInput.value == "0"
	) {
		InputAlert.style.display = "block"
		InputAlert.textContent = "Wszystkie pola musza być wypełnione"
	} else if (
		TodoInput.value == "" &&
		DateInput.value !== "" &&
		PriorityInput.value !== "0"
	) {
		InputAlert.style.display = "block"
		InputAlert.textContent = "Zadanie nie możesz być puste, wpisz treść zadania"
	} else if (
		TodoInput.value !== "" &&
		DateInput.value !== "" &&
		PriorityInput.value == "0"
	) {
		InputAlert.style.display = "block"
		InputAlert.textContent = "Musisz wybrać priorytet zadania"
	} else if (
		TodoInput.value !== "" &&
		DateInput.value == "" &&
		PriorityInput.value !== "0"
	) {
		InputAlert.style.display = "block"
		InputAlert.textContent = "Musisz wybrać datę zakończenia zadania"
	} else if (
		TodoInput.value !== "" &&
		DateInput.value !== "" &&
		Date.parse(DateInput.value) < FullDate &&
		PriorityInput.value !== "0"
	) {
		InputAlert.style.display = "block"
		InputAlert.textContent = "Nie możesz wybrać daty z przeszłości"
	}
}

const checkPriority = (box, value) => {
	if (value.value == "1") {
		box.classList.add("green")
	} else if (value.value == "2") {
		box.classList.add("blue")
	} else if (value.value == "3") {
		box.classList.add("red")
	}
}

const addTodo = () => {
	{
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
		priority.classList.add("box", "priority", "bolded")
		priority.textContent =
			PriorityInput.options[PriorityInput.selectedIndex].text
		checkPriority(priority, PriorityInput)

		const date = document.createElement("div")
		date.classList.add("box", "date")
		date.textContent = DateInput.value

		const targetDate = document.createElement("div")
		targetDate.classList.add("box", "target-date")
		let result = Math.round(
			(Date.parse(DateInput.value) - FullDate) / (1000 * 60 * 60 * 24)
		)

		targetDate.textContent = `${result} dni`

		NewTodo.append(taskTitle, priority, date, targetDate)
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
	Popup.style.display = "flex"

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
}

const checkPopup = () => {
	if (
		PopupInput.value !== "" &&
		PopupDate !== "" &&
		Date.parse(PopupDate.value) >= FullDate &&
		PopupPriority !== "0"
	) {
		changeToDo()
	} else if (
		PopupInput.value == "" &&
		PopupDate !== "" &&
		Date.parse(PopupDate.value) >= FullDate &&
		PopupPriority !== "0"
	) {
		PopupAlert.style.display = "block"
		PopupAlert.textContent = "Treść zadania nie może być pusta"
	} else if (
		PopupInput.value !== "" &&
		PopupDate == "" &&
		Date.parse(PopupDate.value) >= FullDate &&
		PopupPriority !== "0"
	) {
		PopupAlert.style.display = "block"
		PopupAlert.textContent = "Wybierz date ukończenia zadania"
	} else if (
		PopupInput.value !== "" &&
		PopupDate !== "" &&
		Date.parse(PopupDate.value) < FullDate &&
		PopupPriority !== "0"
	) {
		PopupAlert.style.display = "block"
		PopupAlert.textContent = "Nie możesz wybrać daty z przeszłości"
	}
}

const changeToDo = () => {
	EditedToDo.firstChild.textContent = PopupInput.value
	if (Date.parse(PopupDate.value) >= FullDate) {
		EditedDate.textContent = PopupDate.value
		EditedToDo.getElementsByTagName("div")[3].textContent = `${Math.round(
			(Date.parse(PopupDate.value) - FullDate) / (1000 * 60 * 60 * 24)
		)} dni`
	}
	EditedPriority.textContent =
		PopupPriority.options[PopupPriority.selectedIndex].text

	switch (PopupPriority.value) {
		case "1":
			EditedPriority.classList.remove("red", "blue")
			EditedPriority.classList.add("green")
			break
		case "2":
			EditedPriority.classList.remove("red", "green")
			EditedPriority.classList.add("blue")
			break
		case "3":
			EditedPriority.classList.remove("blue", "green")
			EditedPriority.classList.add("red")
			break
	}
	Popup.style.display = "none"
	PopupInput.value = ""
	PopupAlert.style.display = "none"
	PopupAlert.textContent = ""
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
