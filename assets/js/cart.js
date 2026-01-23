// ===== CART STORAGE =====
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// ===== UPDATE CART COUNT (BAG ICON) =====
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll(".bi-bag + span").forEach(badge => {
        badge.textContent = count;
    });
}

// ===== ADD TO CART =====
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".product-card");

            const product = {
                id: card.querySelector("h5").innerText.replace(/\s+/g, "-"),
                name: card.querySelector("h5").innerText,
                price: parseFloat(
                    card.querySelector(".price").innerText.replace("$", "")
                ),
                image: card.querySelector("img").src,
                quantity: 1
            };

            let cart = getCart();
            const existing = cart.find(item => item.id === product.id);

            if (existing) {
                existing.quantity++;
            } else {
                cart.push(product);
            }

            saveCart(cart);
            alert("Added to cart 🛒");
        });
    });
});


function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cart = getCart();
    const tbody = document.getElementById("cart-items");
    const grandTotalEl = document.getElementById("grand-total");

    tbody.innerHTML = "";
    let grandTotal = 0;

    cart.forEach((item, index) => {
        const total = item.price * item.quantity;
        grandTotal += total;

        tbody.innerHTML += `
            <tr>
                <td>
                    <img src="${item.image}" width="60" class="me-2">
                    ${item.name}
                </td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    grandTotalEl.textContent = grandTotal.toFixed(2);
}

function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

document.addEventListener("DOMContentLoaded", renderCart);

// ================= GET CART =================
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// ================= SAVE CART =================
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// ================= UPDATE BADGE =================
function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    document.querySelectorAll(".badge").forEach(badge => {
        badge.textContent = count;
    });
}

// ================= RENDER CART =================
function renderCart() {
    const cart = getCart();
    const cartBody = document.getElementById("cart-items");
    const grandTotalEl = document.getElementById("grand-total");

    cartBody.innerHTML = "";
    let grandTotal = 0;

    if (cart.length === 0) {
        cartBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    Your cart is empty 🛒
                </td>
            </tr>
        `;
        grandTotalEl.textContent = "0";
        updateCartBadge();
        return;
    }

    cart.forEach((item, index) => {
        const total = item.price * item.qty;
        grandTotal += total;

        cartBody.innerHTML += `
            <tr>
                <td>
                    <img src="${item.image}" width="60" class="rounded me-2">
                    ${item.name}
                </td>
                <td>$${item.price}</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary"
                        onclick="decreaseQty(${index})">−</button>
                    <span class="mx-2">${item.qty}</span>
                    <button class="btn btn-sm btn-outline-secondary"
                        onclick="increaseQty(${index})">+</button>
                </td>
                <td>$${total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger"
                        onclick="removeItem(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    grandTotalEl.textContent = grandTotal.toFixed(2);
    updateCartBadge();
}

// ================= QTY CONTROLS =================
function increaseQty(index) {
    const cart = getCart();
    cart[index].qty++;
    saveCart(cart);
}

function decreaseQty(index) {
    const cart = getCart();
    if (cart[index].qty > 1) {
        cart[index].qty--;
    }
    saveCart(cart);
}

// ================= REMOVE ITEM =================
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

// ================= CLEAR CART =================
function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", renderCart);

