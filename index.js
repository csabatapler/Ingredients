import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
const appSettings = {
    databaseURL: "https://shoppinglist-b0f7d-default-rtdb.europe-west1.firebasedatabase.app/"
}
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const app =initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
addBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    push(shoppingListInDB, inputValue)
    console.log(inputValue)
})