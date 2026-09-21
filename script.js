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
        existingItem.quantity += 1;
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

    const item = cart[index];

    cart.splice(index, 1);

    updateCart();

    showNotification(item.name + " removed from cart!");
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
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
    totalAmount.textContent = "₹" + total;
}

function placeOrder() {

    if (cart.length === 0) {
        showNotification("Your cart is empty!");
        return;
    }

    const orderTotal = cart.reduce(function(total, item) {
        return total + item.price * item.quantity;
    }, 0);

    cart = [];

    updateCart();

    showNotification("Order placed successfully! 🎉 Total: ₹" + orderTotal);
}

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

    const notification = document.getElementById("notification");

    notification.style.display = "none";
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {

    const searchValue = searchInput.value.toLowerCase().trim();

    const foodCards = document.querySelectorAll(".food-card");

    let visibleItems = 0;

    foodCards.forEach(function(card) {

        const foodName = card.dataset.name.toLowerCase();

        if (foodName.includes(searchValue)) {
            card.style.display = "";
            visibleItems++;
        } else {
            card.style.display = "none";
        }
    });

    const noResults = document.getElementById("noResults");

    if (visibleItems === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
});

updateCart();
function placeOrder() {

    if (cart.length === 0) {
        showNotification("Your cart is empty!");
        return;
    }

    document.getElementById("orderModal").style.display = "flex";
}

function closeOrderForm() {
    document.getElementById("orderModal").style.display = "none";
}

function confirmOrder() {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const city = document.getElementById("customerCity").value.trim();
    const pincode = document.getElementById("customerPincode").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    if (!name || !phone || !address || !city || !pincode || !payment) {
        showNotification("Please fill all order details!");
        return;
    }

    if (phone.length < 10) {
        showNotification("Please enter a valid phone number!");
        return;
    }

    if (pincode.length !== 6) {
        showNotification("Please enter a valid pincode!");
        return;
    }

    const orderTotal = cart.reduce(function(total, item) {
        return total + item.price * item.quantity;
    }, 0);

    cart = [];

    updateCart();

    closeOrderForm();

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";
    document.getElementById("customerCity").value = "";
    document.getElementById("customerPincode").value = "";
    document.getElementById("paymentMethod").value = "";

    showNotification("Order placed successfully! 🎉 Total: ₹" + orderTotal);
}

window.addEventListener("click", function(event) {
    const modal = document.getElementById("orderModal");

    if (event.target === modal) {
        closeOrderForm();
    }
});
