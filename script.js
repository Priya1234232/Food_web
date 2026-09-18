let cart = [];


// ADD FOOD TO CART

function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    displayCart();

    alert(name + " added to cart!");
}


// DISPLAY CART

function displayCart() {

    let cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        document.getElementById("total").innerText = 0;

        return;
    }


    let total = 0;


    cart.forEach(function(item, index) {

        let itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>
                </div>


                <div class="quantity">

                    <button onclick="decreaseItem(${index})">
                        -
                    </button>

                    ${item.quantity}

                    <button onclick="increaseItem(${index})">
                        +
                    </button>

                    <button
                        class="remove-btn"
                        onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

            </div>
        `;
    });


    document.getElementById("total").innerText = total;
}


// INCREASE QUANTITY

function increaseItem(index) {

    cart[index].quantity++;

    displayCart();
}


// DECREASE QUANTITY

function decreaseItem(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    displayCart();
}


// REMOVE ITEM

function removeItem(index) {

    cart.splice(index, 1);

    displayCart();
}


// OPEN ORDER FORM

function openOrderForm() {

    if (cart.length === 0) {

        alert("Please add food to your cart first!");

        return;
    }

    document.getElementById("orderForm").style.display = "block";

    document.getElementById("orderForm")
        .scrollIntoView();
}


// PLACE ORDER

function placeOrder() {

    let name =
        document.getElementById("customerName").value;

    let phone =
        document.getElementById("phone").value;

    let address =
        document.getElementById("address").value;

    let payment =
        document.getElementById("payment").value;


    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        payment === ""
    ) {

        alert("Please fill all delivery details!");

        return;
    }


    let total =
        document.getElementById("total").innerText;


    document.getElementById("orderStatus").innerHTML = `

        <h3>🎉 Order Confirmed!</h3>

        <p>
            Thank you, <strong>${name}</strong>
        </p>

        <p>
            Your order will be delivered to:
        </p>

        <p>
            ${address}
        </p>

        <h3>
            Total Amount: ₹${total}
        </h3>

        <p>
            Payment: ${payment}
        </p>

        <br>

        <p>
            🛵 Your food is being prepared...
        </p>

    `;


    alert("🎉 Order placed successfully!");


    // CLEAR CART

    cart = [];

    displayCart();


    // HIDE ORDER FORM

    document.getElementById("orderForm").style.display = "none";


    // GO TO ORDERS

    document.getElementById("orders")
        .scrollIntoView();
}


// SEARCH FOOD

function searchFood() {

    let searchValue =
        document.getElementById("search")
            .value
            .toLowerCase();


    let foods =
        document.querySelectorAll(".food-card");


    foods.forEach(function(food) {

        let foodName =
            food.querySelector("h3")
                .innerText
                .toLowerCase();


        if (foodName.includes(searchValue)) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }

    });
}


// FILTER FOOD

function filterFood(category) {

    let foods =
        document.querySelectorAll(".food-card");


    foods.forEach(function(food) {

        if (
            category === "all" ||
            food.dataset.category === category
        ) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }

    });
}


// ORDER NOW BUTTON

function scrollToMenu() {

    document.getElementById("menu")
        .scrollIntoView();
}
