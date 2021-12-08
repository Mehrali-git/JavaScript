let todos = localStorage.getItem("todos")
var ul = document.querySelector("#list_item")
try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
    createTodos(todos)
} catch (e) {
    todos = null
}

if (!todos) {
    todos = [
        { content: "shoping", status: true }, { content: "markting", status: false }, { content: "services", status: true },
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
    createTodos(todos)
}

function createTodos(todos) {
    ul.innerHTML = ""
    todos.forEach((todo, index) => {
        let li = document.createElement("li")
        let span = document.createElement("span")
        let img = document.createElement("img")

        li.className = "list-group-item"
        span.textContent = todo.content
        span.style.textDecoration = todo.status ? 'initial' : 'line-through'
        img.src = "media/delete.png"
        img.alt = "icon-delete"
        img.className = "float-right"

        li.append(span)
        li.append(img)
        ul.append(li)

        img.addEventListener("click", e => {
            todos.splice(index, 1)
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })
        span.addEventListener("click", e => {
            todos[index].status = !todos[index].status
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })
    });
}

let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")
Array.from(actions.children).forEach(action => {
    if (action.dataset.action == "add") {
        action.addEventListener("click", e => {
            createTodos(todos)
            formWrapper.innerHTML =
                `<form id="add">
                    <input class="form-control" name="add" placeholder="Add a item ...">
                </form>`
            let add_item = document.querySelector("#add")
            add_item.addEventListener("submit", e => {
                e.preventDefault()
                todos.push({ content: add.add.value, status: true })
                localStorage.setItem("todos", JSON.stringify(todos))
                createTodos(todos)
                add.add.value = ""
            })
        })
    } else if (action.dataset.action == "search") {
        action.addEventListener("click", e => {
            createTodos(todos)
            formWrapper.innerHTML =
                `<form id="search">
                    <input class="form-control" name="search" placeholder="search the item ...">
                </form>`

            let search_items = document.querySelector("#search")
            search_items.addEventListener("keyup", e => {
                e.preventDefault()
                if (search.search.value) {
                    let filterd_todos = todos.filter(todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase()))
                    createTodos(filterd_todos)
                } else {
                    createTodos(todos)
                }
            })
        })

    }
})