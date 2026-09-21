let cart = [];

const foodImages = {
    Pizza: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    Burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    Pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80",
    Biryani: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=600&q=80",
    Dosa: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    Noodles: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    Sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    Cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
};

function addToCart(name, price) {

    const existing = cart.find(function(item) {
        return item.name === name;
    });

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    showMessage(name + " added to cart");
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty">
                Your cart is empty
            </div>
        `;

    } else {

        cart.forEach(function(item, index) {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;
            count += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <img src="${foodImages[item.name]}" alt="${item.name}">

                    <div class="cart-details">
                        <h3>${item.name}</h3>
                        <p>₹${item.price} × ${item.quantity}</p>

                        <button class="remove" onclick="removeItem(${index})">
                            Remove
                        </button>
                    </div>

                    <div class="cart-price">
                        ₹${itemTotal}
                    </div>

                </div>
            `;
        });
    }

    document.getElementById("cartCount").textContent = count;
    document.getElementById("navCount").textContent = count;
    document.getElementById("totalAmount").textContent = "₹" + total;
}

function removeItem(index) {

    const name = cart[index].name;

    cart.splice(index, 1);

    updateCart();

    showMessage(name + " removed from cart");
}

function openOrder() {

    if (cart.length === 0) {
        showMessage("Please add food to your cart first");
        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        total += item.price * item.quantity;
    });

    document.getElementById("orderTotal").textContent = "₹" + total;

    document.getElementById("orderModal").style.display = "flex";
}

function closeOrder() {
    document.getElementById("orderModal").style.display = "none";
}

document.getElementById("orderForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const city = document.getElementById("customerCity").value.trim();
    const pincode = document.getElementById("customerPincode").value.trim();
    const payment = document.getElementById("payment").value;

    if (
        name === "" ||
        phone === "" ||
        email === "" ||
        address === "" ||
        city === "" ||
        pincode === "" ||
        payment === ""
    ) {
        showMessage("Please fill all details");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        showMessage("Enter a valid 10 digit phone number");
        return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
        showMessage("Enter a valid 6 digit pincode");
        return;
    }

    if (!email.includes("@")) {
        showMessage("Enter a valid email");
        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        total += item.price * item.quantity;
    });

    document.getElementById("orderModal").style.display = "none";

    document.getElementById("successDetails").innerHTML =
        "Thank you, <b>" + name + "</b>.<br>" +
        "Your order total is <b>₹" + total + "</b>.<br>" +
        "Payment: <b>" + payment + "</b>";

    document.getElementById("successModal").style.display = "flex";

    cart = [];

    updateCart();

    document.getElementById("orderForm").reset();
});

function closeSuccess() {
    document.getElementById("successModal").style.display = "none";
}

document.getElementById("search").addEventListener("input", function() {

    const value = this.value.toLowerCase().trim();

    const foods = document.querySelectorAll(".food-card");

    let found = 0;

    foods.forEach(function(food) {

        const name = food.dataset.name;

        if (name.includes(value)) {
            food.style.display = "";
            found++;
        } else {
            food.style.display = "none";
        }
    });

    document.getElementById("noResult").style.display =
        found === 0 ? "block" : "none";
});

document.getElementById("orderModal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeOrder();
    }
});

document.getElementById("successModal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeSuccess();
    }
});

function showMessage(text) {

    const message = document.getElementById("message");

    message.textContent = text;
    message.style.display = "block";

    clearTimeout(window.messageTimer);

    window.messageTimer = setTimeout(function() {
        message.style.display = "none";
    }, 2500);
}

updateCart();
