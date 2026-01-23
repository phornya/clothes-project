

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ================= CART HELPERS =================
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
}

// ================= UPDATE BAG COUNT =================
function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    document.querySelectorAll(".badge").forEach(badge => {
        badge.textContent = count;
    });
}

// ================= ADD TO CART =================
document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            const product = {
                id: card.querySelector("h5").innerText.replace(/\s+/g, "-"),
                name: card.querySelector("h5").innerText,
                price: Number(
                    card.querySelector(".price").innerText.replace("$", "")
                ),
                image: card.querySelector("img").src,
                qty: 1
            };

            let cart = getCart();
            const existing = cart.find(item => item.id === product.id);

            if (existing) {
                existing.qty++;
            } else {
                cart.push(product);
            }

            saveCart(cart);
            alert("Product added to cart 🛒");
        });
    });
});
