import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const appSettings = {
    databaseURL: 'https://playground-26e67-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingList = ref(database, "shoppingList");

const buttonEl = document.querySelector("button");
const inputEl = document.querySelector("input");
const listEl = document.querySelector("ul");

buttonEl.addEventListener("click", () => {

    if (inputEl.value == ''){
        return;
    }

    else {
        push(shoppingList, inputEl.value);

        inputEl.value = ""
    };
});

document.addEventListener("keyup", (event) => {
    
    if (event.code === 'Enter'){

        if (inputEl.value == ''){
            return;
        }

        else {
            push(shoppingList, inputEl.value);

            inputEl.value = ""
        };
    
    };


});

onValue(shoppingList, (snapshot) => {
    // console.log(Object.values(snapshot.val()));

    if (snapshot.exists()){
        const itemArray = Object.entries(snapshot.val());

        clearShoppingList();

        for (let i=0; i<itemArray.length; i++){

            let currentItem = itemArray[i];

            ShowItemToShoppingList(currentItem);
        };
    }
    
    else{
        listEl.innerHTML = "No items here...yet";
    }

});


function clearShoppingList(){
    listEl.innerHTML = "";
}


function ShowItemToShoppingList(item){
    let itemID = item[0];
    let itemValue = item[1];

    const newItem = document.createElement("li");
    newItem.textContent = itemValue;

    newItem.addEventListener("click", () => {
        let exactLocationOfItemInFirebase = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInFirebase);

    })

    listEl.appendChild(newItem);

}