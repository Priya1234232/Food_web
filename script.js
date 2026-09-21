let cart = [];

const images = {
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

    let item = cart.find(function(food) {
        return food.name === name;
    });

    if (item) {
        item.quantity++;
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
    const cartCount = document.getElementById("cartCount");
    const navCartCount = document.getElementById("navCartCount");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty">
                Your cart is empty
            </div>
        `;

    } else {

        cart.forEach(function(item, index) {

            let itemTotal = item.price * item.quantity;

            total += itemTotal;
            count += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <img src="${images[item.name]}" alt="${item.name}">

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

    cartCount.textContent = count;
    navCartCount.textContent = count;
    totalElement.textContent = "₹" + total;
}

function removeItem(index) {

    let name = cart[index].name;

    cart.splice(index, 1);

    updateCart();

    showMessage(name + " removed from cart");
}

function openOrder() {

    if (cart.length === 0) {
        showMessage("Please add food to cart first");
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

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value.trim();
    let pincode = document.getElementById("pincode").value.trim();
    let payment = document.getElementById("payment").value;

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

    alert(
        "ORDER PLACED SUCCESSFULLY!\n\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n" +
        "Address: " + address + "\n" +
        "City: " + city + "\n" +
        "Pincode: " + pincode + "\n" +
        "Payment: " + payment + "\n" +
        "Total: ₹" + total
    );

    cart = [];

    updateCart();

    document.getElementById("orderForm").reset();

    showMessage("Your order has been placed successfully");
});

document.getElementById("search").addEventListener("input", function() {

    let value = this.value.toLowerCase().trim();

    let foods = document.querySelectorAll(".food");

    let found = 0;

    foods.forEach(function(food) {

        let name = food.dataset.name.toLowerCase();

        if (name.includes(value)) {
            food.style.display = "";
            found++;
        } else {
            food.style.display = "none";
        }
    });

    document.getElementById("noFood").style.display =
        found === 0 ? "block" : "none";
});

document.getElementById("orderModal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeOrder();
    }
});

function showMessage(text) {

    let message = document.getElementById("message");

    message.textContent = text;
    message.style.display = "block";

    clearTimeout(window.messageTimer);

    window.messageTimer = setTimeout(function() {
        message.style.display = "none";
    }, 2500);
}

updateCart();
