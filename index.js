import { menuArray } from "./data.js";
const mainMenu = document.getElementById("main-menu")
const cartItems = document.getElementById("order-list")
const billCost = document.getElementById("bill-price")
const completeOrderBtn = document.getElementById("complete-order-btn")
const modal = document.getElementById("modal");
const nameInput = document.getElementById("name")
const orderSection = document.getElementById("order-section");
const stars = document.getElementsByClassName("stars")
let orderedItems = []


function getMenuItems() {
    let displayMenu = ""
    for (let item of menuArray) {
        let ingredientsList = ""
        for (let ingredient of item.ingredients) {
            if (ingredient === item.ingredients[item.ingredients.length - 1]) {
                ingredientsList += ingredient;
            }
            else {
                ingredientsList += ingredient + ", ";
            }
        }

        displayMenu += `<section>
        <div class="menu-item">
            <div class="item-details">
                <div class="item-name">
                    <h1> <span>${item.emoji}</span> ${item.name} </h1>
                </div>
                <div class="item-ingredients">
                   ${ingredientsList}
                </div>
                <div class="item-price">
                    <p>$${item.price}</p>
                </div>
            </div>
                <button class="item-button" id="${item.id}">+</button>
            
        </div>
    </section> 
        `
    }
    return displayMenu;
}

renderMenu()

function renderMenu() {
    mainMenu.innerHTML = getMenuItems();
}


document.addEventListener("click", function (e) {
    for (let item of menuArray) {
        if (parseInt(e.target.id) === item.id) {
            handleAddItem(item)
        }
        if (e.target.id === `remove-${item.id}`) {
            handleRemove(item)
        }
    }

    if (e.target.id === completeOrderBtn.id && billCost.textContent !== "0") {
        modal.classList.remove("hidden")
        document.getElementById("content-container").style.opacity = "0.4"

    }
    if (e.target.id === "place-order") {
        document.getElementById("content-container").style.opacity = "1";
        if (nameInput.value) {
            handleModal()
            modal.classList.add("hidden")
            e.preventDefault()
        } else {
            false
        }

    }
    for (let star of stars) {
        if (e.target.id === `${star.id}`) {
            orderSection.innerHTML = `
       <h1>Please refresh to order again.</h1>
       `
        }
    }

})
document.addEventListener("mouseover", function (e) {
    handleRating(e)

});

document.addEventListener("mouseout", function (e) {
    handleRating(e)

});


function handleAddItem(item) {
    if (!orderedItems.includes(item)) {
        orderedItems.push(item)
    }

    for (let orderedItem of orderedItems) {
        if (orderedItem === item) {
            item.orderedCount = (item.orderedCount || 0) + 1;
            item.totalCost = (item.totalCost || 0) + item.price
            renderItems()
        }

    }
}

function renderItems() {
    cartItems.innerHTML = ""
    for (let item of orderedItems) {
        cartItems.innerHTML += `
                <div class="order-description">
            <div class="cart-details">
                <div class="name">
                    <h3> ${item.name}</h3>
                </div>
                <div class="remove-btn-el">
                <p id="remove-${item.id}">(remove)</p>
                </div>
                
                <div class="item-price">
                    <h3>$${item.price}</h3>
                </div>
                <div class="count">
                    <h3>${item.orderedCount}</h3>
                </div>
            </div>
            <div class="item-total-cost">
                <h3>$${item.totalCost}</h3>
            </div>
        </div >
                `
    }

    renderTotal()
}

function renderTotal() {
    let bill = 0
    for (let item of orderedItems) {
        bill += item.totalCost;
    }
    billCost.textContent = `$${bill} `

}

function handleRemove(orderItem) {
    orderItem.totalCost = 0;
    orderItem.orderedCount = 0
    orderedItems = orderedItems.filter(function (item) {
        return item !== orderItem
    })

    renderItems()
    renderTotal()
}

function handleModal() {
    let name = nameInput.value
    orderSection.innerHTML = `
                <h1> ${name}, your order is on its way.</h1>
                    <div id="rating" class="rating">
                        <p class="stars" id="star1">⭐</p>
                        <p class="stars" id="star2">⭐</p>
                        <p class="stars" id="star3">⭐</p>
                        <p class="stars" id="star4">⭐</p>
                        <p class="stars" id="star5">⭐</p>
                    </div>
            `
    orderSection.style.cssText =
        `
            text-align: center;
            background-color: rgb(189, 240, 223);
            margin: 20px;
            font-family: "Lato";
            height: max-content;
            padding: 25px 10px;
            font-size: small;
            `
}


function handleRating(e) {
    for (let star of stars) {
        console.log(e.target)
        if (e.target.id === `${star.id}`) {
            console.log(e.target)
            let str = e.target.id
            let num = 0;
            for (let i = 0; i < str.length; i++) {
                if (typeof parseInt(str[i]) === "number") {
                    num = (str[i]);
                }
            }
            for (let i = 1; i <= num; i++) {
                let el = "star" + i
                if (e.type === "mouseover") {
                    document.getElementById(el).style.textShadow = "0 0 1px yellow"
                } else {
                    document.getElementById(el).style.textShadow = "0 0 1px rgb(32, 49, 43)";
                }


            }
        }
    }

}

