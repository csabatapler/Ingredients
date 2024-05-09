import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
const appSettings = {
    databaseURL: "https://shoppinglist-b0f7d-default-rtdb.europe-west1.firebasedatabase.app"
}
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const app =initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")

const shoppingListEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    if (inputValue) { 
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()    
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addBtn.click()
    }
})

onValue(shoppingListInDB, function(snapshot) {
    
        

    if (snapshot.exists()) {
        console.log("exists")
        let shoppingListArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for (let i=0; i<shoppingListArray.length; i++) {
            let currentItem = shoppingListArray[i]
            let currentItemKey = currentItem[0]
            let currentItemValue = currentItem[1]
            console.log(currentItemValue, currentItemKey)
            appendToList(currentItem)
        }
    } else {
    console.log("does not exist")
    shoppingListEl.innerHTML = "No items in list"
}
})

function appendToList(item){
    //shoppingListEl.innerHTML += `<li>${item}</li>`
    let newEl = document.createElement("li")
    let itemID = item[0]
    let itemValue = item[1]
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)
    newEl.tabindex = 0
    newEl.addEventListener("dblclick", function() {
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationInDB)
    })
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputEl.value = ""
}