let cart = [];

const foodImages = {
    Pizza: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    Burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    Pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80",
    Biryani: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=600&q=80",
    Dosa: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    Idli: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    Noodles: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    Sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
};

function addToCart(name, price) {

    const existingItem = cart.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    showNotification(name + " added to cart!");
}

function removeFromCart(index) {

    const itemName = cart[index].name;

    cart.splice(index, 1);

    updateCart();
    showNotification(itemName + " removed from cart!");
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const navCartCount = document.getElementById("navCartCount");
    const totalAmount = document.getElementById("totalAmount");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty
            </div>
        `;

    } else {

        cart.forEach(function(item, index) {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;
            count += item.quantity;

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <img src="${foodImages[item.name]}" alt="${item.name}">

                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price} × ${item.quantity}</p>
                    <button class="remove-button" onclick="removeFromCart(${index})">
                        Remove
                    </button>
                </div>

                <div class="cart-item-total">
                    ₹${itemTotal}
                </div>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    cartCount.textContent = count;
    navCartCount.textContent = count;
    totalAmount.textContent = "₹" + total;
}

function openOrderForm() {

    if (cart.length === 0) {
        showNotification("Please add food to your cart first!");
        return;
    }

    const total = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    document.getElementById("formTotal").textContent = "₹" + total;
    document.getElementById("orderModal").style.display = "flex";
}

function closeOrderForm() {
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
    const payment = document.getElementById("paymentMethod").value;

    if (name === "" || phone === "" || email === "" || address === "" || city === "" || pincode === "" || payment === "") {
        showNotification("Please fill all details!");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        showNotification("Enter a valid 10 digit phone number!");
        return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
        showNotification("Enter a valid 6 digit pincode!");
        return;
    }

    if (!email.includes("@")) {
        showNotification("Enter a valid email address!");
        return;
    }

    const total = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    cart = [];

    updateCart();
    closeOrderForm();

    document.getElementById("orderForm").reset();

    showNotification("Order confirmed successfully! Total ₹" + total);
});

document.getElementById("searchInput").addEventListener("input", function() {

    const searchValue = this.value.toLowerCase().trim();

    const foodCards = document.querySelectorAll(".food-card");

    let found = 0;

    foodCards.forEach(function(card) {

        const foodName = card.dataset.name;

        if (foodName.includes(searchValue)) {
            card.style.display = "";
            found++;
        } else {
            card.style.display = "none";
        }
    });

    const noResults = document.getElementById("noResults");

    if (found === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
});

function showNotification(message) {

    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");

    notificationText.textContent = message;
    notification.style.display = "flex";

    clearTimeout(window.notificationTimer);

    window.notificationTimer = setTimeout(function() {
        notification.style.display = "none";
    }, 3000);
}

function closeNotification() {
    document.getElementById("notification").style.display = "none";
}

document.getElementById("orderModal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeOrderForm();
    }
});

updateCart();
