const input1 = document.querySelector("#todo")
const list = document.querySelector("ul")

function cj() {
    return (localStorage.getItem("ky")? JSON.parse(localStorage.getItem("ky")):{})
}

let obj = cj() //localStorage.getItem("ky")? JSON.parse(localStorage.getItem("ky")):{}

// count var used for id
let count = 0

function show() {
    list.replaceChildren()
    const getItem = cj() //JSON.parse(localStorage.getItem("ky"))
    
    if (getItem) {
        Object.keys(getItem).map(e => {
            const listItem = document.createElement("li")
            const delButton = document.createElement("button")
            delButton.textContent = "Delete"
            listItem.setAttribute("data-id",`${e}`)
            listItem.textContent = `${getItem[e]}`
            list.appendChild(listItem)
            listItem.appendChild(delButton)
            delButton.addEventListener("click", (t) => { 
                list.removeChild(t.target.parentElement)
                delete getItem[`${t.target.parentElement.dataset.id}`]
                localStorage.setItem("ky",JSON.stringify(getItem))
            })
        })
    }
}

function add() {
    const check = cj() //JSON.parse(localStorage.getItem("ky"))

    if (check) {
        if (Object.keys(check).length > 0) {
            count = Object.keys(check).at(-1)
        }
        obj = check
    } else {
        count = 0
        obj = {}
    }

    count ++
    obj[count] = input1.value
    localStorage.setItem("ky",JSON.stringify(obj))
    show()
}

function del() {
    input1.value = ""
    localStorage.clear()
    list.replaceChildren()
}

window.addEventListener("DOMContentLoaded", () => {cj();show()})